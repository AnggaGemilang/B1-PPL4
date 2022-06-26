import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import routes from '../routes'

const AppContent = () => {
  let status = false

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={ 
                    sessionStorage.getItem("auth") != null 
                      ? <route.element />
                      : status = true
                  }
                />
              )
            )
          })}
        </Routes>
      </Suspense>
      { status == true ? window.location.href = "/login" : null}
    </CContainer>
  )
}

export default React.memo(AppContent)
