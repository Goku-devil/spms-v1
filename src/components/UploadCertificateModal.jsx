import { useState } from 'react'
import { Award, FileText, Upload, X } from 'lucide-react'

export default function UploadCertificateModal({
  students,
  currentUser,
  onClose,
  onSubmit,
}) {
  const isStudentRole = currentUser?.role === 'student'
  const defaultStudentId = isStudentRole
    ? currentUser?.studentId || students[0]?.id
    : students[0]?.id

  const [studentId, setStudentId] = useState(defaultStudentId)
  const [skill, setSkill] = useState('Cloud Architecture')
  const [title, setTitle] = useState('')
  const [issuer, setIssuer] = useState('')
  const [issueDate, setIssueDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [credentialId, setCredentialId] = useState('')
  const [credentialUrl, setCredentialUrl] = useState('')
  const [notes, setNotes] = useState('')
  const [filePreview, setFilePreview] = useState(null)
  const [fileName, setFileName] = useState('')

  const popularSkills = [
    'Cloud Architecture',
    'Web Engineering',
    'Data Analytics & SQL',
    'Machine Learning & AI',
    'Cybersecurity Fundamentals',
    'UI/UX Design',
    'Mobile Development',
    'DevOps & CI/CD',
    'Project Management',
  ]

  function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (uploadEvent) => {
          setFilePreview(uploadEvent.target?.result)
        }
        reader.readAsDataURL(file)
      } else {
        setFilePreview(null)
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const targetStudent = students.find((s) => s.id === studentId) || students[0]

    onSubmit({
      id: `cert-${Date.now()}`,
      studentId,
      studentName: targetStudent.name,
      studentEmail: targetStudent.email,
      dept: targetStudent.dept || 'General',
      skill,
      title: title.trim(),
      issuer: issuer.trim(),
      issueDate,
      credentialId: credentialId.trim() || `CRED-${Math.floor(100000 + Math.random() * 900000)}`,
      credentialUrl: credentialUrl.trim(),
      status: 'Pending',
      verifiedBy: null,
      verifiedAt: null,
      badgeTitle: title.trim(),
      notes: notes.trim(),
      fileName: fileName || 'credential_certificate.pdf',
      filePreview,
    })
    onClose()
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section
        className="student-modal certificate-upload-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="upload-cert-title"
      >
        <div className="modal-heading">
          <div>
            <span className="eyebrow">VERIFY YOUR SKILLS</span>
            <h2 id="upload-cert-title">Upload Skill Certificate</h2>
          </div>
          <button
            className="icon-button"
            aria-label="Close dialog"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="cert-upload-form">
          {/* Student Selector */}
          <label>
            Student Account
            {isStudentRole ? (
              <input
                disabled
                value={`${currentUser.name} (${currentUser.studentId || studentId})`}
                className="input-disabled"
              />
            ) : (
              <select
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
              >
                {students.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.name} — {st.id} ({st.course || st.dept})
                  </option>
                ))}
              </select>
            )}
          </label>

          <div className="form-row">
            <label>
              Skill Domain / Competency
              <select value={skill} onChange={(e) => setSkill(e.target.value)} required>
                {popularSkills.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Certificate / Credential Title
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. AWS Certified Solutions Architect"
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Issuing Organization
              <input
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                placeholder="e.g. Amazon Web Services, Google, Meta"
                required
              />
            </label>

            <label>
              Date of Issuance
              <input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Credential ID / License Number
              <input
                value={credentialId}
                onChange={(e) => setCredentialId(e.target.value)}
                placeholder="e.g. AWS-9482710-ARCH"
              />
            </label>

            <label>
              Online Verification URL (optional)
              <input
                type="url"
                value={credentialUrl}
                onChange={(e) => setCredentialUrl(e.target.value)}
                placeholder="https://issuer.com/verify/..."
              />
            </label>
          </div>

          {/* Certificate File Drag & Drop / Upload */}
          <div className="cert-file-zone">
            <label className="cert-dropzone">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="sr-only"
              />
              <span className="dropzone-icon">
                {filePreview ? <Award size={26} /> : <Upload size={26} />}
              </span>
              <span className="dropzone-text">
                {fileName ? (
                  <b>{fileName}</b>
                ) : (
                  <>
                    <b>Click to upload certificate document</b> (PNG, JPG, PDF)
                  </>
                )}
              </span>
              <span className="dropzone-hint">
                Faculty will review this document to confirm authenticity
              </span>
            </label>

            {filePreview && (
              <div className="cert-img-preview-box">
                <img src={filePreview} alt="Certificate preview" />
              </div>
            )}
          </div>

          <label>
            Notes for Faculty Verifier (optional)
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Completed comprehensive exam and final capstone project."
            />
          </label>

          <div className="modal-actions">
            <button
              type="button"
              className="button button-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="button button-primary">
              <FileText size={16} /> Submit for Faculty Verification
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
