import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity,
  ArrowRight,
  Bell,
  BookOpen,
  CalendarClock,
  Check,
  ChevronRight,
  ClipboardCheck,
  CreditCard,
  FileText,
  HeartHandshake,
  Home,
  LayoutDashboard,
  LifeBuoy,
  Lock,
  LogOut,
  Menu,
  MessageCircle,
  Mic,
  Phone,
  ReceiptText,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  Target,
  Users,
  Video,
  WalletCards,
  Wifi,
  X
} from 'lucide-react';
import './styles.css';

const routes = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'programs', label: 'Programs', icon: ClipboardCheck },
  { id: 'telehealth', label: 'Telehealth', icon: Video },
  { id: 'resources', label: 'Resources', icon: BookOpen },
  { id: 'support', label: 'Support', icon: LifeBuoy },
  { id: 'login', label: 'Login', icon: Lock }
];

const demoAccounts = [
  { role: 'patient', label: 'Patient', email: 'patient@harborlight.test', password: 'Patient2026!', name: 'Amina Wanjiku' },
  { role: 'clinician', label: 'Clinician', email: 'clinician@harborlight.test', password: 'Clinician2026!', name: 'Dr. Kamau Otieno' },
  { role: 'admin', label: 'Admin', email: 'admin@harborlight.test', password: 'Admin2026!', name: 'Mercy Njeri' }
];

const programs = [
  { code: 'PHP', title: 'PHP / Day Treatment', intensity: '25-30 hrs weekly', fit: 'High structure, step-down support, relapse risk monitoring.', detail: 'Daily treatment schedule, attendance capture, family coordination, and transition planning.' },
  { code: 'IOP', title: 'Intensive Outpatient', intensity: '3 hrs daily, 4 days', fit: 'Structured care while maintaining work, school, or family life.', detail: 'Group therapy, individual sessions, reminders, assignments, and recovery goals.' },
  { code: 'OP', title: 'Outpatient Program', intensity: 'Usually 90 min weekly', fit: 'Continued recovery support and longer-term accountability.', detail: 'Weekly check-ins, relapse prevention planning, resources, and aftercare support.' },
  { code: 'VIOP', title: 'Virtual IOP', intensity: 'Mobile browser access', fit: 'Remote participation with a real program structure.', detail: 'Waiting room, readiness checks, secure links, group rosters, and low-bandwidth help.' }
];

const publicTools = [
  ['Confidential Intake', 'Capture needs, county, phone, consent, device access, preferred time, and M-Pesa payer details.', ClipboardCheck],
  ['Care Matching', 'Route patients to PHP, IOP, OP, Virtual IOP, family support, or urgent follow-up.', Target],
  ['Telehealth Access', 'Session links, waiting room, readiness checks, reconnect guidance, and attendance markers.', Video],
  ['Recovery Tools', 'Mood, craving, sleep, goals, worksheets, journaling, relapse planning, and resources.', Activity],
  ['Messaging', 'Consent-aware SMS and WhatsApp reminders that route back to secure portal views.', MessageCircle],
  ['Payments', 'M-Pesa payment status, receipts, balances, deposits, and reconciliation workflows.', WalletCards]
];

const resourceLibrary = [
  ['Before a session', 'Check battery, data bundle, privacy, headphones, and a calm location.'],
  ['Craving plan', 'Name the trigger, delay 10 minutes, contact support, move location, use grounding.'],
  ['Family guide', 'Use non-blaming language, keep boundaries clear, support treatment attendance.'],
  ['Low bandwidth tips', 'Close background apps, switch to audio if needed, reconnect from the portal.'],
  ['Aftercare checklist', 'Appointments, medication support, peer groups, work plan, emergency contacts.'],
  ['Privacy basics', 'Use personal devices where possible and avoid sharing sensitive information by SMS.']
];

const patientCards = [
  ['Next session', 'Virtual IOP group at 18:00 EAT', 'Join waiting room', Video],
  ['Daily check-in', 'Mood, cravings, sleep, stress, and safety prompt', 'Complete check-in', Activity],
  ['Recovery plan', '3 active goals, 2 worksheets, relapse plan draft', 'Review tasks', Target],
  ['Payments', 'KES 4,500 balance, receipt history available', 'View payments', CreditCard]
];

const clinicianCards = [
  ['Waiting room', '3 ready, 1 reconnecting, 7 expected', 'Admit patients', Users],
  ['Risk flags', '2 elevated cravings, 1 missed check-in', 'Review context', Activity],
  ['Documentation', '2 progress notes and 1 group note pending', 'Open notes', FileText],
  ['Follow-up queue', 'No-shows, referrals, family consent, care tasks', 'Assign tasks', Bell]
];

const adminCards = [
  ['Intake queue', '8 new requests, 3 priority callbacks', 'Assign follow-up', ClipboardCheck],
  ['Program scheduling', 'PHP, IOP, OP, Virtual IOP capacity', 'Manage calendar', CalendarClock],
  ['Payment review', '6 receipts, 2 reconciliation checks', 'Open queue', ReceiptText],
  ['Audit and consent', 'Messaging, family access, payment permissions', 'Review logs', ShieldCheck]
];

function getInitialPage() {
  const page = window.location.hash.replace('#/', '') || 'home';
  return routes.some((route) => route.id === page) ? page : 'home';
}

function App() {
  const [page, setPage] = useState(getInitialPage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState(() => JSON.parse(localStorage.getItem('harborlight-session') || 'null'));

  useEffect(() => {
    const syncHash = () => setPage(getInitialPage());
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  const navigate = (nextPage) => {
    window.location.hash = `/${nextPage}`;
    setPage(nextPage);
    setMenuOpen(false);
  };

  const login = (account) => {
    localStorage.setItem('harborlight-session', JSON.stringify(account));
    setSession(account);
    navigate('portal');
  };

  const logout = () => {
    localStorage.removeItem('harborlight-session');
    setSession(null);
    navigate('login');
  };

  const activeRoute = page === 'portal' ? 'login' : page;

  return (
    <div className="app-shell">
      <header className="site-header app-header">
        <button className="brand brand-button" onClick={() => navigate('home')} aria-label="Harborlight home">
          <span className="brand-mark"><HeartHandshake size={18} /></span>
          <span>Harborlight</span>
        </button>
        <nav className="desktop-nav page-nav" aria-label="Primary navigation">
          {routes.map((route) => <button key={route.id} className={activeRoute === route.id ? 'active' : ''} onClick={() => navigate(route.id)}>{route.label}</button>)}
        </nav>
        <div className="header-actions">
          {session ? <button className="text-button" onClick={() => navigate('portal')}>Dashboard</button> : <button className="text-button" onClick={() => navigate('login')}>Sign in</button>}
          <button className="header-cta" onClick={() => navigate('support')}>Get help <ArrowRight size={16} /></button>
          <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={22} /></button>
        </div>
      </header>

      {menuOpen && <MobileMenu page={activeRoute} navigate={navigate} close={() => setMenuOpen(false)} />}

      <main className="page-shell">
        {page === 'home' && <HomePage navigate={navigate} session={session} />}
        {page === 'programs' && <ProgramsPage navigate={navigate} />}
        {page === 'telehealth' && <TelehealthPage navigate={navigate} />}
        {page === 'resources' && <ResourcesPage navigate={navigate} />}
        {page === 'support' && <SupportPage navigate={navigate} />}
        {page === 'login' && <LoginPage login={login} session={session} navigate={navigate} />}
        {page === 'portal' && <PortalPage session={session} navigate={navigate} logout={logout} />}
      </main>

      <footer className="site-footer">
        <div className="brand footer-brand"><span className="brand-mark"><HeartHandshake size={18} /></span><span>Harborlight</span></div>
        <p>Mobile-first opioid rehabilitation, telehealth, recovery engagement, and M-Pesa workflows.</p>
        <span>Kenya / EAT</span>
      </footer>
    </div>
  );
}

function MobileMenu({ page, navigate, close }) {
  return (
    <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation">
      <div className="mobile-menu-panel">
        <button className="modal-close" onClick={close} aria-label="Close menu"><X size={20} /></button>
        <div className="brand"><span className="brand-mark"><HeartHandshake size={18} /></span><span>Harborlight</span></div>
        <div className="mobile-route-list">
          {routes.map((route) => {
            const Icon = route.icon;
            return <button key={route.id} className={page === route.id ? 'active' : ''} onClick={() => navigate(route.id)}><Icon size={18} /> {route.label}<ChevronRight size={17} /></button>;
          })}
        </div>
      </div>
    </div>
  );
}

function PageHero({ kicker, title, text, actions, visual }) {
  return (
    <section className="page-hero">
      <div>
        <p className="eyebrow"><span /> {kicker}</p>
        <h1>{title}</h1>
        <p className="hero-lede">{text}</p>
        {actions && <div className="hero-actions">{actions}</div>}
      </div>
      {visual}
    </section>
  );
}

function HomePage({ navigate, session }) {
  return (
    <>
      <PageHero
        kicker="Kenya-ready recovery platform"
        title="Treatment access that feels structured, private, and alive."
        text="A PWA prototype for opioid rehabilitation and outpatient care with separate pages, demo login, telehealth workflows, recovery tools, staff dashboards, and M-Pesa-ready payment views."
        actions={<><button className="primary-button" onClick={() => navigate('login')}>{session ? 'Open dashboard' : 'Use demo login'} <ArrowRight size={18} /></button><button className="secondary-button" onClick={() => navigate('programs')}>Explore programs</button></>}
        visual={<EngagementPanel />}
      />
      <section className="feature-band">
        {publicTools.map(([title, text, Icon]) => <article className="feature-card" key={title}><Icon size={24} /><h3>{title}</h3><p>{text}</p></article>)}
      </section>
      <section className="outcome-section">
        <div><p className="section-kicker">Better outcomes</p><h2>Keep people engaged after the first click.</h2></div>
        <div className="outcome-grid">
          <div><strong>Daily rhythm</strong><span>Check-ins, goals, reminders, and session prep make recovery feel actionable.</span></div>
          <div><strong>Care visibility</strong><span>Clinicians see risk flags, attendance, notes, and follow-up needs in one place.</span></div>
          <div><strong>Low friction</strong><span>Mobile pages, PWA install, offline shell, and simple navigation reduce drop-off.</span></div>
        </div>
      </section>
    </>
  );
}

function EngagementPanel() {
  return (
    <div className="engagement-panel">
      <div className="panel-top"><span className="pulse-dot" /> Live care snapshot</div>
      <div className="engagement-row"><Video size={20} /><div><strong>18:00 Virtual IOP</strong><span>Waiting room opens in 18 minutes</span></div></div>
      <div className="engagement-row"><Activity size={20} /><div><strong>Craving check-in</strong><span>Moderate trend, care team notified</span></div></div>
      <div className="engagement-row"><MessageCircle size={20} /><div><strong>Secure message</strong><span>New worksheet feedback available</span></div></div>
      <div className="progress-block"><span>Weekly engagement</span><strong>82%</strong><div><i style={{ width: '82%' }} /></div></div>
    </div>
  );
}

function ProgramsPage({ navigate }) {
  return (
    <>
      <PageHero kicker="Program pages" title="Choose the right level of care without guessing." text="Each program page explains structure, intensity, fit, support tools, and what the patient or family should expect next." actions={<button className="primary-button" onClick={() => navigate('support')}>Start intake <ArrowRight size={18} /></button>} />
      <section className="program-page-grid">
        {programs.map((program) => <article className="program-detail" key={program.code}><span>{program.code}</span><h2>{program.title}</h2><b>{program.intensity}</b><p>{program.fit}</p><p>{program.detail}</p><button onClick={() => navigate('support')}>Discuss this option <ArrowRight size={16} /></button></article>)}
      </section>
    </>
  );
}

function TelehealthPage({ navigate }) {
  return (
    <>
      <PageHero kicker="Telehealth" title="A session experience designed for phones, groups, and real-world bandwidth." text="Patients get a readiness check and waiting room. Clinicians get roster, attendance, notes, risk context, and reconnection markers." actions={<button className="primary-button" onClick={() => navigate('login')}>Open demo console <ArrowRight size={18} /></button>} />
      <section className="console-layout">
        <div className="console-panel expanded"><div className="console-header"><Video size={18} /> Virtual IOP session <span>18:00 EAT</span></div><div className="readiness-grid"><div><Mic size={18} /><strong>Mic</strong><span>Ready</span></div><div><Video size={18} /><strong>Camera</strong><span>Ready</span></div><div><Wifi size={18} /><strong>Connection</strong><span>Limited but stable</span></div><div><Users size={18} /><strong>Roster</strong><span>7 expected</span></div></div><div className="waiting-room"><strong>Waiting room</strong><p>3 participants waiting. 1 participant needs a reconnect prompt.</p><button>Admit selected</button></div></div>
        <div className="support-stack"><InfoTile title="Before session" text="Battery, privacy, data bundle, browser readiness, headset, and emergency disclaimer." /><InfoTile title="During session" text="Attendance, late entry, technical issue, left early, and care-team follow-up markers." /><InfoTile title="After session" text="Progress notes, group notes, assignments, receipts, and next-session reminders." /></div>
      </section>
    </>
  );
}

function ResourcesPage({ navigate }) {
  return (
    <>
      <PageHero kicker="Recovery resources" title="Practical content keeps the portal useful between appointments." text="Patients and families need tools they can use on hard days, not only explanations of the service." actions={<button className="primary-button" onClick={() => navigate('login')}>Try patient dashboard <ArrowRight size={18} /></button>} />
      <section className="resource-grid">{resourceLibrary.map(([title, text]) => <article key={title} className="resource-card"><BookOpen size={22} /><h3>{title}</h3><p>{text}</p><button>Save resource</button></article>)}</section>
    </>
  );
}

function SupportPage({ navigate }) {
  return (
    <>
      <PageHero kicker="Support and intake" title="Make asking for help feel clear, private, and immediate." text="This support page captures the next steps for patients, families, working adults, and people leaving higher levels of care." actions={<button className="primary-button" onClick={() => navigate('login')}>Continue to portal <ArrowRight size={18} /></button>} />
      <section className="intake-page"><div><h2>Confidential request</h2><p>This static prototype shows the fields needed for routing. A production build should connect this to a secure backend, consent ledger, and staff queue.</p></div><form onSubmit={(event) => event.preventDefault()}><label>Full name<input placeholder="Your name" /></label><label>Mobile number<input placeholder="+2547XXXXXXXX" /></label><label>Program interest<select defaultValue=""><option value="" disabled>Select option</option><option>PHP / Day Treatment</option><option>IOP</option><option>Outpatient</option><option>Virtual IOP</option><option>Family support</option></select></label><label>What would help today?<textarea placeholder="Share only what you are comfortable sharing." /></label><button className="primary-button">Submit request <ArrowRight size={18} /></button></form></section>
    </>
  );
}

function LoginPage({ login, session, navigate }) {
  const [selected, setSelected] = useState(demoAccounts[0]);
  const [email, setEmail] = useState(demoAccounts[0].email);
  const [password, setPassword] = useState(demoAccounts[0].password);
  const [error, setError] = useState('');

  const chooseAccount = (account) => { setSelected(account); setEmail(account.email); setPassword(account.password); setError(''); };
  const submit = (event) => {
    event.preventDefault();
    const account = demoAccounts.find((item) => item.email === email.trim() && item.password === password);
    if (!account) { setError('Use one of the demo credentials shown on this page.'); return; }
    login(account);
  };

  if (session) return <PortalPage session={session} navigate={navigate} logout={() => { localStorage.removeItem('harborlight-session'); window.location.reload(); }} />;

  return (
    <section className="login-page">
      <div className="login-copy"><p className="section-kicker">Demo access</p><h1>Sign in as a patient, clinician, or administrator.</h1><p>These are prototype credentials for exploring role-based workflows. They are stored only in the browser for demo navigation.</p><div className="credential-list">{demoAccounts.map((account) => <button key={account.role} className={selected.role === account.role ? 'active' : ''} onClick={() => chooseAccount(account)}><strong>{account.label}</strong><span>{account.email}</span><small>{account.password}</small></button>)}</div></div>
      <form className="login-form" onSubmit={submit}><Lock size={24} /><h2>Portal sign in</h2><label>Email<input value={email} onChange={(event) => setEmail(event.target.value)} /></label><label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>{error && <p className="form-error">{error}</p>}<button className="primary-button" type="submit">Sign in <ArrowRight size={18} /></button></form>
    </section>
  );
}

function PortalPage({ session, navigate, logout }) {
  const [mode, setMode] = useState('overview');
  if (!session) return <LoginPage login={(account) => { localStorage.setItem('harborlight-session', JSON.stringify(account)); window.location.hash = '/portal'; window.location.reload(); }} navigate={navigate} />;

  const cards = session.role === 'patient' ? patientCards : session.role === 'clinician' ? clinicianCards : adminCards;
  return (
    <section className="dashboard-page">
      <aside className="dashboard-sidebar"><div className="brand"><span className="brand-mark"><HeartHandshake size={18} /></span><span>Portal</span></div><div className="user-chip"><strong>{session.name}</strong><span>{session.label} workspace</span></div><button className={mode === 'overview' ? 'active' : ''} onClick={() => setMode('overview')}><LayoutDashboard size={18} /> Overview</button><button className={mode === 'tasks' ? 'active' : ''} onClick={() => setMode('tasks')}><ClipboardCheck size={18} /> Tasks</button><button className={mode === 'messages' ? 'active' : ''} onClick={() => setMode('messages')}><MessageCircle size={18} /> Messages</button><button className={mode === 'payments' ? 'active' : ''} onClick={() => setMode('payments')}><WalletCards size={18} /> Payments</button><button onClick={logout}><LogOut size={18} /> Sign out</button></aside>
      <div className="dashboard-main"><div className="dashboard-heading"><div><p className="section-kicker">{session.label} dashboard</p><h1>{dashboardTitle(session.role)}</h1></div><button className="secondary-button" onClick={() => navigate('home')}>Public site</button></div>{mode === 'overview' && <DashboardCards cards={cards} role={session.role} />}{mode === 'tasks' && <TasksPanel role={session.role} />}{mode === 'messages' && <MessagesPanel />}{mode === 'payments' && <PaymentsPanel />}</div>
    </section>
  );
}

function dashboardTitle(role) {
  if (role === 'patient') return 'Your care plan, sessions, and recovery tools.';
  if (role === 'clinician') return 'Clinical visibility without hunting through tabs.';
  return 'Operations, consent, scheduling, and payment oversight.';
}

function DashboardCards({ cards, role }) {
  return <><div className="dashboard-grid">{cards.map(([title, text, action, Icon]) => <article className="dashboard-card" key={title}><Icon size={24} /><h3>{title}</h3><p>{text}</p><button>{action}</button></article>)}</div><div className="insight-panel"><h2>{role === 'patient' ? "Today's recovery focus" : 'Outcome signals'}</h2><div className="insight-grid"><InfoTile title="Engagement" text="Session attendance, check-ins, tasks, and message response help care teams intervene earlier." /><InfoTile title="Safety" text="Visible disclaimers, consent-aware messaging, risk flags, and follow-up queues reduce blind spots." /><InfoTile title="Momentum" text="Goals, worksheets, receipts, reminders, and next steps make the portal worth returning to." /></div></div></>;
}

function TasksPanel({ role }) {
  const tasks = role === 'patient' ? ['Complete daily check-in', 'Review relapse prevention worksheet', 'Confirm next session reminder', 'Save emergency contact'] : ['Review elevated craving flags', 'Sign pending notes', 'Assign follow-up for missed session', 'Confirm attendance for group roster'];
  return <div className="task-list">{tasks.map((task, index) => <label key={task}><input type="checkbox" defaultChecked={index === 2} /><span>{task}</span></label>)}</div>;
}

function MessagesPanel() {
  return <div className="message-panel"><InfoTile title="Secure portal alert" text="Your care team has shared an update. Sign in to review it privately." /><InfoTile title="WhatsApp reminder" text="Non-sensitive reminder: you have an upcoming appointment. Open the portal for details." /><InfoTile title="SMS fallback" text="Short message for low bandwidth situations with no clinical details exposed." /></div>;
}

function PaymentsPanel() {
  return <div className="payment-table dashboard-payments">{[['Virtual IOP week 1', 'KES 12,500', 'Receipt issued', 'Paid'], ['Deposit request', 'KES 2,000', 'STK Push prepared', 'Pending'], ['Family session', 'KES 3,500', 'Admin review', 'Review']].map(([name, amount, detail, status]) => <div className="payment-row" key={name}><ReceiptText size={18} /><div><strong>{name}</strong><span>{detail}</span></div><b>{amount}</b><em>{status}</em></div>)}</div>;
}

function InfoTile({ title, text }) {
  return <article className="info-tile"><h3>{title}</h3><p>{text}</p></article>;
}

createRoot(document.getElementById('root')).render(<App />);
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch((error) => {
      console.warn('Service worker registration failed:', error);
    });
  });
}

