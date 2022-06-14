import React from 'react'
import AuthGuard from './config/auth'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Login = React.lazy(() => import('./views/login/Login'))

// Admin
const Directorate = React.lazy(() => import('./views/admin/directorate/Directorate'))
const TambahDirectorate = React.lazy(() => import('./views/admin/directorate/TambahDirectorate'))
const EditDirectorate = React.lazy(() => import('./views/admin/directorate/EditDirectorate'))
const Division = React.lazy(() => import('./views/admin/division/Division'))
const TambahDivision = React.lazy(() => import('./views/admin/division/TambahDivision'))
const EditDivision = React.lazy(() => import('./views/admin/division/EditDivision'))
const Employee = React.lazy(() => import('./views/admin/employee/Employee'))
const TambahEmployee = React.lazy(() => import('./views/admin/employee/TambahEmployee'))
const EditEmployee = React.lazy(() => import('./views/admin/employee/EditEmployee'))
const Field = React.lazy(() => import('./views/admin/field/Field'))
const TambahField = React.lazy(() => import('./views/admin/field/TambahField'))
const EditField = React.lazy(() => import('./views/admin/field/EditField'))
const Grade = React.lazy(() => import('./views/admin/grade/Grade'))
const TambahGrade = React.lazy(() => import('./views/admin/grade/TambahGrade'))
const EditGrade = React.lazy(() => import('./views/admin/grade/EditGrade'))
const Level = React.lazy(() => import('./views/admin/level/Level'))
const TambahLevel = React.lazy(() => import('./views/admin/level/TambahLevel'))
const EditLevel = React.lazy(() => import('./views/admin/level/EditLevel'))
const Position = React.lazy(() => import('./views/admin/position/Position'))
const TambahPosition = React.lazy(() => import('./views/admin/position/TambahPosition'))
const EditPosition = React.lazy(() => import('./views/admin/position/EditPosition'))
const Subfield = React.lazy(() => import('./views/admin/subfield/Subfield'))
const TambahSubfield = React.lazy(() => import('./views/admin/subfield/TambahSubfield'))
const EditSubfield = React.lazy(() => import('./views/admin/subfield/EditSubfield'))
const Unit = React.lazy(() => import('./views/admin/unit/Unit'))
const TambahUnit = React.lazy(() => import('./views/admin/unit/TambahUnit'))
const EditUnit = React.lazy(() => import('./views/admin/unit/EditUnit'))
const Criteria = React.lazy(() => import('./views/admin/criteria/Criteria'))
const TambahCriteria = React.lazy(() => import('./views/admin/criteria/TambahCriteria'))
const EditCriteria = React.lazy(() => import('./views/admin/criteria/EditCriteria'))
const Administrasi = React.lazy(() => import('./views/admin/administrasi/Administrasi'))

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


const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))
const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/dashboard', exact: true, name: 'Dashboard', element: Dashboard },
  { path: '/login', exact: true, name: 'Login', element: Login },
  { path: '/unit', exact: true, name: 'Unit', element: Unit },
  { path: '/unit/tambah', exact: true, name: 'Tambah Unit', element: TambahUnit },
  { path: '/unit/edit/:id', exact: true, name: 'Edit Unit', element: TambahUnit },
  { path: '/directorate', exact: true, name: 'Directorate', element: Directorate },
  { path: '/directorate/tambah', exact: true, name: 'Tambah Directorate', element: TambahDirectorate },
  { path: '/directorate/edit/:id', exact: true, name: 'Edit Directorate', element: EditDirectorate },
  { path: '/division', exact: true, name: 'Division', element: Division },
  { path: '/division/tambah', exact: true, name: 'Tambah Division', element: TambahDivision },
  { path: '/division/edit/:id', exact: true, name: 'Edit Division', element: EditDivision },
  { path: '/employee', exact: true, name: 'Employee', element: Employee },
  { path: '/employee/tambah', exact: true, name: 'Tambah Employee', element: TambahEmployee },
  { path: '/employee/edit/:id', exact: true, name: 'Edit Employee', element: EditEmployee },
  { path: '/field', exact: true, name: 'Field', element: Field },
  { path: '/field/tambah', exact: true, name: 'Tambah Field', element: TambahField },
  { path: '/field/edit/:id', exact: true, name: 'Edit Field', element: EditField },
  { path: '/grade', exact: true, name: 'Grade', element: Grade },
  { path: '/grade/tambah', exact: true, name: 'Tambah Grade', element: TambahGrade },
  { path: '/grade/edit/:id', exact: true, name: 'Edit Grade', element: EditGrade },
  { path: '/level', exact: true, name: 'Level', element: Level },
  { path: '/level/tambah', exact: true, name: 'Tambah Level', element: TambahLevel },
  { path: '/level/edit/:id', exact: true, name: 'Edit Level', element: EditLevel },
  { path: '/position', exact: true, name: 'Position', element: Position },
  { path: '/position/tambah', exact: true, name: 'Tambah Position', element: TambahPosition },
  { path: '/position/edit/:id', exact: true, name: 'Edit Position', element: EditPosition },
  { path: '/subfield', exact: true, name: 'Subfield', element: Subfield },
  { path: '/subfield/tambah', exact: true, name: 'Tambah Subfield', element: TambahSubfield },
  { path: '/subfield/edit/:id', exact: true, name: 'Edit Subfield', element: EditSubfield },
  { path: '/criteria', exact: true, name: 'Criteria', element: Criteria },
  { path: '/criteria/tambah', exact: true, name: 'Tambah Criteria', element: TambahCriteria },
  { path: '/criteria/edit/:id', exact: true, name: 'Edit Criteria', element: EditCriteria },
  { path: '/administrasi', exact: true, name: 'Administrasi User', element: Administrasi },

  { path: '/datapenguji', exact: true, name: 'Penguji', element: DataPenguji },
  { path: '/tambahpenguji', exact: true, name: 'Tambah Penguji', element: TambahPenguji },
  { path: '/datapeserta', exact: true, name: 'Peserta', element: DataPeserta },
  { path: '/tambahpeserta', exact: true, name: 'Tambah Peserta', element: TambahPeserta },

  { path: '/fitandproper/pendaftaran', exact: true, name: 'Pendaftaran Fit & Proper', element: PendaftaranFitAndProper },
  { path: '/fitandproper/penilaian', exact: true, name: 'Penilaian Fit & Proper', element: PenilaianFitAndProper },

  { path: '/wawancara/pendaftaran', exact: true, name: 'Pendaftaran Wawancara', element: PendaftaranWawancara },
  { path: '/wawancara/penilaian', exact: true, name: 'Penilaian Wawancara', element: PenilaianWawancara },

  { path: 'report/reportfit', exact: true, name: 'Report Fit And Proper', element: ReportFit },
  { path: 'report/reportmfit', exact: true, name: 'Report NM Fit And Proper', element: ReportMFit },
  { path: 'report/detailreport', exact: true, name: 'Detail Report', element: DetailReport },
  { path: 'report/cetakreport', exact: true, name: 'Cetak Report', element: CetakReport},
  { path: 'report/reportwawancara', exact: true, name: 'Report Wawancara', element: ReportWawancara},
  { path: 'report/cetakwawancara', exact: true, name: 'Cetak Wawancara', element: CetakWawancara},

  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },

]

export default routes
