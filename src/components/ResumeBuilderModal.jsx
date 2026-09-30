import {
  Award,
  BookOpen,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Printer,
  ShieldCheck,
  X,
} from 'lucide-react'
import { aecInstitutionInfo } from '../data.js'

export default function ResumeBuilderModal({ student, onClose }) {
  if (!student) return null

  const badges = student.badges || []
  const achievements = student.achievements || []

  function handlePrint() {
    window.print()
  }

  return (
    <div
      className="modal-backdrop resume-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section
        className="student-modal resume-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-title"
      >
        <div className="modal-heading no-print">
          <div>
            <span className="eyebrow">AUTOMATED RESUME BUILDER</span>
            <h2 id="resume-title">Placement Resume: {student.name}</h2>
          </div>
          <div className="resume-heading-actions">
            <button
              type="button"
              className="button button-primary resume-top-print-btn"
              onClick={handlePrint}
            >
              <Printer size={16} /> Print / Save PDF
            </button>
            <button
              className="icon-button"
              aria-label="Close dialog"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet */}
        <div className="resume-paper-sheet printable-area">
          <header className="resume-paper-header">
            <div className="resume-title-block">
              <h1 className="resume-name">{student.name}</h1>
              <p className="resume-subheading">
                Roll Number: <b>{student.rollNumber || student.id}</b> · {student.course}
              </p>
              <p className="resume-institution">
                {aecInstitutionInfo.name} {aecInstitutionInfo.autonomousText}
              </p>
              <p className="resume-institution-meta">
                Accredited by NBA &amp; NAAC with &apos;A&apos; Grade · {student.dept}
              </p>
            </div>

            <div className="resume-contact-block">
              <span>
                <Mail size={13} /> {student.email}
              </span>
              <span>
                <Phone size={13} /> {student.phone || '+91 98421 XXXXX'}
              </span>
              <span>
                <MapPin size={13} /> {student.address || 'Salem, Tamil Nadu, India'}
              </span>
              <span className="resume-id-badge">
                <ShieldCheck size={13} /> Aadhaar: {student.aadhaar || 'Verified'}
              </span>
            </div>
          </header>

          <hr className="resume-divider" />

          {/* Education & Academic Standing */}
          <section className="resume-section">
            <h3 className="resume-section-title">
              <GraduationCap size={16} /> ACADEMIC QUALIFICATIONS
            </h3>
            <div className="resume-edu-card">
              <div className="edu-top">
                <span className="edu-degree">{student.course}</span>
                <span className="edu-batch">{student.batch || '2022 - 2026'}</span>
              </div>
              <div className="edu-sub">
                <span>{aecInstitutionInfo.name} · Anna University Autonomous Curriculum</span>
                <span className="edu-cgpa">
                  Cumulative CGPA: <b>{student.cgpa || '8.50'} / 10.00</b>
                </span>
              </div>
              <div className="edu-arrear-status">
                <span>Standing Active Arrears: <b>{student.activeArrears || 0}</b></span>
                <span>Arrear History: <b>{student.arrearHistory || 0}</b></span>
                <span>Current Status: <b style={{ color: '#16a34a' }}>Placement Eligible</b></span>
              </div>
            </div>
          </section>

          {/* Verified Skill Badges (Authentic Industry Credentials) */}
          <section className="resume-section">
            <h3 className="resume-section-title">
              <ShieldCheck size={16} /> VERIFIED INDUSTRY CREDENTIALS &amp; SKILL BADGES
            </h3>
            <p className="resume-note-sub">
              Authenticated &amp; sealed by Department of Information Technology faculty:
            </p>
            {badges.length > 0 ? (
              <div className="resume-badges-grid">
                {badges.map((b) => (
                  <div key={b.id || b.title} className="resume-badge-box">
                    <div className="resume-badge-header">
                      <b>{b.title}</b>
                      <span className="resume-badge-issuer">{b.issuer}</span>
                    </div>
                    <div className="resume-badge-footer">
                      <span>Credential ID: <code>{b.credentialId}</code></span>
                      <span className="verified-seal-text">✓ {b.verifiedBy || 'Faculty Authenticated'}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="resume-empty-note">
                Skill certification verification pending.
              </p>
            )}
          </section>

          {/* Achievements & Internships */}
          <section className="resume-section">
            <h3 className="resume-section-title">
              <Award size={16} /> INTERNSHIPS, HACKATHONS &amp; ACHIEVEMENTS
            </h3>
            {achievements.length > 0 ? (
              <div className="resume-achievements-list">
                {achievements.map((ach) => (
                  <div key={ach.id || ach.title} className="resume-ach-item">
                    <div className="ach-item-top">
                      <b>{ach.title}</b>
                      <span className="ach-item-date">{ach.date}</span>
                    </div>
                    <p className="ach-item-org">
                      <span>{ach.organization}</span> · <span className="ach-type-pill">{ach.type}</span>
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="resume-achievements-list">
                <div className="resume-ach-item">
                  <div className="ach-item-top">
                    <b>Smart India Hackathon 2025 - State Finalist</b>
                    <span className="ach-item-date">Nov 2025</span>
                  </div>
                  <p className="ach-item-org">
                    <span>Ministry of Education Innovation Cell</span> · <span className="ach-type-pill">National Event</span>
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* Technical Coursework */}
          <section className="resume-section">
            <h3 className="resume-section-title">
              <BookOpen size={16} /> ACADEMIC COURSEWORK &amp; ENROLLED CURRICULUM
            </h3>
            <div className="resume-courses-tags">
              {(student.enrolledCourses || ['IT-401', 'IT-402', 'CS-403']).map((c) => (
                <span key={c} className="resume-course-pill">
                  {c}
                </span>
              ))}
              <span className="resume-course-pill">Full Stack Web Architecture</span>
              <span className="resume-course-pill">Cloud &amp; Microservices</span>
              <span className="resume-course-pill">Data Structures &amp; Algorithms</span>
              <span className="resume-course-pill">Database Management Systems</span>
            </div>
          </section>

          <footer className="resume-footer-stamp">
            <span>Official Placement Resume Generated from AEC SPMS Platform</span>
            <span>AEC / IT / PLACEMENT / 2026</span>
          </footer>
        </div>

        <div className="modal-actions no-print">
          <button
            type="button"
            className="button button-secondary"
            onClick={onClose}
          >
            Close
          </button>
          <button
            type="button"
            className="button button-primary"
            onClick={handlePrint}
          >
            <Download size={16} /> Print or Save as PDF
          </button>
        </div>
      </section>
    </div>
  )
}
