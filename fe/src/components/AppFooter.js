import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="#" target="_blank" rel="noopener noreferrer">Hexa</a>
        <span className="ms-1">&copy; 2022 Proyek Perangkat Lunak</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Made With &#9829; In Sodong Hilir</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
