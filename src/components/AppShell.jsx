import { useState, useEffect, useRef } from 'react'
import {
  Check,
  ChevronDown,
  CircleHelp,
  GraduationCap,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  UserCheck,
  X,
} from 'lucide-react'
import { aecInstitutionInfo, demoAccounts, navigation } from '../data.js'
import collegeLogo from '../assets/logo.png'

export function Sidebar({
  activeSection,
  onNavigate,
  user,
  access,
  studentCount,
  onSwitchUser,
  isOpen,
  onClose,
  onLogout,
}) {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const sidebarRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target) && isOpen) {
        onClose?.()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose])

  return (
    <>
      {isOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${isOpen ? 'mobile-drawer-open' : ''}`} ref={sidebarRef}>
        <div className="sidebar-header-row">
          <a
            className="brand"
            href="#overview"
            onClick={(e) => {
              e.preventDefault()
              onNavigate('Overview')
              onClose?.()
            }}
          >
            <span className="brand-mark">
              <img src={collegeLogo} alt="AEC Logo" className="brand-logo-img" />
            </span>
            <span>
              AEC SPMS<span className="brand-subtitle">AUTONOMOUS · IT</span>
            </span>
          </a>

          <button
            type="button"
            className="mobile-drawer-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <span className="nav-heading sidebar-nav-top-heading">WORKSPACE</span>
        <nav className="primary-nav" aria-label="Main navigation">
          {navigation
            .filter(({ label }) => access.sections.includes(label))
            .map(({ label, icon: Icon }) => (
              <button
                key={label}
                className={`nav-link ${activeSection === label ? 'active' : ''}`}
                onClick={() => {
                  onNavigate(label)
                  setProfileMenuOpen(false)
                  onClose?.()
                }}
              >
                <Icon size={19} strokeWidth={1.8} />
                <span>{label}</span>
                {label === 'Students' && <span className="nav-count">{studentCount}</span>}
              </button>
            ))}
        </nav>

        <div className="sidebar-bottom">
          <button
            className={`nav-link ${activeSection === 'Help & support' ? 'active' : ''}`}
            onClick={() => {
              onNavigate('Help & support')
              setProfileMenuOpen(false)
              onClose?.()
            }}
          >
            <CircleHelp size={19} strokeWidth={1.8} />
            <span>Help &amp; support</span>
          </button>

          {access.sections.includes('Settings') && (
            <button
              className={`nav-link ${activeSection === 'Settings' ? 'active' : ''}`}
              onClick={() => {
                onNavigate('Settings')
                setProfileMenuOpen(false)
                onClose?.()
              }}
            >
              <Settings size={19} strokeWidth={1.8} />
              <span>Settings</span>
            </button>
          )}

          <button
            type="button"
            className="nav-link sidebar-logout-btn"
            onClick={() => {
              setProfileMenuOpen(false)
              onClose?.()
              onLogout?.()
            }}
          >
            <LogOut size={19} strokeWidth={1.8} />
            <span>Sign out</span>
          </button>

          <div className="sidebar-profile-wrapper">
            <div
              className="sidebar-profile"
              onClick={() => {
                setProfileMenuOpen((prev) => !prev)
              }}
              role="button"
              tabIndex={0}
            >
              <span className="avatar avatar-admin">{user.initials}</span>
              <span className="profile-name">
                {user.name}
                <small>{access.label}</small>
              </span>
              <button
                className="icon-button"
                aria-label="Profile options"
                onClick={(e) => {
                  e.stopPropagation()
                  setProfileMenuOpen((prev) => !prev)
                }}
              >
                <ChevronDown
                  size={16}
                  className={profileMenuOpen ? 'chevron-rotated' : ''}
                />
              </button>
            </div>

            {profileMenuOpen && (
              <div className="profile-dropdown-menu">
                <span className="dropdown-heading">SWITCH DEMO ACCOUNT</span>
                {Object.entries(demoAccounts).map(([roleKey, acc]) => (
                  <button
                    key={roleKey}
                    className={`dropdown-menu-item ${user.role === roleKey ? 'item-active' : ''}`}
                    onClick={() => {
                      onSwitchUser(acc)
                      setProfileMenuOpen(false)
                      onClose?.()
                    }}
                  >
                    <UserCheck size={15} />
                    <span>
                      {acc.name} ({roleKey})
                    </span>
                    {user.role === roleKey && <Check size={14} className="check-icon" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}

export function Topbar({
  search,
  onSearch,
  onAddStudent,
  user,
  access,
  onLogout,
  showSearch,
  onToggleMobileMenu,
  isMobileMenuOpen,
}) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const searchInputRef = useRef(null)

  // Keyboard shortcut: Cmd+K or Ctrl+K to focus search
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (searchInputRef.current) {
          searchInputRef.current.focus()
          searchInputRef.current.select()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <header className="topbar">
      <div className="topbar-main-row">
        <div className="topbar-left-cluster">
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={onToggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="mobile-brand-group">
            <span className="mobile-brand-mark">
              <img src={collegeLogo} alt="AEC Logo" className="mobile-brand-logo-img" />
            </span>
            <div className="mobile-brand-text">
              <span className="mobile-brand-title">AEC SPMS</span>
              <span className="mobile-brand-badge">AUTONOMOUS</span>
            </div>
          </div>

          {showSearch ? (
            <label className={`search-box ${mobileSearchOpen ? 'mobile-search-visible' : ''}`}>
              <Search size={18} />
              <input
                ref={searchInputRef}
                value={search}
                onChange={(event) => onSearch(event.target.value)}
                placeholder="Search students, roll numbers, courses (⌘ K)..."
                aria-label="Search students and courses"
              />
              {search ? (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => onSearch('')}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              ) : (
                <kbd>⌘ K</kbd>
              )}
              {mobileSearchOpen && (
                <button
                  type="button"
                  className="mobile-search-close-btn"
                  onClick={() => setMobileSearchOpen(false)}
                  aria-label="Close search"
                >
                  <X size={16} />
                </button>
              )}
            </label>
          ) : (
            <div className="topbar-welcome-tag">
              <GraduationCap size={18} />
              <span>{aecInstitutionInfo.name} · IT Dept</span>
            </div>
          )}
        </div>

        <div className="topbar-actions">
          {showSearch && (
            <button
              type="button"
              className="mobile-search-toggle-btn"
              onClick={() => {
                setMobileSearchOpen((prev) => !prev)
                if (!mobileSearchOpen && searchInputRef.current) {
                  setTimeout(() => searchInputRef.current?.focus(), 50)
                }
              }}
              aria-label="Toggle search bar"
            >
              <Search size={18} />
            </button>
          )}

          <span className="role-badge">
            <ShieldCheck size={13} />
            {access.label}
          </span>

          <span className="term-label">
            <span className="term-dot" /> Even Sem 2025 - 2026
          </span>

          {access.canAddStudents && (
            <button className="button button-primary topbar-add-btn" onClick={onAddStudent}>
              <Plus size={16} /> <span>Add student</span>
            </button>
          )}

          <button
            className="logout-button"
            onClick={onLogout}
            title={`Sign out ${user.name}`}
          >
            <LogOut size={16} />
            <span className="logout-text">Sign out</span>
          </button>
        </div>
      </div>
    </header>
  )
}