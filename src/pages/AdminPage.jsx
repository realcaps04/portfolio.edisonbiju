import { useEffect, useMemo, useState } from 'react';
import { useConvex, useMutation, useQuery } from 'convex/react';
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
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [tab, setTab] = useState('contacts');
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState(null);

  const inbox = useQuery(api.admin.inbox, token ? { token } : 'skip');
  const login = useMutation(api.admin.login);
  const logoutSession = useMutation(api.admin.logout);
  const removeContact = useMutation(api.admin.removeContact);
  const removeWork = useMutation(api.admin.removeWorkInquiry);
  const removeMessage = useMutation(api.admin.removeMessage);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Admin | Edison Biju';
    document.body.classList.add('is-admin');
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex, nofollow';
    document.head.appendChild(robots);
    return () => {
      document.title = previousTitle;
      document.body.classList.remove('is-admin');
      robots.remove();
    };
  }, []);

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
    setLoggingIn(true);
    setLoginError('');
    try {
      const result = await login({ email, password });
      sessionStorage.setItem(TOKEN_KEY, result.token);
      setToken(result.token);
      setPassword('');
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Could not sign in.');
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
        <form className="ad-login" onSubmit={onLogin}>
          <p className="ad-kicker">Private</p>
          <h1 className="ad-title font-gropled">
            Admin <span>inbox</span>
          </h1>
          <p className="ad-copy">Sign in with your admin email and password to view form submissions.</p>
          <label className="ad-label">
            Email
            <input
              type="email"
              name="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className="ad-label">
            Password
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {loginError ? (
            <p className="ad-error" role="alert">
              {loginError}
            </p>
          ) : null}
          <button type="submit" className="ad-btn" disabled={loggingIn}>
            {loggingIn ? 'Checking…' : 'Open dashboard'}
          </button>
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
        <button type="button" className="ad-ghost" onClick={logout}>
          Log out
        </button>
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
