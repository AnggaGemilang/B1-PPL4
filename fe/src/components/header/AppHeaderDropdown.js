import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilLockLocked,
  cilSettings,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import url from "../../config/setting"

const AppHeaderDropdown = () => {
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle caret={false}>
        <div style={{ display: "flex", paddingRight: "8px" }}>
          <img className='foto_karyawan' style={{ width: "52px", height: "52px" }} src={ url + JSON.parse(sessionStorage.getItem("auth")).user.cp_photo} size="lg" />
          <div style={{ marginLeft: "15px" }}>
            <h5 style={{ marginBottom: "4px", marginTop: "3px", fontSize: "18px", fontWeight: "600" }}>{ JSON.parse(sessionStorage.getItem("auth")).user?.employee?.Name }</h5>            
            <h6 style={{ marginBottom: "0px", fontSize: "15px" }}>{ JSON.parse(sessionStorage.getItem("auth")).user?.employee?.NIP }</h6>                        
          </div>
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0 w-100 mt-2" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2 mb-2">Aksi</CDropdownHeader>
        <CDropdownItem href="/change-password">
          <CIcon icon={cilSettings} className="me-2" />
          Ubah Password
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="/login" onClick={() => sessionStorage.clear()}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
