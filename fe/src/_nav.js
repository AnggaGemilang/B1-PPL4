import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDrop,
  cilPuzzle,
  cilSpeedometer,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

let _nav

  // 1 = administrator
  // 2 = hr manager
  // 3 = hr specialist
  // 4 = penguji

  if(JSON.parse(sessionStorage.getItem("auth")).user.cp_role == 1){
    _nav = [
      {
        component: CNavItem,
        name: 'Dashboard',
        to: '/',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      },
      {
        component: CNavTitle,
        name: 'Components',
      },
      {
        component: CNavGroup,
        name: 'Master Data',
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
        icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Data Fit & Proper',
            to: '/fitandproper/',
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
            name: 'Data Wawancara',
            to: '/wawancara/',
          },
        ],
      },
      {
        component: CNavGroup,
        name: 'Rekap Nilai',
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
        icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Pegawai',
            to: 'employee',
          },
          {
            component: CNavItem,
            name: 'Direktorat',
            to: 'directorate',
          },
          {
            component: CNavItem,
            name: 'Divisi',
            to: 'division',
          },
          {
            component: CNavItem,
            name: 'Bidang',
            to: 'field',
          },
          {
            component: CNavItem,
            name: 'Sub Bidang',
            to: 'subfield',
          },
          {
            component: CNavItem,
            name: 'Grade',
            to: 'grade',
          },
          {
            component: CNavItem,
            name: 'Jenjang',
            to: 'level',
          },
          {
            component: CNavItem,
            name: 'Jabatan',
            to: 'position',
          },
          {
            component: CNavItem,
            name: 'Unit',
            to: 'unit',
          },
          {
            component: CNavItem,
            name: 'Kriteria',
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
    ]
  } else if (JSON.parse(sessionStorage.getItem("auth")).user.cp_role == 2){
    _nav = [
      {
        component: CNavItem,
        name: 'Dashboard',
        to: '/',
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
            name: 'Data Fit & Proper',
            to: '/fitandproper/',
          },
          {
            component: CNavItem,
            name: 'Data Penilaian',
            to: '/fitandproper/datapenilaian',
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
            name: 'Data Wawancara',
            to: '/wawancara/',
          },
          {
            component: CNavItem,
            name: 'Data Penilaian',
            to: '/wawancara/datapenilaian',
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
    ]
  } else if (JSON.parse(sessionStorage.getItem("auth")).user.cp_role == 3){
    _nav = [
      {
        component: CNavItem,
        name: 'Dashboard',
        to: '/',
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
            name: 'Data Fit & Proper',
            to: '/fitandproper/',
          },
          {
            component: CNavItem,
            name: 'Data Penilaian',
            to: '/fitandproper/datapenilaian',
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
            name: 'Data Wawancara',
            to: '/wawancara/',
          },
          {
            component: CNavItem,
            name: 'Data Penilaian',
            to: '/wawancara/datapenilaian',
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
    ]
  } else if (JSON.parse(sessionStorage.getItem("auth")).user.cp_role == 4){
    _nav = [
      {
        component: CNavItem,
        name: 'Dashboard',
        to: '/',
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
            name: 'Data Fit & Proper',
            to: '/fitandproper/',
          },
          {
            component: CNavItem,
            name: 'Data Penilaian',
            to: '/fitandproper/datapenilaian',
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
            name: 'Data Wawancara',
            to: '/wawancara/',
          },
          {
            component: CNavItem,
            name: 'Data Penilaian',
            to: '/wawancara/datapenilaian',
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
    ]
  }

export default _nav