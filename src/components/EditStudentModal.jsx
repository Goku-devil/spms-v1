import { useState } from 'react'
import { Save, X } from 'lucide-react'
import { departments } from '../data.js'

export default function EditStudentModal({ student, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: student?.name || '',
    email: student?.email || '',
    rollNumber: student?.rollNumber || '',
    batch: student?.batch || '2022 - 2026',
    dept: student?.dept || departments[0],
    course: student?.course || '',
    year: student?.year || 'Year 1',
    status: student?.status || 'Enrolled',
    phone: student?.phone || '',
    aadhaar: student?.aadhaar || '',
    cgpa: student?.cgpa || '8.50',
    activeArrears: student?.activeArrears !== undefined ? student.activeArrears : 0,
    bloodGroup: student?.bloodGroup || 'O+',
  })

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSave({
      ...student,
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      rollNumber: formData.rollNumber.trim(),
      activeArrears: Number(formData.activeArrears) || 0,
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
        aria-labelledby="edit-student-title"
      >
        <div className="modal-heading">
          <div>
            <span className="eyebrow">AEC STUDENT DIRECTORY</span>
            <h2 id="edit-student-title">Edit Student Record</h2>
          </div>
          <button
            className="icon-button"
            aria-label="Close dialog"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Full name
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Autonomous Roll Number
              <input
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Email address
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Aadhaar Identification Details
              <input
                name="aadhaar"
                value={formData.aadhaar}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Department
              <select name="dept" value={formData.dept} onChange={handleChange}>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Degree / Program
              <input
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Batch Period
              <input
                name="batch"
                value={formData.batch}
                onChange={handleChange}
              />
            </label>
            <label>
              Academic Standing Year
              <select name="year" value={formData.year} onChange={handleChange}>
                <option>Year 1</option>
                <option>Year 2</option>
                <option>Year 3</option>
                <option>Year 4</option>
              </select>
            </label>
          </div>

          <div className="form-row">
            <label>
              Cumulative CGPA (out of 10.0)
              <input
                name="cgpa"
                type="number"
                step="0.01"
                min="0"
                max="10.0"
                value={formData.cgpa}
                onChange={handleChange}
              />
            </label>
            <label>
              Active Standing Arrears
              <input
                name="activeArrears"
                type="number"
                min="0"
                max="20"
                value={formData.activeArrears}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Contact Phone
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </label>
            <label>
              Enrollment Status
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Enrolled">Enrolled</option>
                <option value="Pending">Pending</option>
              </select>
            </label>
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
              <Save size={16} /> Save Changes
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
