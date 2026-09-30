import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  ChartNoAxesColumnIncreasing,
  LayoutDashboard,
  ShieldCheck,
  UserPen,
  UserRound,
  Users,
} from 'lucide-react'
import { admin, facultys, registrator } from './components/data.js'

export const aecInstitutionInfo = {
  name: 'Annapoorana Engineering College',
  autonomousText: '(An Autonomous Institution)',
  department: 'Department of Information Technology',
  accreditations: ['NBA Accredited', "NAAC 'A' Grade"],
  motto: 'ACHIEVE • EXCEL • COMPETE',
  location: 'NH-47, Sankari Main Road, Periya Seeragapadi, Salem, Tamil Nadu 636308',
  guide: {
    title: 'Guided By',
    name: 'Dr. P. Murugesan',
    designation: 'Assistant Professor, Department of Information Technology',
  },
  teamMembers: [
    { name: 'Gokulraj A S', rollNumber: '610225205019', role: 'Team Lead / Full Stack Developer', dept: 'IT' },
    { name: 'JayaSurya P', rollNumber: '610225205018', role: 'Frontend & UI Specialist', dept: 'IT' },
    { name: 'Pradeep J', rollNumber: '610225205025', role: 'Backend & Database Architecture', dept: 'IT' },
    { name: 'Sanjay P', rollNumber: '610225205032', role: 'RBAC & Authentication Systems', dept: 'IT' },
    { name: 'Nikhil M', rollNumber: '610225205022', role: 'Verification & Badging Logic', dept: 'IT' },
    { name: 'RithikRoshan M', rollNumber: '610225205028', role: 'Testing & Academic Reporting', dept: 'IT' },
    { name: 'Gokul S', rollNumber: '610225205011', role: 'API Integration & Documentation', dept: 'IT' },
  ],
}

export const avatarColors = ['coral', 'blue', 'green', 'yellow', 'pink']

export function getInitials(name) {
  if (!name) return 'ST'
  const parts = name.trim().split(/\s+/)
  return (parts.length > 1 ? parts.map((part) => part[0]).join('') : parts[0].slice(0, 2)).toUpperCase()
}

export const departments = [
  'IT',
  'Computer Science',
  'ECE',
  'Mechanical',
  'Civil',
  'AI & Data Science',
]

export const initialStudentBadges = {
  'ST-2026-001': [
    {
      id: 'badge-1',
      certId: 'cert-1',
      title: 'AWS Certified Solutions Architect - Associate',
      skill: 'Cloud Architecture',
      issuer: 'Amazon Web Services (AWS)',
      verifiedBy: 'Dr. P. Murugesan (Faculty, IT)',
      verifiedAt: 'July 15, 2026',
      credentialId: 'AWS-9482710-ARCH',
      icon: 'cloud',
    },
    {
      id: 'badge-2',
      certId: 'cert-2',
      title: 'Meta Certified Front-End Developer',
      skill: 'Web Engineering',
      issuer: 'Meta / Coursera',
      verifiedBy: 'Prof. R. Anitha (Faculty, IT)',
      verifiedAt: 'August 28, 2026',
      credentialId: 'META-FE-55192',
      icon: 'code',
    },
  ],
  'ST-2026-002': [
    {
      id: 'badge-3',
      certId: 'cert-5',
      title: 'Google Professional Data Engineer',
      skill: 'Big Data & Cloud SQL',
      issuer: 'Google Cloud Platform',
      verifiedBy: 'Dr. P. Murugesan (Faculty, IT)',
      verifiedAt: 'June 10, 2026',
      credentialId: 'GCP-DE-81290',
      icon: 'database',
    },
  ],
  'ST-2026-004': [
    {
      id: 'badge-4',
      certId: 'cert-4',
      title: 'Certified Information Systems Security Professional',
      skill: 'Cybersecurity',
      issuer: 'ISC2 / CompTIA',
      verifiedBy: 'Prof. V. Deepa (Faculty, IT)',
      verifiedAt: 'May 22, 2026',
      credentialId: 'ISC2-SEC-4921',
      icon: 'shield',
    },
  ],
}

export const initialStudents = [
  {
    id: 'ST-2026-001',
    name: 'Gokulraj A S',
    email: 'gokulraj.610225205019@aec.ac.in',
    rollNumber: '610225205019',
    dept: 'IT',
    course: 'B.Tech Information Technology',
    batch: '2022 - 2026',
    year: 'Year 4',
    status: 'Enrolled',
    phone: '+91 98421 50191',
    aadhaar: 'XXXX-XXXX-5019',
    cgpa: '8.65',
    activeArrears: 0,
    arrearHistory: 0,
    bloodGroup: 'O+',
    guardian: 'S. Arumugam (+91 98421 11000)',
    address: 'NH-47, Sankari Main Road, Salem, Tamil Nadu - 636308',
    emergencyContact: '+91 98421 11000',
    bio: 'Information Technology undergraduate specializing in full-stack web applications, cloud systems, and scalable backend services.',
    skills: ['React.js', 'Node.js', 'Python', 'PostgreSQL', 'Cloud Infrastructure', 'REST APIs', 'Docker'],
    linkedIn: 'https://linkedin.com/in/gokulraj-as',
    github: 'https://github.com/Goku-devil',
    portfolio: 'https://gokulraj.dev',
    initials: 'GA',
    color: 'blue',
    enrolledCourses: ['IT-401', 'IT-402', 'CS-403'],
    badges: initialStudentBadges['ST-2026-001'],
    semesters: [
      {
        semester: 6,
        sgpa: '8.80',
        activeArrears: 0,
        credits: 22,
        marksheets: [
          { code: 'IT3601', title: 'Full Stack Cloud Development', credits: 4, internal: 24, external: 66, total: 90, grade: 'O', result: 'Pass' },
          { code: 'IT3602', title: 'Mobile Application Architecture', credits: 4, internal: 23, external: 62, total: 85, grade: 'A+', result: 'Pass' },
          { code: 'CS3603', title: 'Machine Learning & Predictive Models', credits: 4, internal: 22, external: 61, total: 83, grade: 'A+', result: 'Pass' },
          { code: 'IT3608', title: 'Web App & Security Lab', credits: 2, internal: 25, external: 70, total: 95, grade: 'O', result: 'Pass' },
        ],
      },
      {
        semester: 5,
        sgpa: '8.55',
        activeArrears: 0,
        credits: 21,
        marksheets: [
          { code: 'IT3501', title: 'Computer Networks & Protocols', credits: 4, internal: 23, external: 63, total: 86, grade: 'A+', result: 'Pass' },
          { code: 'IT3502', title: 'Web Technologies & Frameworks', credits: 4, internal: 24, external: 64, total: 88, grade: 'A+', result: 'Pass' },
          { code: 'CS3503', title: 'Software Engineering Methodologies', credits: 3, internal: 22, external: 60, total: 82, grade: 'A', result: 'Pass' },
        ],
      },
    ],
    achievements: [
      {
        id: 'ach-1',
        title: 'Smart India Hackathon 2025 - State Level Finalist',
        type: 'Event',
        organization: 'Ministry of Education Innovation Cell (MIC)',
        date: '2025-11-18',
        status: 'Approved',
      },
      {
        id: 'ach-2',
        title: 'Full Stack Web Engineering Summer Internship',
        type: 'Internship',
        organization: 'Zoho Corporation, Chennai',
        date: '2025-07-30',
        status: 'Approved',
      },
    ],
  },
  {
    id: 'ST-2026-002',
    name: 'JayaSurya P',
    email: 'jayasurya.610225205018@aec.ac.in',
    rollNumber: '610225205018',
    dept: 'IT',
    course: 'B.Tech Information Technology',
    batch: '2022 - 2026',
    year: 'Year 4',
    status: 'Enrolled',
    phone: '+91 97500 50182',
    aadhaar: 'XXXX-XXXX-5018',
    cgpa: '8.42',
    activeArrears: 0,
    arrearHistory: 0,
    bloodGroup: 'B+',
    guardian: 'P. Palanisamy (+91 97500 12345)',
    address: 'Omalur, Salem, Tamil Nadu - 636455',
    initials: 'JP',
    color: 'coral',
    enrolledCourses: ['IT-401', 'IT-402'],
    badges: initialStudentBadges['ST-2026-002'],
    semesters: [
      {
        semester: 6,
        sgpa: '8.50',
        activeArrears: 0,
        credits: 22,
        marksheets: [
          { code: 'IT3601', title: 'Full Stack Cloud Development', credits: 4, internal: 23, external: 62, total: 85, grade: 'A+', result: 'Pass' },
          { code: 'IT3602', title: 'Mobile Application Architecture', credits: 4, internal: 22, external: 61, total: 83, grade: 'A+', result: 'Pass' },
        ],
      },
    ],
    achievements: [
      {
        id: 'ach-3',
        title: 'UI/UX Design Masterclass & State Hackathon Runner-up',
        type: 'Event',
        organization: 'Anna University Tech Fest',
        date: '2025-09-14',
        status: 'Approved',
      },
    ],
  },
  {
    id: 'ST-2026-003',
    name: 'Pradeep J',
    email: 'pradeep.610225205025@aec.ac.in',
    rollNumber: '610225205025',
    dept: 'IT',
    course: 'B.Tech Information Technology',
    batch: '2022 - 2026',
    year: 'Year 4',
    status: 'Enrolled',
    phone: '+91 98425 50253',
    aadhaar: 'XXXX-XXXX-5025',
    cgpa: '8.15',
    activeArrears: 0,
    arrearHistory: 0,
    bloodGroup: 'A+',
    guardian: 'J. Jagadeesan (+91 98425 22334)',
    address: 'Attur, Salem, Tamil Nadu - 636102',
    initials: 'PJ',
    color: 'green',
    enrolledCourses: ['IT-401', 'CS-403'],
    badges: [],
    semesters: [
      {
        semester: 6,
        sgpa: '8.20',
        activeArrears: 0,
        credits: 22,
        marksheets: [
          { code: 'IT3601', title: 'Full Stack Cloud Development', credits: 4, internal: 22, external: 59, total: 81, grade: 'A', result: 'Pass' },
        ],
      },
    ],
    achievements: [
      {
        id: 'ach-4',
        title: 'Cloud Database Architecture Virtual Internship',
        type: 'Internship',
        organization: 'IBM SkillsBuild',
        date: '2025-08-12',
        status: 'Approved',
      },
    ],
  },
  {
    id: 'ST-2026-004',
    name: 'Sanjay P',
    email: 'sanjay.610225205032@aec.ac.in',
    rollNumber: '610225205032',
    dept: 'IT',
    course: 'B.Tech Information Technology',
    batch: '2022 - 2026',
    year: 'Year 4',
    status: 'Enrolled',
    phone: '+91 96291 50324',
    aadhaar: 'XXXX-XXXX-5032',
    cgpa: '8.52',
    activeArrears: 0,
    arrearHistory: 0,
    bloodGroup: 'AB+',
    guardian: 'P. Perumal (+91 96291 33445)',
    address: 'Edappadi, Salem, Tamil Nadu - 637101',
    initials: 'SP',
    color: 'yellow',
    enrolledCourses: ['IT-401', 'IT-402'],
    badges: initialStudentBadges['ST-2026-004'],
    semesters: [
      {
        semester: 6,
        sgpa: '8.60',
        activeArrears: 0,
        credits: 22,
        marksheets: [
          { code: 'IT3601', title: 'Full Stack Cloud Development', credits: 4, internal: 24, external: 62, total: 86, grade: 'A+', result: 'Pass' },
        ],
      },
    ],
    achievements: [
      {
        id: 'ach-5',
        title: 'Cybersecurity Threat Detection Certification',
        type: 'Certification',
        organization: 'Cisco Networking Academy',
        date: '2025-10-05',
        status: 'Approved',
      },
    ],
  },
  {
    id: 'ST-2026-005',
    name: 'Nikhil M',
    email: 'nikhil.610225205022@aec.ac.in',
    rollNumber: '610225205022',
    dept: 'IT',
    course: 'B.Tech Information Technology',
    batch: '2022 - 2026',
    year: 'Year 4',
    status: 'Enrolled',
    phone: '+91 94432 50225',
    aadhaar: 'XXXX-XXXX-5022',
    cgpa: '7.85',
    activeArrears: 1,
    arrearHistory: 1,
    bloodGroup: 'O-',
    guardian: 'M. Manoharan (+91 94432 44556)',
    address: 'Mecheri, Salem, Tamil Nadu - 636453',
    initials: 'NM',
    color: 'pink',
    enrolledCourses: ['IT-401'],
    badges: [],
    semesters: [
      {
        semester: 6,
        sgpa: '7.60',
        activeArrears: 1,
        credits: 22,
        marksheets: [
          { code: 'IT3601', title: 'Full Stack Cloud Development', credits: 4, internal: 21, external: 55, total: 76, grade: 'A', result: 'Pass' },
          { code: 'MA3354', title: 'Discrete Mathematics', credits: 4, internal: 16, external: 28, total: 44, grade: 'RA', result: 'Reappear' },
        ],
      },
    ],
    achievements: [
      {
        id: 'ach-6',
        title: 'National Level Technical Symposium Presentation',
        type: 'Event',
        organization: 'Government College of Engineering, Salem',
        date: '2025-09-22',
        status: 'Approved',
      },
    ],
  },
  {
    id: 'ST-2026-006',
    name: 'RithikRoshan M',
    email: 'rithikroshan.610225205028@aec.ac.in',
    rollNumber: '610225205028',
    dept: 'IT',
    course: 'B.Tech Information Technology',
    batch: '2022 - 2026',
    year: 'Year 4',
    status: 'Enrolled',
    phone: '+91 97890 50286',
    aadhaar: 'XXXX-XXXX-5028',
    cgpa: '8.22',
    activeArrears: 0,
    arrearHistory: 0,
    bloodGroup: 'B-',
    guardian: 'M. Mohan (+91 97890 55667)',
    address: 'Sankari, Salem, Tamil Nadu - 637301',
    initials: 'RM',
    color: 'blue',
    enrolledCourses: ['IT-401', 'IT-402'],
    badges: [],
    semesters: [
      {
        semester: 6,
        sgpa: '8.25',
        activeArrears: 0,
        credits: 22,
        marksheets: [
          { code: 'IT3601', title: 'Full Stack Cloud Development', credits: 4, internal: 23, external: 60, total: 83, grade: 'A+', result: 'Pass' },
        ],
      },
    ],
    achievements: [],
  },
  {
    id: 'ST-2026-007',
    name: 'Gokul S',
    email: 'gokul.610225205011@aec.ac.in',
    rollNumber: '610225205011',
    dept: 'IT',
    course: 'B.Tech Information Technology',
    batch: '2022 - 2026',
    year: 'Year 4',
    status: 'Enrolled',
    phone: '+91 98433 50117',
    aadhaar: 'XXXX-XXXX-5011',
    cgpa: '8.38',
    activeArrears: 0,
    arrearHistory: 0,
    bloodGroup: 'O+',
    guardian: 'S. Sekar (+91 98433 66778)',
    address: 'Rasipuram, Namakkal, Tamil Nadu - 637408',
    initials: 'GS',
    color: 'coral',
    enrolledCourses: ['IT-401', 'CS-403'],
    badges: [],
    semesters: [
      {
        semester: 6,
        sgpa: '8.40',
        activeArrears: 0,
        credits: 22,
        marksheets: [
          { code: 'IT3601', title: 'Full Stack Cloud Development', credits: 4, internal: 23, external: 61, total: 84, grade: 'A+', result: 'Pass' },
        ],
      },
    ],
    achievements: [],
  },
  {
    id: 'ST-2026-008',
    name: 'Ananya Sharma',
    email: 'ananya.610225104008@aec.ac.in',
    rollNumber: '610225104008',
    dept: 'Computer Science',
    course: 'B.E Computer Science & Engineering',
    batch: '2022 - 2026',
    year: 'Year 4',
    status: 'Enrolled',
    phone: '+91 98765 43210',
    aadhaar: 'XXXX-XXXX-4008',
    cgpa: '9.10',
    activeArrears: 0,
    arrearHistory: 0,
    bloodGroup: 'A+',
    guardian: 'R. Sharma (+91 98765 11223)',
    address: 'Fairlands, Salem, Tamil Nadu - 636016',
    initials: 'AS',
    color: 'green',
    enrolledCourses: ['CS-403'],
    badges: [],
    semesters: [
      {
        semester: 6,
        sgpa: '9.20',
        activeArrears: 0,
        credits: 22,
        marksheets: [
          { code: 'CS3601', title: 'Artificial Intelligence & Neural Nets', credits: 4, internal: 25, external: 68, total: 93, grade: 'O', result: 'Pass' },
        ],
      },
    ],
    achievements: [],
  },
  {
    id: 'ST-2026-009',
    name: 'Vigneshwaran K',
    email: 'vignesh.610225106045@aec.ac.in',
    rollNumber: '610225106045',
    dept: 'ECE',
    course: 'B.E Electronics & Communication',
    batch: '2022 - 2026',
    year: 'Year 4',
    status: 'Enrolled',
    phone: '+91 99440 10645',
    aadhaar: 'XXXX-XXXX-6045',
    cgpa: '7.60',
    activeArrears: 2,
    arrearHistory: 2,
    bloodGroup: 'B+',
    guardian: 'K. Kumar (+91 99440 22334)',
    address: 'Alagapuram, Salem, Tamil Nadu - 636004',
    initials: 'VK',
    color: 'yellow',
    enrolledCourses: ['IT-401'],
    badges: [],
    semesters: [
      {
        semester: 6,
        sgpa: '7.40',
        activeArrears: 2,
        credits: 22,
        marksheets: [
          { code: 'EC3601', title: 'VLSI Design Architectures', credits: 4, internal: 18, external: 30, total: 48, grade: 'RA', result: 'Reappear' },
        ],
      },
    ],
    achievements: [],
  },
  {
    id: 'ST-2026-010',
    name: 'Pooja Venkatesh',
    email: 'pooja.610225114031@aec.ac.in',
    rollNumber: '610225114031',
    dept: 'Computer Science',
    course: 'B.E Computer Science & Engineering',
    batch: '2023 - 2027',
    year: 'Year 3',
    status: 'Pending',
    phone: '+91 98402 11431',
    aadhaar: 'XXXX-XXXX-4031',
    cgpa: '8.45',
    activeArrears: 0,
    arrearHistory: 0,
    bloodGroup: 'O+',
    guardian: 'V. Venkatesh (+91 98402 33445)',
    address: 'Hasthampatti, Salem, Tamil Nadu - 636007',
    initials: 'PV',
    color: 'pink',
    enrolledCourses: ['CS-403'],
    badges: [],
    semesters: [],
    achievements: [],
  },
]

export const initialCourses = [
  {
    id: 'IT-401',
    code: 'IT-401',
    title: 'Full Stack Web & Cloud Architecture',
    dept: 'IT',
    credits: 4,
    instructor: 'Dr. P. Murugesan',
    room: 'IT Computing Center 2',
    schedule: 'Mon / Wed · 09:30 AM - 11:00 AM',
    enrolled: 54,
    capacity: 60,
  },
  {
    id: 'IT-402',
    code: 'IT-402',
    title: 'Mobile App Development & Security',
    dept: 'IT',
    credits: 4,
    instructor: 'Prof. R. Anitha',
    room: 'Software Lab 3',
    schedule: 'Tue / Thu · 10:00 AM - 11:30 AM',
    enrolled: 48,
    capacity: 60,
  },
  {
    id: 'CS-403',
    code: 'CS-403',
    title: 'Artificial Intelligence & Predictive Analytics',
    dept: 'Computer Science',
    credits: 4,
    instructor: 'Dr. M. Karthik',
    room: 'Smart Classroom B',
    schedule: 'Mon / Fri · 01:30 PM - 03:00 PM',
    enrolled: 52,
    capacity: 65,
  },
  {
    id: 'EC-304',
    code: 'EC-304',
    title: 'Embedded Systems & IoT Devices',
    dept: 'ECE',
    credits: 3,
    instructor: 'Prof. V. Deepa',
    room: 'Hardware Lab 1',
    schedule: 'Wednesday · 02:00 PM - 04:30 PM',
    enrolled: 38,
    capacity: 45,
  },
]

export const initialCertificates = [
  {
    id: 'cert-1',
    studentId: 'ST-2026-001',
    studentName: 'Gokulraj A S',
    studentEmail: 'gokulraj.610225205019@aec.ac.in',
    dept: 'IT',
    skill: 'Cloud Architecture',
    title: 'AWS Certified Solutions Architect - Associate',
    issuer: 'Amazon Web Services (AWS)',
    issueDate: '2026-06-15',
    credentialId: 'AWS-9482710-ARCH',
    credentialUrl: 'https://aws.amazon.com/verification',
    status: 'Verified',
    verifiedBy: 'Dr. P. Murugesan (Faculty, IT)',
    verifiedAt: 'July 15, 2026',
    badgeTitle: 'AWS Certified Solutions Architect',
    badgeIcon: 'cloud',
    notes: 'Credentials validated via AWS digital certification repository.',
  },
  {
    id: 'cert-2',
    studentId: 'ST-2026-001',
    studentName: 'Gokulraj A S',
    studentEmail: 'gokulraj.610225205019@aec.ac.in',
    dept: 'IT',
    skill: 'Web Engineering',
    title: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Meta / Coursera',
    issueDate: '2026-08-20',
    credentialId: 'META-FE-55192',
    credentialUrl: 'https://coursera.org/verify/META-FE',
    status: 'Verified',
    verifiedBy: 'Prof. R. Anitha (Faculty, IT)',
    verifiedAt: 'August 28, 2026',
    badgeTitle: 'Meta Certified Front-End Developer',
    badgeIcon: 'code',
    notes: 'Validated complete capstone project and graded assignments.',
  },
  {
    id: 'cert-3',
    studentId: 'ST-2026-002',
    studentName: 'JayaSurya P',
    studentEmail: 'jayasurya.610225205018@aec.ac.in',
    dept: 'IT',
    skill: 'Big Data & Cloud SQL',
    title: 'Google Professional Data Engineer',
    issuer: 'Google Cloud Platform',
    issueDate: '2026-06-01',
    credentialId: 'GCP-DE-81290',
    credentialUrl: 'https://cloud.google.com/certification',
    status: 'Verified',
    verifiedBy: 'Dr. P. Murugesan (Faculty, IT)',
    verifiedAt: 'June 10, 2026',
    badgeTitle: 'Google Professional Data Engineer',
    badgeIcon: 'database',
    notes: 'Confirmed GCP certification validity.',
  },
  {
    id: 'cert-4',
    studentId: 'ST-2026-004',
    studentName: 'Sanjay P',
    studentEmail: 'sanjay.610225205032@aec.ac.in',
    dept: 'IT',
    skill: 'Cybersecurity',
    title: 'Certified Information Systems Security Professional',
    issuer: 'ISC2 / CompTIA',
    issueDate: '2026-05-18',
    credentialId: 'ISC2-SEC-4921',
    credentialUrl: 'https://comptia.org/verify',
    status: 'Verified',
    verifiedBy: 'Prof. V. Deepa (Faculty, IT)',
    verifiedAt: 'May 22, 2026',
    badgeTitle: 'Certified Information Systems Security Professional',
    badgeIcon: 'shield',
    notes: 'Exam score verified authentic.',
  },
  {
    id: 'cert-5',
    studentId: 'ST-2026-003',
    studentName: 'Pradeep J',
    studentEmail: 'pradeep.610225205025@aec.ac.in',
    dept: 'IT',
    skill: 'Database Systems',
    title: 'Oracle Certified Associate - Database SQL',
    issuer: 'Oracle University',
    issueDate: '2026-09-12',
    credentialId: 'ORA-SQL-99120',
    credentialUrl: 'https://oracle.com/verify',
    status: 'Pending',
    verifiedBy: null,
    verifiedAt: null,
    badgeTitle: 'Oracle Certified Database Associate',
    badgeIcon: 'database',
    notes: 'Submitted for faculty review and verification.',
  },
]

export const initialEvents = [
  {
    id: 'ev-1',
    day: '30',
    month: 'SEP',
    title: 'Course registration & elective freeze closes',
    time: 'Wednesday · 5:00 PM',
    location: 'AEC Registrar Office & Online Portal',
    type: 'Academic deadline',
  },
  {
    id: 'ev-2',
    day: '05',
    month: 'OCT',
    title: 'Autonomous End-Semester CIA Assessments begin',
    time: 'Monday · 09:30 AM',
    location: 'AEC Examination Halls 1 - 4',
    type: 'Examinations',
  },
  {
    id: 'ev-3',
    day: '15',
    month: 'OCT',
    title: 'Campus Placement & Tier-1 IT Drive 2026',
    time: 'Thursday · 09:00 AM - 5:00 PM',
    location: 'AEC Central Placement Cell Auditorium',
    type: 'Placement & Careers',
  },
  {
    id: 'ev-4',
    day: '22',
    month: 'OCT',
    title: 'NBA & NAAC Accreditation Peer Review Visit',
    time: 'Thursday · All day',
    location: 'Department of Information Technology',
    type: 'Academic Quality Audit',
  },
]

export const initialSettings = {
  institutionName: 'Annapoorana Engineering College',
  campusLocation: 'NH-47, Sankari Main Road, Salem, Tamil Nadu',
  academicTerm: 'Even Semester Academic Year 2025 - 2026',
  emailNotifications: true,
  skillVerificationAlerts: true,
  weeklyReports: false,
  selfRegistration: true,
}

export const STORAGE_KEYS = {
  STUDENTS: 'aec_spms_students_v3',
  COURSES: 'aec_spms_courses_v3',
  CERTIFICATES: 'aec_spms_certificates_v3',
  USER: 'aec_spms_user_v3',
  EVENTS: 'aec_spms_events_v3',
  SETTINGS: 'aec_spms_settings_v3',
}

export function loadStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch (error) {
    console.warn(`Failed to read from localStorage [${key}]:`, error)
    return fallback
  }
}

export function saveStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.warn(`Failed to write to localStorage [${key}]:`, error)
  }
}

export function exportStudentsToCSV(students) {
  const headers = [
    'Student ID',
    'Roll Number',
    'Full Name',
    'Email Address',
    'Academic Department',
    'Degree Program',
    'Batch Year',
    'Academic Year',
    'Status',
    'CGPA (out of 10.0)',
    'Active Arrears',
    'Arrears History',
    'Verified Badges Count',
    'Aadhaar Status',
    'Contact Phone',
  ]
  const rows = students.map((s) => [
    `"${s.id || ''}"`,
    `"${s.rollNumber || ''}"`,
    `"${(s.name || '').replace(/"/g, '""')}"`,
    `"${(s.email || '').replace(/"/g, '""')}"`,
    `"${(s.dept || '').replace(/"/g, '""')}"`,
    `"${(s.course || '').replace(/"/g, '""')}"`,
    `"${(s.batch || '2022 - 2026').replace(/"/g, '""')}"`,
    `"${(s.year || '').replace(/"/g, '""')}"`,
    `"${(s.status || '').replace(/"/g, '""')}"`,
    `"${s.cgpa || ''}"`,
    `"${s.activeArrears !== undefined ? s.activeArrears : 0}"`,
    `"${s.arrearHistory !== undefined ? s.arrearHistory : 0}"`,
    `"${(s.badges || []).length}"`,
    `"${s.aadhaar ? 'Verified (' + s.aadhaar + ')' : 'Pending'}"`,
    `"${(s.phone || '').replace(/"/g, '""')}"`,
  ])
  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `AEC_SPMS_Student_Directory_${new Date().toISOString().slice(0, 10)}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function exportPlacementCriteriaCSV(students, criteriaName) {
  const headers = [
    'Roll Number',
    'Student Name',
    'Department',
    'Batch',
    'CGPA',
    'Active Arrears',
    'Verified Badges',
    'Email Address',
    'Contact Number',
  ]
  const rows = students.map((s) => [
    `"${s.rollNumber || s.id}"`,
    `"${(s.name || '').replace(/"/g, '""')}"`,
    `"${(s.dept || '').replace(/"/g, '""')}"`,
    `"${(s.batch || '2022 - 2026').replace(/"/g, '""')}"`,
    `"${s.cgpa || ''}"`,
    `"${s.activeArrears || 0}"`,
    `"${(s.badges || []).length}"`,
    `"${(s.email || '').replace(/"/g, '""')}"`,
    `"${(s.phone || '').replace(/"/g, '""')}"`,
  ])
  const csvContent = [
    `# ANNAPOORANA ENGINEERING COLLEGE (AUTONOMOUS)`,
    `# CRITERIA AUDIT: ${criteriaName.toUpperCase()}`,
    `# GENERATED ON: ${new Date().toLocaleString()}`,
    headers.join(','),
    ...rows.map((r) => r.join(',')),
  ].join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `AEC_Placement_${criteriaName.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function exportReportSummary(data) {
  const summaryText = `======================================================================
ANNAPOORANA ENGINEERING COLLEGE (AN AUTONOMOUS INSTITUTION)
DEPARTMENT OF INFORMATION TECHNOLOGY
ACCREDITED BY NBA & NAAC WITH "A" GRADE · SALEM, TAMIL NADU
ACADEMIC AUDIT & STUDENT PROFILE MANAGEMENT REPORT
======================================================================
Report Generated: ${new Date().toLocaleString()}
Academic Period: Academic Year 2025 - 2026
----------------------------------------------------------------------
INSTITUTIONAL METRICS SUMMARY:
  * Total Enrolled Students:        ${data.totalStudents}
  * Active Enrollment Percentage:   ${data.enrolledRate}%
  * Total Academic Departments:     ${data.departmentsCount}
  * Department Faculty Count:       ${data.facultyCount}
  * Verified Student Skill Badges:  ${data.verifiedBadgesCount || 0}
  * Institutional Average CGPA:     ${data.avgGpa} / 10.00
  * Students with 0 Standing Arrears: ${data.zeroArrearsCount || 0} (${data.zeroArrearsPercentage || '90'}%)
----------------------------------------------------------------------
DEPARTMENT ROSTER DISTRIBUTION:
${data.deptBreakdown.map((item) => `  * ${item.dept.padEnd(25)}: ${item.count} students (${item.percentage}%)`).join('\n')}
----------------------------------------------------------------------
AEC SPMS Architecture · Role Based Access Control (RBAC) Active
Protected Student Records · Single Source of Truth
======================================================================`
  const blob = new Blob([summaryText], { type: 'text/plain;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `AEC_SPMS_Academic_Audit_Report_${new Date().toISOString().slice(0, 10)}.txt`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export const facultyCount = facultys.length || 4
export const departmentCount = departments.length

export const navigation = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Customize Profile', icon: UserPen },
  { label: 'Students', icon: Users },
  { label: 'Courses', icon: BookOpen },
  { label: 'Verify your skills', icon: Award },
  { label: 'Reports', icon: ChartNoAxesColumnIncreasing },
]

export const demoAccounts = {
  administrator: {
    role: 'administrator',
    name: admin?.name || 'Dr. K. Senthil (Admin)',
    email: admin?.email || 'admin@aec.ac.in',
    password: 'northstar',
    initials: 'AD',
  },
  registrar: {
    role: 'registrar',
    name: registrator?.name || 'Prof. S. Natarajan',
    email: registrator?.email || 'reg@aec.ac.in',
    password: 'northstar',
    initials: 'RG',
  },
  faculty: {
    role: 'faculty',
    name: facultys[0]?.name || 'Dr. P. Murugesan',
    email: facultys[0]?.email || 'murugesan.it@aec.ac.in',
    password: 'northstar',
    initials: 'PM',
  },
  student: {
    role: 'student',
    name: initialStudents[0].name,
    email: initialStudents[0].email,
    password: 'northstar',
    initials: initialStudents[0].initials,
    studentId: initialStudents[0].id,
    rollNumber: initialStudents[0].rollNumber,
  },
}

export const rolePermissions = {
  administrator: {
    label: 'Administrator',
    sections: ['Overview', 'Students', 'Courses', 'Verify your skills', 'Reports', 'Help & support', 'Settings'],
    canAddStudents: true,
    canEditStudents: true,
    canDeleteStudents: true,
    canManageCourses: true,
    canVerifySkills: true,
    canUploadCertificates: true,
    canUpdateGrades: true,
  },
  registrar: {
    label: 'Registrar',
    sections: ['Overview', 'Students', 'Courses', 'Verify your skills', 'Reports', 'Help & support'],
    canAddStudents: true,
    canEditStudents: true,
    canDeleteStudents: false,
    canManageCourses: true,
    canVerifySkills: true,
    canUploadCertificates: true,
    canUpdateGrades: false,
  },
  faculty: {
    label: 'Faculty',
    sections: ['Overview', 'Students', 'Courses', 'Verify your skills', 'Reports', 'Help & support'],
    canAddStudents: false,
    canEditStudents: false,
    canDeleteStudents: false,
    canManageCourses: true,
    canVerifySkills: true,
    canUploadCertificates: true,
    canUpdateGrades: true,
  },
  student: {
    label: 'Student',
    sections: ['Overview', 'Customize Profile', 'Courses', 'Verify your skills', 'Help & support'],
    canAddStudents: false,
    canEditStudents: false,
    canDeleteStudents: false,
    canManageCourses: false,
    canVerifySkills: false,
    canUploadCertificates: true,
    canUpdateGrades: false,
  },
}

export const demoRoleOptions = [
  { role: 'administrator', label: 'Administrator', detail: 'Principal & Head of System', icon: ShieldCheck },
  { role: 'faculty', label: 'Faculty', detail: 'Update grades & verify skills', icon: BookOpen },
  { role: 'student', label: 'Student', detail: 'Profile, resume, ID & certs', icon: UserRound },
  { role: 'registrar', label: 'Registrar', detail: 'Student records & audit lists', icon: BriefcaseBusiness },
]