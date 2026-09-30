import { useState, useMemo, useEffect, useCallback } from 'react'
import './App.css'
import AddCourseModal from './components/AddCourseModal.jsx'
import AddStudentModal from './components/AddStudentModal.jsx'
import { Sidebar, Topbar } from './components/AppShell.jsx'
import CalendarModal from './components/CalendarModal.jsx'
import CertificatePreviewModal from './components/CertificatePreviewModal.jsx'
import {
  CoursesSection,
  CustomizeProfileSection,
  HelpSection,
  OverviewSection,
  ReportsSection,
  SettingsSection,
  StudentHomeSection,
  StudentsSection,
  VerifySkillsSection,
} from './components/DashboardSections.jsx'
import DigitalIdCardModal from './components/DigitalIdCardModal.jsx'
import EditStudentModal from './components/EditStudentModal.jsx'
import LoginPage from './components/LoginPage.jsx'
import ResumeBuilderModal from './components/ResumeBuilderModal.jsx'
import StudentDetailModal from './components/StudentDetailModal.jsx'
import StudentProfileEditModal from './components/StudentProfileEditModal.jsx'
import ToastContainer from './components/Toast.jsx'
import UpdateGradesModal from './components/UpdateGradesModal.jsx'
import UploadCertificateModal from './components/UploadCertificateModal.jsx'
import {
  avatarColors,
  demoAccounts,
  getInitials,
  initialCertificates,
  initialCourses,
  initialEvents,
  initialSettings,
  initialStudents,
  loadStorage,
  rolePermissions,
  saveStorage,
  STORAGE_KEYS,
} from './data.js'

function App() {
  // Authentication & session persistence
  const [authenticatedUser, setAuthenticatedUser] = useState(() =>
    loadStorage(STORAGE_KEYS.USER, null)
  )

  const [activeSection, setActiveSection] = useState('Overview')
  const [search, setSearch] = useState('')

  // Workspace entities persistence
  const [students, setStudents] = useState(() =>
    loadStorage(STORAGE_KEYS.STUDENTS, initialStudents)
  )
  const [courses, setCourses] = useState(() =>
    loadStorage(STORAGE_KEYS.COURSES, initialCourses)
  )
  const [certificates, setCertificates] = useState(() =>
    loadStorage(STORAGE_KEYS.CERTIFICATES, initialCertificates)
  )
  const [events, setEvents] = useState(() =>
    loadStorage(STORAGE_KEYS.EVENTS, initialEvents)
  )
  const [settings, setSettings] = useState(() =>
    loadStorage(STORAGE_KEYS.SETTINGS, initialSettings)
  )

  // Modals state
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isUploadCertOpen, setIsUploadCertOpen] = useState(false)
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState(null)
  const [selectedStudentForEdit, setSelectedStudentForEdit] = useState(null)
  const [selectedCertForPreview, setSelectedCertForPreview] = useState(null)

  // PPT Feature Modals
  const [selectedStudentForGrade, setSelectedStudentForGrade] = useState(null)
  const [selectedStudentForResume, setSelectedStudentForResume] = useState(null)
  const [selectedStudentForDigitalId, setSelectedStudentForDigitalId] = useState(null)
  const [selectedStudentForProfileEdit, setSelectedStudentForProfileEdit] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Toast feedback
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3800)
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  // Sync to localStorage
  useEffect(() => {
    saveStorage(STORAGE_KEYS.STUDENTS, students)
  }, [students])

  useEffect(() => {
    saveStorage(STORAGE_KEYS.COURSES, courses)
  }, [courses])

  useEffect(() => {
    saveStorage(STORAGE_KEYS.CERTIFICATES, certificates)
  }, [certificates])

  useEffect(() => {
    saveStorage(STORAGE_KEYS.EVENTS, events)
  }, [events])

  useEffect(() => {
    saveStorage(STORAGE_KEYS.SETTINGS, settings)
  }, [settings])

  useEffect(() => {
    saveStorage(STORAGE_KEYS.USER, authenticatedUser)
  }, [authenticatedUser])

  // Filtered students for global search
  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return students
    return students.filter((student) =>
      `${student.name} ${student.email} ${student.id} ${student.rollNumber || ''} ${student.course} ${student.dept}`
        .toLowerCase()
        .includes(query)
    )
  }, [students, search])

  // Current user permissions
  const access = useMemo(() => {
    if (!authenticatedUser) return rolePermissions.student
    return rolePermissions[authenticatedUser.role] || rolePermissions.student
  }, [authenticatedUser])

  // Auth Handlers
  function signIn(email, password) {
    const matchedRole = Object.values(demoAccounts).find(
      (acc) => acc.email.toLowerCase() === email.toLowerCase() && acc.password === password
    )

    if (matchedRole) {
      setAuthenticatedUser(matchedRole)
      setActiveSection('Overview')
      showToast(`Welcome back, ${matchedRole.name}! Signed in as ${matchedRole.role}.`)
      return true
    }
    return false
  }

  function signOut() {
    setAuthenticatedUser(null)
    setActiveSection('Overview')
    showToast('You have been signed out.')
  }

  function switchUser(account) {
    setAuthenticatedUser(account)
    setActiveSection('Overview')
    setIsMobileMenuOpen(false)
    showToast(`Switched active user to ${account.name} (${account.role})`)
  }

  function navigate(section) {
    setActiveSection(section)
    setSearch('')
    setIsMobileMenuOpen(false)
  }

  // Student Actions
  function addStudent(studentData) {
    const newStudent = {
      ...studentData,
      id: `ST-2026-${String(students.length + 1).padStart(3, '0')}`,
      initials: getInitials(studentData.name),
      color: avatarColors[students.length % avatarColors.length],
      cgpa: studentData.cgpa || '8.50',
      activeArrears: studentData.activeArrears || 0,
      arrearHistory: 0,
      phone: studentData.phone || '+91 98421 XXXXX',
      enrolledCourses: ['IT-401', 'IT-402'],
      badges: [],
      semesters: [],
      achievements: [],
    }
    setStudents((prev) => [newStudent, ...prev])
    setIsAddStudentOpen(false)
    setActiveSection('Students')
    showToast(`Registered ${newStudent.name} (Roll No: ${newStudent.rollNumber || newStudent.id})`)
  }

  function handleSaveEditedStudent(updated) {
    setStudents((prev) =>
      prev.map((s) => (s.id === updated.id ? { ...s, ...updated } : s))
    )
    setSelectedStudentForEdit(null)
    showToast(`Updated student profile for ${updated.name}`)
  }

  function handleSaveStudentGrades(updated) {
    setStudents((prev) =>
      prev.map((s) => (s.id === updated.id ? { ...s, ...updated } : s))
    )
    if (selectedStudentForDetail && selectedStudentForDetail.id === updated.id) {
      setSelectedStudentForDetail(updated)
    }
    showToast(`Updated academic grades & standing arrears for ${updated.name}`)
  }

  function handleSaveStudentProfile(updated) {
    setStudents((prev) =>
      prev.map((s) => (s.id === updated.id ? { ...s, ...updated } : s))
    )
    if (selectedStudentForDetail && selectedStudentForDetail.id === updated.id) {
      setSelectedStudentForDetail(updated)
    }
    showToast(`Profile details & achievements updated for ${updated.name}`)
  }

  function handleDeleteStudent(id) {
    const target = students.find((s) => s.id === id)
    setStudents((prev) => prev.filter((s) => s.id !== id))
    showToast(`Removed ${target?.name || id} from directory`, 'info')
  }

  function handleToggleStudentStatus(id) {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const newStatus = s.status === 'Enrolled' ? 'Pending' : 'Enrolled'
          showToast(`${s.name} is now marked as ${newStatus}`)
          return { ...s, status: newStatus }
        }
        return s
      })
    )
    if (selectedStudentForDetail && selectedStudentForDetail.id === id) {
      setSelectedStudentForDetail((prev) => ({
        ...prev,
        status: prev.status === 'Enrolled' ? 'Pending' : 'Enrolled',
      }))
    }
  }

  // Course Actions
  function handleAddCourse(courseData) {
    setCourses((prev) => [courseData, ...prev])
    showToast(`Course ${courseData.code}: ${courseData.title} added to catalog`)
  }

  function handleDeleteCourse(id) {
    setCourses((prev) => prev.filter((c) => c.id !== id))
    showToast(`Course ${id} deleted from catalog`, 'info')
  }

  // Skill Verification & Badging Actions
  function handleUploadCertificate(certData) {
    setCertificates((prev) => [certData, ...prev])
    showToast(`Certificate "${certData.title}" submitted for faculty verification!`)
  }

  function handleVerifyCertificate(certId) {
    const cert = certificates.find((c) => c.id === certId)
    if (!cert) return

    const verifiedAt = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    const verifiedBy = `${authenticatedUser.name} (${access.label})`

    // 1. Mark certificate status as Verified
    setCertificates((prev) =>
      prev.map((c) =>
        c.id === certId
          ? {
              ...c,
              status: 'Verified',
              verifiedBy,
              verifiedAt,
            }
          : c
      )
    )

    // 2. Add badge to the student's profile
    const newBadge = {
      id: `badge-${Date.now()}`,
      certId: cert.id,
      title: cert.badgeTitle || cert.title,
      skill: cert.skill,
      issuer: cert.issuer,
      verifiedBy,
      verifiedAt,
      credentialId: cert.credentialId,
      icon: 'shield',
    }

    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === cert.studentId) {
          const currentBadges = s.badges || []
          const exists = currentBadges.some((b) => b.certId === cert.id)
          if (exists) return s
          return {
            ...s,
            badges: [newBadge, ...currentBadges],
          }
        }
        return s
      })
    )

    // If student detail modal is currently viewing this student, update it live
    if (selectedStudentForDetail && selectedStudentForDetail.id === cert.studentId) {
      setSelectedStudentForDetail((prev) => ({
        ...prev,
        badges: [newBadge, ...(prev.badges || [])],
      }))
    }

    showToast(`Certificate verified! Official skill badge awarded to ${cert.studentName}'s profile.`)
  }

  function handleRejectCertificate(certId, reason) {
    setCertificates((prev) =>
      prev.map((c) =>
        c.id === certId
          ? {
              ...c,
              status: 'Rejected',
              notes: reason,
            }
          : c
      )
    )
    showToast('Certificate verification rejected.', 'info')
  }

  function handleDeleteCertificate(certId) {
    setCertificates((prev) => prev.filter((c) => c.id !== certId))
    showToast('Certificate record removed.', 'info')
  }

  // Calendar Actions
  function handleAddEvent(newEvent) {
    setEvents((prev) => [newEvent, ...prev])
    showToast(`Scheduled event: ${newEvent.title}`)
  }

  function handleDeleteEvent(id) {
    setEvents((prev) => prev.filter((e) => e.id !== id))
    showToast('Event removed from academic calendar', 'info')
  }

  // Settings Actions
  function handleSaveSettings(newSettings) {
    setSettings(newSettings)
  }

  function handleResetData() {
    setStudents(initialStudents)
    setCourses(initialCourses)
    setCertificates(initialCertificates)
    setEvents(initialEvents)
    setSettings(initialSettings)
    saveStorage(STORAGE_KEYS.STUDENTS, initialStudents)
    saveStorage(STORAGE_KEYS.COURSES, initialCourses)
    saveStorage(STORAGE_KEYS.CERTIFICATES, initialCertificates)
    saveStorage(STORAGE_KEYS.EVENTS, initialEvents)
    saveStorage(STORAGE_KEYS.SETTINGS, initialSettings)
    showToast('SPMS database restored to initial state.')
  }

  if (!authenticatedUser) {
    return (
      <div className="login-wrapper">
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
        <LoginPage onLogin={signIn} />
      </div>
    )
  }

  return (
    <div className="app-shell">
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      <Sidebar
        activeSection={activeSection}
        onNavigate={navigate}
        user={authenticatedUser}
        access={access}
        studentCount={students.length}
        onSwitchUser={switchUser}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onLogout={signOut}
      />

      <main className="main-area">
        <Topbar
          search={search}
          onSearch={setSearch}
          onAddStudent={() => setIsAddStudentOpen(true)}
          user={authenticatedUser}
          access={access}
          onLogout={signOut}
          showSearch={authenticatedUser.role !== 'student'}
          onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
          isMobileMenuOpen={isMobileMenuOpen}
          onSwitchUser={switchUser}
        />

        <div className="page-content">
          {activeSection === 'Overview' && authenticatedUser.role === 'student' ? (
            <StudentHomeSection
              user={authenticatedUser}
              onNavigate={navigate}
              courses={courses}
              students={students}
              certificates={certificates}
              onOpenResume={(st) => setSelectedStudentForResume(st)}
              onOpenDigitalId={(st) => setSelectedStudentForDigitalId(st)}
            />
          ) : activeSection === 'Overview' ? (
            <OverviewSection
              students={students}
              filteredStudents={filteredStudents}
              onNavigate={navigate}
              user={authenticatedUser}
              access={access}
              events={events}
              certificates={certificates}
              onOpenCalendar={() => setIsCalendarOpen(true)}
              onViewStudent={(st) => setSelectedStudentForDetail(st)}
              onAddStudent={() => setIsAddStudentOpen(true)}
            />
          ) : activeSection === 'Customize Profile' ? (
            <CustomizeProfileSection
              user={authenticatedUser}
              students={students}
              onSaveProfile={handleSaveStudentProfile}
              onNavigate={navigate}
              showToast={showToast}
            />
          ) : activeSection === 'Students' ? (
            <StudentsSection
              students={filteredStudents}
              onAddStudent={() => setIsAddStudentOpen(true)}
              onViewStudent={(st) => setSelectedStudentForDetail(st)}
              onEditStudent={(st) => setSelectedStudentForEdit(st)}
              onDeleteStudent={handleDeleteStudent}
              access={access}
              showToast={showToast}
            />
          ) : activeSection === 'Courses' ? (
            <CoursesSection
              courses={courses}
              onAddCourse={() => setIsAddCourseOpen(true)}
              onDeleteCourse={handleDeleteCourse}
              access={access}
            />
          ) : activeSection === 'Verify your skills' ? (
            <VerifySkillsSection
              certificates={certificates}
              onOpenUploadCert={() => setIsUploadCertOpen(true)}
              onPreviewCert={(cert) => setSelectedCertForPreview(cert)}
              onVerifyCert={handleVerifyCertificate}
              onRejectCert={handleRejectCertificate}
              onDeleteCert={handleDeleteCertificate}
              access={access}
            />
          ) : activeSection === 'Reports' ? (
            <ReportsSection
              students={students}
              courses={courses}
              certificates={certificates}
              showToast={showToast}
              onViewStudent={(st) => setSelectedStudentForDetail(st)}
            />
          ) : activeSection === 'Settings' ? (
            <SettingsSection
              settings={settings}
              onSaveSettings={handleSaveSettings}
              onResetData={handleResetData}
              showToast={showToast}
            />
          ) : activeSection === 'Help & support' ? (
            <HelpSection showToast={showToast} />
          ) : null}
        </div>
      </main>

      {/* Core Modals */}
      {isAddStudentOpen && access.canAddStudents && (
        <AddStudentModal
          onClose={() => setIsAddStudentOpen(false)}
          onAdd={addStudent}
        />
      )}

      {selectedStudentForDetail && (
        <StudentDetailModal
          student={selectedStudentForDetail}
          onClose={() => setSelectedStudentForDetail(null)}
          onEdit={(st) => setSelectedStudentForEdit(st)}
          onDelete={handleDeleteStudent}
          onToggleStatus={handleToggleStudentStatus}
          onOpenUpdateGrades={(st) => setSelectedStudentForGrade(st)}
          onOpenResume={(st) => setSelectedStudentForResume(st)}
          onOpenDigitalId={(st) => setSelectedStudentForDigitalId(st)}
          access={access}
        />
      )}

      {selectedStudentForEdit && access.canEditStudents && (
        <EditStudentModal
          student={selectedStudentForEdit}
          onClose={() => setSelectedStudentForEdit(null)}
          onSave={handleSaveEditedStudent}
        />
      )}

      {/* PPT Feature Modals */}
      {selectedStudentForGrade && (
        <UpdateGradesModal
          student={selectedStudentForGrade}
          onClose={() => setSelectedStudentForGrade(null)}
          onSave={handleSaveStudentGrades}
          currentUser={authenticatedUser}
        />
      )}

      {selectedStudentForResume && (
        <ResumeBuilderModal
          student={selectedStudentForResume}
          onClose={() => setSelectedStudentForResume(null)}
        />
      )}

      {selectedStudentForDigitalId && (
        <DigitalIdCardModal
          student={selectedStudentForDigitalId}
          onClose={() => setSelectedStudentForDigitalId(null)}
        />
      )}

      {selectedStudentForProfileEdit && (
        <StudentProfileEditModal
          student={selectedStudentForProfileEdit}
          onClose={() => setSelectedStudentForProfileEdit(null)}
          onSave={handleSaveStudentProfile}
        />
      )}

      {isAddCourseOpen && access.canManageCourses && (
        <AddCourseModal
          onClose={() => setIsAddCourseOpen(false)}
          onAdd={handleAddCourse}
        />
      )}

      {isCalendarOpen && (
        <CalendarModal
          events={events}
          onClose={() => setIsCalendarOpen(false)}
          onAddEvent={handleAddEvent}
          onDeleteEvent={handleDeleteEvent}
          access={access}
        />
      )}

      {isUploadCertOpen && (
        <UploadCertificateModal
          students={students}
          currentUser={authenticatedUser}
          onClose={() => setIsUploadCertOpen(false)}
          onSubmit={handleUploadCertificate}
        />
      )}

      {selectedCertForPreview && (
        <CertificatePreviewModal
          certificate={selectedCertForPreview}
          onClose={() => setSelectedCertForPreview(null)}
          onVerify={handleVerifyCertificate}
          onReject={handleRejectCertificate}
          access={access}
        />
      )}
    </div>
  )
}

export default App