import { Plus, X } from 'lucide-react'
import { departments } from '../data.js'

export default function AddCourseModal({ onClose, onAdd }) {
  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const code = formData.get('code').trim().toUpperCase()
    const title = formData.get('title').trim()
    const dept = formData.get('dept')
    const credits = Number(formData.get('credits')) || 3
    const instructor = formData.get('instructor').trim()
    const room = formData.get('room').trim() || 'Hall A'
    const schedule = formData.get('schedule').trim() || 'Mon / Wed · 10:00 AM'
    const capacity = Number(formData.get('capacity')) || 50

    onAdd({
      id: code,
      code,
      title,
      dept,
      credits,
      instructor,
      room,
      schedule,
      capacity,
      enrolled: 0,
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
        aria-labelledby="add-course-title"
      >
        <div className="modal-heading">
          <div>
            <span className="eyebrow">ACADEMIC CATALOG</span>
            <h2 id="add-course-title">Add New Course</h2>
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
              Course Code
              <input
                name="code"
                placeholder="e.g. CS-310"
                required
              />
            </label>
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
          </div>

          <label>
            Course Title
            <input
              name="title"
              placeholder="e.g. Database Architecture and Design"
              required
            />
          </label>

          <div className="form-row">
            <label>
              Instructor
              <input
                name="instructor"
                placeholder="e.g. Dr. Alan Vance"
                required
              />
            </label>
            <label>
              Credits
              <select name="credits">
                <option value="3">3 Credits</option>
                <option value="4">4 Credits</option>
                <option value="2">2 Credits</option>
                <option value="1">1 Credit</option>
              </select>
            </label>
          </div>

          <div className="form-row">
            <label>
              Room / Location
              <input
                name="room"
                placeholder="e.g. Lecture Hall B"
              />
            </label>
            <label>
              Class Capacity
              <input
                name="capacity"
                type="number"
                defaultValue={45}
                min="10"
                max="300"
              />
            </label>
          </div>

          <label>
            Meeting Schedule
            <input
              name="schedule"
              placeholder="e.g. Mon / Wed · 10:00 AM - 11:30 AM"
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
              <Plus size={16} /> Add Course
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
