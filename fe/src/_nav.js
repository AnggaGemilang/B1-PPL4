import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilHome,
  cilLibrary,
  cilPrint,
  cilFolderOpen,
  cilColorBorder,
  cilCommentSquare,
  cilPeople,
  cilLockLocked  
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

  let _nav

  // 3 = administrator
  // 4 = penguji
  // 5 = hr manager
  // 6 = hr specialist

  console.log(JSON.parse(sessionStorage.getItem("auth"))?.jwt)

  if(JSON.parse(sessionStorage.getItem("auth"))?.user?.cp_role == 3){
    _nav = [
      {
        component: CNavItem,
        name: 'Dashboard',
        to: '/',
        icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
      },
      {
        component: CNavTitle,
        name: 'Main Menus',
      },
      {
        component: CNavGroup,
        name: 'Master Data',
        icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
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
        icon: <CIcon icon={cilColorBorder} customClassName="nav-icon" />,
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
        icon: <CIcon icon={cilCommentSquare} customClassName="nav-icon" />,
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
        icon: <CIcon icon={cilFolderOpen} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Fit & Proper',
            to: '/report/rekap/fitproper',
          },
          {
            component: CNavItem,
            name: 'Manual Fit & Proper',
            to: '/report/rekap/manualfitproper',
          },
          {
            component: CNavItem,
            name: 'Wawancara',
            to: '/report/rekap/wawancara',
          },
        ],
      },
      {
        component: CNavGroup,
        name: 'Cetak Nilai',
        icon: <CIcon icon={cilPrint} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Fit & Proper',
            to: '/report/cetak/fitproper',
          },
          {
            component: CNavItem,
            name: 'Wawancara',
            to: '/report/cetak/wawancara',
          },
        ],
      },
      {
        component: CNavItem,
        name: 'Ubah Password',
        to: '/change-password',
        icon: <CIcon icon={cilLockLocked} customClassName="nav-icon" />,
      },        
      {
        component: CNavTitle,
        name: 'Admin Menus',
      },
      {
        component: CNavGroup,
        name: 'Master Data',
        icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
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
        icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
      },
    ]
  } else if (JSON.parse(sessionStorage.getItem("auth"))?.user?.cp_role == 5){
    _nav = [
      {
        component: CNavItem,
        name: 'Dashboard',
        to: '/',
        icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
      },
      {
        component: CNavTitle,
        name: 'Main Menus',
      },
      {
        component: CNavGroup,
        name: 'Rekap Nilai',
        icon: <CIcon icon={cilFolderOpen} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Fit & Proper',
            to: '/report/rekap/fitproper',
          },
          {
            component: CNavItem,
            name: 'Wawancara',
            to: '/report/rekap/wawancara',
          },
        ],
      },
      {
        component: CNavGroup,
        name: 'Cetak Nilai',
        icon: <CIcon icon={cilPrint} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Fit & Proper',
            to: '/report/cetak/fitproper',
          },
          {
            component: CNavItem,
            name: 'Wawancara',
            to: '/report/cetak/wawancara',
          },
        ],
      },
      {
        component: CNavItem,
        name: 'Ubah Password',
        to: '/change-password',
        icon: <CIcon icon={cilLockLocked} customClassName="nav-icon" />,
      },
    ]
  } else if (JSON.parse(sessionStorage.getItem("auth"))?.user?.cp_role == 6){
    _nav = [
      {
        component: CNavItem,
        name: 'Dashboard',
        to: '/',
        icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
      },
      {
        component: CNavTitle,
        name: 'Main Menus',
      },
      {
        component: CNavGroup,
        name: 'Master Data',
        icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
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
        icon: <CIcon icon={cilColorBorder} customClassName="nav-icon" />,
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
        icon: <CIcon icon={cilCommentSquare} customClassName="nav-icon" />,
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
        icon: <CIcon icon={cilFolderOpen} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Fit & Proper',
            to: '/report/rekap/fitproper',
          },
          {
            component: CNavItem,
            name: 'Manual Fit & Proper',
            to: '/report/rekap/manualfitproper',
          },
          {
            component: CNavItem,
            name: 'Wawancara',
            to: '/report/rekap/wawancara',
          },
        ],
      },
      {
        component: CNavGroup,
        name: 'Cetak Nilai',
        icon: <CIcon icon={cilPrint} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Fit & Proper',
            to: '/report/cetak/fitproper',
          },
          {
            component: CNavItem,
            name: 'Wawancara',
            to: '/report/cetak/wawancara',
          },
        ],
      },
      {
        component: CNavTitle,
        name: 'Admin Menus',
      },
      {
        component: CNavGroup,
        name: 'Master Data',
        icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
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
    ]
  } else if (JSON.parse(sessionStorage.getItem("auth"))?.user?.cp_role == 4){
    _nav = [
      {
        component: CNavItem,
        name: 'Dashboard',
        to: '/',
        icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
      },
      {
        component: CNavTitle,
        name: 'Main Menus',
      },
      {
        component: CNavGroup,
        name: 'Fit & Proper',
        to: '/base',
        icon: <CIcon icon={cilColorBorder} customClassName="nav-icon" />,
        items: [
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
        icon: <CIcon icon={cilCommentSquare} customClassName="nav-icon" />,
        items: [
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
        icon: <CIcon icon={cilFolderOpen} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Fit & Proper',
            to: '/report/rekap/fitproper',
          },
          {
            component: CNavItem,
            name: 'Wawancara',
            to: '/report/rekap/wawancara',
          },
        ],
      },
      {
        component: CNavGroup,
        name: 'Cetak Nilai',
        icon: <CIcon icon={cilPrint} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Fit & Proper',
            to: '/report/cetak/fitproper',
          },
          {
            component: CNavItem,
            name: 'Wawancara',
            to: '/report/cetak/wawancara',
          },
        ],
      },    
      {
        component: CNavItem,
        name: 'Ubah Password',
        to: '/change-password',
        icon: <CIcon icon={cilLockLocked} customClassName="nav-icon" />,
      },      
    ]
  }

export default _nav