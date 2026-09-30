import { useState } from 'react'
import {
  GraduationCap,
  Plus,
  Save,
  Trash2,
  X,
} from 'lucide-react'

export default function UpdateGradesModal({ student, onClose, onSave, currentUser }) {
  const [cgpa, setCgpa] = useState(student.cgpa || '8.50')
  const [activeArrears, setActiveArrears] = useState(student.activeArrears ?? 0)
  const [arrearHistory, setArrearHistory] = useState(student.arrearHistory ?? 0)
  const [selectedSemester, setSelectedSemester] = useState(6)

  // Initialize or find semester
  const existingSem = (student.semesters || []).find((s) => s.semester === selectedSemester)
  const [semSgpa, setSemSgpa] = useState(existingSem ? existingSem.sgpa : '8.50')
  const [subjects, setSubjects] = useState(
    existingSem && existingSem.marksheets && existingSem.marksheets.length > 0
      ? existingSem.marksheets
      : [
          {
            code: 'IT3601',
            title: 'Full Stack Cloud Development',
            credits: 4,
            internal: 24,
            external: 66,
            total: 90,
            grade: 'O',
            result: 'Pass',
          },
          {
            code: 'IT3602',
            title: 'Mobile Application Architecture',
            credits: 4,
            internal: 23,
            external: 62,
            total: 85,
            grade: 'A+',
            result: 'Pass',
          },
        ]
  )

  function handleAddSubject() {
    setSubjects((prev) => [
      ...prev,
      {
        code: `IT3${selectedSemester}0${prev.length + 1}`,
        title: 'Elective / Lab Subject',
        credits: 3,
        internal: 20,
        external: 55,
        total: 75,
        grade: 'A',
        result: 'Pass',
      },
    ])
  }

  function handleUpdateSubject(index, field, value) {
    setSubjects((prev) => {
      const copy = [...prev]
      const item = { ...copy[index], [field]: value }
      if (field === 'internal' || field === 'external') {
        const intVal = Number(field === 'internal' ? value : item.internal) || 0
        const extVal = Number(field === 'external' ? value : item.external) || 0
        item.total = intVal + extVal
        if (item.total >= 90) item.grade = 'O'
        else if (item.total >= 80) item.grade = 'A+'
        else if (item.total >= 70) item.grade = 'A'
        else if (item.total >= 60) item.grade = 'B+'
        else if (item.total >= 50) item.grade = 'B'
        else item.grade = 'RA'
        item.result = item.total >= 50 && extVal >= 27 ? 'Pass' : 'Reappear'
      }
      copy[index] = item
      return copy
    })
  }

  function handleRemoveSubject(index) {
    setSubjects((prev) => prev.filter((_, i) => i !== index))
  }

  function handleSemesterChange(newSem) {
    setSelectedSemester(newSem)
    const found = (student.semesters || []).find((s) => s.semester === newSem)
    if (found) {
      setSemSgpa(found.sgpa)
      setSubjects(found.marksheets || [])
    } else {
      setSemSgpa('8.00')
      setSubjects([
        {
          code: `IT3${newSem}01`,
          title: `Semester ${newSem} Subject Core`,
          credits: 4,
          internal: 22,
          external: 58,
          total: 80,
          grade: 'A+',
          result: 'Pass',
        },
      ])
    }
  }

  function handleSubmit(e) {
    e.preventDefault()

    const updatedSemesters = [...(student.semesters || [])]
    const idx = updatedSemesters.findIndex((s) => s.semester === selectedSemester)
    const semPayload = {
      semester: selectedSemester,
      sgpa: semSgpa,
      activeArrears: Number(activeArrears),
      credits: subjects.reduce((sum, sub) => sum + (Number(sub.credits) || 0), 0),
      marksheets: subjects,
    }

    if (idx >= 0) {
      updatedSemesters[idx] = semPayload
    } else {
      updatedSemesters.push(semPayload)
    }

    // Sort by semester
    updatedSemesters.sort((a, b) => b.semester - a.semester)

    onSave({
      ...student,
      cgpa: String(cgpa),
      activeArrears: Number(activeArrears),
      arrearHistory: Number(arrearHistory),
      semesters: updatedSemesters,
      lastGradeUpdatedBy: currentUser?.name || 'Department Faculty',
      lastGradeUpdatedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    })
    onClose()
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section
        className="student-modal grade-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="grade-modal-title"
      >
        <div className="modal-heading">
          <div>
            <span className="eyebrow">FACULTY ACADEMIC MODULE</span>
            <h2 id="grade-modal-title">Update Grades &amp; Arrears</h2>
          </div>
          <button
            className="icon-button"
            aria-label="Close dialog"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <div className="grade-student-strip">
          <div className="strip-info">
            <h3>{student.name}</h3>
            <span>
              Roll No: <b>{student.rollNumber || student.id}</b> · {student.dept} · {student.course}
            </span>
          </div>
          <span className="faculty-badge-seal">
            <GraduationCap size={15} /> Faculty Authority Mode
          </span>
        </div>

        <form onSubmit={handleSubmit} className="grade-form">
          <div className="form-row">
            <label>
              Cumulative CGPA (out of 10.0)
              <input
                type="number"
                step="0.01"
                min="0"
                max="10.0"
                value={cgpa}
                onChange={(e) => setCgpa(e.target.value)}
                required
              />
            </label>

            <label>
              Active Standing Arrears
              <input
                type="number"
                min="0"
                max="20"
                value={activeArrears}
                onChange={(e) => setActiveArrears(Number(e.target.value))}
                required
              />
            </label>

            <label>
              Total Arrear History (Cleared)
              <input
                type="number"
                min="0"
                max="30"
                value={arrearHistory}
                onChange={(e) => setArrearHistory(Number(e.target.value))}
                required
              />
            </label>
          </div>

          <div className="grade-semester-selector">
            <div className="sem-header">
              <label>Semester Marksheet</label>
              <div className="sem-tabs">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <button
                    key={sem}
                    type="button"
                    className={`sem-tab-btn ${selectedSemester === sem ? 'active' : ''}`}
                    onClick={() => handleSemesterChange(sem)}
                  >
                    Sem {sem}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-row" style={{ marginTop: '12px' }}>
              <label>
                Semester {selectedSemester} SGPA (out of 10.0)
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10.0"
                  value={semSgpa}
                  onChange={(e) => setSemSgpa(e.target.value)}
                  required
                />
              </label>
            </div>
          </div>

          <div className="marksheets-table-wrap">
            <div className="marksheets-table-header">
              <span>Semester {selectedSemester} Subject Marksheets</span>
              <button
                type="button"
                className="button button-secondary-sm"
                onClick={handleAddSubject}
              >
                <Plus size={14} /> Add Subject
              </button>
            </div>

            <div className="marksheets-editor-table">
              <div className="editor-row editor-heading">
                <span>Code</span>
                <span>Subject Title</span>
                <span>Credits</span>
                <span>Int (40)</span>
                <span>Ext (60)</span>
                <span>Total</span>
                <span>Grade</span>
                <span>Result</span>
                <span>Action</span>
              </div>

              {subjects.map((sub, i) => (
                <div key={i} className="editor-row">
                  <input
                    value={sub.code}
                    onChange={(e) => handleUpdateSubject(i, 'code', e.target.value)}
                    placeholder="IT3601"
                    className="cell-input"
                  />
                  <input
                    value={sub.title}
                    onChange={(e) => handleUpdateSubject(i, 'title', e.target.value)}
                    placeholder="Subject Title"
                    className="cell-input wide"
                  />
                  <input
                    type="number"
                    value={sub.credits}
                    onChange={(e) => handleUpdateSubject(i, 'credits', Number(e.target.value))}
                    className="cell-input num"
                  />
                  <input
                    type="number"
                    max="40"
                    min="0"
                    value={sub.internal}
                    onChange={(e) => handleUpdateSubject(i, 'internal', Number(e.target.value))}
                    className="cell-input num"
                  />
                  <input
                    type="number"
                    max="60"
                    min="0"
                    value={sub.external}
                    onChange={(e) => handleUpdateSubject(i, 'external', Number(e.target.value))}
                    className="cell-input num"
                  />
                  <span className="calculated-total">{sub.total}</span>
                  <span className={`grade-tag grade-${sub.grade.toLowerCase()}`}>{sub.grade}</span>
                  <span className={`result-tag result-${sub.result.toLowerCase()}`}>{sub.result}</span>
                  <button
                    type="button"
                    className="icon-button-sm text-danger"
                    onClick={() => handleRemoveSubject(i)}
                    title="Remove subject"
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
              <Save size={16} /> Save Academic Records
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
