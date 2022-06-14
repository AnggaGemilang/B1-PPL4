import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CImage, CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import logoPLN from 'src/assets/images/logo_pln.png'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}>
      <CSidebarBrand className="d-none d-md-flex" style={{ background: "rgba(48,60,84, 0.05)" }}>
        <CImage className="sidebar-brand-full" src={logoPLN} height={35} />
        <CImage className="sidebar-brand-narrow" src={logoPLN} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
