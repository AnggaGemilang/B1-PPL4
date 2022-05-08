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
  cilGroup,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
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
    component: CNavItem,
    name: 'Administrasi User',
    to: '/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
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
        to: '/admin/employee',
      },
      {
        component: CNavItem,
        name: 'Directorate',
        to: '/admin/directorate',
      },
      {
        component: CNavItem,
        name: 'Division',
        to: '/admin/division',
      },
      {
        component: CNavItem,
        name: 'Field',
        to: '/admin/field',
      },
      {
        component: CNavItem,
        name: 'Sub Field',
        to: '/admin/subfield',
      },
      {
        component: CNavItem,
        name: 'Grade',
        to: '/admin/grade',
      },
      {
        component: CNavItem,
        name: 'Level',
        to: '/admin/level',
      },
      {
        component: CNavItem,
        name: 'Position',
        to: '/admin/position',
      },
      {
        component: CNavItem,
        name: 'Unit',
        to: '/admin/unit',
      },
    ],
  },
]

export default _nav
