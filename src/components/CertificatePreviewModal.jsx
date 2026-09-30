import { useState } from 'react'
import {
  Award,
  Calendar,
  ExternalLink,
  FileCheck2,
  Globe,
  Hash,
  ShieldCheck,
  User,
  X,
  XCircle,
} from 'lucide-react'

export default function CertificatePreviewModal({
  certificate,
  onClose,
  onVerify,
  onReject,
  access,
}) {
  const [rejectReason, setRejectReason] = useState('')
  const [showRejectForm, setShowRejectForm] = useState(false)

  if (!certificate) return null

  const isVerified = certificate.status === 'Verified'
  const isPending = certificate.status === 'Pending'
  const isRejected = certificate.status === 'Rejected'

  function handleApprove() {
    onVerify(certificate.id)
    onClose()
  }

  function handleRejectSubmit(e) {
    e.preventDefault()
    onReject(certificate.id, rejectReason.trim() || 'Certificate could not be verified with issuing authority')
    onClose()
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section
        className="student-modal cert-preview-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-preview-title"
      >
        <div className="modal-heading">
          <div>
            <span className="eyebrow">CREDENTIAL AUTHENTICATION</span>
            <h2 id="cert-preview-title">{certificate.title}</h2>
          </div>
          <button
            className="icon-button"
            aria-label="Close dialog"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Verification Status Ribbon */}
        <div className={`cert-status-ribbon status-ribbon-${certificate.status.toLowerCase()}`}>
          <div className="ribbon-icon">
            {isVerified && <ShieldCheck size={22} />}
            {isPending && <Award size={22} />}
            {isRejected && <XCircle size={22} />}
          </div>
          <div className="ribbon-text">
            {isVerified && (
              <>
                <strong>Authenticity Verified by Faculty</strong>
                <span>
                  Official badge awarded to {certificate.studentName}&apos;s profile · {certificate.verifiedBy} on {certificate.verifiedAt}
                </span>
              </>
            )}
            {isPending && (
              <>
                <strong>Pending Faculty Authentication</strong>
                <span>
                  Faculty review required to verify credential authenticity and award profile badge.
                </span>
              </>
            )}
            {isRejected && (
              <>
                <strong>Verification Rejected</strong>
                <span>{certificate.notes || 'Certificate details could not be validated.'}</span>
              </>
            )}
          </div>
        </div>

        {/* Realistic Certificate Paper Display */}
        <div className="certificate-paper">
          <div className="cert-border-outer">
            <div className="cert-border-inner">
              <div className="cert-watermark">
                {isVerified ? 'VERIFIED AUTHENTIC' : isPending ? 'PENDING REVIEW' : 'UNVERIFIED'}
              </div>

              <div className="cert-header">
                <span className="cert-gold-seal">
                  <Award size={36} />
                </span>
                <span className="cert-super-title">CERTIFICATE OF ACHIEVEMENT &amp; MASTERY</span>
                <span className="cert-issuer-name">{certificate.issuer}</span>
              </div>

              <div className="cert-body">
                <p className="cert-prose">This is to certify that</p>
                <h3 className="cert-recipient-name">{certificate.studentName}</h3>
                <p className="cert-prose">
                  has demonstrated verified competency and successfully completed all rigorous criteria for
                </p>
                <h4 className="cert-course-title">{certificate.title}</h4>
                <span className="cert-skill-tag">Specialization: {certificate.skill}</span>
              </div>

              <div className="cert-footer">
                <div className="cert-footer-col">
                  <span className="cert-footer-line" />
                  <span className="cert-meta-label">Credential ID</span>
                  <b className="cert-meta-val">{certificate.credentialId}</b>
                </div>

                <div className="cert-footer-center">
                  {isVerified ? (
                    <div className="cert-official-seal">
                      <ShieldCheck size={32} />
                      <span>FACULTY VERIFIED BADGE AWARDED</span>
                    </div>
                  ) : (
                    <div className="cert-pending-seal">
                      <FileCheck2 size={32} />
                      <span>PENDING FACULTY AUDIT</span>
                    </div>
                  )}
                </div>

                <div className="cert-footer-col">
                  <span className="cert-footer-line" />
                  <span className="cert-meta-label">Date Issued</span>
                  <b className="cert-meta-val">{certificate.issueDate}</b>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Meta Details */}
        <div className="cert-meta-grid">
          <div className="cert-meta-card">
            <User size={16} />
            <div>
              <span className="meta-card-label">STUDENT</span>
              <b>{certificate.studentName}</b>
              <small>{certificate.studentId} · {certificate.dept}</small>
            </div>
          </div>

          <div className="cert-meta-card">
            <Globe size={16} />
            <div>
              <span className="meta-card-label">ISSUING ENTITY</span>
              <b>{certificate.issuer}</b>
              <small>{certificate.skill}</small>
            </div>
          </div>

          <div className="cert-meta-card">
            <Hash size={16} />
            <div>
              <span className="meta-card-label">CREDENTIAL IDENTIFIER</span>
              <b>{certificate.credentialId}</b>
              {certificate.credentialUrl && (
                <a
                  href={certificate.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="cert-external-link"
                >
                  Verify at registry <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>

          <div className="cert-meta-card">
            <Calendar size={16} />
            <div>
              <span className="meta-card-label">ISSUED DATE</span>
              <b>{certificate.issueDate}</b>
              <small>Status: {certificate.status}</small>
            </div>
          </div>
        </div>

        {certificate.notes && (
          <div className="cert-submission-notes">
            <b>Submission Notes:</b> <span>{certificate.notes}</span>
          </div>
        )}

        {/* Faculty Review Action Bar */}
        {isPending && access?.canVerifySkills && (
          <div className="faculty-verification-box">
            {!showRejectForm ? (
              <div className="faculty-prompt">
                <div>
                  <h4>Faculty Verification Actions</h4>
                  <p>
                    Confirm this certificate is genuine. Approving will automatically append the official skill badge to {certificate.studentName}&apos;s profile.
                  </p>
                </div>
                <div className="faculty-action-buttons">
                  <button
                    type="button"
                    className="button button-danger-outline"
                    onClick={() => setShowRejectForm(true)}
                  >
                    <XCircle size={16} /> Reject
                  </button>
                  <button
                    type="button"
                    className="button button-success"
                    onClick={handleApprove}
                  >
                    <ShieldCheck size={17} /> Verify Authenticity &amp; Award Badge
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRejectSubmit} className="reject-form">
                <h4>Reason for Rejection</h4>
                <input
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="e.g. Credential ID not found in issuing repository..."
                  required
                />
                <div className="reject-form-actions">
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={() => setShowRejectForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="button button-danger">
                    Confirm Rejection
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        <div className="modal-actions">
          <button type="button" className="button button-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </section>
    </div>
  )
}
