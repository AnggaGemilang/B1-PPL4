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
  CFormFloating,
  CFormLabel,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import logoPLN from '../../assets/images/logo_pln.png'
import { cilLockLocked, cilUser } from '@coreui/icons'
import background from '../../assets/images/LatarPLN.jpg';
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
        console.log(res.data)
        localStorage.setItem("auth", JSON.stringify(res.data[0]))
        window.location = "/#/dashboard";
      } else {
        console.log("Login gagal")
      }
    })
  }

  render(){

    if(localStorage.getItem("auth") != null){
      window.location = "/#/dashboard";
    }

    return (
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', }}>
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={5}>
              <CCardGroup>
                <CCard className="p-4" style={{ borderRadius: "10px" }}>
                  <CCardBody>
                    <CForm onSubmit={this.onLogin}>
                      <h1 className='font-weight-bold'>Login</h1>
                      <p className="text-medium-emphasis">Sign In to your account</p>
                      <CFormFloating>
                        <CFormInput
                          style={{ height: "60px" }}
                          type="email"
                          name='email'
                          autoComplete=''
                          id='email'
                          placeholder="Enter Email ..."                            
                          onChange={this.handlechange}
                          />
                        <CFormLabel htmlFor="floatingInputValue">Masukkan Email . . .</CFormLabel>
                      </CFormFloating>
                      <CFormFloating className='mt-3'>
                        <CFormInput
                          type="password"
                          placeholder="Enter Password ..."
                          autoComplete=''
                          name='password' id='password' onChange={this.handlechange}
                        />
                        <CFormLabel htmlFor="floatingInputValue">Masukkan Password . . .</CFormLabel>
                      </CFormFloating>
                      <CRow className='mt-3'>
                        <CCol xs={12}>
                          <CButton type="submit" color="primary" className="px-4 w-100">
                            Login
                          </CButton>
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
}

export default Login
