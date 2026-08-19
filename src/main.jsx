import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  CalendarClock,
  Check,
  ChevronDown,
  ClipboardCheck,
  CreditCard,
  HeartHandshake,
  LayoutDashboard,
  Menu,
  MessageCircle,
  Mic,
  Phone,
  ReceiptText,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  Users,
  Video,
  WalletCards,
  Wifi,
  X
} from 'lucide-react';
import './styles.css';

const programs = [
  {
    code: 'PHP',
    title: 'PHP / Day Treatment',
    intensity: '25-30 hrs / week',
    fit: 'High structure after detox, relapse risk, or a recent step-down.',
    support: ['Daily schedule template', 'Attendance tracking', 'Family coordination']
  },
  {
    code: 'IOP',
    title: 'Intensive Outpatient',
    intensity: '3 hrs / day, 4 days',
    fit: 'Structured care while keeping work, school, and family routines.',
    support: ['Group and individual sessions', 'Morning or evening options', 'Missed-session follow-up']
  },
  {
    code: 'OP',
    title: 'Outpatient Program',
    intensity: 'Often 90 min / week',
    fit: 'Continued recovery support, accountability, and care planning.',
    support: ['Weekly therapy', 'Recovery goals', 'Resource referrals']
  },
  {
    code: 'VIOP',
    title: 'Virtual IOP',
    intensity: 'Mobile browser access',
    fit: 'Remote support with a real program structure and live care team.',
    support: ['Waiting room', 'Readiness checks', 'Low-bandwidth guidance']
  }
];

const journey = [
  ['Reach out', 'Submit a private request with contact and consent preferences.'],
  ['Complete intake', 'Share program interest, location, device access, and care needs.'],
  ['Match to care', 'A coordinator routes you to PHP, IOP, OP, Virtual IOP, or family support.'],
  ['Begin sessions', 'Join telehealth or in-person sessions with reminders and readiness checks.'],
  ['Stay connected', 'Track goals, check-ins, payments, messages, and aftercare steps.']
];

const portalTabs = {
  patient: {
    label: 'Patient',
    title: 'Today in your recovery plan',
    items: [
      ['Next session', 'Virtual IOP group, 18:00 EAT', 'Join opens in 22 min'],
      ['Daily check-in', 'Mood steady, craving moderate', 'Safety prompt available'],
      ['Recovery tasks', 'CBT worksheet and relapse plan', '2 items due'],
      ['Payments', 'KES 4,500 outstanding', 'M-Pesa request pending']
    ]
  },
  therapist: {
    label: 'Therapist',
    title: 'Clinical session console',
    items: [
      ['Waiting room', '3 patients ready, 1 reconnecting', 'Admit controls'],
      ['Risk context', 'Elevated craving flag yesterday', 'Review before session'],
      ['Attendance', 'Present, late, no-show, technical issue', 'Capture in session'],
      ['Notes', 'Progress note draft queue', '2 notes pending']
    ]
  },
  admin: {
    label: 'Admin',
    title: 'Operations command center',
    items: [
      ['Intake queue', '8 new requests, 3 urgent callbacks', 'Assign follow-up'],
      ['Enrollment', 'Program, schedule, therapist, payer', 'Ready for review'],
      ['Messaging consent', 'SMS and WhatsApp preferences', 'Audit-ready'],
      ['Payment review', '6 receipts, 2 reconciliation checks', 'M-Pesa queue']
    ]
  }
};

const payments = [
  ['Deposit request', 'KES 2,000', 'STK Push prepared', 'Pending'],
  ['Virtual IOP week 1', 'KES 12,500', 'Receipt issued', 'Paid'],
  ['Family session', 'KES 3,500', 'Awaiting confirmation', 'Review']
];

const faqs = [
  ['Can someone join from a phone?', 'Yes. The experience is designed around smartphone browsers, with readiness checks for camera, microphone, browser, and connection quality.'],
  ['What will WhatsApp or SMS messages say?', 'Messages should stay minimal and non-sensitive, such as a reminder to sign in to the portal or contact the care team.'],
  ['Is M-Pesa part of the MVP?', 'Yes. The product foundation includes STK Push or Lipa na M-Pesa initiation, payment status, receipts, balances, and reconciliation review.'],
  ['Is this an emergency service?', 'No. The product must include clear emergency guidance and direct people to local urgent or emergency care when there is immediate danger.']
];

const counties = ['Nairobi', 'Mombasa', 'Kiambu', 'Nakuru', 'Kisumu', 'Uasin Gishu', 'Machakos', 'Other / not sure'];

function App() {
  const [intakeOpen, setIntakeOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [faqOpen, setFaqOpen] = useState(0);
  const [portalTab, setPortalTab] = useState('patient');

  const selectedPortal = portalTabs[portalTab];
  const openIntake = () => {
    setSubmitted(false);
    setIntakeOpen(true);
  };

  const nowLabel = useMemo(() => 'East Africa Time', []);

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Harborlight Recovery home">
          <span className="brand-mark"><HeartHandshake size={18} /></span>
          <span>Harborlight</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#programs">Programs</a>
          <a href="#telehealth">Telehealth</a>
          <a href="#portal">Portal</a>
          <a href="#payments">M-Pesa</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="header-actions">
          <button className="text-button" onClick={() => setPortalOpen(true)}>Portal sign in</button>
          <button className="header-cta" onClick={openIntake}>Get help <ArrowRight size={16} /></button>
          <button className="menu-button" aria-label="Open menu"><Menu size={22} /></button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy reveal">
            <p className="eyebrow"><span /> Kenya-ready opioid rehabilitation platform</p>
            <h1>Private treatment access from first call to recovery follow-up.</h1>
            <p className="hero-lede">A mobile-first care experience for opioid rehabilitation, outpatient treatment, telehealth sessions, WhatsApp/SMS reminders, and M-Pesa payment management.</p>
            <div className="hero-actions">
              <button className="primary-button" onClick={openIntake}>Start confidential intake <ArrowRight size={18} /></button>
              <button className="secondary-button" onClick={() => setPortalOpen(true)}>View portal preview</button>
            </div>
            <div className="trust-row">
              <span><ShieldCheck size={16} /> Consent-aware</span>
              <span><Smartphone size={16} /> Smartphone-first</span>
              <span><Wifi size={16} /> Low-bandwidth guidance</span>
            </div>
          </div>

          <div className="hero-product reveal delay-one" aria-label="Platform snapshot">
            <div className="phone-shell">
              <div className="phone-top"><span /> <strong>Patient Portal</strong> <Video size={16} /></div>
              <div className="session-card live">
                <small>Next session</small>
                <h3>Virtual IOP Group</h3>
                <p>Starts 18:00 EAT. Readiness check is available.</p>
                <button>Join waiting room</button>
              </div>
              <div className="mini-grid">
                <div><ClipboardCheck size={18} /><strong>Check-in</strong><span>Due today</span></div>
                <div><MessageCircle size={18} /><strong>Messages</strong><span>2 secure alerts</span></div>
              </div>
              <div className="payment-chip"><WalletCards size={17} /> KES 4,500 balance <span>Pay with M-Pesa</span></div>
            </div>
            <div className="care-card">
              <span className="pulse-dot" /> Care coordinator online
              <small>{nowLabel} / privacy-conscious outreach</small>
            </div>
          </div>
        </section>

        <section className="metrics-strip" aria-label="MVP pillars">
          <div><strong>6</strong><span>Role-based workspaces</span></div>
          <div><strong>4</strong><span>Care levels supported</span></div>
          <div><strong>3</strong><span>Communication channels</span></div>
          <div><strong>KES</strong><span>M-Pesa-ready billing</span></div>
        </section>

        <section className="program-section" id="programs">
          <div className="section-heading">
            <p className="section-kicker">Program model</p>
            <h2>Care levels that explain fit, intensity, and next steps.</h2>
            <p>The public site should reduce uncertainty for patients, families, and working adults before they ever open the intake form.</p>
          </div>
          <div className="program-grid">
            {programs.map((program) => (
              <article className="program-card" key={program.code}>
                <div className="program-code">{program.code}</div>
                <h3>{program.title}</h3>
                <p className="intensity">{program.intensity}</p>
                <p>{program.fit}</p>
                <ul>
                  {program.support.map((item) => <li key={item}><Check size={14} /> {item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="journey-section" id="care">
          <div className="section-heading compact">
            <p className="section-kicker">How it works</p>
            <h2>A calm path from request to enrollment.</h2>
          </div>
          <div className="journey-list">
            {journey.map(([title, detail], index) => (
              <div className="journey-item" key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{title}</strong>
                <p>{detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="telehealth-section" id="telehealth">
          <div className="telehealth-copy">
            <p className="section-kicker">Telehealth MVP</p>
            <h2>Waiting room, readiness check, group access, and session documentation.</h2>
            <p>Telehealth is treated as a core MVP capability, with patient and therapist surfaces that support mobile access, attendance, low-bandwidth moments, and clinical follow-up.</p>
          </div>
          <div className="console-panel">
            <div className="console-header"><Video size={18} /> Live session console <span>18:00 EAT</span></div>
            <div className="readiness-grid">
              <div><Mic size={18} /><strong>Microphone</strong><span>Ready</span></div>
              <div><Video size={18} /><strong>Camera</strong><span>Ready</span></div>
              <div><Wifi size={18} /><strong>Connection</strong><span>Limited, stable</span></div>
              <div><Users size={18} /><strong>Roster</strong><span>7 expected</span></div>
            </div>
            <div className="waiting-room">
              <strong>Waiting room</strong>
              <p>3 participants waiting. 1 participant needs reconnection guidance.</p>
              <button>Admit selected</button>
            </div>
          </div>
        </section>

        <section className="portal-section" id="portal">
          <div className="section-heading">
            <p className="section-kicker">Signed-in experience</p>
            <h2>Role-based workspaces for care, operations, and accountability.</h2>
            <p>Preview tabs show the platform behavior planned for patients, therapists, recovery specialists, facilitators, and administrators.</p>
          </div>
          <div className="portal-tabs" role="tablist" aria-label="Portal preview tabs">
            {Object.entries(portalTabs).map(([key, tab]) => (
              <button className={portalTab === key ? 'active' : ''} key={key} onClick={() => setPortalTab(key)} role="tab" aria-selected={portalTab === key}>{tab.label}</button>
            ))}
          </div>
          <div className="portal-preview">
            <aside>
              <LayoutDashboard size={20} />
              <h3>{selectedPortal.title}</h3>
              <p>Private portal state, shown as a front-end preview until backend services are connected.</p>
            </aside>
            <div className="portal-list">
              {selectedPortal.items.map(([title, detail, action]) => (
                <div className="portal-row" key={title}>
                  <div><strong>{title}</strong><span>{detail}</span></div>
                  <button>{action}</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="payments-section" id="payments">
          <div>
            <p className="section-kicker">M-Pesa management</p>
            <h2>Payment status without exposing sensitive clinical details.</h2>
            <p>Patients can see balances and receipts in the portal. External reminders should use careful, minimal wording and route people back to secure views.</p>
          </div>
          <div className="payment-table" aria-label="Payment status preview">
            {payments.map(([name, amount, detail, status]) => (
              <div className="payment-row" key={name}>
                <ReceiptText size={18} />
                <div><strong>{name}</strong><span>{detail}</span></div>
                <b>{amount}</b>
                <em>{status}</em>
              </div>
            ))}
          </div>
        </section>

        <section className="communication-section">
          <div className="comm-card"><Phone size={22} /><strong>SMS</strong><span>Short fallback reminders and check-in prompts.</span></div>
          <div className="comm-card accent"><MessageCircle size={22} /><strong>WhatsApp</strong><span>Consent-based reminders with secure portal links.</span></div>
          <div className="comm-card"><CreditCard size={22} /><strong>M-Pesa</strong><span>STK Push, receipts, balances, and reconciliation queue.</span></div>
        </section>

        <section className="faq-section" id="faq">
          <p className="section-kicker">Frequently asked</p>
          <h2>Questions the MVP should answer early.</h2>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <div className={`faq-item ${faqOpen === index ? 'open' : ''}`} key={question}>
                <button onClick={() => setFaqOpen(faqOpen === index ? -1 : index)}><span>{question}</span><ChevronDown size={19} /></button>
                {faqOpen === index && <p>{answer}</p>}
              </div>
            ))}
          </div>
        </section>

        <section className="closing-section">
          <div>
            <p className="section-kicker">Next step</p>
            <h2>Start with a confidential request.</h2>
            <p>This front-end now represents the MVP direction: public education, richer intake, telehealth, portal workspaces, messaging consent, and M-Pesa readiness.</p>
          </div>
          <button className="primary-button light-button" onClick={openIntake}>Open intake <ArrowRight size={18} /></button>
        </section>
      </main>

      <footer className="site-footer">
        <div className="brand footer-brand"><span className="brand-mark"><HeartHandshake size={18} /></span><span>Harborlight</span></div>
        <p>Mobile-first opioid rehabilitation and outpatient treatment platform.</p>
        <span>Kenya / EAT</span>
      </footer>

      {intakeOpen && (
        <div className="modal-backdrop" role="presentation">
          <div className="modal intake-modal" role="dialog" aria-modal="true" aria-labelledby="intake-title">
            <button className="modal-close" onClick={() => setIntakeOpen(false)} aria-label="Close intake form"><X size={20} /></button>
            {submitted ? (
              <div className="success-state">
                <span className="success-icon"><Check size={26} /></span>
                <p className="section-kicker">Request received</p>
                <h2>Thank you for reaching out.</h2>
                <p>Your request is private. A care coordinator can follow up through your preferred contact method. This prototype does not send data yet.</p>
                <button className="primary-button" onClick={() => setIntakeOpen(false)}>Close <ArrowRight size={17} /></button>
              </div>
            ) : (
              <>
                <p className="section-kicker">Confidential intake</p>
                <h2 id="intake-title">Tell us what would help.</h2>
                <p className="modal-intro">This MVP intake captures care routing, Kenya localization, communication consent, device readiness, and optional M-Pesa payer details.</p>
                <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
                  <div className="form-grid">
                    <label>First name<input required placeholder="First name" /></label>
                    <label>Last name<input required placeholder="Last name" /></label>
                    <label>Email<input type="email" placeholder="you@example.com" /></label>
                    <label>Mobile phone<input required type="tel" placeholder="+2547XXXXXXXX" pattern="(\+254|0)?7[0-9]{8}" /></label>
                    <label>WhatsApp number<input type="tel" placeholder="Same or another number" /></label>
                    <label>County / region<select defaultValue=""><option value="" disabled>Select county</option>{counties.map((county) => <option key={county}>{county}</option>)}</select></label>
                    <label>Program interest<select defaultValue=""><option value="" disabled>Select one</option><option>PHP / Day Treatment</option><option>IOP</option><option>Outpatient</option><option>Virtual IOP</option><option>Opioid rehabilitation</option><option>Family support</option><option>Not sure yet</option></select></label>
                    <label>Care preference<select defaultValue=""><option value="" disabled>Select one</option><option>Virtual</option><option>In person</option><option>Hybrid</option><option>Not sure</option></select></label>
                    <label>Preferred contact<select defaultValue=""><option value="" disabled>Select one</option><option>Phone</option><option>SMS</option><option>WhatsApp</option><option>Email</option><option>No preference</option></select></label>
                    <label>Preferred time<select defaultValue=""><option value="" disabled>Select one</option><option>Morning</option><option>Afternoon</option><option>Evening</option><option>Flexible</option></select></label>
                    <label>Internet access<select defaultValue=""><option value="" disabled>Select one</option><option>Good</option><option>Limited</option><option>Unstable</option><option>Not sure</option></select></label>
                    <label>Device access<select defaultValue=""><option value="" disabled>Select one</option><option>Smartphone</option><option>Tablet</option><option>Laptop</option><option>Shared device</option></select></label>
                    <label className="wide">M-Pesa phone for payment<input type="tel" placeholder="Optional payment number" /></label>
                    <label className="wide">What is happening right now?<textarea placeholder="Optional. Share only what you are comfortable sharing." /></label>
                  </div>
                  <label className="checkbox-label"><input required type="checkbox" /> <span>I consent to be contacted about care options.</span></label>
                  <label className="checkbox-label"><input type="checkbox" /> <span>I consent to non-sensitive SMS or WhatsApp reminders and follow-up messages.</span></label>
                  <label className="checkbox-label"><input type="checkbox" /> <span>I consent to payment reminders and receipts through portal notifications, SMS, or WhatsApp.</span></label>
                  <label className="checkbox-label"><input required type="checkbox" /> <span>I understand this is not an emergency service. If there is immediate danger, I should contact local emergency or urgent care services.</span></label>
                  <button className="primary-button form-submit" type="submit">Send private request <ArrowRight size={17} /></button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {portalOpen && (
        <div className="modal-backdrop" role="presentation">
          <div className="modal portal-modal" role="dialog" aria-modal="true" aria-labelledby="portal-title">
            <button className="modal-close" onClick={() => setPortalOpen(false)} aria-label="Close portal sign in"><X size={20} /></button>
            <div className="portal-brand"><span className="brand-mark"><HeartHandshake size={18} /></span> Harborlight portal</div>
            <h2 id="portal-title">Welcome back.</h2>
            <p className="modal-intro">Secure role-based access for patients, therapists, facilitators, recovery specialists, administrators, and approved family support.</p>
            <form onSubmit={(event) => event.preventDefault()}>
              <label>Email or mobile number<input required placeholder="you@example.com or +2547XXXXXXXX" /></label>
              <label>Password<input required type="password" placeholder="Password" /></label>
              <button className="primary-button form-submit" type="submit">Sign in <ArrowRight size={17} /></button>
            </form>
            <p className="portal-note">Prototype only. Authentication, telehealth, messaging, and M-Pesa services are not connected yet.</p>
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch((error) => {
      console.warn('Service worker registration failed:', error);
    });
  });
}

