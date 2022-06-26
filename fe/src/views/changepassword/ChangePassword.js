import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CCallout,
  CAlert  
} from '@coreui/react'
import AdministrasiUserAPI from '../../config/admin/AdministrasiUserAPI'

const ChangePassword = () => {
  const [state, setState] = useState({
    message: "",
    color: ""
  });

  const postData = (event) => {
    event.preventDefault()
    if(document.getElementById("password_baru").value == document.getElementById("ulangi_password").value){
      const body = {
        password: document.getElementById("password_baru").value,
      }
      AdministrasiUserAPI.edit(JSON.parse(sessionStorage.getItem("auth")).user.id, body).then(
        (res) => {
          document.getElementById("password_baru").value = ""
          document.getElementById("ulangi_password").value = ""
          setState({ ...state, message: "Peran Pegawai Berhasil Diperbaharui!", color: "success" })
        }, (err) => {
          setState({ ...state, message: "Peran Pegawai Gagal Diperbaharui!", color: "danger" })
        }
      )
    } else {
      setState({ ...state, message: "Peran Pegawai Gagal Diperbaharui!", color: "danger" })
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCol xs={12}>
          <CCallout color="info" className="bg-white">
            <p style={{ fontSize: "18px", marginBottom: "0px" }}><b>Catatan</b></p>
            <ul className='catatan' style={{ marginBottom: "0px" }}>
              <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
              <li>Contrary to popular belief, Lorem Ipsum is not simply random text</li>
              <li>It is a long established fact that a reader will be distracted by the</li>
              <li>There are many variations of passages of Lorem Ipsum available</li>
            </ul>
          </CCallout>
        </CCol>
        <CCol xs={12}>
          { state.message && <CAlert color={state.color} dismissible onClose={() => { setState({ ...state, message: "", color: "" }) }}> { state.message } </CAlert> }
        </CCol>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Ubah Password</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={postData} method="post">
                <CRow className="mb-3">
                  <CFormLabel htmlFor="password_baru" className="col-sm-2 col-form-label">
                    Password Baru
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput 
                      type="password" 
                      name="password_baru"
                      id="password_baru"
                      placeholder='Masukkan Password Baru . . .' />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="ulangi_password" className="col-sm-2 col-form-label">
                    Ulangi Password
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput 
                      type="password" 
                      name="ulangi_password"
                      id="ulangi_password"
                      placeholder='Ulangi Password . . .' />
                  </CCol>
                </CRow>                                
                <CButton type="submit" style={{width:'100%'}}>Submit</CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CCol>
    </CRow>         
  )     
}

export default ChangePassword
