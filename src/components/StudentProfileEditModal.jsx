import { useState } from 'react'
import { Plus, Save, Trash2, X } from 'lucide-react'

export default function StudentProfileEditModal({ student, onClose, onSave }) {
  const [phone, setPhone] = useState(student.phone || '')
  const [address, setAddress] = useState(student.address || '')
  const [bloodGroup, setBloodGroup] = useState(student.bloodGroup || 'O+')
  const [guardian, setGuardian] = useState(student.guardian || '')
  const [achievements, setAchievements] = useState(student.achievements || [])

  // New achievement form
  const [newTitle, setNewTitle] = useState('')
  const [newType, setNewType] = useState('Internship')
  const [newOrg, setNewOrg] = useState('')
  const [newDate, setNewDate] = useState('')

  function handleAddAchievement(e) {
    e.preventDefault()
    if (!newTitle.trim()) return

    const newAch = {
      id: `ach-${Date.now()}`,
      title: newTitle.trim(),
      type: newType,
      organization: newOrg.trim() || 'Academic Organization',
      date: newDate || new Date().toISOString().slice(0, 10),
      status: 'Approved',
    }

    setAchievements((prev) => [newAch, ...prev])
    setNewTitle('')
    setNewOrg('')
    setNewDate('')
  }

  function handleRemoveAchievement(id) {
    setAchievements((prev) => prev.filter((a) => a.id !== id))
  }

  function handleSave(e) {
    e.preventDefault()
    onSave({
      ...student,
      phone,
      address,
      bloodGroup,
      guardian,
      achievements,
    })
    onClose()
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section
        className="student-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-profile-title"
      >
        <div className="modal-heading">
          <div>
            <span className="eyebrow">STUDENT SELF-SERVICE PORTAL</span>
            <h2 id="edit-profile-title">Update Contact &amp; Achievements</h2>
          </div>
          <button
            className="icon-button"
            aria-label="Close dialog"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} className="student-edit-form">
          <div className="form-row">
            <label>
              Phone Number
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98421 XXXXX"
                required
              />
            </label>
            <label>
              Blood Group
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </label>
          </div>

          <label>
            Parent / Guardian Contact
            <input
              type="text"
              value={guardian}
              onChange={(e) => setGuardian(e.target.value)}
              placeholder="e.g. S. Arumugam (+91 98421 11000)"
            />
          </label>

          <label>
            Residential / Communication Address
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={2}
              placeholder="Door No, Street, City, District, Pincode"
            />
          </label>

          <div className="student-achievements-edit-section">
            <div className="ach-section-header">
              <h3>Extracurricular &amp; Academic Achievements</h3>
              <p>Add internships, symposium prizes, hackathons, and event honors</p>
            </div>

            <div className="add-ach-form-box">
              <div className="form-row">
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Achievement / Internship Title"
                  className="ach-input-title"
                />
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                >
                  <option value="Internship">Internship</option>
                  <option value="Certification">Certification</option>
                  <option value="Event">Event / Hackathon</option>
                </select>
              </div>

              <div className="form-row" style={{ marginTop: '8px' }}>
                <input
                  value={newOrg}
                  onChange={(e) => setNewOrg(e.target.value)}
                  placeholder="Organization / Company / College"
                />
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                />
                <button
                  type="button"
                  className="button button-secondary-sm"
                  onClick={handleAddAchievement}
                >
                  <Plus size={15} /> Add
                </button>
              </div>
            </div>

            <div className="ach-list-preview">
              {achievements.map((ach) => (
                <div key={ach.id} className="ach-chip-item">
                  <div>
                    <b>{ach.title}</b>
                    <span>
                      {ach.organization} · {ach.type} · {ach.date}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="icon-button-sm text-danger"
                    onClick={() => handleRemoveAchievement(ach.id)}
                    title="Remove"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="button button-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="button button-primary">
              <Save size={16} /> Save Profile Details
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
