import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Login = React.lazy(() => import('./views/login/Login'))

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
const Criteria = React.lazy(() => import('./views/admin/criteria/Criteria'))
const TambahCriteria = React.lazy(() => import('./views/admin/criteria/TambahCriteria'))
const Administrasi = React.lazy(() => import('./views/admin/administrasi/Administrasi'))

// User master data
const DataPenguji = React.lazy(() => import('./views/user/masterdata/DataPenguji'))
const TambahPenguji = React.lazy(() => import('./views/user/masterdata/TambahPenguji'))
const DataPeserta = React.lazy(() => import('./views/user/masterdata/DataPeserta'))
const TambahPeserta = React.lazy(() => import('./views/user/masterdata/TambahPeserta'))

// User Fit and Proper
const DataFitAndProper = React.lazy(() => import('./views/user/fitandproper/DataFitProper'))
const PendaftaranFitAndProper = React.lazy(() => import('./views/user/fitandproper/Pendaftaran'))
const DataPenilaianFitAndProper = React.lazy(() => import('./views/user/fitandproper/DataPenilaian'))
const DataNilaiFitAndProper = React.lazy(() => import('./views/user/fitandproper/DataNilai'))
const PenilaianFitAndProper = React.lazy(() => import('./views/user/fitandproper/Penilaian'))

// User Wawancara
const DataWawancara = React.lazy(() => import('./views/user/wawancara/DataWawancara'))
const DataPenilaianWawancara = React.lazy(() => import('./views/user/wawancara/DataPenilaian'))
const PenilaianWawancara = React.lazy(() => import('./views/user/wawancara/Penilaian'))
const DataNilaiWawancara = React.lazy(() => import('./views/user/wawancara/DataNilai'))

//User Report
const ReportFit = React.lazy(() => import ('./views/user/report/RekapFitAndProper'))
const ReportMFit = React.lazy(() => import ('./views/user/report/RekapMFitAndProper'))
const CetakReport = React.lazy(() => import ('./views/user/report/CetakRekapFitAndProper'))
const ReportWawancara = React.lazy(() => import ('./views/user/report/RekapWawancara'))
const CetakWawancara = React.lazy(() => import('./views/user/report/CetakRekapWawancara'))

const routes = [
  { path: '/', exact: true, name: 'Dashboard', element: Dashboard },
  { path: '/login', exact: true, name: 'Login', element: Login },
  { path: '/unit', exact: true, name: 'Unit', element: Unit },
  { path: '/unit/tambah', exact: true, name: 'Tambah Unit', element: TambahUnit },
  { path: '/unit/edit', exact: true, name: 'Edit Unit', element: TambahUnit },
  { path: '/directorate', exact: true, name: 'Directorate', element: Directorate },
  { path: '/directorate/tambah', exact: true, name: 'Tambah Directorate', element: TambahDirectorate },
  { path: '/directorate/edit', exact: true, name: 'Edit Directorate', element: TambahDirectorate },
  { path: '/division', exact: true, name: 'Division', element: Division },
  { path: '/division/tambah', exact: true, name: 'Tambah Division', element: TambahDivision },
  { path: '/division/edit', exact: true, name: 'Edit Division', element: TambahDivision },
  { path: '/employee', exact: true, name: 'Employee', element: Employee },
  { path: '/employee/tambah', exact: true, name: 'Tambah Employee', element: TambahEmployee },
  { path: '/employee/edit', exact: true, name: 'Edit Employee', element: TambahEmployee },
  { path: '/field', exact: true, name: 'Field', element: Field },
  { path: '/field/tambah', exact: true, name: 'Tambah Field', element: TambahField },
  { path: '/field/edit', exact: true, name: 'Edit Field', element: TambahField },
  { path: '/grade', exact: true, name: 'Grade', element: Grade },
  { path: '/grade/tambah', exact: true, name: 'Tambah Grade', element: TambahGrade },
  { path: '/grade/edit', exact: true, name: 'Edit Grade', element: TambahGrade },
  { path: '/level', exact: true, name: 'Level', element: Level },
  { path: '/level/tambah', exact: true, name: 'Tambah Level', element: TambahLevel },
  { path: '/level/edit', exact: true, name: 'Edit Level', element: TambahLevel },
  { path: '/position', exact: true, name: 'Position', element: Position },
  { path: '/position/tambah', exact: true, name: 'Tambah Position', element: TambahPosition },
  { path: '/position/edit', exact: true, name: 'Edit Position', element: TambahPosition },
  { path: '/subfield', exact: true, name: 'Subfield', element: Subfield },
  { path: '/subfield/tambah', exact: true, name: 'Tambah Subfield', element: TambahSubfield },
  { path: '/subfield/edit', exact: true, name: 'Edit Subfield', element: TambahSubfield },
  { path: '/criteria', exact: true, name: 'Criteria', element: Criteria },
  { path: '/criteria/tambah', exact: true, name: 'Tambah Criteria', element: TambahCriteria },
  { path: '/criteria/edit', exact: true, name: 'Edit Criteria', element: TambahCriteria },
  { path: '/administrasi', exact: true, name: 'Administrasi User', element: Administrasi },

  { path: '/datapenguji', exact: true, name: 'Penguji', element: DataPenguji },
  { path: '/tambahpenguji', exact: true, name: 'Tambah Penguji', element: TambahPenguji },
  { path: '/datapeserta', exact: true, name: 'Peserta', element: DataPeserta },
  { path: '/tambahpeserta', exact: true, name: 'Tambah Peserta', element: TambahPeserta },

  { path: '/fitandproper/', exact: true, name: 'Data Pendaftaran Fit & Proper', element: DataFitAndProper },
  { path: '/fitandproper/daftar', exact: true, name: 'Pendaftaran Fit & Proper', element: PendaftaranFitAndProper },
  { path: '/fitandproper/edit', exact: true, name: 'Pendaftaran Fit & Proper', element: PendaftaranFitAndProper },
  { path: '/fitandproper/datapenilaian', exact: true, name: 'Data Penilaian Fit & Proper', element: DataPenilaianFitAndProper },
  { path: '/fitandproper/datapenilaian/nilai', exact: true, name: 'Penilaian Fit & Proper', element: PenilaianFitAndProper },
  { path: '/fitandproper/datapenilaian/nilai/edit', exact: true, name: 'Penilaian Fit & Proper', element: PenilaianFitAndProper },
  { path: '/fitandproper/datapenilaian/datanilai', exact: true, name: 'Penilaian Fit & Proper', element: DataNilaiFitAndProper },

  { path: '/wawancara/', exact: true, name: 'Data Wawancara', element: DataWawancara },
  { path: '/wawancara/datapenilaian', exact: true, name: 'Data Penilaian Wawancara', element: DataPenilaianWawancara },
  { path: '/wawancara/datapenilaian/nilai', exact: true, name: 'Penilaian Wawancara', element: PenilaianWawancara },
  { path: '/wawancara/datapenilaian/nilai/edit', exact: true, name: 'Penilaian Wawancara', element: PenilaianWawancara },
  { path: '/wawancara/datapenilaian/datanilai', exact: true, name: 'Penilaian Wawancara', element: DataNilaiWawancara },

  { path: 'report/reportfit', exact: true, name: 'Report Fit And Proper', element: ReportFit },
  { path: 'report/reportmfit', exact: true, name: 'Report NM Fit And Proper', element: ReportMFit },
  { path: 'report/cetakreport', exact: true, name: 'Cetak Report', element: CetakReport},
  { path: 'report/reportwawancara', exact: true, name: 'Report Wawancara', element: ReportWawancara},
  { path: 'report/cetakwawancara', exact: true, name: 'Cetak Wawancara', element: CetakWawancara},

]

export default routes
