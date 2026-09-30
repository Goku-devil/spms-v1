import { useState } from 'react'
import { CalendarDays, MapPin, Plus, Trash2, X } from 'lucide-react'

export default function CalendarModal({ events, onClose, onAddEvent, onDeleteEvent, access }) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')
  const [type, setType] = useState('Academic deadline')

  function handleCreate(e) {
    e.preventDefault()
    if (!title.trim() || !date) return

    // parse date to day and month
    const d = new Date(date)
    const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase()
    const day = String(d.getDate()).padStart(2, '0')

    onAddEvent({
      id: `ev-${Date.now()}`,
      day,
      month,
      title: title.trim(),
      time: time.trim() || 'All day',
      location: location.trim() || 'Northstar Campus',
      type,
    })

    setTitle('')
    setDate('')
    setTime('')
    setLocation('')
    setShowAddForm(false)
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section
        className="student-modal calendar-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="calendar-modal-title"
      >
        <div className="modal-heading">
          <div>
            <span className="eyebrow">ACADEMIC SCHEDULE</span>
            <h2 id="calendar-modal-title">Academic Calendar</h2>
          </div>
          <button
            className="icon-button"
            aria-label="Close dialog"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <div className="calendar-modal-content">
          <div className="calendar-events-list">
            {events.length === 0 ? (
              <p className="calendar-empty">No upcoming events scheduled.</p>
            ) : (
              events.map((event) => (
                <div key={event.id} className="calendar-event-card">
                  <span className="event-date">
                    <b>{event.day}</b>
                    <small>{event.month}</small>
                  </span>
                  <div className="calendar-event-details">
                    <span className="calendar-event-badge">{event.type}</span>
                    <h4>{event.title}</h4>
                    <p className="calendar-event-meta">
                      <CalendarDays size={14} /> {event.time}
                    </p>
                    {event.location && (
                      <p className="calendar-event-location">
                        <MapPin size={14} /> {event.location}
                      </p>
                    )}
                  </div>
                  {access?.canManageCourses && (
                    <button
                      className="icon-button delete-event-btn"
                      onClick={() => onDeleteEvent(event.id)}
                      title="Remove event"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>

          {showAddForm ? (
            <form onSubmit={handleCreate} className="calendar-add-form">
              <h3 className="add-event-heading">Add Academic Event</h3>
              <label>
                Event Title
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Final project submission"
                  required
                />
              </label>

              <div className="form-row">
                <label>
                  Event Date
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Time
                  <input
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="e.g. 02:00 PM"
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Location
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Main Auditorium"
                  />
                </label>
                <label>
                  Category
                  <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option>Academic deadline</option>
                    <option>Examinations</option>
                    <option>Campus event</option>
                    <option>Student affairs</option>
                    <option>Holiday</option>
                  </select>
                </label>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="button button-primary">
                  <Plus size={16} /> Schedule Event
                </button>
              </div>
            </form>
          ) : (
            access?.canManageCourses && (
              <button
                type="button"
                className="button button-secondary add-event-toggle"
                onClick={() => setShowAddForm(true)}
              >
                <Plus size={16} /> Add Calendar Event
              </button>
            )
          )}
        </div>

        <div className="modal-actions">
          <button type="button" className="button button-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </section>
    </div>
  )
}
