import React, { Component } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import logoPLN from '../../assets/images/logo_pln.png'
import { cilLockLocked, cilUser } from '@coreui/icons'
import LoginAPI from '../../config/admin/LoginAPI'

export class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    };
    this.handlechange = this.handlechange.bind(this);
  }
  
  handlechange = (event) => {
    const value = event.target.value
    this.setState({[event.target.name]: value})
    console.log(this.state)
  };

  onLogin = (event) => {
    event.preventDefault()
    LoginAPI.find(this.state.email, this.state.password).then((res) => {
      if(res.data.length != 0){
        console.log("Login Berhasil")
      } else {
        console.log("Login gagal")
      }
    })
  }

  render(){
    return (
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={8}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm onSubmit={this.onLogin}>
                      <h1>Login</h1>
                      <p className="text-medium-emphasis">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput 
                          name='email'
                          id='email'
                          placeholder="Enter Email ..."
                          onChange={this.handlechange} />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Enter Password ..."
                          autoComplete="current-password"
                          name='password' id='password' onChange={this.handlechange}                          
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs={12}>
                          <CButton type="submit" color="primary" className="px-4 w-100">
                            Login
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                  <CCardBody className="text-center">
                    <div>
                      <img src={logoPLN} style={{width:"180px"}}></img>
                      <p className='mt-5'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    )
  }
}

export default Login
