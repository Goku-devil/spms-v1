import { useState, useMemo } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Code2,
  Download,
  Eye,
  FileCheck2,
  FileText,
  Globe,
  GraduationCap,
  IdCard,
  Link,
  Lock,
  Mail,
  MapPin,
  Phone,
  Plus,
  Save,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  UserPen,
  Users,
  X,
  XCircle,
} from 'lucide-react'
import {
  aecInstitutionInfo,
  departments,
  exportPlacementCriteriaCSV,
  exportReportSummary,
  exportStudentsToCSV,
  facultyCount,
} from '../data.js'
import collegeLogo from '../assets/logo.png'
import { EnrollmentChart, PageHeading, StatCard, StudentTable } from './DashboardComponents.jsx'

export function OverviewSection({
  students,
  filteredStudents,
  onNavigate,
  user,
  access,
  events,
  certificates,
  onOpenCalendar,
  onViewStudent,
  onAddStudent,
}) {
  const enrolledCount = students.filter((student) => student.status === 'Enrolled').length
  const verifiedBadgesCount = certificates.filter((c) => c.status === 'Verified').length
  const placementReadyCount = students.filter(
    (s) => s.dept === 'IT' && Number(s.cgpa) >= 8.0 && (!s.activeArrears || s.activeArrears === 0)
  ).length

  return (
    <>
      {/* AEC Institutional Presentation Banner */}
      <div className="aec-overview-hero">
        <div className="aec-hero-crest">
          <img src={collegeLogo} alt="AEC Crest" className="hero-crest-img" />
        </div>
        <div className="aec-hero-text">
          <span className="hero-eyebrow">
            {aecInstitutionInfo.autonomousText} · {aecInstitutionInfo.department}
          </span>
          <h2>{aecInstitutionInfo.name}</h2>
          <div className="hero-tags-row">
            <span className="hero-tag"><ShieldCheck size={14} /> NBA ACCREDITED</span>
            <span className="hero-tag"><Award size={14} /> NAAC &apos;A&apos; GRADE</span>
            <span className="hero-tag hero-tag-motto">{aecInstitutionInfo.motto}</span>
          </div>
        </div>
      </div>

      <PageHeading
        eyebrow="EVEN SEMESTER 2025 - 2026"
        title={`Welcome, ${user.name.split(' ')[0]}`}
        description="Unified portal for student profiles, academic marksheets, and faculty skill credentials."
        action={
          <div className="heading-actions-group">
            {access.sections.includes('Verify your skills') && (
              <button
                className="button button-secondary"
                onClick={() => onNavigate('Verify your skills')}
              >
                <Award size={17} /> Verify skills
              </button>
            )}
            {access.canAddStudents && (
              <button
                className="button button-primary"
                onClick={onAddStudent}
              >
                <Plus size={17} /> Add student
              </button>
            )}
          </div>
        }
      />

      <section className="stats-grid" aria-label="Student statistics">
        <StatCard
          label="Total students"
          value={students.length}
          detail="active directory roster"
          icon={Users}
          tone="tone-blue"
          onClick={() => onNavigate('Students')}
        />
        <StatCard
          label="Placement ready"
          value={placementReadyCount}
          detail="IT students >8.0 CGPA & 0 arrears"
          icon={GraduationCap}
          tone="tone-green"
          onClick={() => onNavigate('Reports')}
        />
        <StatCard
          label="Verified skill badges"
          value={verifiedBadgesCount}
          detail="awarded to student profiles"
          icon={ShieldCheck}
          tone="tone-orange"
          onClick={() => onNavigate('Verify your skills')}
        />
        <StatCard
          label="Enrolled students"
          value={enrolledCount}
          detail={`${Math.round((enrolledCount / (students.length || 1)) * 100)}% roster enrollment`}
          icon={CalendarDays}
          tone="tone-pink"
          onClick={() => onNavigate('Students')}
        />
      </section>

      <section className="overview-grid">
        <EnrollmentChart />
        <aside className="activity-panel">
          <div className="panel-heading">
            <div>
              <h2>Upcoming dates</h2>
              <p>Academic deadlines and calendar</p>
            </div>
            <button
              className="icon-button"
              aria-label="View academic calendar"
              onClick={onOpenCalendar}
              title="Open full calendar"
            >
              <CalendarDays size={18} />
            </button>
          </div>
          <div className="event-list">
            {events.slice(0, 3).map((event) => (
              <div key={event.id} className="event-item">
                <span className="event-date">
                  <b>{event.day}</b>
                  <small>{event.month}</small>
                </span>
                <div>
                  <b>{event.title}</b>
                  <small>{event.time}</small>
                </div>
              </div>
            ))}
          </div>
          <button className="calendar-link" onClick={onOpenCalendar}>
            Open academic calendar <span>→</span>
          </button>
        </aside>
      </section>

      <section className="recent-panel">
        <div className="panel-heading">
          <div>
            <h2>Student roster</h2>
            <p>Recently registered student records</p>
          </div>
          <button className="text-button" onClick={() => onNavigate('Students')}>
            View all students <span>→</span>
          </button>
        </div>
        <StudentTable
          students={filteredStudents.slice(0, 5)}
          compact
          totalCount={students.length}
          onNavigate={onNavigate}
          onViewStudent={onViewStudent}
          access={access}
        />
      </section>

      <footer className="page-footer">
        <span>© 2026 Annapoorana Engineering College (Autonomous) · Department of IT</span>
        <span>
          Student Portal <i /> All systems operational
        </span>
      </footer>
    </>
  )
}

export function StudentsSection({
  students,
  onAddStudent,
  onViewStudent,
  onEditStudent,
  onDeleteStudent,
  access,
  showToast,
}) {
  const [statusFilter, setStatusFilter] = useState('All students')
  const [deptFilter, setDeptFilter] = useState('All departments')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  // Filter pipeline
  const filtered = useMemo(() => {
    return students.filter((student) => {
      const matchStatus =
        statusFilter === 'All students' ? true : student.status === statusFilter
      const matchDept =
        deptFilter === 'All departments'
          ? true
          : (student.dept || '').toLowerCase() === deptFilter.toLowerCase()
      return matchStatus && matchDept
    })
  }, [students, statusFilter, deptFilter])

  // Reset page when filter changes
  const totalPages = Math.ceil(filtered.length / pageSize) || 1
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const startIndex = (safeCurrentPage - 1) * pageSize
  const visibleStudents = filtered.slice(startIndex, startIndex + pageSize)

  function handleExport() {
    exportStudentsToCSV(filtered)
    if (showToast) showToast(`Exported ${filtered.length} student records to CSV`)
  }

  return (
    <>
      <PageHeading
        eyebrow="STUDENT DIRECTORY"
        title="Students"
        description="Manage student profiles, academic degrees, and verified skill badges."
        action={
          <div className="heading-actions-group">
            <button
              className="button button-secondary"
              onClick={handleExport}
              title="Download roster as CSV file"
            >
              <Download size={16} />
              <span>Export CSV</span>
            </button>
            {access.canAddStudents && (
              <button
                className="button button-primary"
                onClick={onAddStudent}
              >
                <Plus size={16} />
                <span>Add student</span>
              </button>
            )}
          </div>
        }
      />

      <section className="directory-panel">
        <div className="directory-toolbar">
          <div className="filter-tabs" role="tablist" aria-label="Filter students">
            {['All students', 'Enrolled', 'Pending'].map((filter) => (
              <button
                key={filter}
                className={statusFilter === filter ? 'filter-active' : ''}
                onClick={() => {
                  setStatusFilter(filter)
                  setCurrentPage(1)
                }}
              >
                {filter}
                {filter === 'All students' && <span>{students.length}</span>}
              </button>
            ))}
          </div>

          <div className="toolbar-controls">
            <label className="select-wrapper">
              <span className="sr-only">Filter by Department</span>
              <select
                className="select-button-native"
                value={deptFilter}
                onChange={(e) => {
                  setDeptFilter(e.target.value)
                  setCurrentPage(1)
                }}
              >
                <option value="All departments">All departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <StudentTable
          students={visibleStudents}
          totalCount={filtered.length}
          onViewStudent={onViewStudent}
          onEditStudent={onEditStudent}
          onDeleteStudent={onDeleteStudent}
          access={access}
        />

        <div className="pagination">
          <div className="pagination-info">
            <span>
              Showing <b>{filtered.length ? startIndex + 1 : 0}</b> to{' '}
              <b>{Math.min(startIndex + pageSize, filtered.length)}</b> of{' '}
              <b>{filtered.length}</b> student records
            </span>
            <label className="page-size-selector">
              <span>Per page:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value))
                  setCurrentPage(1)
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </label>
          </div>

          <div className="pagination-nav">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safeCurrentPage <= 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pNum = idx + 1
              return (
                <button
                  key={pNum}
                  className={safeCurrentPage === pNum ? 'page-number' : ''}
                  onClick={() => setCurrentPage(pNum)}
                >
                  {pNum}
                </button>
              )
            })}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safeCurrentPage >= totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </section>

      <footer className="page-footer">
        <span>© 2026 Annapoorana Engineering College (Autonomous) · Department of IT</span>
        <span>
          Student Portal <i /> All systems operational
        </span>
      </footer>
    </>
  )
}

export function StudentHomeSection({
  user,
  onNavigate,
  courses = [],
  students = [],
  _certificates = [],
  onOpenResume,
  onOpenDigitalId,
  onOpenEditProfile,
}) {
  const student =
    students.find((item) => item.id === user?.studentId || item.rollNumber === user?.rollNumber) ||
    students[0] || {
      name: user?.name || 'Gokulraj A S',
      email: user?.email || 'gokulraj.610225205019@aec.ac.in',
      id: 'ST-2026-001',
      rollNumber: '610225205019',
      dept: 'IT',
      course: 'B.Tech Information Technology',
      batch: '2022 - 2026',
      year: 'Year 4',
      color: 'blue',
      initials: 'GA',
      cgpa: '8.65',
      activeArrears: 0,
      phone: '+91 98421 50191',
      bloodGroup: 'O+',
      guardian: 'S. Arumugam (+91 98421 11000)',
      address: 'NH-47, Sankari Main Road, Salem, Tamil Nadu - 636308',
      badges: [],
      achievements: [],
    }

  const studentBadges = student.badges || []
  const enrolledCourseList = courses.filter((c) =>
    (student.enrolledCourses || ['IT-401', 'IT-402', 'CS-403']).includes(c.id)
  )

  const handleEditProfileNav = () => {
    if (onOpenEditProfile) {
      onNavigate('Customize Profile')
    } else {
      onNavigate('Customize Profile')
    }
  }

  return (
    <>
      <PageHeading
        eyebrow="STUDENT SELF-SERVICE · ACADEMIC AUDIT"
        title={`Welcome, ${student.name.split(' ')[0]}`}
        description="Official student profile overview and basic institutional academic records."
        action={
          <div className="heading-actions-group">
            <button
              type="button"
              className="button button-primary"
              onClick={handleEditProfileNav}
            >
              <UserPen size={16} /> Customize Profile
            </button>
            <button
              type="button"
              className="button button-secondary"
              onClick={() => onOpenDigitalId?.(student)}
            >
              <IdCard size={16} /> Campus ID
            </button>
            <button
              type="button"
              className="button button-secondary"
              onClick={() => onOpenResume?.(student)}
            >
              <FileText size={16} /> Resume Builder
            </button>
          </div>
        }
      />

      {/* Minimal Student Profile Card */}
      <section className="student-minimal-card">
        {/* Header Cluster */}
        <div className="minimal-card-header">
          <div className="minimal-avatar-cluster">
            <span className={`avatar avatar-${student.color || 'blue'}`}>
              {student.initials || 'ST'}
            </span>
            <div className="minimal-header-meta">
              <div className="minimal-name-row">
                <h2>{student.name}</h2>
                <span className="status status-enrolled">
                  <i /> {student.status || 'Enrolled'}
                </span>
              </div>
              <p className="minimal-sub-id">
                <span>Roll No: <b>{student.rollNumber || student.id}</b></span>
                <span className="separator-dot">·</span>
                <span>Dept: <b>{student.dept || 'IT'}</b></span>
                <span className="separator-dot">·</span>
                <span>{student.course || 'B.Tech Information Technology'}</span>
              </p>
            </div>
          </div>

          <div className="minimal-header-tags">
            <span className="minimal-badge-pill">
              Batch {student.batch || '2022 - 2026'}
            </span>
            <span className="minimal-badge-pill subtle">
              {student.year || 'Year 4'} · Sem 6
            </span>
          </div>
        </div>

        {/* Academic Performance KPI Bar */}
        <div className="minimal-kpi-bar">
          <div className="minimal-kpi-item">
            <span className="kpi-label">CUMULATIVE CGPA</span>
            <span className="kpi-value text-accent">{student.cgpa || '8.65'} <small>/ 10.00</small></span>
          </div>
          <div className="minimal-kpi-item">
            <span className="kpi-label">STANDING ARREARS</span>
            <span className={`kpi-value ${student.activeArrears > 0 ? 'text-danger' : 'text-success'}`}>
              {student.activeArrears > 0 ? `${student.activeArrears} Standing` : '0 Arrears'}
            </span>
          </div>
          <div className="minimal-kpi-item">
            <span className="kpi-label">REGISTERED COURSES</span>
            <span className="kpi-value">{enrolledCourseList.length || 3} Subjects</span>
          </div>
          <div className="minimal-kpi-item">
            <span className="kpi-label">VERIFIED BADGES</span>
            <span className="kpi-value text-gold">
              <ShieldCheck size={16} /> {studentBadges.length} Verified
            </span>
          </div>
        </div>

        {/* Basic Student Details Grid */}
        <div className="minimal-details-section">
          <div className="minimal-section-title">
            <span>STUDENT BASIC DETAILS</span>
            <button
              type="button"
              className="text-button"
              onClick={handleEditProfileNav}
            >
              <UserPen size={14} /> Customize profile
            </button>
          </div>

          <div className="minimal-details-grid">
            <div className="minimal-detail-item">
              <label>FULL REGISTERED NAME</label>
              <b>{student.name}</b>
            </div>
            <div className="minimal-detail-item">
              <label>ROLL NUMBER</label>
              <b>{student.rollNumber || student.id}</b>
            </div>
            <div className="minimal-detail-item">
              <label>DEPARTMENT</label>
              <b>{student.dept || 'Information Technology (IT)'}</b>
            </div>
            <div className="minimal-detail-item">
              <label>DEGREE &amp; PROGRAM</label>
              <b>{student.course || 'B.Tech Information Technology'}</b>
            </div>
            <div className="minimal-detail-item">
              <label>COLLEGE EMAIL</label>
              <b>{student.email}</b>
            </div>
            <div className="minimal-detail-item">
              <label>CONTACT PHONE</label>
              <b>{student.phone || '+91 98421 50191'}</b>
            </div>
            <div className="minimal-detail-item">
              <label>CURRENT ACADEMIC TERM</label>
              <b>{student.year || 'Year 4'} · Semester 6</b>
            </div>
            <div className="minimal-detail-item">
              <label>ACADEMIC BATCH</label>
              <b>{student.batch || '2022 - 2026'}</b>
            </div>
            <div className="minimal-detail-item">
              <label>BLOOD GROUP</label>
              <b>{student.bloodGroup || 'O+'}</b>
            </div>
            <div className="minimal-detail-item">
              <label>PARENT / GUARDIAN</label>
              <b>{student.guardian || 'S. Arumugam (+91 98421 11000)'}</b>
            </div>
            <div className="minimal-detail-item">
              <label>FACULTY ADVISOR</label>
              <b>Dr. P. Murugesan (Asst. Prof, IT)</b>
            </div>
            <div className="minimal-detail-item">
              <label>PERMANENT RESIDENCE</label>
              <b>{student.address || 'Salem, Tamil Nadu - 636308'}</b>
            </div>
          </div>

          {student.bio && (
            <div className="minimal-bio-box">
              <label>CAREER OBJECTIVE / BIO</label>
              <p>{student.bio}</p>
            </div>
          )}
        </div>

        {/* Minimal Bottom Prompt */}
        <div className="minimal-card-footer">
          <div className="footer-prompt-info">
            <Sparkles size={18} className="prompt-icon" />
            <div>
              <b>Looking to customize your profile details?</b>
              <span>Update your phone number, address, avatar styling, technical skills, and achievements on the dedicated customization page.</span>
            </div>
          </div>
          <button
            type="button"
            className="button button-primary-sm"
            onClick={handleEditProfileNav}
          >
            <UserPen size={15} /> Customize Profile Page <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section className="minimal-portal-shortcuts">
        <div
          className="shortcut-card"
          onClick={() => onNavigate('Customize Profile')}
          role="button"
          tabIndex={0}
        >
          <div className="shortcut-icon-box">
            <UserPen size={22} />
          </div>
          <div className="shortcut-text">
            <h3>Customize Profile</h3>
            <p>Update personal contact info, bio, avatar color, skills &amp; social profiles on a dedicated full page.</p>
            <span className="shortcut-link">Open profile page <ArrowRight size={13} /></span>
          </div>
        </div>

        <div
          className="shortcut-card"
          onClick={() => onNavigate('Verify your skills')}
          role="button"
          tabIndex={0}
        >
          <div className="shortcut-icon-box">
            <Award size={22} />
          </div>
          <div className="shortcut-text">
            <h3>Verify Your Skills</h3>
            <p>Upload professional certificates to earn authenticated faculty skill badges.</p>
            <span className="shortcut-link">Go to verifications <ArrowRight size={13} /></span>
          </div>
        </div>

        <div
          className="shortcut-card"
          onClick={() => onNavigate('Courses')}
          role="button"
          tabIndex={0}
        >
          <div className="shortcut-icon-box">
            <BookOpen size={22} />
          </div>
          <div className="shortcut-text">
            <h3>Academic Courses</h3>
            <p>Review registered semester course modules, syllabi, credits, and timetable.</p>
            <span className="shortcut-link">View course catalog <ArrowRight size={13} /></span>
          </div>
        </div>
      </section>

      <footer className="page-footer">
        <span>© 2026 Annapoorana Engineering College (Autonomous) · Department of IT</span>
        <span>
          Student Portal <i /> All systems operational
        </span>
      </footer>
    </>
  )
}

export function CustomizeProfileSection({
  user,
  students = [],
  onSaveProfile,
  onNavigate,
  showToast,
}) {
  const student =
    students.find((item) => item.id === user?.studentId || item.rollNumber === user?.rollNumber) ||
    students[0] || {
      name: user?.name || 'Gokulraj A S',
      email: user?.email || 'gokulraj.610225205019@aec.ac.in',
      id: 'ST-2026-001',
      rollNumber: '610225205019',
      dept: 'IT',
      course: 'B.Tech Information Technology',
      batch: '2022 - 2026',
      year: 'Year 4',
      color: 'blue',
      initials: 'GA',
      cgpa: '8.65',
      activeArrears: 0,
      phone: '+91 98421 50191',
      bloodGroup: 'O+',
      guardian: 'S. Arumugam (+91 98421 11000)',
      address: 'NH-47, Sankari Main Road, Salem, Tamil Nadu - 636308',
      badges: [],
      achievements: [],
    }

  const [color, setColor] = useState(student.color || 'blue')
  const [phone, setPhone] = useState(student.phone || '')
  const [altEmail, setAltEmail] = useState(student.altEmail || '')
  const [address, setAddress] = useState(student.address || '')
  const [bloodGroup, setBloodGroup] = useState(student.bloodGroup || 'O+')
  const [guardian, setGuardian] = useState(student.guardian || '')
  const [emergencyContact, setEmergencyContact] = useState(student.emergencyContact || '')
  const [bio, setBio] = useState(student.bio || 'Information Technology undergraduate specializing in full-stack web applications, cloud systems, and scalable backend services.')
  const [linkedIn, setLinkedIn] = useState(student.linkedIn || 'https://linkedin.com/in/gokulraj-as')
  const [github, setGithub] = useState(student.github || 'https://github.com/Goku-devil')
  const [portfolio, setPortfolio] = useState(student.portfolio || 'https://gokulraj.dev')
  const [skills, setSkills] = useState(student.skills || ['React.js', 'Node.js', 'Python', 'PostgreSQL', 'Cloud Infrastructure', 'REST APIs', 'Docker'])
  const [newSkillInput, setNewSkillInput] = useState('')
  const [achievements, setAchievements] = useState(student.achievements || [])

  // Achievement sub-form state
  const [newAchTitle, setNewAchTitle] = useState('')
  const [newAchType, setNewAchType] = useState('Internship')
  const [newAchOrg, setNewAchOrg] = useState('')
  const [newAchDate, setNewAchDate] = useState('')

  const colorPalette = [
    { name: 'Blue', value: 'blue', bg: '#e0eef5', text: '#2b5773' },
    { name: 'Coral', value: 'coral', bg: '#f8e4df', text: '#8e4f43' },
    { name: 'Green', value: 'green', bg: '#e2f1e1', text: '#32643c' },
    { name: 'Yellow', value: 'yellow', bg: '#f7eed3', text: '#7d6023' },
    { name: 'Pink', value: 'pink', bg: '#f6e3ee', text: '#834868' },
  ]

  function handleAddSkill(e) {
    e?.preventDefault()
    const trimmed = newSkillInput.trim()
    if (trimmed && !skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed])
      setNewSkillInput('')
    }
  }

  function handleRemoveSkill(s) {
    setSkills((prev) => prev.filter((item) => item !== s))
  }

  function handleAddAchievement(e) {
    e?.preventDefault()
    if (!newAchTitle.trim()) return
    const newAch = {
      id: `ach-${Date.now()}`,
      title: newAchTitle.trim(),
      type: newAchType,
      organization: newAchOrg.trim() || 'Academic Organization',
      date: newAchDate || new Date().toISOString().slice(0, 10),
      status: 'Approved',
    }
    setAchievements((prev) => [newAch, ...prev])
    setNewAchTitle('')
    setNewAchOrg('')
    setNewAchDate('')
  }

  function handleRemoveAchievement(id) {
    setAchievements((prev) => prev.filter((a) => a.id !== id))
  }

  function handleSave(e) {
    e?.preventDefault()
    const updated = {
      ...student,
      color,
      phone,
      altEmail,
      address,
      bloodGroup,
      guardian,
      emergencyContact,
      bio,
      linkedIn,
      github,
      portfolio,
      skills,
      achievements,
    }
    onSaveProfile?.(updated)
    if (showToast) {
      showToast('Profile customizations saved successfully!')
    }
  }

  return (
    <>
      <PageHeading
        eyebrow="STUDENT SELF-SERVICE · PROFILE SETTINGS"
        title="Customize Profile"
        description="Update your avatar theme, contact details, personal bio, skills, and extracurricular achievements."
        action={
          <div className="heading-actions-group">
            <button
              type="button"
              className="button button-secondary"
              onClick={() => onNavigate('Overview')}
            >
              <ArrowLeft size={16} /> Back to Overview
            </button>
            <button
              type="button"
              className="button button-primary"
              onClick={handleSave}
            >
              <Save size={16} /> Save Changes
            </button>
          </div>
        }
      />

      <form onSubmit={handleSave} className="profile-customizer-layout">
        {/* Left Column: Live Card Preview & Avatar Styling */}
        <aside className="customizer-preview-col">
          <div className="customizer-preview-card">
            <span className="preview-label">LIVE PROFILE PREVIEW</span>

            <div className="preview-avatar-box">
              <span className={`avatar avatar-${color} preview-large-avatar`}>
                {student.initials || 'ST'}
              </span>
              <div className="preview-avatar-info">
                <h3>{student.name}</h3>
                <p>Roll No: {student.rollNumber || student.id}</p>
                <span className="status status-enrolled">
                  <i /> {student.status || 'Enrolled'}
                </span>
              </div>
            </div>

            {/* Avatar Color Picker */}
            <div className="avatar-palette-picker">
              <label className="palette-label">AVATAR THEME COLOR</label>
              <div className="palette-options">
                {colorPalette.map((cp) => (
                  <button
                    key={cp.value}
                    type="button"
                    className={`palette-swatch ${color === cp.value ? 'selected' : ''}`}
                    style={{ background: cp.bg, color: cp.text }}
                    onClick={() => setColor(cp.value)}
                    title={`Select ${cp.name} theme`}
                  >
                    {color === cp.value && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Read-Only Academic Record Info */}
            <div className="academic-record-note">
              <div className="note-title">
                <Lock size={14} /> Institutional Record
              </div>
              <p>
                Your official Roll Number (<b>{student.rollNumber || student.id}</b>), Department (<b>{student.dept || 'IT'}</b>), and Degree Program are verified by the Office of the Registrar.
              </p>
            </div>

            {/* Bio Preview */}
            <div className="customizer-field-group">
              <label htmlFor="student-bio">
                PERSONAL BIO / OBJECTIVE
              </label>
              <textarea
                id="student-bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                placeholder="Brief summary of your academic interests, career goals, or technical specializations..."
              />
              <span className="field-hint">Appears on your placement resume and profile card.</span>
            </div>
          </div>
        </aside>

        {/* Right Column: Customization Form Sections */}
        <div className="customizer-forms-col">
          {/* Card 1: Contact & Personal Details */}
          <section className="customizer-card">
            <div className="customizer-card-header">
              <div className="card-header-icon">
                <Phone size={18} />
              </div>
              <div>
                <h3>Personal &amp; Contact Details</h3>
                <p>Keep your phone number and addresses updated for institutional alerts</p>
              </div>
            </div>

            <div className="customizer-grid-2">
              <label>
                Mobile Phone Number
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98421 XXXXX"
                  required
                />
              </label>

              <label>
                Personal / Alternate Email
                <input
                  type="email"
                  value={altEmail}
                  onChange={(e) => setAltEmail(e.target.value)}
                  placeholder="personal.email@gmail.com"
                />
              </label>
            </div>

            <div className="customizer-grid-2" style={{ marginTop: '12px' }}>
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

              <label>
                Emergency Contact Number
                <input
                  type="text"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  placeholder="+91 98421 11000"
                />
              </label>
            </div>

            <label style={{ marginTop: '12px' }}>
              Parent / Guardian Details
              <input
                type="text"
                value={guardian}
                onChange={(e) => setGuardian(e.target.value)}
                placeholder="e.g. S. Arumugam (+91 98421 11000)"
              />
            </label>

            <label style={{ marginTop: '12px' }}>
              Residential / Permanent Address
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                placeholder="Door No, Street Name, City, District, PIN code"
              />
            </label>
          </section>

          {/* Card 2: Professional & Social Profiles */}
          <section className="customizer-card">
            <div className="customizer-card-header">
              <div className="card-header-icon">
                <Globe size={18} />
              </div>
              <div>
                <h3>Social &amp; Portfolio Profiles</h3>
                <p>Links included on your placement resumes and campus directory</p>
              </div>
            </div>

            <div className="customizer-grid-2">
              <label>
                LinkedIn Profile URL
                <div className="input-with-icon">
                  <Link size={16} />
                  <input
                    type="url"
                    value={linkedIn}
                    onChange={(e) => setLinkedIn(e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </label>

              <label>
                GitHub Profile URL
                <div className="input-with-icon">
                  <Code2 size={16} />
                  <input
                    type="url"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    placeholder="https://github.com/username"
                  />
                </div>
              </label>
            </div>

            <label style={{ marginTop: '12px' }}>
              Portfolio / Website URL
              <div className="input-with-icon">
                <Globe size={16} />
                <input
                  type="url"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  placeholder="https://yourportfolio.dev"
                />
              </div>
            </label>
          </section>

          {/* Card 3: Key Skills */}
          <section className="customizer-card">
            <div className="customizer-card-header">
              <div className="card-header-icon">
                <Sparkles size={18} />
              </div>
              <div>
                <h3>Technical Skills &amp; Competencies</h3>
                <p>Add tools, languages, and frameworks for automated placement indexing</p>
              </div>
            </div>

            <div className="skills-tag-group">
              {skills.map((skill) => (
                <span key={skill} className="skill-tag-pill">
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    title={`Remove ${skill}`}
                    aria-label={`Remove ${skill}`}
                  >
                    <X size={13} />
                  </button>
                </span>
              ))}
            </div>

            <div className="add-skill-inline-row">
              <input
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddSkill()
                  }
                }}
                placeholder="Type a new skill (e.g. TypeScript, Docker, TensorFlow)..."
              />
              <button
                type="button"
                className="button button-secondary-sm"
                onClick={handleAddSkill}
              >
                <Plus size={15} /> Add Skill
              </button>
            </div>
          </section>

          {/* Card 4: Academic & Extracurricular Achievements */}
          <section className="customizer-card">
            <div className="customizer-card-header">
              <div className="card-header-icon">
                <Award size={18} />
              </div>
              <div>
                <h3>Achievements &amp; Internships</h3>
                <p>Showcase hackathons, company internships, and symposium awards</p>
              </div>
            </div>

            <div className="add-ach-form-box">
              <div className="customizer-grid-2">
                <input
                  value={newAchTitle}
                  onChange={(e) => setNewAchTitle(e.target.value)}
                  placeholder="Achievement or Internship Title"
                />
                <select
                  value={newAchType}
                  onChange={(e) => setNewAchType(e.target.value)}
                >
                  <option value="Internship">Internship</option>
                  <option value="Certification">Certification</option>
                  <option value="Event">Event / Hackathon</option>
                  <option value="Award">Symposium Award</option>
                </select>
              </div>

              <div className="customizer-grid-3" style={{ marginTop: '8px' }}>
                <input
                  value={newAchOrg}
                  onChange={(e) => setNewAchOrg(e.target.value)}
                  placeholder="Organization or Company"
                />
                <input
                  type="date"
                  value={newAchDate}
                  onChange={(e) => setNewAchDate(e.target.value)}
                />
                <button
                  type="button"
                  className="button button-secondary-sm"
                  onClick={handleAddAchievement}
                >
                  <Plus size={15} /> Add Entry
                </button>
              </div>
            </div>

            <div className="ach-list-preview">
              {achievements.length > 0 ? (
                achievements.map((ach) => (
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
                      title="Remove achievement"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))
              ) : (
                <p className="empty-ach-hint">No achievements added yet. Add one above to enhance your profile!</p>
              )}
            </div>
          </section>

          {/* Sticky Actions Bar */}
          <div className="customizer-actions-bar">
            <button
              type="button"
              className="button button-secondary"
              onClick={() => onNavigate('Overview')}
            >
              Cancel
            </button>
            <button type="submit" className="button button-primary">
              <Save size={16} /> Save Profile Changes
            </button>
          </div>
        </div>
      </form>

      <footer className="page-footer">
        <span>© 2026 Annapoorana Engineering College (Autonomous) · Department of IT</span>
        <span>
          Student Portal <i /> All systems operational
        </span>
      </footer>
    </>
  )
}

export function CoursesSection({
  courses,
  onAddCourse,
  onDeleteCourse,
  access,
}) {
  const [courseSearch, setCourseSearch] = useState('')
  const [selectedDept, setSelectedDept] = useState('All')

  const filteredCourses = courses.filter((c) => {
    const matchSearch =
      `${c.code} ${c.title} ${c.instructor} ${c.dept}`.toLowerCase().includes(courseSearch.toLowerCase())
    const matchDept = selectedDept === 'All' ? true : c.dept === selectedDept
    return matchSearch && matchDept
  })

  return (
    <>
      <PageHeading
        eyebrow="ACADEMIC CATALOG"
        title="Courses & Programs"
        description="Explore course offerings, syllabus schedules, and manage institutional enrollments."
        action={
          access.canManageCourses && (
            <button className="button button-primary" onClick={onAddCourse}>
              <Plus size={16} /> Add Course
            </button>
          )
        }
      />

      <section className="catalog-panel">
        <div className="catalog-toolbar">
          <div className="catalog-search-box">
            <Search size={18} />
            <input
              value={courseSearch}
              onChange={(e) => setCourseSearch(e.target.value)}
              placeholder="Search course title, code, or instructor..."
            />
          </div>

          <div className="dept-filter-buttons">
            <button
              className={`dept-btn ${selectedDept === 'All' ? 'active' : ''}`}
              onClick={() => setSelectedDept('All')}
            >
              All Courses
            </button>
            {departments.map((dept) => (
              <button
                key={dept}
                className={`dept-btn ${selectedDept === dept ? 'active' : ''}`}
                onClick={() => setSelectedDept(dept)}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        <div className="courses-grid">
          {filteredCourses.length === 0 ? (
            <div className="empty-courses">
              <BookOpen size={36} />
              <p>No courses match your filter criteria.</p>
            </div>
          ) : (
            filteredCourses.map((course) => {
              const enrolledPercent = Math.min(
                100,
                Math.round((course.enrolled / (course.capacity || 50)) * 100)
              )
              return (
                <article key={course.id} className="course-card">
                  <div className="course-card-top">
                    <span className="course-code-pill">{course.code}</span>
                    <span className="course-dept-badge">{course.dept}</span>
                  </div>

                  <h3 className="course-title">{course.title}</h3>

                  <div className="course-meta-details">
                    <p>
                      <strong>Instructor:</strong> {course.instructor}
                    </p>
                    <p>
                      <strong>Location:</strong> {course.room}
                    </p>
                    <p>
                      <strong>Schedule:</strong> {course.schedule}
                    </p>
                    <p>
                      <strong>Credits:</strong> {course.credits} Credits
                    </p>
                  </div>

                  <div className="course-capacity-bar">
                    <div className="capacity-label">
                      <span>
                        Enrolled: {course.enrolled} / {course.capacity || 50}
                      </span>
                      <span>{enrolledPercent}%</span>
                    </div>
                    <div className="capacity-track">
                      <div
                        className="capacity-fill"
                        style={{ width: `${enrolledPercent}%` }}
                      />
                    </div>
                  </div>

                  {access.canManageCourses && (
                    <div className="course-actions">
                      <button
                        className="button button-danger-ghost"
                        onClick={() => {
                          if (window.confirm(`Delete course ${course.code}: ${course.title}?`)) {
                            onDeleteCourse(course.id)
                          }
                        }}
                      >
                        <Trash2 size={15} /> Delete
                      </button>
                    </div>
                  )}
                </article>
              )
            })
          )}
        </div>
      </section>

      <footer className="page-footer">
        <span>© 2026 Annapoorana Engineering College (Autonomous) · Department of IT</span>
        <span>
          Student Portal <i /> All systems operational
        </span>
      </footer>
    </>
  )
}

export function VerifySkillsSection({
  certificates,
  onOpenUploadCert,
  onPreviewCert,
  onVerifyCert,
  onRejectCert,
  onDeleteCert,
  access,
}) {
  const [filterTab, setFilterTab] = useState('All')
  const [skillFilter, setSkillFilter] = useState('All skills')
  const [searchQuery, setSearchQuery] = useState('')

  // Metrics
  const totalSubmissions = certificates.length
  const verifiedCount = certificates.filter((c) => c.status === 'Verified').length
  const pendingCount = certificates.filter((c) => c.status === 'Pending').length
  const uniqueSkillsCount = new Set(certificates.map((c) => c.skill)).size

  // Filter pipeline
  const filteredCertificates = certificates.filter((cert) => {
    const matchTab =
      filterTab === 'All'
        ? true
        : filterTab === 'Pending'
        ? cert.status === 'Pending'
        : filterTab === 'Verified'
        ? cert.status === 'Verified'
        : cert.status === 'Rejected'

    const matchSkill =
      skillFilter === 'All skills' ? true : cert.skill === skillFilter

    const q = searchQuery.toLowerCase().trim()
    const matchSearch = q
      ? `${cert.title} ${cert.studentName} ${cert.issuer} ${cert.skill} ${cert.credentialId}`
          .toLowerCase()
          .includes(q)
      : true

    return matchTab && matchSkill && matchSearch
  })

  const allSkills = Array.from(new Set(certificates.map((c) => c.skill)))

  return (
    <>
      <PageHeading
        eyebrow="SKILL VERIFICATION &amp; BADGES"
        title="Verify Your Skills"
        description="Students upload accredited certificates for faculty authentication. Once verified genuine, official skill badges are awarded directly to the student profile."
        action={
          <button className="button button-primary" onClick={onOpenUploadCert}>
            <Upload size={16} /> Upload Certificate
          </button>
        }
      />

      {/* KPI Cards */}
      <section className="stats-grid">
        <StatCard
          label="Total Certificates"
          value={totalSubmissions}
          detail="submitted credentials"
          icon={FileCheck2}
          tone="tone-blue"
        />
        <StatCard
          label="Verified Skill Badges"
          value={verifiedCount}
          detail="awarded to profiles"
          icon={ShieldCheck}
          tone="tone-green"
        />
        <StatCard
          label="Pending Verification"
          value={pendingCount}
          detail={pendingCount > 0 ? 'awaiting faculty review' : 'all caught up'}
          icon={Award}
          tone="tone-orange"
        />
        <StatCard
          label="Skill Domains"
          value={uniqueSkillsCount}
          detail="specializations evaluated"
          icon={GraduationCap}
          tone="tone-pink"
        />
      </section>

      {/* Verification Directory & List */}
      <section className="verify-panel">
        <div className="directory-toolbar">
          <div className="filter-tabs" role="tablist" aria-label="Filter certificates">
            <button
              className={filterTab === 'All' ? 'filter-active' : ''}
              onClick={() => setFilterTab('All')}
            >
              All Certificates <span>{certificates.length}</span>
            </button>
            <button
              className={filterTab === 'Pending' ? 'filter-active' : ''}
              onClick={() => setFilterTab('Pending')}
            >
              Pending Review {pendingCount > 0 && <span className="tab-pending-badge">{pendingCount}</span>}
            </button>
            <button
              className={filterTab === 'Verified' ? 'filter-active' : ''}
              onClick={() => setFilterTab('Verified')}
            >
              Verified Badges <span>{verifiedCount}</span>
            </button>
            <button
              className={filterTab === 'Rejected' ? 'filter-active' : ''}
              onClick={() => setFilterTab('Rejected')}
            >
              Rejected
            </button>
          </div>

          <div className="toolbar-controls">
            <label className="select-wrapper">
              <span className="sr-only">Filter by Skill</span>
              <select
                className="select-button-native"
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
              >
                <option value="All skills">All skill domains</option>
                {allSkills.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* Search Bar */}
        <div className="verify-search-toolbar">
          <div className="verify-search-box">
            <Search size={17} />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student, certificate title, issuer, credential ID..."
            />
          </div>
          <span className="results-count-label">
            Showing {filteredCertificates.length} submissions
          </span>
        </div>

        {/* Certificates Grid */}
        <div className="certificates-grid">
          {filteredCertificates.length === 0 ? (
            <div className="empty-certificates-state">
              <Award size={36} />
              <h3>No certificates match this view</h3>
              <p>Upload a certificate document to begin the faculty verification process.</p>
              <button className="button button-primary" onClick={onOpenUploadCert}>
                <Upload size={16} /> Upload Certificate
              </button>
            </div>
          ) : (
            filteredCertificates.map((cert) => {
              const isVerified = cert.status === 'Verified'
              const isPending = cert.status === 'Pending'
              const isRejected = cert.status === 'Rejected'

              return (
                <article
                  key={cert.id}
                  className={`cert-item-card cert-card-${cert.status.toLowerCase()}`}
                  onClick={() => onPreviewCert(cert)}
                >
                  <div className="cert-item-header">
                    <div className="cert-student-brief">
                      <span className="student-badge-avatar">
                        {cert.studentName.slice(0, 2).toUpperCase()}
                      </span>
                      <div>
                        <h4 className="cert-student-name">{cert.studentName}</h4>
                        <span className="cert-student-meta">
                          {cert.studentId} · {cert.dept}
                        </span>
                      </div>
                    </div>

                    <span className={`cert-status-badge status-tag-${cert.status.toLowerCase()}`}>
                      {isVerified && <ShieldCheck size={14} />}
                      {isPending && <FileCheck2 size={14} />}
                      {isRejected && <ShieldAlert size={14} />}
                      <span>{isVerified ? 'Verified & Badged' : isPending ? 'Pending Review' : 'Rejected'}</span>
                    </span>
                  </div>

                  <div className="cert-item-body">
                    <span className="cert-skill-pill">{cert.skill}</span>
                    <h3 className="cert-item-title">{cert.title}</h3>
                    <p className="cert-item-issuer">
                      Issued by <b>{cert.issuer}</b> on {cert.issueDate}
                    </p>
                    <p className="cert-credential-code">
                      ID: <code>{cert.credentialId}</code>
                    </p>

                    {isVerified && (
                      <div className="badge-awarded-alert">
                        <Award size={15} />
                        <span>
                          <b>Badge on profile:</b> {cert.badgeTitle || cert.title}
                        </span>
                      </div>
                    )}

                    {isVerified && cert.verifiedBy && (
                      <p className="cert-verified-by">
                        <CheckCircle2 size={13} /> {cert.verifiedBy}
                      </p>
                    )}

                    {isRejected && (
                      <p className="cert-rejected-reason">
                        <XCircle size={13} /> {cert.notes || 'Verification failed'}
                      </p>
                    )}
                  </div>

                  <div className="cert-item-footer" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      className="button button-secondary-sm"
                      onClick={() => onPreviewCert(cert)}
                    >
                      <Eye size={15} /> View Certificate
                    </button>

                    {isPending && access?.canVerifySkills && (
                      <>
                        <button
                          type="button"
                          className="button button-success-sm"
                          onClick={() => onVerifyCert(cert.id)}
                          title="Verify certificate authenticity and award badge to student profile"
                        >
                          <ShieldCheck size={15} /> Verify &amp; Badge
                        </button>
                        <button
                          type="button"
                          className="button button-secondary-sm button-danger-ghost"
                          onClick={() => {
                            const reason = window.prompt('Provide a reason for rejecting this certificate authenticity:')
                            if (reason !== null && reason.trim()) {
                              onRejectCert(cert.id, reason.trim())
                            }
                          }}
                          title="Reject certificate authenticity"
                        >
                          <XCircle size={15} /> Reject
                        </button>
                      </>
                    )}

                    {access?.canDeleteStudents && (
                      <button
                        type="button"
                        className="icon-button"
                        title="Remove submission"
                        onClick={() => {
                          if (window.confirm(`Delete certificate record ${cert.title}?`)) {
                            onDeleteCert(cert.id)
                          }
                        }}
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </article>
              )
            })
          )}
        </div>
      </section>

      <footer className="page-footer">
        <span>© 2026 Annapoorana Engineering College (Autonomous) · Department of IT</span>
        <span>
          Student Portal <i /> All systems operational
        </span>
      </footer>
    </>
  )
}

const criteriaFilters = {
  'All IT Students > 8.0 CGPA & 0 Arrears': (s) =>
    s.dept === 'IT' && Number(s.cgpa) >= 8.0 && (!s.activeArrears || s.activeArrears === 0),
  'Standing Arrears Audit (Active Arrears > 0)': (s) =>
    Number(s.activeArrears) > 0,
  "Dean's Honors List (CGPA ≥ 8.5)": (s) =>
    Number(s.cgpa) >= 8.5,
  'Verified Skill Badges Earners': (s) =>
    (s.badges || []).length > 0,
  'Full Institutional Directory': () => true,
}

export function ReportsSection({ students, courses: _courses, certificates, showToast, onViewStudent }) {
  const total = students.length || 1
  const enrolledStudents = students.filter((s) => s.status === 'Enrolled')
  const enrolledRate = Math.round((enrolledStudents.length / total) * 100)
  const verifiedBadgesCount = certificates.filter((c) => c.status === 'Verified').length
  const zeroArrearsStudents = students.filter((s) => !s.activeArrears || s.activeArrears === 0)
  const zeroArrearsCount = zeroArrearsStudents.length

  // Calculate department breakdown
  const deptCounts = {}
  students.forEach((s) => {
    const d = s.dept || 'General'
    deptCounts[d] = (deptCounts[d] || 0) + 1
  })

  const deptBreakdown = Object.entries(deptCounts).map(([dept, count]) => ({
    dept,
    count,
    percentage: Math.round((count / total) * 100),
  }))

  const avgGpa = (
    students.reduce((acc, s) => acc + (Number(s.cgpa) || Number(s.gpa) || 8.2), 0) / total
  ).toFixed(2)

  // PPT Slide 6: One-click generation of student lists based on filters
  const [selectedCriteria, setSelectedCriteria] = useState('All IT Students > 8.0 CGPA & 0 Arrears')

  const criteriaStudents = useMemo(() => {
    const filterFn = criteriaFilters[selectedCriteria] || (() => true)
    return students.filter(filterFn)
  }, [students, selectedCriteria])

  function handleExportCriteria() {
    exportPlacementCriteriaCSV(criteriaStudents, selectedCriteria)
    if (showToast) showToast(`Exported ${criteriaStudents.length} candidates for "${selectedCriteria}"`)
  }

  function handleDownloadReport() {
    exportReportSummary({
      totalStudents: students.length,
      enrolledRate,
      departmentsCount: departments.length,
      facultyCount,
      verifiedBadgesCount,
      avgGpa,
      zeroArrearsCount,
      zeroArrearsPercentage: Math.round((zeroArrearsCount / total) * 100),
      deptBreakdown,
    })
    if (showToast) showToast('Academic report downloaded successfully')
  }

  return (
    <>
      <PageHeading
        eyebrow="ACADEMIC AUDIT &amp; PLACEMENT REPORTING"
        title="Institutional Academic Reports"
        description="Comprehensive analytics on autonomous enrollments, verified skill badges, and one-click placement queries."
        action={
          <div className="heading-actions-group">
            <button className="button button-secondary" onClick={handleExportCriteria}>
              <Download size={16} /> Export Criteria CSV
            </button>
            <button className="button button-primary" onClick={handleDownloadReport}>
              <Download size={16} /> Download Summary Report
            </button>
          </div>
        }
      />

      <section className="stats-grid">
        <StatCard
          label="Active Enrollment"
          value={`${enrolledRate}%`}
          detail={`${enrolledStudents.length} of ${students.length} students`}
          icon={Users}
          tone="tone-green"
        />
        <StatCard
          label="Average CGPA"
          value={`${avgGpa} / 10.0`}
          detail="institutional grade point index"
          icon={GraduationCap}
          tone="tone-blue"
        />
        <StatCard
          label="0 Standing Arrears"
          value={`${Math.round((zeroArrearsCount / total) * 100)}%`}
          detail={`${zeroArrearsCount} placement eligible students`}
          icon={ShieldCheck}
          tone="tone-orange"
        />
        <StatCard
          label="Verified Skill Badges"
          value={verifiedBadgesCount}
          detail="faculty authenticated credentials"
          icon={Award}
          tone="tone-pink"
        />
      </section>

      {/* Slide 6: One-click generation of student lists based on filters */}
      <section className="report-panel criteria-panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">ONE-CLICK AUDIT &amp; PLACEMENT GENERATOR · CRITERIA FILTER</span>
            <h2>Filtered Student Lists &amp; Placement Eligibility</h2>
            <p>Generate one-click audit lists based on CGPA criteria, department, and standing arrears.</p>
          </div>
          <button className="button button-primary-sm" onClick={handleExportCriteria}>
            <Download size={15} /> Export Filtered CSV
          </button>
        </div>

        <div className="criteria-buttons-row">
          {Object.keys(criteriaFilters).map((name) => (
            <button
              key={name}
              type="button"
              className={`criteria-btn ${selectedCriteria === name ? 'criteria-btn-active' : ''}`}
              onClick={() => setSelectedCriteria(name)}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="criteria-preview-results">
          <div className="criteria-results-header">
            <span>
              Matching candidates: <b>{criteriaStudents.length}</b> of {students.length} students
            </span>
            <span className="criteria-sub-info">
              Filtered for <b>{selectedCriteria}</b>
            </span>
          </div>

          <div className="criteria-table-wrap">
            <table className="criteria-table">
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Student Name</th>
                  <th>Department</th>
                  <th>Batch</th>
                  <th>CGPA</th>
                  <th>Standing Arrears</th>
                  <th>Verified Badges</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {criteriaStudents.map((s) => (
                  <tr key={s.id} onClick={() => onViewStudent && onViewStudent(s)}>
                    <td><b>{s.rollNumber || s.id}</b></td>
                    <td>{s.name}</td>
                    <td><span className="table-dept-tag">{s.dept}</span></td>
                    <td>{s.batch || '2022 - 2026'}</td>
                    <td><b className="table-cgpa-val">{s.cgpa || '8.50'} / 10.0</b></td>
                    <td>
                      <span className={`table-arrear-badge ${s.activeArrears > 0 ? 'badge-arrear-active' : 'badge-arrear-zero'}`}>
                        {s.activeArrears > 0 ? `${s.activeArrears} Arrear` : '0 Arrears'}
                      </span>
                    </td>
                    <td>
                      <span className="table-badge-chip">
                        <ShieldCheck size={13} />
                        <b>{(s.badges || []).length}</b>
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="text-button"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (onViewStudent) onViewStudent(s)
                        }}
                      >
                        Profile <ArrowRight size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="reports-container">
        <div className="report-panel">
          <div className="panel-heading">
            <div>
              <h2>Department Representation</h2>
              <p>Roster distribution by academic branch</p>
            </div>
          </div>

          <div className="dept-distribution-list">
            {deptBreakdown.map((item) => (
              <div key={item.dept} className="dept-stat-row">
                <div className="dept-stat-info">
                  <span className="dept-stat-name">{item.dept}</span>
                  <span className="dept-stat-count">
                    {item.count} students (<b>{item.percentage}%</b>)
                  </span>
                </div>
                <div className="progress-bar-track">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="report-panel">
          <div className="panel-heading">
            <div>
              <h2>Academic Performance Summary</h2>
              <p>Institutional milestones and quality KPIs</p>
            </div>
          </div>

          <div className="performance-kpis">
            <div className="perf-card">
              <span className="perf-label">STUDENT RETENTION RATE</span>
              <b className="perf-val">97.8%</b>
              <small>Autonomous batch progression rate</small>
            </div>
            <div className="perf-card">
              <span className="perf-label">ON-TIME COURSE PROGRESSION</span>
              <b className="perf-val">93.4%</b>
              <small>Meeting prerequisite milestones</small>
            </div>
            <div className="perf-card">
              <span className="perf-label">HONORS STANDING (CGPA &gt; 8.5)</span>
              <b className="perf-val">42.5%</b>
              <small>Dean’s honors list candidates</small>
            </div>
            <div className="perf-card">
              <span className="perf-label">CREDENTIAL AUTHENTICATION RATE</span>
              <b className="perf-val">91.2%</b>
              <small>External certificates verified by faculty</small>
            </div>
          </div>
        </div>
      </section>

      <footer className="page-footer">
        <span>© 2026 Annapoorana Engineering College (An Autonomous Institution) · Department of Information Technology</span>
        <span>
          AEC SPMS <i /> All systems operational
        </span>
      </footer>
    </>
  )
}

export function SettingsSection({
  settings,
  onSaveSettings,
  onResetData,
  showToast,
}) {
  const [formData, setFormData] = useState(settings)

  function handleChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  function handleSave(e) {
    e.preventDefault()
    onSaveSettings(formData)
    if (showToast) showToast('Institution preferences saved')
  }

  function handleReset() {
    if (
      window.confirm(
        'Reset all student roster, course, and skill certificate data back to default demo state?'
      )
    ) {
      onResetData()
      if (showToast) showToast('All workspace data reset to default demo records')
    }
  }

  return (
    <>
      <PageHeading
        eyebrow="WORKSPACE PREFERENCES"
        title="Institution Settings"
        description="Configure academic calendar details, notifications, and portal preferences."
      />

      <form onSubmit={handleSave} className="settings-grid">
        <div className="settings-card">
          <h2 className="settings-card-title">Campus &amp; Institution Profile</h2>
          <label>
            Institution Name
            <input
              value={formData.institutionName}
              onChange={(e) => handleChange('institutionName', e.target.value)}
              required
            />
          </label>
          <label>
            Campus Location
            <input
              value={formData.campusLocation}
              onChange={(e) => handleChange('campusLocation', e.target.value)}
              required
            />
          </label>
          <label>
            Active Academic Term
            <input
              value={formData.academicTerm}
              onChange={(e) => handleChange('academicTerm', e.target.value)}
              required
            />
          </label>
        </div>

        <div className="settings-card">
          <h2 className="settings-card-title">Communication &amp; Portal Options</h2>
          <label className="checkbox-field">
            <input
              type="checkbox"
              checked={formData.emailNotifications}
              onChange={(e) => handleChange('emailNotifications', e.target.checked)}
            />
            <span>Enable institutional email notifications for credential approvals</span>
          </label>
          <label className="checkbox-field">
            <input
              type="checkbox"
              checked={formData.skillVerificationAlerts}
              onChange={(e) => handleChange('skillVerificationAlerts', e.target.checked)}
            />
            <span>Notify faculty when a student submits an external certificate for authentication</span>
          </label>
          <label className="checkbox-field">
            <input
              type="checkbox"
              checked={formData.selfRegistration}
              onChange={(e) => handleChange('selfRegistration', e.target.checked)}
            />
            <span>Allow enrolled students to submit self-registration requests</span>
          </label>

          <div className="settings-card-actions">
            <button type="submit" className="button button-primary">
              <Save size={16} /> Save Preferences
            </button>
          </div>
        </div>

        <div className="settings-card danger-zone">
          <h2 className="settings-card-title danger-title">Demo Data Reset</h2>
          <p className="danger-desc">
            Revert all roster modifications, created courses, and skill certificate verifications to the
            original mock demo state.
          </p>
          <button
            type="button"
            className="button button-danger"
            onClick={handleReset}
          >
            Reset Workspace to Factory Demo Data
          </button>
        </div>
      </form>

      <footer className="page-footer">
        <span>© 2026 Annapoorana Engineering College (Autonomous) · Department of IT</span>
        <span>
          Student Portal <i /> All systems operational
        </span>
      </footer>
    </>
  )
}

export function HelpSection({ showToast }) {
  const [openFaq, setOpenFaq] = useState(0)
  const [ticketSubject, setTicketSubject] = useState('')
  const [ticketMessage, setTicketMessage] = useState('')
  const [ticketCategory, setTicketCategory] = useState('Skill Verification')
  const [submitted, setSubmitted] = useState(false)

  const faqs = [
    {
      q: 'How do students upload certificates to earn skill badges?',
      a: 'Go to the "Verify your skills" section and click "Upload Certificate". Enter the skill domain, certificate title, issuing organization (e.g. AWS, Meta, Google, Microsoft), and attach your certificate document. Faculty will review it to verify authenticity.',
    },
    {
      q: 'How does faculty verification of certificates work?',
      a: 'Faculty members and administrators can review pending certificate submissions in the "Verify your skills" section. Review the issuing credential ID and document preview, then click "Verify & Badge" to approve the certificate and automatically award the verified badge to the student profile.',
    },
    {
      q: 'Where do awarded skill badges appear?',
      a: 'Once verified genuine by faculty, official badges appear in the student profile view, the Student Portal dashboard, and under the student details modal in the directory.',
    },
    {
      q: 'How do I add a new student to the institution roster?',
      a: 'Users with Administrator or Registrar privileges can click the "Add student" button in the top navigation bar or Students directory tab. Fill in their name, email, department, and academic year to register them.',
    },
    {
      q: 'How do I export directory records for official reporting?',
      a: 'Navigate to the Students section and click "Export CSV". This generates an official comma-separated file with full IDs, contact details, programs, statuses, and verified badges count.',
    },
  ]

  function handleSubmitTicket(e) {
    e.preventDefault()
    if (!ticketSubject.trim() || !ticketMessage.trim()) return
    setSubmitted(true)
    if (showToast) showToast('Support ticket #NT-9418 submitted to Student Services Helpdesk')
    setTicketSubject('')
    setTicketMessage('')
  }

  return (
    <>
      <PageHeading
        eyebrow="SUPPORT CENTER"
        title="Help &amp; Documentation"
        description="Find answers, consult policies, and submit technical requests to Student Services."
      />

      <section className="help-grid">
        <div className="help-panel">
          <div className="panel-heading">
            <div>
              <h2>Frequently Asked Questions</h2>
              <p>Common questions about using the student portal &amp; skill badging</p>
            </div>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={faq.q} className="faq-item">
                <button
                  className="faq-question-btn"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={17}
                    className={`faq-icon ${openFaq === index ? 'faq-icon-expanded' : ''}`}
                  />
                </button>
                {openFaq === index && <p className="faq-answer">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="help-panel">
          <div className="panel-heading">
            <div>
              <h2>Contact Support Desk</h2>
              <p>Direct assistance from campus administrators</p>
            </div>
          </div>

          <form onSubmit={handleSubmitTicket} className="support-ticket-form">
            <label>
              Category
              <select
                value={ticketCategory}
                onChange={(e) => setTicketCategory(e.target.value)}
              >
                <option>Skill Verification &amp; Badging</option>
                <option>Enrollment &amp; Records</option>
                <option>Course Scheduling</option>
                <option>Technical Access / Password</option>
              </select>
            </label>

            <label>
              Subject
              <input
                value={ticketSubject}
                onChange={(e) => {
                  setTicketSubject(e.target.value)
                  setSubmitted(false)
                }}
                placeholder="Brief summary of your question"
                required
              />
            </label>

            <label>
              Message Details
              <textarea
                rows={4}
                value={ticketMessage}
                onChange={(e) => {
                  setTicketMessage(e.target.value)
                  setSubmitted(false)
                }}
                placeholder="Describe your inquiry in detail..."
                required
              />
            </label>

            {submitted && (
              <div className="ticket-success-alert">
                Ticket submitted! Support ticket reference <b>#NT-9418</b>. Our team will review within 24 hours.
              </div>
            )}

            <button type="submit" className="button button-primary">
              <Send size={15} /> Submit Support Request
            </button>
          </form>

          <div className="campus-contacts">
            <div className="contact-item">
              <Phone size={15} />
              <span>Campus Hotline: +1 (800) 555-0199</span>
            </div>
            <div className="contact-item">
              <Mail size={15} />
              <span>helpdesk@northstar.edu</span>
            </div>
            <div className="contact-item">
              <MapPin size={15} />
              <span>Registrar Office, Hall A, Room 104</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="page-footer">
        <span>© 2026 Annapoorana Engineering College (Autonomous) · Department of IT</span>
        <span>
          Student Portal <i /> All systems operational
        </span>
      </footer>
    </>
  )
}