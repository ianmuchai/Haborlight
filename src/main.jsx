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
  { slug: 'program-php', code: 'PHP', title: 'PHP / Day Treatment', intensity: '25-30 hrs weekly', fit: 'High structure, step-down support, relapse risk monitoring.', detail: 'Daily treatment schedule, attendance capture, family coordination, and transition planning.', outcomes: ['Daily attendance and care-team review', 'Family or sponsor coordination when consent is given', 'Step-down plan into IOP or OP care'] },
  { slug: 'program-iop', code: 'IOP', title: 'Intensive Outpatient', intensity: '3 hrs daily, 4 days', fit: 'Structured care while maintaining work, school, or family life.', detail: 'Group therapy, individual sessions, reminders, assignments, and recovery goals.', outcomes: ['Weekly goals and assignment tracking', 'Group attendance, notes, and risk review', 'Flexible scheduling around daily responsibilities'] },
  { slug: 'program-op', code: 'OP', title: 'Outpatient Program', intensity: 'Usually 90 min weekly', fit: 'Continued recovery support and longer-term accountability.', detail: 'Weekly check-ins, relapse prevention planning, resources, and aftercare support.', outcomes: ['Continuity after higher-intensity care', 'Relapse prevention and recovery maintenance', 'Medication and referral coordination'] },
  { slug: 'program-viop', code: 'VIOP', title: 'Virtual IOP', intensity: 'Mobile browser access', fit: 'Structured care from a private place.', detail: 'Private session links, group access, and practical connection support.', outcomes: ['Mobile-first session access', 'Connection fallback and attendance visibility', 'Group care with private follow-up'] }
];

const publicTools = [
  ['Confidential Intake', 'A private first step for sharing needs, contact preferences, and payment details.', ClipboardCheck, 'support', 'Start intake'],
  ['Care Matching', 'Clear guidance toward the level of care that fits the moment.', Target, 'programs', 'Compare programs'],
  ['Telehealth Access', 'Simple access to secure sessions, groups, and care-team follow-up.', Video, 'telehealth', 'Open telehealth'],
  ['Recovery Tools', 'Daily support for cravings, goals, reflection, and relapse prevention.', Activity, 'resource-craving-plan', 'Use tools'],
  ['Messaging', 'Discreet reminders that keep private details inside the portal.', MessageCircle, 'portal:messages', 'Open messages'],
  ['Payments', 'Clear balances, receipts, and M-Pesa payment updates.', WalletCards, 'portal:payments', 'View payments']
];

const resourceLibrary = [
  { slug: 'resource-before-session', title: 'Before a session', text: 'Check battery, data bundle, privacy, headphones, and a calm location.', steps: ['Confirm your appointment time', 'Test audio and camera', 'Choose a private location', 'Keep water, notes, and emergency contacts nearby'] },
  { slug: 'resource-craving-plan', title: 'Craving plan', text: 'Name the trigger, delay 10 minutes, contact support, move location, use grounding.', steps: ['Name the trigger clearly', 'Move away from the source of risk', 'Contact a trusted support person', 'Open the portal check-in if cravings remain high'] },
  { slug: 'resource-family-guide', title: 'Family guide', text: 'Use non-blaming language, keep boundaries clear, support treatment attendance.', steps: ['Ask what support is welcome', 'Keep boundaries specific', 'Avoid debating during cravings', 'Encourage attendance and follow-up'] },
  { slug: 'resource-low-bandwidth', title: 'Low bandwidth tips', text: 'Close background apps, switch to audio if needed, reconnect from the portal.', steps: ['Close background apps', 'Move closer to signal or Wi-Fi', 'Switch to audio when video struggles', 'Reconnect through the portal link'] },
  { slug: 'resource-aftercare', title: 'Aftercare checklist', text: 'Appointments, medication support, peer groups, work plan, emergency contacts.', steps: ['Confirm the next appointment', 'Save medication and pharmacy notes', 'Choose a peer or family support contact', 'Keep emergency numbers easy to reach'] },
  { slug: 'resource-privacy', title: 'Privacy basics', text: 'Use personal devices where possible and avoid sharing sensitive information by SMS.', steps: ['Use a personal device when possible', 'Lock your phone after sessions', 'Keep sensitive notes inside the portal', 'Review consent before family access is added'] }
];

const patientCards = [
  ['Next session', 'Virtual IOP group at 18:00 EAT', 'Join waiting room', Video, 'session'],
  ['Daily check-in', 'Mood, cravings, sleep, stress, and safety prompt', 'Complete check-in', Activity, 'checkin'],
  ['Recovery plan', '3 active goals, 2 worksheets, relapse plan draft', 'Review tasks', Target, 'tasks'],
  ['Payments', 'KES 4,500 balance, receipt history available', 'View payments', CreditCard, 'payments']
];

const clinicianCards = [
  ['Waiting room', '3 ready, 1 reconnecting, 7 expected', 'Admit patients', Users, 'session'],
  ['Risk flags', '2 elevated cravings, 1 missed check-in', 'Review context', Activity, 'risk'],
  ['Documentation', '2 progress notes and 1 group note pending', 'Open notes', FileText, 'notes'],
  ['Follow-up queue', 'No-shows, referrals, family consent, care tasks', 'Assign tasks', Bell, 'tasks']
];

const adminCards = [
  ['Intake queue', '8 new requests, 3 priority callbacks', 'Assign follow-up', ClipboardCheck, 'intake'],
  ['Program scheduling', 'PHP, IOP, OP, Virtual IOP capacity', 'Manage calendar', CalendarClock, 'schedule'],
  ['Payment review', '6 receipts, 2 reconciliation checks', 'Open queue', ReceiptText, 'payments'],
  ['Audit and consent', 'Messaging, family access, payment permissions', 'Review logs', ShieldCheck, 'audit']
];

const onboardedPatients = [
  { name: 'Amina Wanjiku', id: 'PT-1042', program: 'Virtual IOP', status: 'Active', risk: 'Moderate', lastContact: 'Today, 09:20', nextSession: '18:00 EAT', documents: ['Intake assessment', 'Consent form', 'Recovery plan', 'Medication note'], summary: 'Attending evening group, cravings improving, family consent active.' },
  { name: 'Brian Otieno', id: 'PT-1078', program: 'IOP', status: 'Needs follow-up', risk: 'Elevated', lastContact: 'Yesterday, 17:45', nextSession: 'Tomorrow, 10:00', documents: ['Progress note', 'Risk review', 'Attendance record', 'Referral letter'], summary: 'Missed one check-in and needs a brief phone follow-up before group.' },
  { name: 'Grace Njeri', id: 'PT-1091', program: 'OP', status: 'Stable', risk: 'Low', lastContact: 'Aug 20, 14:10', nextSession: 'Aug 24, 15:30', documents: ['Aftercare plan', 'Family session note', 'Payment receipt', 'Discharge checklist'], summary: 'Maintaining weekly outpatient support and aftercare milestones.' }
];

const roleStartModes = { patient: 'overview', clinician: 'session', admin: 'intake' };

const pageIds = [
  ...routes.map((route) => route.id),
  'portal',
  'intake-sent',
  ...programs.map((program) => program.slug),
  ...resourceLibrary.map((resource) => resource.slug)
];

function getInitialPage() {
  const page = window.location.hash.replace('#/', '') || 'home';
  return pageIds.includes(page) ? page : 'home';
}

function parentRouteFor(page) {
  if (page.startsWith('program-')) return 'programs';
  if (page.startsWith('resource-')) return 'resources';
  if (page === 'portal') return 'login';
  if (page === 'intake-sent') return 'support';
  return page;
}

function App() {
  const [page, setPage] = useState(getInitialPage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState(() => JSON.parse(localStorage.getItem('harborlight-session') || 'null'));
  const [portalMode, setPortalMode] = useState('overview');

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

  const openPortalMode = (mode) => {
    setPortalMode(mode);
    navigate(session ? 'portal' : 'login');
  };

  const enterRole = (role) => {
    localStorage.setItem('harborlight-preferred-role', role);
    setPortalMode(roleStartModes[role] || 'overview');
    if (session?.role === role) {
      navigate('portal');
      return;
    }
    localStorage.removeItem('harborlight-session');
    setSession(null);
    navigate('login');
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

  const activeRoute = parentRouteFor(page);

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
        {page === 'home' && <HomePage navigate={navigate} session={session} openPortalMode={openPortalMode} enterRole={enterRole} />}
        {page === 'programs' && <ProgramsPage navigate={navigate} />}
        {page.startsWith('program-') && <ProgramDetailPage program={programs.find((program) => program.slug === page)} navigate={navigate} />}
        {page === 'telehealth' && <TelehealthPage navigate={navigate} openPortalMode={openPortalMode} />}
        {page === 'resources' && <ResourcesPage navigate={navigate} />}
        {page.startsWith('resource-') && <ResourceDetailPage resource={resourceLibrary.find((resource) => resource.slug === page)} navigate={navigate} openPortalMode={openPortalMode} />}
        {page === 'support' && <SupportPage navigate={navigate} />}
        {page === 'login' && <LoginPage login={login} session={session} navigate={navigate} portalMode={portalMode} setPortalMode={setPortalMode} />}
        {page === 'portal' && <PortalPage session={session} navigate={navigate} logout={logout} mode={portalMode} setMode={setPortalMode} />}
        {page === 'intake-sent' && <IntakeSentPage navigate={navigate} />}
      </main>

      <footer className="site-footer">
        <div className="brand footer-brand"><span className="brand-mark"><HeartHandshake size={18} /></span><span>Harborlight</span></div>
        <p>Private opioid rehabilitation, telehealth support, and M-Pesa-ready care access.</p>
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

function PageHero({ kicker, title, text, actions, visual, className = '' }) {
  return (
    <section className={`page-hero ${className}`.trim()}>
      <div>
        {kicker && <p className="eyebrow"><span /> {kicker}</p>}
        <h1>{title}</h1>
        {text && <p className="hero-lede">{text}</p>}
        {actions && <div className="hero-actions">{actions}</div>}
      </div>
      {visual}
    </section>
  );
}

function HomePage({ navigate, session, openPortalMode, enterRole }) {
  return (
    <>
      <PageHero
        className="home-system-hero"
        kicker=""
        title="Sign in to access care, sessions, messages, recovery tools, schedules, consent, and payments."
        text=""
        actions={<><button className="primary-button portal-primary" onClick={() => navigate(session ? 'portal' : 'login')}>{session ? 'Open dashboard' : 'Enter main system'} <ArrowRight size={18} /></button><button className="secondary-button" onClick={() => navigate('support')}>Request support</button></>}
        visual={<EngagementPanel />}
      />
      <HomeLoginGateway enterRole={enterRole} session={session} />
      <section className="feature-band">
        {publicTools.map(([title, text, Icon, target, action]) => <article className="feature-card" key={title}><Icon size={24} /><h3>{title}</h3><p>{text}</p><button onClick={() => target.startsWith('portal:') ? openPortalMode(target.replace('portal:', '')) : navigate(target)}>{action} <ArrowRight size={16} /></button></article>)}
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


function HomeLoginGateway({ enterRole, session }) {
  const actionFor = (role, label) => session?.role === role ? `Open ${label}` : `Sign in as ${label}`;
  return (
    <section className="portal-gateway" aria-label="Main system access">
      <div>
        <p className="section-kicker">Main system access</p>
        <h2>Start inside the workspace that matches your role.</h2>
      </div>
      <div className="portal-gateway-grid">
        <article>
          <Users size={22} />
          <h3>Patient portal</h3>
          <p>Join sessions, complete check-ins, review recovery tasks, message the care team, and view payments.</p>
          <button onClick={() => enterRole('patient')}>{actionFor('patient', 'patient portal')} <ArrowRight size={16} /></button>
        </article>
        <article>
          <Stethoscope size={22} />
          <h3>Clinician workspace</h3>
          <p>Manage waiting rooms, risk reviews, notes, follow-up tasks, and private patient communication.</p>
          <button onClick={() => enterRole('clinician')}>{actionFor('clinician', 'clinician workspace')} <ArrowRight size={16} /></button>
        </article>
        <article>
          <ShieldCheck size={22} />
          <h3>Admin console</h3>
          <p>Review intake, scheduling, consent, receipts, and operational readiness across the care program.</p>
          <button onClick={() => enterRole('admin')}>{actionFor('admin', 'admin console')} <ArrowRight size={16} /></button>
        </article>
      </div>
    </section>
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
      <PageHero className="programs-hero-copy" kicker="Program pages" title="Find the level of care that fits today." text="Compare care options, schedules, and next steps in plain language." actions={<button className="primary-button" onClick={() => navigate('support')}>Start intake <ArrowRight size={18} /></button>} />
      <section className="program-page-grid">
        {programs.map((program) => <article className="program-detail" key={program.code}><span>{program.code}</span><h2>{program.title}</h2><b>{program.intensity}</b><p>{program.fit}</p><p>{program.detail}</p><button onClick={() => navigate(program.slug)}>View program <ArrowRight size={16} /></button></article>)}
      </section>
    </>
  );
}

function TelehealthPage({ navigate, openPortalMode }) {
  return (
    <>
      <PageHero kicker="Telehealth" title="Join care from wherever privacy is possible." text="Secure video sessions, group access, and practical support when the connection is not perfect." actions={<button className="primary-button" onClick={() => navigate('login')}>Patient account login <ArrowRight size={18} /></button>} />
      <section className="console-layout">
        <div className="console-panel expanded"><div className="console-header"><Video size={18} /> Virtual IOP session <span>18:00 EAT</span></div><div className="readiness-grid"><div><Mic size={18} /><strong>Mic</strong><span>Ready</span></div><div><Video size={18} /><strong>Camera</strong><span>Ready</span></div><div><Wifi size={18} /><strong>Connection</strong><span>Limited but stable</span></div><div><Users size={18} /><strong>Roster</strong><span>7 expected</span></div></div><div className="waiting-room"><strong>Waiting room</strong><p>Three participants are ready to join. One person may need connection support.</p><button onClick={() => openPortalMode('session')}>Admit selected</button></div></div>
        <div className="support-stack"><InfoTile title="Before session" text="Prepare your space, device, connection, and privacy before the call." /><InfoTile title="During session" text="Keep the session organized even when someone joins late or reconnects." /><InfoTile title="After session" text="Leave with notes, next steps, and reminders for continued care." /></div>
      </section>
    </>
  );
}

function ResourcesPage({ navigate }) {
  return (
    <>
      <PageHero kicker="Recovery resources" title="Support that still helps between appointments." text="Short guides for cravings, family support, privacy, low bandwidth, and aftercare." actions={<button className="primary-button" onClick={() => navigate('login')}>Patient account login <ArrowRight size={18} /></button>} />
      <section className="resource-grid">{resourceLibrary.map((resource) => <article key={resource.slug} className="resource-card"><BookOpen size={22} /><h3>{resource.title}</h3><p>{resource.text}</p><button onClick={() => navigate(resource.slug)}>Open guide</button></article>)}</section>
    </>
  );
}


function ProgramDetailPage({ program, navigate }) {
  if (!program) return <ProgramsPage navigate={navigate} />;
  return (
    <>
      <PageHero
        kicker={program.code}
        title={program.title}
        text={`${program.fit} ${program.detail}`}
        actions={<><button className="primary-button" onClick={() => navigate('support')}>Start intake <ArrowRight size={18} /></button><button className="secondary-button" onClick={() => navigate('programs')}>All programs</button></>}
      />
      <section className="detail-grid">
        <InfoTile title="Care intensity" text={program.intensity} />
        <InfoTile title="Best fit" text={program.fit} />
        <InfoTile title="Next step" text="A coordinator can confirm eligibility, schedule, consent, and payment preferences before care begins." />
      </section>
      <section className="pathway-section">
        <div><p className="section-kicker">Care pathway</p><h2>What this program supports</h2></div>
        <div className="pathway-list">{program.outcomes.map((item) => <div key={item}><Check size={18} /><span>{item}</span></div>)}</div>
      </section>
    </>
  );
}

function ResourceDetailPage({ resource, navigate, openPortalMode }) {
  if (!resource) return <ResourcesPage navigate={navigate} />;
  return (
    <>
      <PageHero
        kicker="Recovery guide"
        title={resource.title}
        text={resource.text}
        actions={<><button className="primary-button" onClick={() => openPortalMode('checkin')}>Open check-in <ArrowRight size={18} /></button><button className="secondary-button" onClick={() => navigate('resources')}>All resources</button></>}
      />
      <section className="pathway-section light">
        <div><p className="section-kicker">Practical steps</p><h2>Use this when support needs to be simple.</h2></div>
        <div className="pathway-list">{resource.steps.map((step) => <div key={step}><Check size={18} /><span>{step}</span></div>)}</div>
      </section>
      <section className="detail-grid">
        <InfoTile title="Save privately" text="Signed-in patients can keep this guide inside their recovery tools." />
        <InfoTile title="Share with care team" text="Clinicians can use the guide during session planning and follow-up." />
        <InfoTile title="Low pressure" text="The guidance stays short enough to use during stressful moments." />
      </section>
    </>
  );
}
function SupportPage({ navigate }) {
  return (
    <>
      <PageHero kicker="Support and intake" title="Ask for help with privacy and clarity." text="Share what is happening and choose how you would like to be contacted." actions={<button className="primary-button" onClick={() => navigate('login')}>Continue to portal <ArrowRight size={18} /></button>} />
      <section className="intake-page"><div><h2>Confidential request</h2><p>Share a few details so a care coordinator can understand your needs, contact preferences, and the level of support that may fit best.</p></div><form onSubmit={(event) => { event.preventDefault(); navigate('intake-sent'); }}><label>Full name<input placeholder="Your name" /></label><label>Mobile number<input placeholder="+2547XXXXXXXX" /></label><label>Program interest<select defaultValue=""><option value="" disabled>Select option</option><option>PHP / Day Treatment</option><option>IOP</option><option>Outpatient</option><option>Virtual IOP</option><option>Family support</option></select></label><label>What would help today?<textarea placeholder="Share only what you are comfortable sharing." /></label><button className="primary-button">Submit request <ArrowRight size={18} /></button></form></section>
    </>
  );
}

function IntakeSentPage({ navigate }) {
  return (
    <>
      <PageHero
        kicker="Request submitted"
        title="Your confidential request has been received."
        text="Your request is ready for coordinator review, privacy-aware follow-up, and the next step into care."
        actions={<><button className="primary-button" onClick={() => navigate('login')}>Patient account login <ArrowRight size={18} /></button><button className="secondary-button" onClick={() => navigate('support')}>Submit another request</button></>}
      />
      <section className="detail-grid">
        <InfoTile title="Coordinator review" text="The request is ready for triage by program fit, urgency, location, consent, and contact preference." />
        <InfoTile title="Privacy-aware follow-up" text="Follow-up messages stay discreet and direct you back to the portal." />
        <InfoTile title="Next step" text="You can sign in to an account, wait for a callback, or review program options." />
      </section>
    </>
  );
}

function LoginPage({ login, session, navigate, portalMode, setPortalMode }) {
  const preferredAccount = demoAccounts.find((account) => account.role === localStorage.getItem('harborlight-preferred-role')) || demoAccounts[0];
  const [selected, setSelected] = useState(preferredAccount);
  const [email, setEmail] = useState(preferredAccount.email);
  const [password, setPassword] = useState(preferredAccount.password);
  const [error, setError] = useState('');

  const chooseAccount = (account) => { setSelected(account); setEmail(account.email); setPassword(account.password); setError(''); };
  const submit = (event) => {
    event.preventDefault();
    const account = demoAccounts.find((item) => item.email === email.trim() && item.password === password);
    if (!account) { setError('Choose one of the account credentials listed here.'); return; }
    login(account);
  };

  if (session) return <PortalPage session={session} navigate={navigate} logout={() => { localStorage.removeItem('harborlight-session'); window.location.reload(); }} mode={portalMode || 'overview'} setMode={setPortalMode || (() => {})} />;

  return (
    <section className="login-page">
      <div className="login-copy"><p className="section-kicker">Account login</p><h1>Sign in as a patient, clinician, or administrator.</h1><p>Choose the account type that matches the workspace you want to access.</p><div className="credential-list">{demoAccounts.map((account) => <button key={account.role} className={selected.role === account.role ? 'active' : ''} onClick={() => chooseAccount(account)}><strong>{account.label}</strong><span>{account.email}</span><small>{account.password}</small></button>)}</div></div>
      <form className="login-form" onSubmit={submit}><Lock size={24} /><h2>Portal sign in</h2><label>Email<input value={email} onChange={(event) => setEmail(event.target.value)} /></label><label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>{error && <p className="form-error">{error}</p>}<button className="primary-button" type="submit">Sign in <ArrowRight size={18} /></button></form>
    </section>
  );
}

function PortalPage({ session, navigate, logout, mode, setMode }) {
  if (!session) return <LoginPage login={(account) => { localStorage.setItem('harborlight-session', JSON.stringify(account)); window.location.hash = '/portal'; window.location.reload(); }} navigate={navigate} />;

  const cards = session.role === 'patient' ? patientCards : session.role === 'clinician' ? clinicianCards : adminCards;
  const tabs = portalTabsFor(session.role);
  return (
    <section className="dashboard-page">
      <aside className="dashboard-sidebar">
        <div className="brand"><span className="brand-mark"><HeartHandshake size={18} /></span><span>Portal</span></div>
        <div className="user-chip"><strong>{session.name}</strong><span>{session.label} workspace</span></div>
        {tabs.map(([id, label, Icon]) => <button key={id} className={mode === id ? 'active' : ''} onClick={() => setMode(id)}><Icon size={18} /> {label}</button>)}
        <button onClick={logout}><LogOut size={18} /> Sign out</button>
      </aside>
      <div className="dashboard-main">
        <div className="dashboard-heading"><div><p className="section-kicker">{session.label} dashboard</p><h1>{dashboardTitle(session.role)}</h1></div><button className="secondary-button" onClick={() => navigate('home')}>Public site</button></div>
        {mode === 'overview' && <DashboardCards cards={cards} role={session.role} setMode={setMode} />}
        {mode === 'session' && <SessionPanel role={session.role} setMode={setMode} />}
        {mode === 'patients' && <PatientRecordsPanel setMode={setMode} />}
        {mode === 'checkin' && <CheckInPanel />}
        {mode === 'tasks' && <TasksPanel role={session.role} />}
        {mode === 'risk' && <RiskPanel />}
        {mode === 'notes' && <NotesPanel />}
        {mode === 'messages' && <MessagesPanel />}
        {mode === 'payments' && <PaymentsPanel />}
        {mode === 'intake' && <IntakeQueuePanel />}
        {mode === 'schedule' && <SchedulePanel />}
        {mode === 'audit' && <AuditPanel />}
      </div>
    </section>
  );
}

function portalTabsFor(role) {
  if (role === 'patient') return [['overview', 'Overview', LayoutDashboard], ['session', 'Session', Video], ['checkin', 'Check-in', Activity], ['tasks', 'Care plan', Target], ['messages', 'Messages', MessageCircle], ['payments', 'Payments', WalletCards]];
  if (role === 'clinician') return [['overview', 'Overview', LayoutDashboard], ['patients', 'Patients', FileText], ['session', 'Waiting room', Users], ['risk', 'Risk review', Activity], ['notes', 'Notes', FileText], ['tasks', 'Follow-up', ClipboardCheck], ['messages', 'Messages', MessageCircle]];
  return [['overview', 'Overview', LayoutDashboard], ['intake', 'Intake', ClipboardCheck], ['schedule', 'Schedule', CalendarClock], ['payments', 'Payments', WalletCards], ['audit', 'Audit', ShieldCheck], ['messages', 'Messages', MessageCircle]];
}

function dashboardTitle(role) {
  if (role === 'patient') return 'Your care plan, sessions, and recovery tools.';
  if (role === 'clinician') return 'Clinical work organized around the next decision.';
  return 'Care operations with clear schedules, consent, and payments.';
}

function DashboardCards({ cards, role, setMode }) {
  return <><div className="dashboard-grid">{cards.map(([title, text, action, Icon, target]) => <article className="dashboard-card" key={title}><Icon size={24} /><h3>{title}</h3><p>{text}</p><button onClick={() => setMode(target)}>{action}</button></article>)}</div><RoleOverview role={role} setMode={setMode} /></>;
}

function RoleOverview({ role, setMode }) {
  if (role === 'patient') {
    return <section className="role-overview"><div><p className="section-kicker">Today</p><h2>Recovery plan at a glance</h2></div><div className="metric-grid"><MetricCard label="Engagement" value="82%" text="Sessions, check-ins, and worksheet activity this week." /><MetricCard label="Craving trend" value="4/10" text="Moderate, improving after two support contacts." /><MetricCard label="Next step" value="18:00" text="Virtual IOP waiting room opens before group." /></div><div className="quick-actions"><button onClick={() => setMode('session')}><Video size={16} /> Join session</button><button onClick={() => setMode('checkin')}><Activity size={16} /> Daily check-in</button><button onClick={() => setMode('messages')}><MessageCircle size={16} /> Message care team</button></div></section>;
  }
  if (role === 'clinician') {
    return <section className="role-overview"><div><p className="section-kicker">Clinical priority</p><h2>Prepare the next care decision</h2></div><div className="metric-grid"><MetricCard label="Waiting room" value="3 ready" text="One participant is reconnecting before group starts." /><MetricCard label="Risk flags" value="2 open" text="Elevated cravings and one missed check-in need review." /><MetricCard label="Notes" value="3 due" text="Two progress notes and one group note remain pending." /></div><div className="quick-actions"><button onClick={() => setMode('session')}><Users size={16} /> Waiting room</button><button onClick={() => setMode('patients')}><FileText size={16} /> Patient records</button><button onClick={() => setMode('risk')}><Activity size={16} /> Risk review</button><button onClick={() => setMode('notes')}><FileText size={16} /> Notes</button></div></section>;
  }
  return <section className="role-overview"><div><p className="section-kicker">Operations</p><h2>Program readiness and revenue visibility</h2></div><div className="metric-grid"><MetricCard label="New intake" value="8" text="Three priority callbacks need assignment today." /><MetricCard label="Capacity" value="76%" text="PHP, IOP, OP, and Virtual IOP scheduling utilization." /><MetricCard label="Payments" value="KES 18k" text="Pending receipts and reconciliation items for review." /></div><div className="quick-actions"><button onClick={() => setMode('intake')}><ClipboardCheck size={16} /> Intake queue</button><button onClick={() => setMode('schedule')}><CalendarClock size={16} /> Schedule</button><button onClick={() => setMode('payments')}><WalletCards size={16} /> Payments</button></div></section>;
}

function MetricCard({ label, value, text }) {
  return <article className="metric-card"><span>{label}</span><strong>{value}</strong><p>{text}</p></article>;
}

function PatientRecordsPanel({ setMode }) {
  const [selectedId, setSelectedId] = useState(onboardedPatients[0].id);
  const selected = onboardedPatients.find((patient) => patient.id === selectedId) || onboardedPatients[0];
  return (
    <section className="patient-records-panel">
      <div className="patient-roster compact-selector">
        <div className="panel-title"><p className="section-kicker">Onboarded patients</p><h2>Patient records and care files</h2></div>
        <label>Choose patient<select value={selectedId} onChange={(event) => setSelectedId(event.target.value)}>{onboardedPatients.map((patient) => <option key={patient.id} value={patient.id}>{patient.name} / {patient.program} / {patient.status}</option>)}</select></label>
        <div className="selected-patient-mini"><strong>{selected.name}</strong><span>{selected.id}</span><small>{selected.lastContact}</small></div>
        <button className="secondary-action" onClick={() => setShowNewPatient((current) => !current)}>{showNewPatient ? 'Close patient form' : 'Add new patient'}</button>
      </div>
      <div className="patient-file-workspace">
        {showNewPatient && <NewPatientForm />}
        <div className="patient-summary-card">
          <div><span>{selected.id}</span><h3>{selected.name}</h3><p>{selected.summary}</p></div>
          <div className="record-tags"><em>{selected.program}</em><em>{selected.status}</em><em>{selected.risk} risk</em></div>
        </div>
        <div className="record-detail-grid">
          <InfoTile title="Last contact" text={selected.lastContact} />
          <InfoTile title="Next session" text={selected.nextSession} />
          <InfoTile title="Consent" text="Family access and care-team permissions are active for review." />
        </div>
        <div className="document-editor-grid">
          {selected.documents.map((document) => <DocumentEditCard key={`${selected.id}-${document}`} document={document} patient={selected} />)}
        </div>
        <div className="form-panel enhanced-form patient-edit-form">
          <div><p className="section-kicker">Editable file note</p><h2>Care-team update</h2></div>
          <div className="form-grid"><label>Program<select defaultValue={selected.program}><option>PHP / Day Treatment</option><option>IOP</option><option>OP</option><option>Virtual IOP</option></select></label><label>Risk level<select defaultValue={selected.risk}><option>Low</option><option>Moderate</option><option>Elevated</option><option>High</option></select></label></div>
          <label>Clinical update<textarea defaultValue={`${selected.summary} Review attendance, cravings, medication notes, and next contact plan.`} /></label>
          <div className="quick-actions"><button onClick={() => setMode('notes')}><FileText size={16} /> Open full note</button><button onClick={() => setMode('messages')}><MessageCircle size={16} /> Message patient</button><ActionButton label="Save file update" doneLabel="File update saved" icon={Check} /></div>
        </div>
      </div>
    </section>
  );
}


function NewPatientForm() {
  return (
    <div className="form-panel enhanced-form new-patient-form">
      <div><p className="section-kicker">New patient</p><h2>Add patient and initial records</h2></div>
      <div className="form-grid"><label>Full name<input placeholder="Patient full name" /></label><label>Phone number<input placeholder="+2547XXXXXXXX" /></label><label>Program<select defaultValue=""><option value="" disabled>Select program</option><option>PHP / Day Treatment</option><option>IOP</option><option>OP</option><option>Virtual IOP</option></select></label><label>Risk level<select defaultValue="Moderate"><option>Low</option><option>Moderate</option><option>Elevated</option><option>High</option></select></label><label>Consent status<select defaultValue="Pending"><option>Pending</option><option>Patient consent active</option><option>Family consent active</option><option>Restricted access</option></select></label><label>Next appointment<input type="datetime-local" /></label></div>
      <label>Initial clinical status<textarea placeholder="Current presentation, opioid use history, cravings, withdrawal concerns, medication notes, safety concerns, and immediate support plan." /></label>
      <label>Records to create<textarea placeholder="Intake assessment, consent form, recovery plan, medication note, referral letter, payment record, or other files needed." /></label>
      <div className="quick-actions"><ActionButton label="Create patient file" doneLabel="Patient file created" icon={FileText} /><ActionButton label="Save status note" doneLabel="Status note saved" icon={Check} /></div>
    </div>
  );
}
function DocumentEditCard({ document, patient }) {
  return (
    <article className="document-edit-card">
      <div className="document-edit-header"><FileText size={18} /><div><strong>{document}</strong><span>Updated in patient file</span></div></div>
      <div className="form-grid compact"><label>Status<select defaultValue="Updated"><option>Updated</option><option>Needs review</option><option>Pending signature</option><option>Archived</option></select></label><label>Owner<select defaultValue="Clinician"><option>Clinician</option><option>Care coordinator</option><option>Administrator</option></select></label></div>
      <label>File note<textarea defaultValue={`${document} for ${patient.name}: review, update, and save any clinical or administrative changes here.`} /></label>
      <div className="quick-actions"><ActionButton label="Save changes" doneLabel="Changes saved" icon={Check} /></div>
    </article>
  );
}
function SessionPanel({ role, setMode }) {
  if (role === 'admin') return <SchedulePanel />;
  const clinician = role === 'clinician';
  return <div className="work-panel split-panel"><div className="console-panel expanded"><div className="console-header"><Video size={18} /> {clinician ? 'Virtual IOP waiting room' : 'Upcoming Virtual IOP'} <span>18:00 EAT</span></div><div className="readiness-grid"><div><Mic size={18} /><strong>Mic</strong><span>Ready</span></div><div><Video size={18} /><strong>Camera</strong><span>Ready</span></div><div><Wifi size={18} /><strong>Connection</strong><span>Stable</span></div><div><Users size={18} /><strong>{clinician ? 'Roster' : 'Group'}</strong><span>{clinician ? '7 expected' : 'Starts soon'}</span></div></div><div className="waiting-room"><strong>{clinician ? 'Participant readiness' : 'Session readiness'}</strong><p>{clinician ? 'Admit ready participants, mark reconnections, and keep attendance tied to documentation.' : 'Join from a private location. Your care team will see your readiness check before group starts.'}</p><button onClick={() => setMode(clinician ? 'notes' : 'checkin')}>{clinician ? 'Admit and document' : 'Join waiting room'}</button></div></div><div className="support-stack"><InfoTile title={clinician ? 'Roster support' : 'Before joining'} text={clinician ? 'Sort ready, reconnecting, late, and absent participants before opening the session.' : 'Keep headphones nearby, close other apps, and stay in a private space.'} /><InfoTile title={clinician ? 'Session note' : 'Care reminder'} text={clinician ? 'Group notes and individual follow-ups can be opened after admission.' : 'Complete your check-in before the session so the team can support you better.'} /></div></div>;
}

function CheckInPanel() {
  return <div className="form-panel enhanced-form"><div><p className="section-kicker">Patient check-in</p><h2>Daily recovery check</h2></div><div className="form-grid"><label>Craving level<input type="range" min="0" max="10" defaultValue="4" /></label><label>Mood today<select defaultValue="steady"><option value="steady">Steady</option><option value="low">Low</option><option value="anxious">Anxious</option><option value="strong">Strong</option></select></label><label>Sleep quality<select defaultValue="fair"><option value="good">Good</option><option value="fair">Fair</option><option value="poor">Poor</option></select></label><label>Medication taken<select defaultValue="yes"><option value="yes">Yes</option><option value="no">No</option><option value="na">Not applicable</option></select></label></div><label>What changed today?<textarea placeholder="Sleep, triggers, wins, medication notes, or support needs." /></label><div className="quick-actions"><ActionButton label="Request support" doneLabel="Support requested" icon={ShieldCheck} /><ActionButton label="Save check-in" doneLabel="Check-in saved" icon={Check} /></div></div>;
}

function TasksPanel({ role }) {
  const tasks = role === 'patient' ? ['Complete daily check-in', 'Review relapse prevention worksheet', 'Confirm next session reminder', 'Save emergency contact'] : role === 'clinician' ? ['Review elevated craving flags', 'Sign pending notes', 'Assign follow-up for missed session', 'Confirm attendance for group roster'] : ['Assign priority callbacks', 'Confirm Virtual IOP capacity', 'Review pending M-Pesa receipts', 'Check consent and access logs'];
  return <div className="task-list detailed-list">{tasks.map((task, index) => <label key={task}><input type="checkbox" defaultChecked={index === 2} /><span>{task}</span><small>{index === 0 ? 'Priority' : index === 1 ? 'Today' : 'Open'}</small></label>)}</div>;
}

function RiskPanel() {
  return <div className="work-grid"><InfoTile title="Elevated craving" text="Two patients reported higher cravings and missed one worksheet." /><InfoTile title="Attendance change" text="One participant missed group and needs follow-up before the next session." /><InfoTile title="Protective factors" text="Family consent, sponsor contact, and medication adherence are visible for review." /><InfoTile title="Suggested action" text="Send a secure message, schedule a brief call, or assign a worksheet from follow-up tasks." /><InfoTile title="Clinical context" text="Recent sleep disruption and stress notes are visible before the next session." /><InfoTile title="Safety review" text="Escalation prompts help clinicians document what was reviewed and why." /></div>;
}

function NotesPanel() {
  return <div className="form-panel enhanced-form"><div><p className="section-kicker">Documentation</p><h2>Clinical note workspace</h2></div><div className="form-grid"><label>Note type<select defaultValue="progress"><option value="progress">Progress note</option><option value="group">Group note</option><option value="family">Family contact</option></select></label><label>Risk level<select defaultValue="moderate"><option value="low">Low</option><option value="moderate">Moderate</option><option value="high">High</option></select></label></div><label>Progress note<textarea defaultValue="Patient attended group, identified trigger pattern, and agreed to a follow-up check-in." /></label><label>Plan<textarea defaultValue="Review craving plan, confirm next session, and update recovery goals." /></label><div className="quick-actions"><ActionButton label="Save draft" doneLabel="Draft saved" icon={FileText} /><ActionButton label="Sign note" doneLabel="Note signed" icon={Check} /></div></div>;
}

function MessagesPanel() {
  return <div className="message-panel rich-messages"><InfoTile title="Secure portal alert" text="Your care team has shared an update. Sign in to review it privately." /><InfoTile title="WhatsApp reminder" text="Non-sensitive reminder: you have an upcoming appointment. Open the portal for details." /><InfoTile title="SMS fallback" text="Short message for low bandwidth situations with no clinical details exposed." /><InfoTile title="Care-team inbox" text="Messages can be routed by patient, clinician, administrator, or payment follow-up." /></div>;
}

function PaymentsPanel() {
  return <div className="payment-workspace"><div className="payment-table dashboard-payments">{[['Virtual IOP week 1', 'KES 12,500', 'Receipt issued', 'Paid'], ['Deposit request', 'KES 2,000', 'STK Push prepared', 'Pending'], ['Family session', 'KES 3,500', 'Admin review', 'Review']].map(([name, amount, detail, status]) => <div className="payment-row" key={name}><ReceiptText size={18} /><div><strong>{name}</strong><span>{detail}</span></div><b>{amount}</b><em>{status}</em></div>)}</div><div className="work-grid compact"><InfoTile title="M-Pesa readiness" text="STK Push and receipt states are visible for patient and admin review." /><InfoTile title="Receipts" text="Patients can see paid items while administrators review exceptions." /><InfoTile title="Reconciliation" text="Pending items stay visible until reviewed by operations." /></div></div>;
}

function IntakeQueuePanel() {
  return <div className="queue-board"><QueueColumn title="Priority" items={['Callback: opioid withdrawal support', 'Family consent request', 'Deposit question before admission']} /><QueueColumn title="Program fit" items={['PHP assessment', 'Virtual IOP request', 'Outpatient continuation']} /><QueueColumn title="Ready to schedule" items={['IOP evening group', 'Family support session', 'Medication referral']} /></div>;
}

function QueueColumn({ title, items }) {
  const [selected, setSelected] = useState('');
  return <article className="queue-column"><h3>{title}</h3>{items.map((item) => <button key={item} className={selected === item ? 'active' : ''} onClick={() => setSelected(item)}>{item}<ChevronRight size={15} /></button>)}{selected && <p className="queue-selection">Selected: {selected}</p>}</article>;
}

function SchedulePanel() {
  return <div className="schedule-board"><InfoTile title="PHP" text="Morning day-treatment capacity available this week." /><InfoTile title="IOP" text="Evening group has two available places." /><InfoTile title="Virtual IOP" text="Remote group has open capacity and active waiting-room support." /><div className="calendar-strip">{['Mon PHP', 'Tue IOP', 'Wed OP', 'Thu VIOP', 'Fri Family'].map((item) => <span key={item}>{item}</span>)}</div></div>;
}

function AuditPanel() {
  return <div className="work-grid"><InfoTile title="Consent" text="Family access and care-team permissions are ready for review." /><InfoTile title="Messaging" text="Sensitive details stay in the portal while reminders stay discreet." /><InfoTile title="Payments" text="Receipt and reconciliation activity is visible for administrative review." /><InfoTile title="Access history" text="Role changes, portal access, and note updates can be reviewed before escalation." /><InfoTile title="Privacy checks" text="Discreet messaging and consent boundaries remain visible to administrators." /><InfoTile title="Readiness" text="Operational checks help teams prepare for pitch and care delivery discussions." /></div>;
}
function ActionButton({ label, doneLabel, icon: Icon }) {
  const [done, setDone] = useState(false);
  return <button type="button" className={done ? 'confirmed' : ''} onClick={() => setDone(true)}>{Icon && <Icon size={16} />} {done ? doneLabel : label}</button>;
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



































