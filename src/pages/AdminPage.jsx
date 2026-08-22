import { useEffect, useMemo, useState } from 'react';
import { useConvex, useMutation, useQuery } from 'convex/react';
import { usePwa } from '../components/pwaContext';
import { api } from '../../convex/_generated/api';
import './AdminPage.css';

const TOKEN_KEY = 'eb-admin-token';
const TABS = [
  { id: 'contacts', label: 'Connect', hint: 'Get in touch' },
  { id: 'workInquiries', label: 'Work briefs', hint: "You're next" },
  { id: 'messages', label: 'Messages', hint: 'Older form' },
];

function formatWhen(value) {
  if (!value) return '—';
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function matchesQuery(record, q) {
  if (!q) return true;
  return Object.values(record).some((value) =>
    String(value ?? '')
      .toLowerCase()
      .includes(q),
  );
}

export default function AdminPage() {
  const convex = useConvex();
  const { canInstall, standalone, promptInstall } = usePwa();
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [tab, setTab] = useState('contacts');
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState(null);

  const inbox = useQuery(api.admin.inbox, token ? { token } : 'skip');
  const login = useMutation(api.admin.login);
  const seedAdmin = useMutation(api.admin.seed);
  const logoutSession = useMutation(api.admin.logout);
  const removeContact = useMutation(api.admin.removeContact);
  const removeWork = useMutation(api.admin.removeWorkInquiry);
  const removeMessage = useMutation(api.admin.removeMessage);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'EB Admin';
    document.body.classList.add('is-admin');
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex, nofollow';
    document.head.appendChild(robots);
    let appleTitle = document.querySelector('meta[name="apple-mobile-web-app-title"]');
    const createdApple = !appleTitle;
    if (!appleTitle) {
      appleTitle = document.createElement('meta');
      appleTitle.name = 'apple-mobile-web-app-title';
      document.head.appendChild(appleTitle);
    }
    const previousApple = appleTitle.content;
    appleTitle.content = 'EB Admin';
    return () => {
      document.title = previousTitle;
      document.body.classList.remove('is-admin');
      robots.remove();
      if (createdApple) appleTitle.remove();
      else appleTitle.content = previousApple;
    };
  }, []);

  useEffect(() => {
    seedAdmin({}).catch(() => {});
  }, [seedAdmin]);

  useEffect(() => {
    if (!token) return undefined;
    let cancelled = false;
    convex.query(api.admin.verify, { token }).catch(() => {
      if (cancelled) return;
      sessionStorage.removeItem(TOKEN_KEY);
      setToken('');
    });
    return () => {
      cancelled = true;
    };
  }, [convex, token]);

  useEffect(() => {
    setOpenId(null);
  }, [tab, search]);

  const rows = useMemo(() => {
    if (!inbox) return [];
    const list = inbox[tab] ?? [];
    const q = search.trim().toLowerCase();
    return list.filter((record) => matchesQuery(record, q));
  }, [inbox, tab, search]);

  const onLogin = async (event) => {
    event.preventDefault();
    const nextEmail = email.trim();
    const nextPassword = password;
    if (!nextEmail || !nextPassword) {
      setLoginError('Enter your email and password.');
      return;
    }
    setLoggingIn(true);
    setLoginError('');
    try {
      const result = await login({ email: nextEmail, password: nextPassword });
      sessionStorage.setItem(TOKEN_KEY, result.token);
      setToken(result.token);
      setPassword('');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Could not sign in.';
      setLoginError(message.replace(/^\[CONVEX.*?\]\s*/, '').replace(/Called by client.*$/i, '').trim() || 'Could not sign in.');
    } finally {
      setLoggingIn(false);
    }
  };

  const logout = () => {
    if (token) {
      logoutSession({ token }).catch(() => {});
    }
    sessionStorage.removeItem(TOKEN_KEY);
    setToken('');
    setPassword('');
  };

  const removeRow = async (record) => {
    if (!window.confirm('Delete this submission? This cannot be undone.')) return;
    try {
      if (tab === 'contacts') await removeContact({ token, id: record._id });
      if (tab === 'workInquiries') await removeWork({ token, id: record._id });
      if (tab === 'messages') await removeMessage({ token, id: record._id });
      setOpenId(null);
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Could not delete.');
    }
  };

  if (!token) {
    return (
      <main className="ad ad--gate">
        <form className="ad-login" onSubmit={onLogin} noValidate>
          <p className="ad-kicker">Private</p>
          <h1 className="ad-title font-gropled">
            Admin <span>inbox</span>
          </h1>
          <p className="ad-copy">Sign in with your admin email and password to view form submissions.</p>
          <label className="ad-label" htmlFor="admin-email">
            Email
            <input
              id="admin-email"
              type="email"
              name="admin-email"
              inputMode="email"
              autoComplete="username"
              autoFocus
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label className="ad-label" htmlFor="admin-password">
            Password
            <span className="ad-password">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                name="admin-password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button
                type="button"
                className="ad-eye"
                onClick={() => setShowPassword((open) => !open)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </span>
          </label>
          {loginError ? (
            <p className="ad-error" role="alert">
              {loginError}
            </p>
          ) : null}
          <button type="submit" className="ad-btn" disabled={loggingIn}>
            {loggingIn ? 'Checking…' : 'Open dashboard'}
          </button>
          {canInstall && !standalone ? (
            <button type="button" className="ad-install" onClick={promptInstall}>
              Install EB Admin
            </button>
          ) : null}
        </form>
      </main>
    );
  }

  const counts = inbox?.counts ?? { contacts: 0, workInquiries: 0, messages: 0 };
  const selected = rows.find((row) => row._id === openId) ?? null;

  return (
    <main className="ad">
      <header className="ad-bar">
        <div>
          <p className="ad-kicker">Edison Biju</p>
          <h1 className="ad-title font-gropled">
            Form <span>inbox</span>
          </h1>
        </div>
        <div className="ad-bar__actions">
          {canInstall && !standalone ? (
            <button type="button" className="ad-install ad-install--bar" onClick={promptInstall}>
              Install EB Admin
            </button>
          ) : null}
          <button type="button" className="ad-ghost" onClick={logout}>
            Log out
          </button>
        </div>
      </header>

      <section className="ad-stats" aria-label="Submission counts">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`ad-stat${tab === item.id ? ' is-active' : ''}`}
            onClick={() => setTab(item.id)}
          >
            <span>{item.label}</span>
            <strong>{counts[item.id] ?? 0}</strong>
          </button>
        ))}
      </section>

      <div className="ad-toolbar">
        <div className="ad-tabs" role="tablist" aria-label="Form type">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              className={`ad-tab${tab === item.id ? ' is-active' : ''}`}
              onClick={() => setTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <input
          className="ad-search"
          type="search"
          placeholder="Search name, email, message…"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <p className="ad-hint">{TABS.find((item) => item.id === tab)?.hint}</p>

      {!inbox ? (
        <p className="ad-copy">Loading submissions…</p>
      ) : (
        <div className="ad-layout">
          <ul className="ad-list">
            {rows.length === 0 ? (
              <li className="ad-empty">No submissions in this list.</li>
            ) : (
              rows.map((record) => (
                <li key={record._id}>
                  <button
                    type="button"
                    className={`ad-row${openId === record._id ? ' is-open' : ''}`}
                    onClick={() => setOpenId(record._id)}
                  >
                    <span className="ad-row__name">{record.name || 'Untitled'}</span>
                    <span className="ad-row__meta">{record.email}</span>
                    <span className="ad-row__meta">
                      {record.subject || record.projectType || record.company || '—'}
                    </span>
                    <span className="ad-row__when">{formatWhen(record.createdAt)}</span>
                  </button>
                </li>
              ))
            )}
          </ul>

          <article className="ad-detail">
            {selected ? (
              <SubmissionDetail tab={tab} record={selected} onDelete={() => removeRow(selected)} />
            ) : (
              <p className="ad-copy">Select a submission to read the full details.</p>
            )}
          </article>
        </div>
      )}
    </main>
  );
}

function SubmissionDetail({ tab, record, onDelete }) {
  const fields =
    tab === 'workInquiries'
      ? [
          ['Name', record.name],
          ['Email', record.email],
          ['Phone', record.phone],
          ['Company', record.company],
          ['Project type', record.projectType],
          ['Budget', record.budget],
          ['Timeline', record.timeline],
          ['Details', record.details],
        ]
      : [
          ['Name', record.name],
          ['Email', record.email],
          ...(tab === 'contacts' ? [['Phone', record.phone], ['Source', record.source]] : []),
          ['Subject', record.subject],
          ['Message', record.message],
        ];

  return (
    <>
      <p className="ad-kicker">{formatWhen(record.createdAt)}</p>
      <h2 className="ad-detail__title font-gropled">{record.name}</h2>
      <dl className="ad-fields">
        {fields.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>
              {label === 'Email' && value ? (
                <a href={`mailto:${value}`}>{value}</a>
              ) : label === 'Phone' && value ? (
                <a href={`tel:${String(value).replace(/\s/g, '')}`}>{value}</a>
              ) : (
                value || '—'
              )}
            </dd>
          </div>
        ))}
      </dl>
      <button type="button" className="ad-danger" onClick={onDelete}>
        Delete submission
      </button>
    </>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.8 12s3.4-6.2 9.2-6.2S21.2 12 21.2 12s-3.4 6.2-9.2 6.2S2.8 12 2.8 12Z"
      />
      <circle cx="12" cy="12" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3l18 18M9.9 9.9A2.4 2.4 0 0 0 12 14.4M14.1 14.1A2.4 2.4 0 0 1 9.9 9.9M6.6 6.6C4.4 8 2.8 12 2.8 12s3.4 6.2 9.2 6.2c1.7 0 3.2-.4 4.5-1M17.4 17.4c2.2-1.4 3.8-5.4 3.8-5.4s-3.4-6.2-9.2-6.2c-.7 0-1.3.1-1.9.2"
      />
    </svg>
  );
}
