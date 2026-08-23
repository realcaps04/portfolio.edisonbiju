import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './NotificationPopup.css';

const SEEN_KEY = 'eb-notify-seen';

export function markNotificationsSeen() {
  try {
    window.localStorage.setItem(SEEN_KEY, String(Date.now()));
  } catch {
    /* private mode */
  }
}

export function unreadNotificationCount(items) {
  if (!items?.length) return 0;
  let seen = 0;
  try {
    seen = Number(window.localStorage.getItem(SEEN_KEY) || 0);
  } catch {
    seen = 0;
  }
  return items.filter((item) => (item.createdAt ?? 0) > seen).length;
}

function formatWhen(value) {
  if (!value) return '';
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function panelPosition(anchor) {
  const pad = 8;
  const width = Math.min(352, window.innerWidth - pad * 2);
  if (!anchor) return { top: 72, right: pad, width };
  const rect = anchor.getBoundingClientRect();
  const preferredRight = window.innerWidth - rect.right;
  const right = Math.min(
    Math.max(pad, preferredRight),
    Math.max(pad, window.innerWidth - width - pad),
  );
  return {
    top: Math.round(rect.bottom + 10),
    right,
    width,
  };
}

export default function NotificationPopup({ open, items, anchorRef, onClose }) {
  const isOpen = open;
  const notices = items;
  const anchor = anchorRef;
  const close = onClose;
  const titleId = useId();
  const panelRef = useRef(null);
  const [pos, setPos] = useState({ top: 72, right: 16, width: 352 });

  useLayoutEffect(() => {
    if (!isOpen) return undefined;
    const place = () => setPos(panelPosition(anchor?.current));
    place();
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => {
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [isOpen, anchor]);

  useEffect(() => {
    if (!isOpen) return undefined;
    markNotificationsSeen();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') close();
    };

    const onPointerDown = (event) => {
      const target = event.target;
      if (panelRef.current?.contains(target) || anchor?.current?.contains(target)) return;
      close();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [isOpen, close, anchor]);

  if (!isOpen || typeof document === 'undefined') return null;

  const list = notices ?? [];

  return createPortal(
    <div className="np" role="presentation">
      <div
        ref={panelRef}
        className="np__panel"
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
        data-lenis-prevent
        data-lenis-prevent-wheel
        data-lenis-prevent-touch
        style={{ top: pos.top, right: pos.right, width: pos.width }}
      >
        <button type="button" className="np__close" onClick={close} aria-label="Close notifications">
          <span />
          <span />
        </button>
        <p className="np__kicker">Updates</p>
        <h2 className="np__title" id={titleId}>
          Notifications
        </h2>
        {notices === undefined ? (
          <p className="np__empty">Loading notices…</p>
        ) : list.length === 0 ? (
          <p className="np__empty">No notifications yet. Check back soon.</p>
        ) : (
          <ul className="np__list">
            {list.map((item) => (
              <li key={item._id} className="np__item">
                <p className="np__item-title">{item.title || 'Notice'}</p>
                {item.body ? <p className="np__item-body">{item.body}</p> : null}
                <p className="np__item-when">{formatWhen(item.createdAt)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>,
    document.body,
  );
}
