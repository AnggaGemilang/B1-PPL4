import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

let _nav

if(JSON.parse(localStorage.getItem("auth")).attributes.role == 1){
  _nav = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
      component: CNavTitle,
      name: 'Components',
    },
    {
      component: CNavGroup,
      name: 'Master Data',
      to: '/base',
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Data Peserta',
          to: '/datapeserta',
        },
        {
          component: CNavItem,
          name: 'Data Penguji',
          to: '/datapenguji',
        },
      ],
    },
    {
      component: CNavGroup,
      name: 'Fit & Proper',
      to: '/base',
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Pendaftaran',
          to: '/fitandproper/pendaftaran',
        },
        {
          component: CNavItem,
          name: 'Penilaian',
          to: '/fitandproper/penilaian',
        },
      ],
    },
    {
      component: CNavGroup,
      name: 'Wawancara',
      to: '/base',
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Pendaftaran',
          to: '/wawancara/pendaftaran',
        },
        {
          component: CNavItem,
          name: 'Penilaian',
          to: '/wawancara/penilaian',
        },
      ],
    },
    {
      component: CNavGroup,
      name: 'Rekap Nilai',
      to: '/base',
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Fit & Proper',
          to: '/report/reportfit',
        },
        {
          component: CNavItem,
          name: 'Manual Fit & Proper',
          to: '/report/reportmfit',
        },
        {
          component: CNavItem,
          name: 'Wawancara',
          to: '/report/reportwawancara',
        },
      ],
    },
    {
      component: CNavGroup,
      name: 'Cetak Nilai',
      to: '/base',
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Fit & Proper',
          to: '/report/cetakreport',
        },
        {
          component: CNavItem,
          name: 'Wawancara',
          to: '/report/cetakwawancara',
        },
      ],
    },    
    {
      component: CNavTitle,
      name: 'Master Admin',
    },
    {
      component: CNavGroup,
      name: 'Master Data',
      to: '/base',
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Employee',
          to: 'employee',
        },
        {
          component: CNavItem,
          name: 'Directorate',
          to: 'directorate',
        },
        {
          component: CNavItem,
          name: 'Division',
          to: 'division',
        },
        {
          component: CNavItem,
          name: 'Field',
          to: 'field',
        },
        {
          component: CNavItem,
          name: 'Sub Field',
          to: 'subfield',
        },
        {
          component: CNavItem,
          name: 'Grade',
          to: 'grade',
        },
        {
          component: CNavItem,
          name: 'Level',
          to: 'level',
        },
        {
          component: CNavItem,
          name: 'Position',
          to: 'position',
        },
        {
          component: CNavItem,
          name: 'Unit',
          to: 'unit',
        },
        {
          component: CNavItem,
          name: 'Criteria',
          to: 'criteria',
        },
      ],
    },
    {
      component: CNavItem,
      name: 'Administrasi User',
      to: '/administrasi',
      icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    },
    {
      component: CNavTitle,
      name: 'Theme',
    },
    {
      component: CNavItem,
      name: 'Colors',
      to: '/theme/colors',
      icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Typography',
      to: '/theme/typography',
      icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    },
    {
      component: CNavTitle,
      name: 'Components',
    },
    {
      component: CNavGroup,
      name: 'Base',
      to: '/base',
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Accordion',
          to: '/base/accordion',
        },
        {
          component: CNavItem,
          name: 'Breadcrumb',
          to: '/base/breadcrumbs',
        },
        {
          component: CNavItem,
          name: 'Cards',
          to: '/base/cards',
        },
        {
          component: CNavItem,
          name: 'Carousel',
          to: '/base/carousels',
        },
        {
          component: CNavItem,
          name: 'Collapse',
          to: '/base/collapses',
        },
        {
          component: CNavItem,
          name: 'List group',
          to: '/base/list-groups',
        },
        {
          component: CNavItem,
          name: 'Navs & Tabs',
          to: '/base/navs',
        },
        {
          component: CNavItem,
          name: 'Pagination',
          to: '/base/paginations',
        },
        {
          component: CNavItem,
          name: 'Placeholders',
          to: '/base/placeholders',
        },
        {
          component: CNavItem,
          name: 'Popovers',
          to: '/base/popovers',
        },
        {
          component: CNavItem,
          name: 'Progress',
          to: '/base/progress',
        },
        {
          component: CNavItem,
          name: 'Spinners',
          to: '/base/spinners',
        },
        {
          component: CNavItem,
          name: 'Tables',
          to: '/base/tables',
        },
        {
          component: CNavItem,
          name: 'Tooltips',
          to: '/base/tooltips',
        },
      ],
    },
    {
      component: CNavGroup,
      name: 'Buttons',
      to: '/buttons',
      icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Buttons',
          to: '/buttons/buttons',
        },
        {
          component: CNavItem,
          name: 'Buttons groups',
          to: '/buttons/button-groups',
        },
        {
          component: CNavItem,
          name: 'Dropdowns',
          to: '/buttons/dropdowns',
        },
      ],
    },
    {
      component: CNavGroup,
      name: 'Forms',
      icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Form Control',
          to: '/forms/form-control',
        },
        {
          component: CNavItem,
          name: 'Select',
          to: '/forms/select',
        },
        {
          component: CNavItem,
          name: 'Checks & Radios',
          to: '/forms/checks-radios',
        },
        {
          component: CNavItem,
          name: 'Range',
          to: '/forms/range',
        },
        {
          component: CNavItem,
          name: 'Input Group',
          to: '/forms/input-group',
        },
        {
          component: CNavItem,
          name: 'Floating Labels',
          to: '/forms/floating-labels',
        },
        {
          component: CNavItem,
          name: 'Layout',
          to: '/forms/layout',
        },
        {
          component: CNavItem,
          name: 'Validation',
          to: '/forms/validation',
        },
      ],
    },
    {
      component: CNavItem,
      name: 'Charts',
      to: '/charts',
      icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
    },
    {
      component: CNavGroup,
      name: 'Icons',
      icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'CoreUI Free',
          to: '/icons/coreui-icons',
          badge: {
            color: 'success',
            text: 'NEW',
          },
        },
        {
          component: CNavItem,
          name: 'CoreUI Flags',
          to: '/icons/flags',
        },
        {
          component: CNavItem,
          name: 'CoreUI Brands',
          to: '/icons/brands',
        },
      ],
    },
    {
      component: CNavGroup,
      name: 'Notifications',
      icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Alerts',
          to: '/notifications/alerts',
        },
        {
          component: CNavItem,
          name: 'Badges',
          to: '/notifications/badges',
        },
        {
          component: CNavItem,
          name: 'Modal',
          to: '/notifications/modals',
        },
        {
          component: CNavItem,
          name: 'Toasts',
          to: '/notifications/toasts',
        },
      ],
    },
    {
      component: CNavItem,
      name: 'Widgets',
      to: '/widgets',
      icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
      badge: {
        color: 'info',
        text: 'NEW',
      },
    },
    {
      component: CNavTitle,
      name: 'Extras',
    },
    {
      component: CNavGroup,
      name: 'Pages',
      icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Login',
          to: '/login',
        },
        {
          component: CNavItem,
          name: 'Register',
          to: '/register',
        },
        {
          component: CNavItem,
          name: 'Error 404',
          to: '/404',
        },
        {
          component: CNavItem,
          name: 'Error 500',
          to: '/500',
        },
      ],
    },
  ]
} else if (JSON.parse(localStorage.getItem("auth")).attributes.role == 2){
  _nav = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
      component: CNavTitle,
      name: 'Components',
    },
    {
      component: CNavGroup,
      name: 'Master Data',
      to: '/base',
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Data Peserta',
          to: '/datapeserta',
        },
        {
          component: CNavItem,
          name: 'Data Penguji',
          to: '/datapenguji',
        },
      ],
    },
    {
      component: CNavGroup,
      name: 'Fit & Proper',
      to: '/base',
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Pendaftaran',
          to: '/fitandproper/pendaftaran',
        },
        {
          component: CNavItem,
          name: 'Penilaian',
          to: '/fitandproper/penilaian',
        },
      ],
    },
    {
      component: CNavGroup,
      name: 'Wawancara',
      to: '/base',
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Pendaftaran',
          to: '/wawancara/pendaftaran',
        },
        {
          component: CNavItem,
          name: 'Penilaian',
          to: '/wawancara/penilaian',
        },
      ],
    },
  {
    component: CNavGroup,
    name: 'Report',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Rekap Nilai Fit & Proper',
        to: '/report/reportfit',
      },
      {
        component: CNavItem,
        name: 'Rekap Nilai Manual Fit & Proper',
        to: '/report/reportmfit',
      },
      {
        component: CNavItem,
        name: 'Cetak Nilai Fit & Proper',
        to: '/report/cetakreport',
      },
      {
        component: CNavItem,
        name: 'Rekap Nilai Wawancara',
        to: '/report/reportwawancara',
      },
      {
        component: CNavItem,
        name: 'Cetak Nilai Wawancara',
        to: '/report/cetakwawancara',
      },
    ],
  },
    {
      component: CNavTitle,
      name: 'Master Admin',
    },
    {
      component: CNavGroup,
      name: 'Master Data',
      to: '/base',
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Employee',
          to: 'employee',
        },
        {
          component: CNavItem,
          name: 'Directorate',
          to: 'directorate',
        },
        {
          component: CNavItem,
          name: 'Division',
          to: 'division',
        },
        {
          component: CNavItem,
          name: 'Field',
          to: 'field',
        },
        {
          component: CNavItem,
          name: 'Sub Field',
          to: 'subfield',
        },
        {
          component: CNavItem,
          name: 'Grade',
          to: 'grade',
        },
        {
          component: CNavItem,
          name: 'Level',
          to: 'level',
        },
        {
          component: CNavItem,
          name: 'Position',
          to: 'position',
        },
        {
          component: CNavItem,
          name: 'Unit',
          to: 'unit',
        },
        {
          component: CNavItem,
          name: 'Criteria',
          to: 'criteria',
        },
      ],
    },
    {
      component: CNavItem,
      name: 'Administrasi User',
      to: '/administrasi',
      icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    },
    // {
    //   component: CNavTitle,
    //   name: 'Theme',
    // },
    // {
    //   component: CNavItem,
    //   name: 'Colors',
    //   to: '/theme/colors',
    //   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    // },
    // {
    //   component: CNavItem,
    //   name: 'Typography',
    //   to: '/theme/typography',
    //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    // },
    // {
    //   component: CNavTitle,
    //   name: 'Components',
    // },
    // {
    //   component: CNavGroup,
    //   name: 'Base',
    //   to: '/base',
    //   icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    //   items: [
    //     {
    //       component: CNavItem,
    //       name: 'Accordion',
    //       to: '/base/accordion',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Breadcrumb',
    //       to: '/base/breadcrumbs',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Cards',
    //       to: '/base/cards',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Carousel',
    //       to: '/base/carousels',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Collapse',
    //       to: '/base/collapses',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'List group',
    //       to: '/base/list-groups',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Navs & Tabs',
    //       to: '/base/navs',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Pagination',
    //       to: '/base/paginations',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Placeholders',
    //       to: '/base/placeholders',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Popovers',
    //       to: '/base/popovers',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Progress',
    //       to: '/base/progress',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Spinners',
    //       to: '/base/spinners',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Tables',
    //       to: '/base/tables',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Tooltips',
    //       to: '/base/tooltips',
    //     },
    //   ],
    // },
    // {
    //   component: CNavGroup,
    //   name: 'Buttons',
    //   to: '/buttons',
    //   icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    //   items: [
    //     {
    //       component: CNavItem,
    //       name: 'Buttons',
    //       to: '/buttons/buttons',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Buttons groups',
    //       to: '/buttons/button-groups',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Dropdowns',
    //       to: '/buttons/dropdowns',
    //     },
    //   ],
    // },
    // {
    //   component: CNavGroup,
    //   name: 'Forms',
    //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    //   items: [
    //     {
    //       component: CNavItem,
    //       name: 'Form Control',
    //       to: '/forms/form-control',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Select',
    //       to: '/forms/select',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Checks & Radios',
    //       to: '/forms/checks-radios',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Range',
    //       to: '/forms/range',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Input Group',
    //       to: '/forms/input-group',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Floating Labels',
    //       to: '/forms/floating-labels',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Layout',
    //       to: '/forms/layout',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Validation',
    //       to: '/forms/validation',
    //     },
    //   ],
    // },
    // {
    //   component: CNavItem,
    //   name: 'Charts',
    //   to: '/charts',
    //   icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
    // },
    // {
    //   component: CNavGroup,
    //   name: 'Icons',
    //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    //   items: [
    //     {
    //       component: CNavItem,
    //       name: 'CoreUI Free',
    //       to: '/icons/coreui-icons',
    //       badge: {
    //         color: 'success',
    //         text: 'NEW',
    //       },
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'CoreUI Flags',
    //       to: '/icons/flags',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'CoreUI Brands',
    //       to: '/icons/brands',
    //     },
    //   ],
    // },
    // {
    //   component: CNavGroup,
    //   name: 'Notifications',
    //   icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    //   items: [
    //     {
    //       component: CNavItem,
    //       name: 'Alerts',
    //       to: '/notifications/alerts',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Badges',
    //       to: '/notifications/badges',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Modal',
    //       to: '/notifications/modals',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Toasts',
    //       to: '/notifications/toasts',
    //     },
    //   ],
    // },
    // {
    //   component: CNavItem,
    //   name: 'Widgets',
    //   to: '/widgets',
    //   icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    //   badge: {
    //     color: 'info',
    //     text: 'NEW',
    //   },
    // },
    // {
    //   component: CNavTitle,
    //   name: 'Extras',
    // },
    // {
    //   component: CNavGroup,
    //   name: 'Pages',
    //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    //   items: [
    //     {
    //       component: CNavItem,
    //       name: 'Login',
    //       to: '/login',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Register',
    //       to: '/register',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Error 404',
    //       to: '/404',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Error 500',
    //       to: '/500',
    //     },
    //   ],
    // },
  ]
} else if (JSON.parse(localStorage.getItem("auth")).attributes.role == 3){
  _nav = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
      component: CNavTitle,
      name: 'Components',
    },
    {
      component: CNavGroup,
      name: 'Master Data',
      to: '/base',
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Data Peserta',
          to: '/datapeserta',
        },
        {
          component: CNavItem,
          name: 'Data Penguji',
          to: '/datapenguji',
        },
      ],
    },
    {
      component: CNavGroup,
      name: 'Fit & Proper',
      to: '/base',
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Pendaftaran',
          to: '/fitandproper/pendaftaran',
        },
        {
          component: CNavItem,
          name: 'Penilaian',
          to: '/fitandproper/penilaian',
        },
      ],
    },
    {
      component: CNavGroup,
      name: 'Wawancara',
      to: '/base',
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Pendaftaran',
          to: '/wawancara/pendaftaran',
        },
        {
          component: CNavItem,
          name: 'Penilaian',
          to: '/wawancara/penilaian',
        },
      ],
    },
  {
    component: CNavGroup,
    name: 'Report',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Rekap Nilai Fit & Proper',
        to: '/report/reportfit',
      },
      {
        component: CNavItem,
        name: 'Rekap Nilai Manual Fit & Proper',
        to: '/report/reportmfit',
      },
      {
        component: CNavItem,
        name: 'Cetak Nilai Fit & Proper',
        to: '/report/cetakreport',
      },
      {
        component: CNavItem,
        name: 'Rekap Nilai Wawancara',
        to: '/report/reportwawancara',
      },
      {
        component: CNavItem,
        name: 'Cetak Nilai Wawancara',
        to: '/report/cetakwawancara',
      },
    ],
  },
    {
      component: CNavTitle,
      name: 'Master Admin',
    },
    {
      component: CNavGroup,
      name: 'Master Data',
      to: '/base',
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Employee',
          to: 'employee',
        },
        {
          component: CNavItem,
          name: 'Directorate',
          to: 'directorate',
        },
        {
          component: CNavItem,
          name: 'Division',
          to: 'division',
        },
        {
          component: CNavItem,
          name: 'Field',
          to: 'field',
        },
        {
          component: CNavItem,
          name: 'Sub Field',
          to: 'subfield',
        },
        {
          component: CNavItem,
          name: 'Grade',
          to: 'grade',
        },
        {
          component: CNavItem,
          name: 'Level',
          to: 'level',
        },
        {
          component: CNavItem,
          name: 'Position',
          to: 'position',
        },
        {
          component: CNavItem,
          name: 'Unit',
          to: 'unit',
        },
        {
          component: CNavItem,
          name: 'Criteria',
          to: 'criteria',
        },
      ],
    },
    {
      component: CNavItem,
      name: 'Administrasi User',
      to: '/administrasi',
      icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    },
    // {
    //   component: CNavTitle,
    //   name: 'Theme',
    // },
    // {
    //   component: CNavItem,
    //   name: 'Colors',
    //   to: '/theme/colors',
    //   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    // },
    // {
    //   component: CNavItem,
    //   name: 'Typography',
    //   to: '/theme/typography',
    //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    // },
    // {
    //   component: CNavTitle,
    //   name: 'Components',
    // },
    // {
    //   component: CNavGroup,
    //   name: 'Base',
    //   to: '/base',
    //   icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    //   items: [
    //     {
    //       component: CNavItem,
    //       name: 'Accordion',
    //       to: '/base/accordion',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Breadcrumb',
    //       to: '/base/breadcrumbs',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Cards',
    //       to: '/base/cards',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Carousel',
    //       to: '/base/carousels',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Collapse',
    //       to: '/base/collapses',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'List group',
    //       to: '/base/list-groups',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Navs & Tabs',
    //       to: '/base/navs',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Pagination',
    //       to: '/base/paginations',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Placeholders',
    //       to: '/base/placeholders',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Popovers',
    //       to: '/base/popovers',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Progress',
    //       to: '/base/progress',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Spinners',
    //       to: '/base/spinners',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Tables',
    //       to: '/base/tables',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Tooltips',
    //       to: '/base/tooltips',
    //     },
    //   ],
    // },
    // {
    //   component: CNavGroup,
    //   name: 'Buttons',
    //   to: '/buttons',
    //   icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    //   items: [
    //     {
    //       component: CNavItem,
    //       name: 'Buttons',
    //       to: '/buttons/buttons',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Buttons groups',
    //       to: '/buttons/button-groups',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Dropdowns',
    //       to: '/buttons/dropdowns',
    //     },
    //   ],
    // },
    // {
    //   component: CNavGroup,
    //   name: 'Forms',
    //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    //   items: [
    //     {
    //       component: CNavItem,
    //       name: 'Form Control',
    //       to: '/forms/form-control',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Select',
    //       to: '/forms/select',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Checks & Radios',
    //       to: '/forms/checks-radios',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Range',
    //       to: '/forms/range',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Input Group',
    //       to: '/forms/input-group',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Floating Labels',
    //       to: '/forms/floating-labels',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Layout',
    //       to: '/forms/layout',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Validation',
    //       to: '/forms/validation',
    //     },
    //   ],
    // },
    // {
    //   component: CNavItem,
    //   name: 'Charts',
    //   to: '/charts',
    //   icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
    // },
    // {
    //   component: CNavGroup,
    //   name: 'Icons',
    //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    //   items: [
    //     {
    //       component: CNavItem,
    //       name: 'CoreUI Free',
    //       to: '/icons/coreui-icons',
    //       badge: {
    //         color: 'success',
    //         text: 'NEW',
    //       },
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'CoreUI Flags',
    //       to: '/icons/flags',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'CoreUI Brands',
    //       to: '/icons/brands',
    //     },
    //   ],
    // },
    // {
    //   component: CNavGroup,
    //   name: 'Notifications',
    //   icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    //   items: [
    //     {
    //       component: CNavItem,
    //       name: 'Alerts',
    //       to: '/notifications/alerts',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Badges',
    //       to: '/notifications/badges',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Modal',
    //       to: '/notifications/modals',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Toasts',
    //       to: '/notifications/toasts',
    //     },
    //   ],
    // },
    // {
    //   component: CNavItem,
    //   name: 'Widgets',
    //   to: '/widgets',
    //   icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    //   badge: {
    //     color: 'info',
    //     text: 'NEW',
    //   },
    // },
    // {
    //   component: CNavTitle,
    //   name: 'Extras',
    // },
    // {
    //   component: CNavGroup,
    //   name: 'Pages',
    //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    //   items: [
    //     {
    //       component: CNavItem,
    //       name: 'Login',
    //       to: '/login',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Register',
    //       to: '/register',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Error 404',
    //       to: '/404',
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Error 500',
    //       to: '/500',
    //     },
    //   ],
    // },
  ]
} else if (JSON.parse(localStorage.getItem("auth")).attributes.role == 4){
    _nav = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
      component: CNavTitle,
      name: 'Components',
    },
    {
      component: CNavGroup,
      name: 'Fit & Proper',
      to: '/base',
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Penilaian',
          to: '/fitandproper/penilaian',
        },
      ],
    },
    {
      component: CNavGroup,
      name: 'Wawancara',
      to: '/base',
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Pendaftaran',
          to: '/wawancara/pendaftaran',
        },
        {
          component: CNavItem,
          name: 'Penilaian',
          to: '/wawancara/penilaian',
        },
      ],
    },
  ]
}

export default _nav