import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Admin
const Directorate = React.lazy(() => import('./views/admin/directorate/Directorate'))
const TambahDirectorate = React.lazy(() => import('./views/admin/directorate/TambahDirectorate'))
const Division = React.lazy(() => import('./views/admin/division/Division'))
const TambahDivision = React.lazy(() => import('./views/admin/division/TambahDivision'))
const Employee = React.lazy(() => import('./views/admin/employee/Employee'))
const TambahEmployee = React.lazy(() => import('./views/admin/employee/TambahEmployee'))
const Field = React.lazy(() => import('./views/admin/field/Field'))
const TambahField = React.lazy(() => import('./views/admin/field/TambahField'))
const Grade = React.lazy(() => import('./views/admin/grade/Grade'))
const TambahGrade = React.lazy(() => import('./views/admin/grade/TambahGrade'))
const Level = React.lazy(() => import('./views/admin/level/Level'))
const TambahLevel = React.lazy(() => import('./views/admin/level/TambahLevel'))
const Position = React.lazy(() => import('./views/admin/position/Position'))
const TambahPosition = React.lazy(() => import('./views/admin/position/TambahPosition'))
const Subfield = React.lazy(() => import('./views/admin/subfield/Subfield'))
const TambahSubfield = React.lazy(() => import('./views/admin/subfield/TambahSubfield'))
const Unit = React.lazy(() => import('./views/admin/unit/Unit'))
const TambahUnit = React.lazy(() => import('./views/admin/unit/TambahUnit'))

// User master data
const DataPenguji = React.lazy(() => import('./views/user/masterdata/DataPenguji'))
const TambahPenguji = React.lazy(() => import('./views/user/masterdata/TambahPenguji'))
const DataPeserta = React.lazy(() => import('./views/user/masterdata/DataPeserta'))
const TambahPeserta = React.lazy(() => import('./views/user/masterdata/TambahPeserta'))

// User Fit and Proper
const PendaftaranFitAndProper = React.lazy(() => import('./views/user/fitandproper/PendaftaranFitAndProper'))
const PenilaianFitAndProper = React.lazy(() => import('./views/user/fitandproper/PenilaianFitAndProper'))

// User Wawancara
const PendaftaranWawancara = React.lazy(() => import('./views/user/wawancara/PendaftaranWawancara'))
const PenilaianWawancara = React.lazy(() => import('./views/user/wawancara/PenilaianWawancara'))


//User Report
const ReportFit = React.lazy(() => import ('./views/user/report/ReportFitAndProper'))
const ReportMFit = React.lazy(() => import ('./views/user/report/ReportNMFitAndProper'))
const DetailReport = React.lazy(() => import ('./views/user/report/DetailReport'))
const CetakReport = React.lazy(() => import ('./views/user/report/CetakReportFitAndProper'))
const ReportWawancara = React.lazy(() => import ('./views/user/report/ReportWawancara'))
const CetakWawancara = React.lazy(() => import('./views/user/report/CetakReportWawancara'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/admin/unit', name: 'Unit', element: Unit },
  { path: '/admin/unit/tambah', name: 'Tambah Unit', element: TambahUnit },
  { path: '/admin/directorate', name: 'Directorate', element: Directorate },
  { path: '/admin/directorate/tambah', name: 'Tambah Directorate', element: TambahDirectorate },
  { path: '/admin/division', name: 'Division', element: Division },
  { path: '/admin/division/tambah', name: 'Tambah Division', element: TambahDivision },
  { path: '/admin/employee', name: 'Employee', element: Employee },
  { path: '/admin/employee/tambah', name: 'Tambah Employee', element: TambahEmployee },
  { path: '/admin/field', name: 'Field', element: Field },
  { path: '/admin/field/tambah', name: 'Tambah Field', element: TambahField },
  { path: '/admin/grade', name: 'Grade', element: Grade },
  { path: '/admin/grade/tambah', name: 'Tambah Grade', element: TambahGrade },
  { path: '/admin/level', name: 'Level', element: Level },
  { path: '/admin/level/tambah', name: 'Tambah Level', element: TambahLevel },
  { path: '/admin/position', name: 'Position', element: Position },
  { path: '/admin/position/tambah', name: 'Tambah Position', element: TambahPosition },
  { path: '/admin/subfield', name: 'Subfield', element: Subfield },
  { path: '/admin/subfield/tambah', name: 'Tambah Subfield', element: TambahSubfield },

  { path: '/datapenguji', name: 'Penguji', element: DataPenguji },
  { path: '/tambahpenguji', name: 'Tambah Penguji', element: TambahPenguji },
  { path: '/datapeserta', name: 'Peserta', element: DataPeserta },
  { path: '/tambahpeserta', name: 'Tambah Peserta', element: TambahPeserta },

  { path: '/fitandproper/pendaftaran', name: 'Pendaftaran Fit & Proper', element: PendaftaranFitAndProper },
  { path: '/fitandproper/penilaian', name: 'Penilaian Fit & Proper', element: PenilaianFitAndProper },

  { path: '/wawancara/pendaftaran', name: 'Pendaftaran Wawancara', element: PendaftaranWawancara },
  { path: '/wawancara/penilaian', name: 'Penilaian Wawancara', element: PenilaianWawancara },


  { path: 'report/reportfit', name: 'Report Fit And Proper', element: ReportFit },
  { path: 'report/reportmfit', name: 'Report NM Fit And Proper', element: ReportMFit },
  { path: 'report/detailreport', name: 'Detail Report', element: DetailReport },
  { path: 'report/cetakreport', name: 'Cetak Report', element: CetakReport},
  { path: 'report/reportwawancara', name: 'Report Wawancara', element: ReportWawancara},
  { path: 'report/cetakwawancara', name: 'Cetak Wawancara', element: CetakWawancara},


  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
]

export default routes
