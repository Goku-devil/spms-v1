import { useState } from 'react'
import {
  ArrowRight,
  Award,
  LockKeyhole,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { aecInstitutionInfo, demoAccounts, demoRoleOptions } from '../data.js'
import collegeLogo from '../assets/logo.png'

export default function LoginPage({ onLogin }) {
  const [selectedRole, setSelectedRole] = useState('student')
  const [email, setEmail] = useState(demoAccounts.student.email)
  const [password, setPassword] = useState(demoAccounts.student.password)
  const [error, setError] = useState('')

  function chooseDemoRole(role) {
    setSelectedRole(role)
    setEmail(demoAccounts[role].email)
    setPassword(demoAccounts[role].password)
    setError('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!onLogin(email.trim(), password)) {
      setError('That email and password do not match a demo account.')
    }
  }

  return (
    <main className="login-page">
      <section className="login-story">
        <a className="brand login-brand" href="#login">
          <span className="brand-mark">
            <img src={collegeLogo} alt="AEC Logo" className="brand-logo-img" />
          </span>
          <span>
            AEC SPMS
            <span className="brand-subtitle">AUTONOMOUS · IT</span>
          </span>
        </a>

        <div className="story-copy">
          <span className="story-overline">
            <i /> {aecInstitutionInfo.name.toUpperCase()}
          </span>
          <h1>
            Student Profile<br />
            Management System
          </h1>
          <p className="story-dept-sub">
            {aecInstitutionInfo.autonomousText} · {aecInstitutionInfo.department}
          </p>
          <div className="story-accreditations-strip">
            <span>
              <ShieldCheck size={14} /> NBA ACCREDITED
            </span>
            <span>
              <Award size={14} /> NAAC &apos;A&apos; GRADE
            </span>
            <span>Motto: {aecInstitutionInfo.motto}</span>
          </div>

          <div className="story-campus" aria-hidden="true">
            <div className="campus-sun" />
            <div className="campus-building">
              <i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
            </div>
            <div className="campus-ground" />
          </div>
        </div>

        <div className="story-footer">
          <span>Even Semester Academic Year 2025 - 2026</span>
          <span>Role-Based Access Control (RBAC)</span>
        </div>
      </section>

      <section className="login-main">
        <div className="login-form-wrap">
          <span className="mobile-login-mark">
            <img src={collegeLogo} alt="AEC Logo" className="mobile-login-logo" /> {aecInstitutionInfo.name}
          </span>
          <div className="login-heading">
            <span className="eyebrow">DEPARTMENT OF INFORMATION TECHNOLOGY</span>
            <h2>Sign in to SPMS Portal</h2>
            <p>Access your academic profile, verify skills, or manage institutional records.</p>
          </div>

          <div className="demo-role-picker">
            <div className="role-picker-label">Choose an institutional demo role</div>
            <div className="role-picker-grid">
              {demoRoleOptions.map(({ role, label, detail, icon: Icon }) => (
                <button
                  type="button"
                  key={role}
                  className={`role-option ${selectedRole === role ? 'selected' : ''}`}
                  onClick={() => chooseDemoRole(role)}
                >
                  <Icon size={19} />
                  <span>
                    <b>{label}</b>
                    <small>{detail}</small>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label>
              Campus Email Address
              <span className="login-input">
                <UserRound size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    setError('')
                  }}
                  autoComplete="username"
                  required
                />
              </span>
            </label>

            <label>
              Password
              <span className="login-input">
                <LockKeyhole size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value)
                    setError('')
                  }}
                  autoComplete="current-password"
                  required
                />
              </span>
            </label>

            {error && (
              <p className="login-error" role="alert">
                {error}
              </p>
            )}

            <button className="login-submit" type="submit">
              Sign in to Portal <ArrowRight size={17} />
            </button>
            <p className="demo-password-note">
              Demo password: <b>northstar</b>
            </p>
          </form>

          <div className="login-security">
            <LockKeyhole size={15} />
            <span>
              Secure Relational Database Design · {aecInstitutionInfo.name}
            </span>
          </div>
        </div>
      </section>
    </main>
  )
}