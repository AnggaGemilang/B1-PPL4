import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormFloating,
  CFormLabel,
  CRow,
  CAlert,
  CSpinner
} from '@coreui/react'
import background from '../../assets/images/LatarPLN.jpg';
import LoginAPI from '../../config/admin/LoginAPI'

const Login = () => {
  const [state, setState] = useState({
    errorMessage:"", 
    visible:false
  })

  const onLogin = (event) => {
    event.preventDefault()
    setState({visible: true})    
    const data = {
      identifier: document.getElementById("email").value,
      password: document.getElementById("password").value
    }
    LoginAPI.login(data).then((res) => {
      sessionStorage.setItem("auth", JSON.stringify(res))
      window.location.href = "/"
    }).catch((err) => {
        setState({errorMessage:"Invalid email or password", visible: false})
    })
  }
  
  document.title = `Fit & Proper - Login`

  if(sessionStorage.getItem("auth") != null){
    window.location.href = "/"
  }

  return (
    <div style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', }} className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            { state.errorMessage && <CAlert color="danger" dismissible onClose={() => { setState({errorMessage:""}) }}> { state.errorMessage } </CAlert> }
            <CCardGroup>
              <CCard className="p-4" style={{ borderRadius: "10px" }}>
                <CCardBody>
                  <CForm onSubmit={onLogin}>
                    <h1 className='font-weight-bold'>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CFormFloating>
                      <CFormInput
                        type="email"
                        name='email'
                        autoComplete="true"
                        id='email'
                        placeholder="Enter Email ..."
                      />
                      <CFormLabel htmlFor="floatingInputValue">Masukkan Email . . .</CFormLabel>
                    </CFormFloating>
                    <CFormFloating className='mt-3'>
                      <CFormInput
                        type="password"
                        placeholder="Enter Password ..."
                        autoComplete="true"
                        name='password' 
                        id='password'
                      />
                      <CFormLabel htmlFor="floatingInputValue">Masukkan Password . . .</CFormLabel>
                    </CFormFloating>
                    <CRow className='mt-3'>
                      <CCol xs={12} className="position-relative">
                        <CButton disabled={state.visible} type="submit" color="primary" className="p-2 w-100" >
                          Login
                        </CButton>
                        { state.visible && <CSpinner color="primary" className='position-absolute' style={{right: "20px", top: "5px"}} /> }
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
