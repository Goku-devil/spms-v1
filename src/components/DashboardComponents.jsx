import { useState } from 'react'
import { ArrowUpDown, ChevronDown, Edit3, Eye, ShieldCheck, Trash2 } from 'lucide-react'

export function PageHeading({ eyebrow, title, description, action }) {
  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  )
}

export function StatCard({ label, value, change, detail, icon: Icon, tone, onClick }) {
  return (
    <article
      className={`stat-card ${onClick ? 'stat-card-clickable' : ''}`}
      onClick={onClick}
    >
      <div className="stat-top">
        <span>{label}</span>
        <span className={`stat-icon ${tone}`}>
          <Icon size={19} />
        </span>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-foot">
        <span className="stat-change">{change ? `↗ ${change}` : 'Live data'}</span>
        <span>{detail}</span>
      </div>
    </article>
  )
}

export function StudentTable({
  students,
  compact = false,
  totalCount = students.length,
  onNavigate,
  onViewStudent,
  onEditStudent,
  onDeleteStudent,
  access,
}) {
  const [sortField, setSortField] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  function handleSort(field) {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const sortedStudents = [...students].sort((a, b) => {
    let aVal = a[sortField] || ''
    let bVal = b[sortField] || ''
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase()
      bVal = bVal.toLowerCase()
    }
    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  return (
    <div className="table-scroll">
      <table className="student-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')} className="sortable-th">
              <span className="th-content">
                STUDENT
                <ArrowUpDown size={12} className={sortField === 'name' ? 'th-active-icon' : ''} />
              </span>
            </th>
            <th onClick={() => handleSort('rollNumber')} className="sortable-th">
              <span className="th-content">
                ROLL NO
                <ArrowUpDown size={12} className={sortField === 'rollNumber' ? 'th-active-icon' : ''} />
              </span>
            </th>
            <th onClick={() => handleSort('dept')} className="sortable-th">
              <span className="th-content">
                DEPT / PROGRAM
                <ArrowUpDown size={12} className={sortField === 'dept' ? 'th-active-icon' : ''} />
              </span>
            </th>
            <th onClick={() => handleSort('cgpa')} className="sortable-th">
              <span className="th-content">
                CGPA
                <ArrowUpDown size={12} className={sortField === 'cgpa' ? 'th-active-icon' : ''} />
              </span>
            </th>
            <th onClick={() => handleSort('activeArrears')} className="sortable-th">
              <span className="th-content">
                ARREARS
                <ArrowUpDown size={12} className={sortField === 'activeArrears' ? 'th-active-icon' : ''} />
              </span>
            </th>
            <th>BADGES</th>
            <th onClick={() => handleSort('status')} className="sortable-th">
              <span className="th-content">
                STATUS
                <ArrowUpDown size={12} className={sortField === 'status' ? 'th-active-icon' : ''} />
              </span>
            </th>
            <th aria-label="Actions">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {sortedStudents.length ? (
            sortedStudents.map((student) => {
              const badgesCount = (student.badges || []).length
              const arrears = student.activeArrears !== undefined ? student.activeArrears : 0
              return (
                <tr
                  key={student.id}
                  className="student-table-row"
                  onClick={() => onViewStudent && onViewStudent(student)}
                >
                  <td>
                    <div className="student-cell">
                      <span className={`avatar avatar-${student.color}`}>
                        {student.initials}
                      </span>
                      <span className="student-name">
                        {student.name}
                        <small>{student.email}</small>
                      </span>
                    </div>
                  </td>
                  <td className="muted-cell">
                    <b>{student.rollNumber || student.id}</b>
                  </td>
                  <td>
                    <span className="table-dept-tag">{student.dept}</span>
                    <small className="table-sub-course">{student.course}</small>
                  </td>
                  <td>
                    <b className="table-cgpa-val">{student.cgpa || '8.50'}</b>
                  </td>
                  <td>
                    <span className={`table-arrear-badge ${arrears > 0 ? 'badge-arrear-active' : 'badge-arrear-zero'}`}>
                      {arrears > 0 ? `${arrears} Arrear` : '0 Arrears'}
                    </span>
                  </td>
                  <td>
                    <span className="table-badge-chip">
                      <ShieldCheck size={14} />
                      <b>{badgesCount}</b>
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status status-${(student.status || 'enrolled').toLowerCase()}`}
                    >
                      <i />
                      {student.status || 'Enrolled'}
                    </span>
                  </td>
                  <td>
                    <div
                      className="row-actions"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="row-action-btn"
                        title={`View ${student.name}'s profile`}
                        onClick={() => onViewStudent && onViewStudent(student)}
                      >
                        <Eye size={16} />
                      </button>
                      {access?.canEditStudents && onEditStudent && (
                        <button
                          className="row-action-btn"
                          title={`Edit ${student.name}`}
                          onClick={() => onEditStudent(student)}
                        >
                          <Edit3 size={15} />
                        </button>
                      )}
                      {access?.canDeleteStudents && onDeleteStudent && (
                        <button
                          className="row-action-btn btn-danger-hover"
                          title={`Delete ${student.name}`}
                          onClick={() => {
                            if (window.confirm(`Delete ${student.name}?`)) {
                              onDeleteStudent(student.id)
                            }
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td colSpan="8" className="empty-state">
                No students match your query or filter.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {compact && (
        <div className="table-footer">
          <span>
            Showing {students.length} of {totalCount} students
          </span>
          {onNavigate && (
            <button
              className="text-button"
              onClick={() => onNavigate('Students')}
            >
              View all students <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
      )}
    </div>
  )
}

const enrollmentDatasets = {
  'This year (2026)': {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    current: [34, 48, 43, 61, 54, 73, 65, 81, 70, 88, 76, 96],
    previous: [24, 32, 28, 42, 38, 51, 44, 58, 48, 62, 53, 68],
    subtitle: 'Fall & Spring 2026 Academic Cycle',
  },
  'Previous year (2025)': {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    current: [24, 32, 28, 42, 38, 51, 44, 58, 48, 62, 53, 68],
    previous: [18, 22, 21, 31, 29, 39, 36, 43, 38, 49, 41, 52],
    subtitle: 'Historical 2025 Enrollment Data',
  },
  'Semester 1 (Jan - Jun)': {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    current: [34, 48, 43, 61, 54, 73],
    previous: [24, 32, 28, 42, 38, 51],
    subtitle: 'First Half Institutional Registrations',
  },
  'Semester 2 (Jul - Dec)': {
    months: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    current: [65, 81, 70, 88, 76, 96],
    previous: [44, 58, 48, 62, 53, 68],
    subtitle: 'Second Half Institutional Registrations',
  },
}

export function EnrollmentChart() {
  const [period, setPeriod] = useState('This year (2026)')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const dataset = enrollmentDatasets[period] || enrollmentDatasets['This year (2026)']

  return (
    <div className="chart-panel">
      <div className="panel-heading">
        <div>
          <h2>Enrollment Overview</h2>
          <p>{dataset.subtitle}</p>
        </div>
        <div className="dropdown-wrapper">
          <button
            className="select-button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-expanded={dropdownOpen}
          >
            {period} <ChevronDown size={15} />
          </button>
          {dropdownOpen && (
            <div className="chart-period-menu">
              {Object.keys(enrollmentDatasets).map((opt) => (
                <button
                  key={opt}
                  className={`menu-item ${period === opt ? 'menu-item-active' : ''}`}
                  onClick={() => {
                    setPeriod(opt)
                    setDropdownOpen(false)
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="chart-legend">
        <span>
          <i className="legend-current" />
          Selected period
        </span>
        <span>
          <i className="legend-previous" />
          Benchmark period
        </span>
      </div>

      <div className="chart-area">
        <div className="chart-y-labels">
          <span>300</span>
          <span>200</span>
          <span>100</span>
          <span>0</span>
        </div>
        <div className="chart-plot">
          <div className="chart-grid">
            <i />
            <i />
            <i />
            <i />
          </div>
          <div
            className="bars"
            style={{
              gridTemplateColumns: `repeat(${dataset.months.length}, minmax(0, 1fr))`,
            }}
          >
            {dataset.current.map((value, index) => (
              <div className="bar-group" key={dataset.months[index]}>
                <span
                  className="bar bar-prev"
                  title={`Benchmark: ${dataset.previous[index]}`}
                  style={{ height: `${dataset.previous[index] * 0.9}%` }}
                />
                <span
                  className="bar bar-current"
                  title={`Current: ${value}`}
                  style={{ height: `${value}%` }}
                />
              </div>
            ))}
          </div>
          <div
            className="chart-x-labels"
            style={{
              gridTemplateColumns: `repeat(${dataset.months.length}, minmax(0, 1fr))`,
            }}
          >
            {dataset.months.map((month) => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}