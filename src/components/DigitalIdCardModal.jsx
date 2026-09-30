import { useState } from 'react'
import {
  Bus,
  CheckCircle2,
  Cpu,
  Library,
  Printer,
  RotateCw,
  ShieldCheck,
  Utensils,
  X,
} from 'lucide-react'
import { aecInstitutionInfo } from '../data.js'
import collegeLogo from '../assets/logo.png'

export default function DigitalIdCardModal({ student, onClose }) {
  const [isFlipped, setIsFlipped] = useState(false)

  if (!student) return null

  function handlePrint() {
    window.print()
  }

  return (
    <div
      className="modal-backdrop id-card-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section
        className="student-modal id-card-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="id-modal-title"
      >
        <div className="modal-heading no-print">
          <div>
            <span className="eyebrow">UNIVERSAL CAMPUS DIGITAL ID</span>
            <h2 id="id-modal-title">Universal Campus Smart ID</h2>
          </div>
          <div className="heading-actions-group">
            <button
              type="button"
              className="button button-secondary-sm id-top-flip-btn"
              onClick={() => setIsFlipped((prev) => !prev)}
            >
              <RotateCw size={15} /> Flip Card
            </button>
            <button
              type="button"
              className="button button-primary-sm id-top-print-btn"
              onClick={handlePrint}
            >
              <Printer size={15} /> Print ID
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

        {/* Smart Card Container */}
        <div className="id-card-stage printable-area">
          <div className={`smart-id-card ${isFlipped ? 'is-card-flipped' : ''}`}>
            {/* FRONT OF CARD */}
            <div className="card-face card-front">
              <div className="id-card-header">
                <div className="id-crest-icon">
                  <img src={collegeLogo} alt="AEC Crest" className="id-crest-img" />
                </div>
                <div className="id-institution-title">
                  <h3>{aecInstitutionInfo.name.toUpperCase()}</h3>
                  <span className="id-sub">{aecInstitutionInfo.autonomousText} · SALEM</span>
                  <span className="id-accreditations">NBA ACCREDITED · NAAC &apos;A&apos; GRADE</span>
                </div>
              </div>

              <div className="id-card-body">
                <div className="id-photo-frame">
                  <span className={`avatar avatar-${student.color} id-avatar-img`}>
                    {student.initials}
                  </span>
                  <span className="id-valid-pill">VALID 2022 - 2026</span>
                </div>

                <div className="id-details-column">
                  <h2 className="id-student-fullname">{student.name}</h2>
                  <div className="id-data-row highlight-roll">
                    <span className="id-data-label">ROLL NO:</span>
                    <b className="id-data-value">{student.rollNumber || student.id}</b>
                  </div>
                  <div className="id-data-row">
                    <span className="id-data-label">DEPT:</span>
                    <span className="id-data-value">{student.dept}</span>
                  </div>
                  <div className="id-data-row">
                    <span className="id-data-label">PROGRAM:</span>
                    <span className="id-data-value">{student.course}</span>
                  </div>
                  <div className="id-data-row">
                    <span className="id-data-label">BLOOD GRP:</span>
                    <span className="id-data-value">{student.bloodGroup || 'O+'}</span>
                  </div>
                  <div className="id-data-row">
                    <span className="id-data-label">AADHAAR:</span>
                    <span className="id-data-value">{student.aadhaar || 'Verified'}</span>
                  </div>
                </div>
              </div>

              {/* Barcode & Hologram strip */}
              <div className="id-card-footer">
                <div className="id-barcode-graphic">
                  <div className="barcode-bars" />
                  <span className="barcode-text">AEC-ID-{student.rollNumber || student.id}</span>
                </div>
                <div className="id-chip-holo">
                  <ShieldCheck size={20} />
                  <span>SMART ID</span>
                </div>
              </div>
            </div>

            {/* BACK OF CARD */}
            <div className="card-face card-back">
              <div className="card-back-header">
                <span className="eyebrow">UNIVERSAL CAMPUS MULTI-ACCESS PASS</span>
                <h4>CAMPUS UTILITY ACCESS CHIPS</h4>
              </div>

              <div className="campus-utilities-grid">
                <div className="utility-access-card access-active">
                  <Bus size={20} />
                  <div>
                    <b>Campus Bus Transit</b>
                    <span>Route 14: Salem - Sankari [Authorized]</span>
                  </div>
                  <CheckCircle2 size={16} className="text-success" />
                </div>

                <div className="utility-access-card access-active">
                  <Library size={20} />
                  <div>
                    <b>Central Digital Library</b>
                    <span>Card LIB-{student.rollNumber ? student.rollNumber.slice(-4) : '5019'} [Active]</span>
                  </div>
                  <CheckCircle2 size={16} className="text-success" />
                </div>

                <div className="utility-access-card access-active">
                  <Cpu size={20} />
                  <div>
                    <b>IT Specialized Labs</b>
                    <span>Cloud &amp; IoT Lab [Level 3 Authorized]</span>
                  </div>
                  <CheckCircle2 size={16} className="text-success" />
                </div>

                <div className="utility-access-card access-active">
                  <Utensils size={20} />
                  <div>
                    <b>Campus Canteen &amp; Store</b>
                    <span>Digital Wallet Pass [Enabled]</span>
                  </div>
                  <CheckCircle2 size={16} className="text-success" />
                </div>
              </div>

              <div className="card-back-meta">
                <p>
                  <strong>Address:</strong> {student.address || 'Salem, Tamil Nadu'}
                </p>
                <p>
                  <strong>Emergency Contact:</strong> {student.guardian || '+91 98421 11000'}
                </p>
                <p className="card-auth-warning">
                  This card is property of {aecInstitutionInfo.name}. If found, please return to the Principal / Registrar office.
                </p>
              </div>

              <div className="card-back-sign">
                <span>Student Signature</span>
                <span className="principal-stamp">Principal / Registrar Signature</span>
              </div>
            </div>
          </div>
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
            className="button button-secondary"
            onClick={() => setIsFlipped((prev) => !prev)}
          >
            <RotateCw size={15} /> Flip Card View
          </button>
          <button
            type="button"
            className="button button-primary"
            onClick={handlePrint}
          >
            <Printer size={16} /> Print ID Card
          </button>
        </div>
      </section>
    </div>
  )
}
