import { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useConvex, useMutation, useQuery } from 'convex/react';
import { usePwa } from '../components/pwaContext';
import { api } from '../../convex/_generated/api';
import { clearAdminToken, getAdminToken } from '../lib/adminAuth';
import './AdminPage.css';

const TABS = [
  { id: 'contacts', label: 'Connect', hint: 'Get in touch', icon: 'mail' },
  { id: 'workInquiries', label: 'Work briefs', hint: "You're next", icon: 'briefcase' },
  { id: 'buildInquiries', label: 'Build sales', hint: 'For sale', icon: 'bag' },
  { id: 'planInquiries', label: 'Plan requests', hint: 'Pricing', icon: 'card' },
  { id: 'supportTickets', label: 'Support', hint: '/support tickets', icon: 'life' },
  { id: 'messages', label: 'Messages', hint: 'Older form', icon: 'chat' },
  { id: 'notifications', label: 'Notices', hint: 'Shown in the site bell', icon: 'bell' },
];

const NOTICE_EMAIL = 'eb-notice@internal.local';

function errorMessage(err, fallback) {
  if (err && typeof err === 'object' && 'data' in err) {
    const data = err.data;
    if (typeof data === 'string' && data.trim()) return data;
    if (data && typeof data.message === 'string' && data.message.trim()) return data.message;
  }
  if (err instanceof Error && err.message && !/Server Error/i.test(err.message)) {
    return err.message;
  }
  return fallback;
}

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

function initials(name) {
  const parts = String(name || 'EB')
    .trim()
    .split(/\s+/)
    .slice(0, 2);
  return parts.map((part) => part[0]?.toUpperCase() || '').join('') || 'EB';
}

export default function AdminPage() {
  const navigate = useNavigate();
  const convex = useConvex();
  const { canInstall, standalone, promptInstall } = usePwa();
  const [token, setToken] = useState(() => getAdminToken());
  const [tab, setTab] = useState('contacts');
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeBody, setNoticeBody] = useState('');
  const [noticeStatus, setNoticeStatus] = useState('idle');
  const [noticeError, setNoticeError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);

  const inbox = useQuery(api.admin.inbox, token ? { token } : 'skip');
  const logoutSession = useMutation(api.admin.logout);
  const removeContact = useMutation(api.admin.removeContact);
  const removeWork = useMutation(api.admin.removeWorkInquiry);
  const removeBuild = useMutation(api.admin.removeBuildInquiry);
  const removePlan = useMutation(api.admin.removePlanInquiry);
  const removeSupportTicket = useMutation(api.admin.removeSupportTicket);
  const updateSupportTicketStatus = useMutation(api.admin.updateSupportTicketStatus);
  const removeMessage = useMutation(api.admin.removeMessage);
  const createNotification = useMutation(api.admin.createNotification);
  const removeNotification = useMutation(api.admin.removeNotification);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Edison's Dashboard";
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
      clearAdminToken();
      setToken('');
      navigate('/admin', { replace: true });
    });
    return () => {
      cancelled = true;
    };
  }, [convex, navigate, token]);

  useEffect(() => {
    setOpenId(null);
    setConfirmDelete(false);
    setDeleteError('');
    setMenuOpen(false);
    setComposeOpen(false);
  }, [tab, search]);

  useEffect(() => {
    if (!composeOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && noticeStatus !== 'saving') setComposeOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [composeOpen, noticeStatus]);

  const rows = useMemo(() => {
    if (!inbox) return [];
    const q = search.trim().toLowerCase();
    const noticeFromMessages = (inbox.messages ?? [])
      .filter((row) => (row.email || '').toLowerCase() === NOTICE_EMAIL)
      .map((row) => ({
        ...row,
        title: row.subject || row.title,
        body: row.message || row.body,
      }));
    if (tab === 'notifications') {
      return [...(inbox.notifications ?? []), ...noticeFromMessages].filter((record) => matchesQuery(record, q));
    }
    if (tab === 'messages') {
      return (inbox.messages ?? [])
        .filter((row) => (row.email || '').toLowerCase() !== NOTICE_EMAIL)
        .filter((record) => matchesQuery(record, q));
    }
    return (inbox[tab] ?? []).filter((record) => matchesQuery(record, q));
  }, [inbox, tab, search]);

  const logout = () => {
    if (token) logoutSession({ token }).catch(() => {});
    clearAdminToken();
    setToken('');
    navigate('/admin', { replace: true });
  };

  const removeRow = async (record) => {
    setDeleting(true);
    setDeleteError('');
    try {
      if (tab === 'contacts') await removeContact({ token, id: record._id });
      if (tab === 'workInquiries') await removeWork({ token, id: record._id });
      if (tab === 'buildInquiries') await removeBuild({ token, id: record._id });
      if (tab === 'planInquiries') await removePlan({ token, id: record._id });
      if (tab === 'supportTickets') await removeSupportTicket({ token, id: record._id });
      if (tab === 'messages') await removeMessage({ token, id: record._id });
      if (tab === 'notifications') await removeNotification({ token, id: record._id });
      setConfirmDelete(false);
      setOpenId(null);
    } catch (err) {
      setDeleteError(errorMessage(err, 'Could not delete.'));
    } finally {
      setDeleting(false);
    }
  };

  const postNotice = async (event) => {
    event.preventDefault();
    const title = noticeTitle.trim();
    const body = noticeBody.trim();
    if (!title || !body) {
      setNoticeStatus('error');
      setNoticeError('Title and message are required.');
      return;
    }
    setNoticeStatus('saving');
    setNoticeError('');
    try {
      await createNotification({ token, title, body });
      setNoticeTitle('');
      setNoticeBody('');
      setNoticeStatus('saved');
      setComposeOpen(false);
      window.setTimeout(() => setNoticeStatus('idle'), 1800);
    } catch (err) {
      setNoticeStatus('error');
      setNoticeError(errorMessage(err, 'Could not post the notice.'));
    }
  };

  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  const counts = {
    contacts: inbox?.counts?.contacts ?? 0,
    workInquiries: inbox?.counts?.workInquiries ?? 0,
    buildInquiries: inbox?.counts?.buildInquiries ?? 0,
    planInquiries: inbox?.counts?.planInquiries ?? 0,
    supportTickets: inbox?.counts?.supportTickets ?? 0,
    messages: (inbox?.messages ?? []).filter((row) => (row.email || '').toLowerCase() !== NOTICE_EMAIL).length,
    notifications:
      (inbox?.notifications ?? []).length +
      (inbox?.messages ?? []).filter((row) => (row.email || '').toLowerCase() === NOTICE_EMAIL).length,
  };
  const activeTab = TABS.find((item) => item.id === tab) ?? TABS[0];
  const selected = rows.find((row) => row._id === openId) ?? null;

  return (
    <div className={`ad ad--app${menuOpen ? ' is-nav-open' : ''}`}>
      <button type="button" className="ad-scrim" aria-label="Close menu" onClick={() => setMenuOpen(false)} />
      <aside className="ad-side">
        <div className="ad-brand">
          <span className="ad-brand__dots" aria-hidden="true">
            <i />
            <i />
          </span>
          <span>Edison&apos;s Dashboard</span>
        </div>
        <nav className="ad-nav" aria-label="Inbox">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`ad-nav__item${tab === item.id ? ' is-active' : ''}`}
              onClick={() => setTab(item.id)}
            >
              <NavIcon name={item.icon} />
              <span>{item.label}</span>
              <em>{counts[item.id] ?? 0}</em>
            </button>
          ))}
        </nav>
        <div className="ad-side__promo">
          <p>Site notices appear in the header bell for every visitor.</p>
        </div>
        <div className="ad-side__foot">
          {canInstall && !standalone ? (
            <button type="button" className="ad-side__link" onClick={promptInstall}>
              Install app
            </button>
          ) : null}
          <button type="button" className="ad-side__link" onClick={logout}>
            Log out
          </button>
        </div>
      </aside>

      <div className="ad-shell">
        <header className="ad-top">
          <button type="button" className="ad-menu" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
            <span />
            <span />
          </button>
          <div className="ad-pills" aria-hidden="true">
            <span className="ad-pill is-on">{activeTab.label}</span>
            <span className="ad-pill">{activeTab.hint}</span>
          </div>
          <label className="ad-search">
            <SearchIcon />
            <input
              type="search"
              placeholder="Search name, email, message…"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <div className="ad-user">
            <span className="ad-user__avatar">EB</span>
            <span>
              <strong>Edison Biju</strong>
              <small>@admin</small>
            </span>
          </div>
        </header>

        <div className="ad-layout">
          <section className="ad-feed">
            {tab === 'notifications' ? (
              <button type="button" className="ad-card ad-compose-launch" onClick={() => {
                setNoticeError('');
                setComposeOpen(true);
              }}>
                <span className="ad-user__avatar">EB</span>
                <span>Post a site notice</span>
              </button>
            ) : null}

            {!inbox ? (
              <p className="ad-muted">Loading submissions…</p>
            ) : (
              <ul className="ad-feed__list">
                {rows.length === 0 ? (
                  <li className="ad-card ad-empty">
                    {tab === 'notifications' ? 'No notices posted yet.' : 'No submissions in this list.'}
                  </li>
                ) : (
                  rows.map((record) => (
                    <li key={record._id}>
                      <button type="button" className="ad-card ad-post" onClick={() => setOpenId(record._id)}>
                        <div className="ad-post__head">
                          <span className="ad-user__avatar">{initials(record.name || record.title)}</span>
                          <span>
                            <strong>{record.name || record.title || 'Untitled'}</strong>
                            <small>{formatWhen(record.createdAt)}</small>
                          </span>
                        </div>
                        <p className="ad-post__body">
                          {record.body ||
                            record.message ||
                            record.details ||
                            record.subject ||
                            record.email ||
                            'Open to read the full submission.'}
                        </p>
                        <div className="ad-post__meta">
                          <span>
                            {record.status
                              ? String(record.status).replace(/_/g, ' ')
                              : record.email ||
                                record.subject ||
                                record.planName ||
                                record.productTitle ||
                                record.projectType ||
                                'Inbox'}
                          </span>
                          <span>View</span>
                        </div>
                      </button>
                    </li>
                  ))
                )}
              </ul>
            )}
          </section>

          <aside className="ad-rail">
            <div className="ad-card">
              <div className="ad-rail__title">
                <h2>Overview</h2>
              </div>
              <ul className="ad-overview">
                {TABS.map((item) => (
                  <li key={item.id}>
                    <span>{item.label}</span>
                    <strong>{counts[item.id] ?? 0}</strong>
                  </li>
                ))}
              </ul>
            </div>
            <div className="ad-card ad-rail__note">
              <h2>Suggested</h2>
              <p>Post product updates and launch notes from Notices. They show in the public header bell.</p>
            </div>
          </aside>
        </div>
      </div>

      {composeOpen ? (
        <div
          className="ad-modal"
          role="presentation"
          onClick={() => {
            if (noticeStatus === 'saving') return;
            setComposeOpen(false);
          }}
        >
          <form
            className="ad-card ad-modal__panel ad-compose"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ad-compose-title"
            onClick={(event) => event.stopPropagation()}
            onSubmit={postNotice}
          >
            <button
              type="button"
              className="ad-modal__close"
              onClick={() => setComposeOpen(false)}
              aria-label="Close"
            >
              <span />
              <span />
            </button>
            <div className="ad-compose__head">
              <span className="ad-user__avatar">EB</span>
              <p id="ad-compose-title">Post a site notice</p>
            </div>
            <input
              value={noticeTitle}
              onChange={(event) => setNoticeTitle(event.target.value)}
              placeholder="Headline"
              maxLength={160}
              required
              autoFocus
            />
            <textarea
              value={noticeBody}
              onChange={(event) => setNoticeBody(event.target.value)}
              placeholder="What should people see in the bell popup?"
              rows={4}
              maxLength={2000}
              required
            />
            {noticeError ? (
              <p className="ad-error" role="alert">
                {noticeError}
              </p>
            ) : null}
            <div className="ad-compose__actions">
              <button type="submit" className="ad-primary" disabled={noticeStatus === 'saving'}>
                {noticeStatus === 'saving' ? 'Posting…' : 'Create notice'}
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {selected ? (
        <div
          className="ad-modal"
          role="presentation"
          onClick={() => {
            if (confirmDelete) {
              setConfirmDelete(false);
              return;
            }
            setOpenId(null);
          }}
        >
          {confirmDelete ? (
            <article
              className="ad-card ad-modal__panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="ad-confirm-title"
              onClick={(event) => event.stopPropagation()}
            >
              <p className="ad-kicker">Please confirm</p>
              <h2 className="ad-modal__title" id="ad-confirm-title">
                Delete this {tab === 'notifications' ? 'notice' : 'submission'}?
              </h2>
              <p className="ad-muted">This cannot be undone.</p>
              {deleteError ? (
                <p className="ad-error" role="alert">
                  {deleteError}
                </p>
              ) : null}
              <div className="ad-modal__actions">
                <button type="button" className="ad-ghost" disabled={deleting} onClick={() => setConfirmDelete(false)}>
                  Cancel
                </button>
                <button type="button" className="ad-danger" disabled={deleting} onClick={() => removeRow(selected)}>
                  {deleting ? 'Deleting…' : 'Delete'}
                </button>
              </div>
            </article>
          ) : (
            <article
              className="ad-card ad-modal__panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="ad-modal-title"
              onClick={(event) => event.stopPropagation()}
            >
              <button type="button" className="ad-modal__close" onClick={() => setOpenId(null)} aria-label="Close">
                <span />
                <span />
              </button>
              <SubmissionDetail
                tab={tab}
                record={selected}
                onStatusChange={
                  tab === 'supportTickets'
                    ? async (status) => {
                        await updateSupportTicketStatus({ token, id: selected._id, status });
                      }
                    : undefined
                }
                onDelete={() => {
                  setDeleteError('');
                  setConfirmDelete(true);
                }}
              />
            </article>
          )}
        </div>
      ) : null}
    </div>
  );
}

function SubmissionDetail({ tab, record, onDelete, onStatusChange }) {
  const [statusSaving, setStatusSaving] = useState(false);
  const [statusError, setStatusError] = useState('');

  const fields =
    tab === 'notifications'
      ? [
          ['Title', record.title],
          ['Message', record.body],
        ]
      : tab === 'workInquiries'
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
        : tab === 'buildInquiries'
          ? [
              ['Product', record.productTitle],
              ['Product URL', record.productUrl],
              ['Name', record.name],
              ['Email', record.email],
              ['Phone', record.phone],
              ['Company', record.company],
              ['Budget', record.budget],
              ['Message', record.message],
            ]
          : tab === 'planInquiries'
            ? [
                ['Plan', record.planName],
                ['Price shown', record.displayedPrice],
                ['Currency', record.currency],
                ['USD', record.priceUsd != null ? `$${record.priceUsd}` : ''],
                ['INR', record.priceInr != null ? `₹${record.priceInr}` : ''],
                ['Name', record.name],
                ['Email', record.email],
                ['Phone', record.phone],
                ['Company', record.company],
                ['Message', record.message],
              ]
            : tab === 'supportTickets'
              ? [
                  ['Name', record.name],
                  ['Email', record.email],
                  ['Phone', record.phone],
                  ['Product', record.product],
                  ['Category', record.category],
                  ['Status', record.status],
                  ['Subject', record.subject],
                  ['Message', record.message],
                  ['Source', record.source],
                ]
              : [
                  ['Name', record.name],
                  ['Email', record.email],
                  ...(tab === 'contacts' ? [['Phone', record.phone], ['Source', record.source]] : []),
                  ['Subject', record.subject],
                  ['Message', record.message],
                ];

  const onStatus = async (event) => {
    if (!onStatusChange) return;
    const status = event.target.value;
    setStatusSaving(true);
    setStatusError('');
    try {
      await onStatusChange(status);
    } catch (err) {
      setStatusError(errorMessage(err, 'Could not update status.'));
    } finally {
      setStatusSaving(false);
    }
  };

  return (
    <>
      <p className="ad-kicker">{formatWhen(record.createdAt)}</p>
      <h2 className="ad-modal__title" id="ad-modal-title">
        {record.subject || record.name || record.title}
      </h2>
      {tab === 'supportTickets' && onStatusChange ? (
        <label className="ad-status">
          <span>Ticket status</span>
          <select value={record.status || 'open'} onChange={onStatus} disabled={statusSaving}>
            <option value="open">Open</option>
            <option value="in_progress">In progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </label>
      ) : null}
      {statusError ? <p className="ad-error">{statusError}</p> : null}
      <dl className="ad-fields">
        {fields.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>
              {label === 'Email' && value ? (
                <a href={`mailto:${value}`}>{value}</a>
              ) : label === 'Phone' && value ? (
                <a href={`tel:${String(value).replace(/\s/g, '')}`}>{value}</a>
              ) : label === 'Product URL' && value ? (
                <a href={value} target="_blank" rel="noopener noreferrer">
                  {value}
                </a>
              ) : (
                value || '—'
              )}
            </dd>
          </div>
        ))}
      </dl>
      <button type="button" className="ad-danger ad-danger--ghost" onClick={onDelete}>
        {tab === 'notifications' ? 'Delete notice' : 'Delete submission'}
      </button>
    </>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 16.5L20 20.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function NavIcon({ name }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.8',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };
  if (name === 'briefcase') {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <rect x="3.5" y="7" width="17" height="13" rx="2" {...common} />
        <path d="M8 7V5.8A1.8 1.8 0 0 1 9.8 4h4.4A1.8 1.8 0 0 1 16 5.8V7" {...common} />
      </svg>
    );
  }
  if (name === 'bag') {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M6 8h12l-1 12H7L6 8Z" {...common} />
        <path d="M9 8V7a3 3 0 0 1 6 0v1" {...common} />
      </svg>
    );
  }
  if (name === 'card') {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <rect x="3" y="6" width="18" height="12" rx="2" {...common} />
        <path d="M3 10h18" {...common} />
      </svg>
    );
  }
  if (name === 'chat') {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M5 18.5 4 21l3.2-1.2A9 9 0 1 0 5 18.5Z" {...common} />
      </svg>
    );
  }
  if (name === 'bell') {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M6 9a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9Z" {...common} />
        <path d="M10 18.5a2 2 0 0 0 4 0" {...common} />
      </svg>
    );
  }
  if (name === 'life') {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <circle cx="12" cy="12" r="8.2" {...common} />
        <path d="M12 8v8M8 12h8" {...common} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="14" rx="2" {...common} />
      <path d="M3.5 9h17" {...common} />
    </svg>
  );
}
