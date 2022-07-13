import React from 'react'

const ChangePassword = React.lazy(() => import('./views/changepassword/ChangePassword'))
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
  { path: '/', exact: true, name: '', element: Dashboard },
  { path: '/change-password', exact: true, name: 'Ubah Password', element: ChangePassword },
  { path: '/login', exact: true, name: 'Login', element: Login },
  { path: '/unit', exact: true, name: 'Unit', element: Unit },
  { path: '/unit/tambah', exact: true, name: 'Tambah Unit', element: TambahUnit },
  { path: '/unit/edit', exact: true, name: 'Edit Unit', element: TambahUnit },
  { path: '/directorate', exact: true, name: 'Direktorat', element: Directorate },
  { path: '/directorate/tambah', exact: true, name: 'Tambah Direktorat', element: TambahDirectorate },
  { path: '/directorate/edit', exact: true, name: 'Edit Direktorat', element: TambahDirectorate },
  { path: '/division', exact: true, name: 'Divisi', element: Division },
  { path: '/division/tambah', exact: true, name: 'Tambah Divisi', element: TambahDivision },
  { path: '/division/edit', exact: true, name: 'Edit Divisi', element: TambahDivision },
  { path: '/employee', exact: true, name: 'Pegawai', element: Employee },
  { path: '/employee/tambah', exact: true, name: 'Tambah Pegawai', element: TambahEmployee },
  { path: '/employee/edit', exact: true, name: 'Edit Pegawai', element: TambahEmployee },
  { path: '/field', exact: true, name: 'Bidang', element: Field },
  { path: '/field/tambah', exact: true, name: 'Tambah Bidang', element: TambahField },
  { path: '/field/edit', exact: true, name: 'Edit Bidang', element: TambahField },
  { path: '/grade', exact: true, name: 'Grade', element: Grade },
  { path: '/grade/tambah', exact: true, name: 'Tambah Grade', element: TambahGrade },
  { path: '/grade/edit', exact: true, name: 'Edit Grade', element: TambahGrade },
  { path: '/level', exact: true, name: 'Jenjang', element: Level },
  { path: '/level/tambah', exact: true, name: 'Tambah Jenjang', element: TambahLevel },
  { path: '/level/edit', exact: true, name: 'Edit Jenjang', element: TambahLevel },
  { path: '/position', exact: true, name: 'Jabatan', element: Position },
  { path: '/position/tambah', exact: true, name: 'Tambah Jabatan', element: TambahPosition },
  { path: '/position/edit', exact: true, name: 'Edit Jabatan', element: TambahPosition },
  { path: '/subfield', exact: true, name: 'Sub Bidang', element: Subfield },
  { path: '/subfield/tambah', exact: true, name: 'Tambah Sub Bidang', element: TambahSubfield },
  { path: '/subfield/edit', exact: true, name: 'Edit Sub Bidang', element: TambahSubfield },
  { path: '/criteria', exact: true, name: 'Kriteria', element: Criteria },
  { path: '/criteria/tambah', exact: true, name: 'Tambah Kriteria', element: TambahCriteria },
  { path: '/criteria/edit', exact: true, name: 'Edit Kriteria', element: TambahCriteria },
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

  { path: '/report/rekap/fitproper', exact: true, name: 'Rekap Fit And Proper', element: ReportFit },
  { path: '/report/rekap/manualfitproper', exact: true, name: 'Rekap Manual Fit And Proper', element: ReportMFit },
  { path: '/report/rekap/wawancara', exact: true, name: 'Rekap Wawancara', element: ReportWawancara},
  { path: '/report/cetak/fitproper', exact: true, name: 'Cetak Fit & Proper', element: CetakReport},
  { path: '/report/cetak/wawancara', exact: true, name: 'Cetak Wawancara', element: CetakWawancara},
]

export default routes
