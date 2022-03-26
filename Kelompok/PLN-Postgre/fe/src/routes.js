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

  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
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
