import { useState } from 'react'
import {
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  Edit3,
  FileText,
  GraduationCap,
  IdCard,
  Mail,
  Phone,
  RefreshCw,
  ShieldCheck,
  Trash2,
  X,
} from 'lucide-react'

export default function StudentDetailModal({
  student,
  onClose,
  onEdit,
  onDelete,
  onToggleStatus,
  onOpenUpdateGrades,
  onOpenResume,
  onOpenDigitalId,
  access,
}) {
  const [expandedSem, setExpandedSem] = useState(null)

  if (!student) return null

  const badges = student.badges || []
  const achievements = student.achievements || []
  const semesters = student.semesters || []

  function handleDelete() {
    if (window.confirm(`Are you sure you want to delete ${student.name} (${student.rollNumber || student.id}) from the directory?`)) {
      onDelete(student.id)
      onClose()
    }
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section
        className="student-modal detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
      >
        <div className="modal-heading">
          <div>
            <span className="eyebrow">AEC STUDENT PROFILE RECORD · AUTONOMOUS</span>
            <h2 id="detail-title">{student.name}</h2>
          </div>
          <div className="heading-actions-group">
            <button
              type="button"
              className="button button-secondary-sm"
              onClick={() => onOpenDigitalId(student)}
              title="Open Universal Campus Smart ID Card"
            >
              <IdCard size={15} /> Campus ID
            </button>
            <button
              type="button"
              className="button button-secondary-sm"
              onClick={() => onOpenResume(student)}
              title="Build ATS Placement Resume"
            >
              <FileText size={15} /> Resume Builder
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

        <div className="detail-hero">
          <span className={`avatar avatar-${student.color} detail-avatar`}>
            {student.initials}
          </span>
          <div className="detail-hero-info">
            <div className="detail-hero-name">
              <h3>{student.name}</h3>
              <span className={`status status-${(student.status || 'enrolled').toLowerCase()}`}>
                <i />
                {student.status || 'Enrolled'}
              </span>
            </div>
            <p className="detail-hero-email">
              <Mail size={15} /> {student.email}
            </p>
            {student.phone && (
              <p className="detail-hero-phone">
                <Phone size={15} /> {student.phone}
              </p>
            )}
          </div>
        </div>

        {/* Core Attributes Grid */}
        <div className="detail-grid">
          <div className="detail-cell highlight-cell">
            <span className="detail-label">ROLL NUMBER</span>
            <b className="detail-value">{student.rollNumber || student.id}</b>
          </div>
          <div className="detail-cell">
            <span className="detail-label">DEPARTMENT</span>
            <b className="detail-value">{student.dept || 'IT'}</b>
          </div>
          <div className="detail-cell">
            <span className="detail-label">DEGREE PROGRAM</span>
            <b className="detail-value">{student.course}</b>
          </div>
          <div className="detail-cell">
            <span className="detail-label">BATCH &amp; YEAR</span>
            <b className="detail-value">{student.batch || '2022 - 2026'} ({student.year})</b>
          </div>
          <div className="detail-cell highlight-cell">
            <span className="detail-label">CUMULATIVE CGPA</span>
            <b className="detail-value">{student.cgpa || '8.50'} / 10.00</b>
          </div>
          <div className="detail-cell">
            <span className="detail-label">ACTIVE STANDING ARREARS</span>
            <b className={`detail-value ${student.activeArrears > 0 ? 'text-danger' : 'text-success'}`}>
              {student.activeArrears !== undefined ? student.activeArrears : 0} Standing Arrears
            </b>
          </div>
          <div className="detail-cell">
            <span className="detail-label">AADHAAR VERIFICATION</span>
            <b className="detail-value">{student.aadhaar || 'Verified (XXXX-5019)'}</b>
          </div>
          <div className="detail-cell">
            <span className="detail-label">VERIFIED BADGES</span>
            <b className="detail-value highlight-badges-count">
              <ShieldCheck size={16} /> {badges.length} Verified Badges
            </b>
          </div>
        </div>

        {/* Academic Marksheets & Semester Records (Slide 4 & 7) */}
        <div className="detail-academic-marksheets">
          <div className="detail-section-header">
            <div>
              <span className="detail-label">SEMESTER MARKSHEETS &amp; ACADEMICS</span>
              <p className="detail-sub-label">Autonomous semester-wise SGPA and subject marks breakdown</p>
            </div>
            {access?.canUpdateGrades && (
              <button
                type="button"
                className="button button-primary-sm"
                onClick={() => onOpenUpdateGrades(student)}
              >
                <GraduationCap size={15} /> Update Grades &amp; Arrears
              </button>
            )}
          </div>

          {semesters.length > 0 ? (
            <div className="semesters-accordion">
              {semesters.map((sem) => {
                const isExpanded = expandedSem === sem.semester
                return (
                  <div key={sem.semester} className="semester-block">
                    <button
                      type="button"
                      className="semester-header-btn"
                      onClick={() => setExpandedSem(isExpanded ? null : sem.semester)}
                    >
                      <div className="sem-header-left">
                        <b>Semester {sem.semester}</b>
                        <span className="sem-gpa-tag">SGPA: {sem.sgpa} / 10.0</span>
                        <span className={`sem-arrear-tag ${sem.activeArrears > 0 ? 'tag-arrear' : 'tag-clear'}`}>
                          {sem.activeArrears > 0 ? `${sem.activeArrears} Arrear` : 'All Cleared'}
                        </span>
                      </div>
                      <ChevronDown size={17} className={`faq-icon ${isExpanded ? 'faq-icon-expanded' : ''}`} />
                    </button>

                    {isExpanded && sem.marksheets && sem.marksheets.length > 0 && (
                      <div className="marksheet-table-view">
                        <table>
                          <thead>
                            <tr>
                              <th>Sub Code</th>
                              <th>Subject Name</th>
                              <th>Credits</th>
                              <th>Internal (40)</th>
                              <th>External (60)</th>
                              <th>Total</th>
                              <th>Grade</th>
                              <th>Result</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sem.marksheets.map((sub, i) => (
                              <tr key={i}>
                                <td><code>{sub.code}</code></td>
                                <td>{sub.title}</td>
                                <td>{sub.credits}</td>
                                <td>{sub.internal}</td>
                                <td>{sub.external}</td>
                                <td><b>{sub.total}</b></td>
                                <td><span className={`grade-tag grade-${sub.grade.toLowerCase()}`}>{sub.grade}</span></td>
                                <td>
                                  <span className={`result-tag result-${sub.result.toLowerCase()}`}>
                                    {sub.result}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="empty-sub-note">No semester marksheets registered yet.</p>
          )}
        </div>

        {/* Verified Skill Badges Section */}
        <div className="detail-badges-section">
          <div className="detail-section-header">
            <span className="detail-label">VERIFIED SKILL BADGES</span>
            <span className="badge-count-pill">{badges.length} Official</span>
          </div>

          {badges.length > 0 ? (
            <div className="detail-badges-grid">
              {badges.map((badge) => (
                <div key={badge.id || badge.title} className="skill-badge-card">
                  <div className="badge-icon-box">
                    <ShieldCheck size={22} className="badge-shield-icon" />
                  </div>
                  <div className="badge-info">
                    <span className="badge-skill-name">{badge.skill}</span>
                    <h4 className="badge-title">{badge.title}</h4>
                    <span className="badge-issuer">{badge.issuer}</span>
                    <div className="badge-verification-note">
                      <CheckCircle2 size={13} />
                      <span>{badge.verifiedBy || 'Faculty Verified'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-badges-banner">
              <Award size={20} />
              <span>
                No verified skill badges yet. Submit certificates under <b>Verify your skills</b> to earn official badges verified by faculty.
              </span>
            </div>
          )}
        </div>

        {/* Achievements Section (Slide 7) */}
        {achievements.length > 0 && (
          <div className="detail-achievements-section">
            <div className="detail-section-header">
              <span className="detail-label">INTERNSHIPS &amp; ACHIEVEMENTS</span>
              <span className="badge-count-pill">{achievements.length} Approved</span>
            </div>
            <div className="achievements-preview-grid">
              {achievements.map((ach) => (
                <div key={ach.id || ach.title} className="achievement-card-mini">
                  <div className="ach-mini-header">
                    <h4>{ach.title}</h4>
                    <span className="ach-mini-type">{ach.type}</span>
                  </div>
                  <p>{ach.organization} · {ach.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="detail-courses-section">
          <span className="detail-label">ENROLLED COURSES</span>
          <div className="detail-course-tags">
            {(student.enrolledCourses || ['IT-401', 'IT-402']).map((courseCode) => (
              <span key={courseCode} className="detail-course-chip">
                <BookOpen size={14} /> {courseCode}
              </span>
            ))}
          </div>
        </div>

        <div className="modal-actions detail-actions">
          {access?.canEditStudents && (
            <button
              type="button"
              className="button button-secondary"
              onClick={() => onToggleStatus(student.id)}
              title="Switch status between Enrolled and Pending"
            >
              <RefreshCw size={15} />
              Mark as {student.status === 'Enrolled' ? 'Pending' : 'Enrolled'}
            </button>
          )}

          {access?.canEditStudents && (
            <button
              type="button"
              className="button button-secondary"
              onClick={() => {
                onClose()
                onEdit(student)
              }}
            >
              <Edit3 size={15} /> Edit Record
            </button>
          )}

          {access?.canDeleteStudents && (
            <button
              type="button"
              className="button button-danger"
              onClick={handleDelete}
            >
              <Trash2 size={15} /> Delete
            </button>
          )}

          <button
            type="button"
            className="button button-primary"
            onClick={onClose}
          >
            <Check size={16} /> Done
          </button>
        </div>
      </section>
    </div>
  )
}
