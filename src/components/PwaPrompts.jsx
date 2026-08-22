import { useCallback, useEffect, useRef, useState } from 'react';
import { PwaContext } from './pwaContext';
import './PwaPrompts.css';

const DISMISS_INSTALL = 'eb-pwa-install-dismissed';

function isStandaloneMode() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: window-controls-overlay)').matches ||
    window.navigator.standalone === true
  );
}

function isIosDevice() {
  const ua = window.navigator.userAgent || '';
  return /iphone|ipad|ipod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

export function PwaProvider({ children }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [standalone, setStandalone] = useState(false);
  const [ios, setIos] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [showIosHelp, setShowIosHelp] = useState(false);
  const [needRefresh, setNeedRefresh] = useState(false);
  const [showInstallChip, setShowInstallChip] = useState(true);
  const updateSW = useRef(null);

  useEffect(() => {
    setStandalone(isStandaloneMode());
    setIos(isIosDevice());

    let cancelled = false;
    import('virtual:pwa-register')
      .then(({ registerSW }) => {
        if (cancelled) return;
        updateSW.current = registerSW({
          immediate: true,
          onNeedRefresh() {
            setNeedRefresh(true);
          },
        });
      })
      .catch(() => {});

    const onPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      if (!localStorage.getItem(DISMISS_INSTALL) && !isStandaloneMode()) {
        setShowInstallModal(true);
      }
    };

    const onInstalled = () => {
      setDeferredPrompt(null);
      setStandalone(true);
      setShowInstallModal(false);
      setShowIosHelp(false);
    };

    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);

    const later = window.setTimeout(() => {
      if (isStandaloneMode() || localStorage.getItem(DISMISS_INSTALL)) return;
      if (isIosDevice()) setShowInstallModal(true);
    }, 7000);

    return () => {
      cancelled = true;
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
      window.clearTimeout(later);
    };
  }, []);

  const canInstall = !standalone;

  const promptInstall = useCallback(async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice.catch(() => ({ outcome: 'dismissed' }));
      setDeferredPrompt(null);
      setShowInstallModal(false);
      if (choice?.outcome !== 'accepted') {
        localStorage.setItem(DISMISS_INSTALL, '1');
      }
      return;
    }

    setShowInstallModal(false);
    setShowIosHelp(true);
  }, [deferredPrompt]);

  const dismissInstall = useCallback(() => {
    localStorage.setItem(DISMISS_INSTALL, '1');
    setShowInstallModal(false);
    setShowIosHelp(false);
  }, []);

  const applyUpdate = useCallback(() => {
    if (updateSW.current) {
      updateSW.current(true);
      return;
    }
    window.location.reload();
  }, []);

  return (
    <PwaContext.Provider value={{ canInstall, standalone, promptInstall }}>
      {children}
      <PwaUi
        showInstallChip={showInstallChip && canInstall}
        showInstallModal={showInstallModal && canInstall}
        showIosHelp={showIosHelp}
        ios={ios}
        needRefresh={needRefresh}
        onInstall={promptInstall}
        onDismissInstall={dismissInstall}
        onHideChip={() => setShowInstallChip(false)}
        onCloseIos={() => setShowIosHelp(false)}
        onApplyUpdate={applyUpdate}
        onLaterUpdate={() => setNeedRefresh(false)}
      />
    </PwaContext.Provider>
  );
}

function PwaUi({
  showInstallChip,
  showInstallModal,
  showIosHelp,
  ios,
  needRefresh,
  onInstall,
  onDismissInstall,
  onHideChip,
  onCloseIos,
  onApplyUpdate,
  onLaterUpdate,
}) {
  return (
    <>
      {showInstallChip && !showInstallModal && !showIosHelp && !needRefresh ? (
        <div className="pwa-chip">
          <button type="button" className="pwa-chip__btn" onClick={onInstall}>
            <InstallIcon />
            Install app
          </button>
          <button type="button" className="pwa-chip__x" onClick={onHideChip} aria-label="Hide install">
            <span />
            <span />
          </button>
        </div>
      ) : null}

      {showInstallModal ? (
        <div className="pwa-modal" role="dialog" aria-modal="true" aria-labelledby="pwa-install-title">
          <div className="pwa-modal__card">
            <button type="button" className="pwa-modal__close" onClick={onDismissInstall} aria-label="Close">
              <span />
              <span />
            </button>
            <img src="/pwa-192.png" alt="" className="pwa-modal__icon" width="56" height="56" />
            <p className="pwa-modal__eyebrow">Add to device</p>
            <h2 className="pwa-modal__title font-gropled" id="pwa-install-title">
              Install as an <span>app</span>
            </h2>
            <p className="pwa-modal__copy">
              Open this portfolio from your home screen — faster load, fullscreen, and it works like a native app.
            </p>
            <div className="pwa-modal__actions">
              <button type="button" className="pwa-modal__cta" onClick={onInstall}>
                Install app
              </button>
              <button type="button" className="pwa-modal__ghost" onClick={onDismissInstall}>
                Not now
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showIosHelp ? (
        <div className="pwa-modal" role="dialog" aria-modal="true" aria-labelledby="pwa-ios-title">
          <div className="pwa-modal__card">
            <button type="button" className="pwa-modal__close" onClick={onCloseIos} aria-label="Close">
              <span />
              <span />
            </button>
            <p className="pwa-modal__eyebrow">{ios ? 'iPhone / iPad' : 'Install'}</p>
            <h2 className="pwa-modal__title font-gropled" id="pwa-ios-title">
              {ios ? (
                <>
                  Add to <span>Home Screen</span>
                </>
              ) : (
                <>
                  Install as an <span>app</span>
                </>
              )}
            </h2>
            {ios ? (
              <ol className="pwa-modal__steps">
                <li>Tap the Share button in Safari.</li>
                <li>Scroll and tap Add to Home Screen.</li>
                <li>Tap Add — Edison will appear like an app.</li>
              </ol>
            ) : (
              <ol className="pwa-modal__steps">
                <li>Open the browser menu (three dots or share icon).</li>
                <li>Tap Install app or Add to Home screen.</li>
                <li>Confirm — Edison opens fullscreen like an app.</li>
              </ol>
            )}
            <div className="pwa-modal__actions">
              <button type="button" className="pwa-modal__cta" onClick={onCloseIos}>
                Got it
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {needRefresh ? (
        <div className="pwa-modal" role="dialog" aria-modal="true" aria-labelledby="pwa-update-title">
          <div className="pwa-modal__card">
            <button type="button" className="pwa-modal__close" onClick={onLaterUpdate} aria-label="Close">
              <span />
              <span />
            </button>
            <p className="pwa-modal__eyebrow">Fresh build</p>
            <h2 className="pwa-modal__title font-gropled" id="pwa-update-title">
              Portfolio <span>updated</span>
            </h2>
            <p className="pwa-modal__copy">
              New work just landed. Refresh to load the latest version of this site.
            </p>
            <div className="pwa-modal__actions">
              <button type="button" className="pwa-modal__cta" onClick={onApplyUpdate}>
                Refresh now
              </button>
              <button type="button" className="pwa-modal__ghost" onClick={onLaterUpdate}>
                Later
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function InstallIcon() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M10 2.2a.8.8 0 0 1 .8.8v8.07l2.36-2.36a.8.8 0 1 1 1.13 1.13l-3.75 3.75a.8.8 0 0 1-1.13 0L5.66 9.84a.8.8 0 1 1 1.13-1.13l2.41 2.4V3a.8.8 0 0 1 .8-.8ZM4.2 14.4A1.8 1.8 0 0 0 2.4 16.2v.1A1.7 1.7 0 0 0 4.1 18h11.8a1.7 1.7 0 0 0 1.7-1.7v-.1a1.8 1.8 0 0 0-1.8-1.8H4.2Z"
      />
    </svg>
  );
}
