import { Plus, X } from 'lucide-react'
import { departments } from '../data.js'

export default function AddStudentModal({ onClose, onAdd }) {
  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const dept = formData.get('dept')
    const course = formData.get('course') || dept
    onAdd({
      name: formData.get('name').trim(),
      email: formData.get('email').trim(),
      rollNumber: formData.get('rollNumber')?.trim() || `61022520${Math.floor(1000 + Math.random() * 9000)}`,
      batch: formData.get('batch')?.trim() || '2022 - 2026',
      dept,
      course,
      year: formData.get('year'),
      status: formData.get('status') || 'Enrolled',
      phone: formData.get('phone')?.trim() || '+91 98421 XXXXX',
      aadhaar: formData.get('aadhaar')?.trim() || 'XXXX-XXXX-5019',
      cgpa: formData.get('cgpa')?.trim() || '8.50',
      activeArrears: Number(formData.get('activeArrears')) || 0,
      arrearHistory: 0,
      bloodGroup: formData.get('bloodGroup') || 'O+',
      semesters: [],
      achievements: [],
    })
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        className="student-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-heading">
          <div>
            <span className="eyebrow">AEC STUDENT DIRECTORY</span>
            <h2 id="modal-title">Register New Student</h2>
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
              Full Name
              <input
                name="name"
                placeholder="e.g. Gokulraj A S"
                required
              />
            </label>
            <label>
              Autonomous Roll Number
              <input
                name="rollNumber"
                placeholder="e.g. 610225205019"
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Campus Email Address
              <input
                name="email"
                type="email"
                placeholder="student.roll@aec.ac.in"
                required
              />
            </label>
            <label>
              Aadhaar Identification Details
              <input
                name="aadhaar"
                placeholder="XXXX-XXXX-5019"
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Academic Department
              <select name="dept" required>
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
                defaultValue="B.Tech Information Technology"
                placeholder="e.g. B.Tech Information Technology"
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Batch Period
              <input
                name="batch"
                defaultValue="2022 - 2026"
                placeholder="2022 - 2026"
              />
            </label>
            <label>
              Academic Standing Year
              <select name="year">
                <option>Year 1</option>
                <option>Year 2</option>
                <option>Year 3</option>
                <option defaultValue>Year 4</option>
              </select>
            </label>
          </div>

          <div className="form-row">
            <label>
              Initial CGPA (out of 10.0)
              <input
                name="cgpa"
                type="number"
                step="0.01"
                min="0"
                max="10.0"
                defaultValue="8.50"
              />
            </label>
            <label>
              Active Standing Arrears
              <input
                name="activeArrears"
                type="number"
                min="0"
                max="20"
                defaultValue="0"
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Contact Phone
              <input
                name="phone"
                placeholder="+91 98421 XXXXX"
              />
            </label>
            <label>
              Blood Group
              <select name="bloodGroup">
                <option value="O+">O+</option>
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="AB+">AB+</option>
                <option value="O-">O-</option>
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
              <Plus size={17} /> Register Student
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}