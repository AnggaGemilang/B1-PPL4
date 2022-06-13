import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
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
  const navigate = useNavigate();
  const [state, setState] = useState({});
  
  useEffect(() => {
    setState({errorMessage:"", visible:false})
  }, [])  

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    console.log(state)
  };

  const onLogin = (event) => {
    event.preventDefault()
    setState({visible: true})    
    const data = {
      identifier: state.email,
      password: state.password
    }
    LoginAPI.login(data).then((res) => {
        sessionStorage.setItem("auth", JSON.stringify(res))
        console.log("Kesini")
        setState({visible: false})
        navigate('/dashboard');
    }).catch((err) => {
        setState({errorMessage:"Invalid email or password", visible: false})
        console.log("Kesini Gagal")
    })
  }

    if(sessionStorage.getItem("auth") != null){
        navigate('/dashboard');
    }

    return (
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', }}>
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
                          style={{ height: "60px" }}
                          type="email"
                          name='email'
                          autoComplete=''
                          id='email'
                          placeholder="Enter Email ..."
                          onChange={onChange}
                        />
                        <CFormLabel htmlFor="floatingInputValue">Masukkan Email . . .</CFormLabel>
                      </CFormFloating>
                      <CFormFloating className='mt-3'>
                        <CFormInput
                          type="password"
                          placeholder="Enter Password ..."
                          autoComplete=''
                          name='password' id='password'
                          onChange={onChange}
                        />
                        <CFormLabel htmlFor="floatingInputValue">Masukkan Password . . .</CFormLabel>
                      </CFormFloating>
                      <CRow className='mt-3'>
                        <CCol xs={12}>
                          <CButton disabled={state.visible} type="submit" color="primary" className="p-2 w-100 position-relative" >
                            Login
                            { state.visible ? <CSpinner color="primary" className='position-absolute' style={{right: "20px", top: "5px"}} /> : null }
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

export default Login
