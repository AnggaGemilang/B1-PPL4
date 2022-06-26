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
  CAlert,
  CSpinner
} from '@coreui/react'
import {useNavigate, useLocation} from 'react-router-dom'
import GradeAPI from '../../../config/admin/GradeAPI'

const TambahGrade = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [message, setMessage] = useState("")
  const [state, setState] = useState({
    status: location.state.status,
    data: location?.state?.data,
    visibleSubmit: false
  })  

  const postData = (event) => {
    event.preventDefault()
    setState({ ...state, visibleSubmit: true })

    const body = {
      data: {
        grade_name: document.getElementById("grade_name").value,
      }
    }

    if(state.status == "tambah"){
      GradeAPI.add(body).then(
        (res) => {
          navigate('/grade', {state: { successMessage: 'Grade Telah Berhasil Ditambahkan!' } }) 
        },
        (err) => {
          setMessage(err.message)
          setState({ ...state, visibleSubmit: false })
        }
      )    
    } else {
      GradeAPI.edit(state.data.id, body).then(
        (res) => {
          navigate('/grade', {state: { successMessage: 'Grade Telah Berhasil Diperbaharui!' } }) 
        },
        (err) => {
          setMessage(err.message)
          setState({ ...state, visibleSubmit: false })
        }
      )
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCol xs={12} >
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
          { message && <CAlert color="danger" dismissible onClose={() => { setMessage("") }}> { message } </CAlert> }
        </CCol>     
        <CCol xs={12}>
          <CCard>
            <CCardHeader>
              <strong>{ state.status == "tambah" ? "Tambah" : "Edit"} Grade</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={postData} method="post">
                <CRow className='mt-2'>
                  <CFormLabel htmlFor="grade_name" className="col-sm-2 col-form-label" placeholder='Masukkan NIK'>
                    Nama Grade
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      name="grade_name"
                      id="grade_name"
                      placeholder='Masukkan Nama Grade . . .'
                      defaultValue={ state.status == "tambah" ? "" : state.data.attributes.grade_name } />
                  </CCol>
                </CRow>
                <CRow className='mt-4'>
                  <CCol xs={12} className="position-relative">
                    <CButton disabled={state.visibleSubmit} type="submit" style={{width:'100%'}} className="p-2 w-100">
                      Submit
                    </CButton>
                    { state.visibleSubmit && <CSpinner color="primary" className='position-absolute' style={{right: "20px", top: "5px"}} /> }                    
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>  
      </CCol>
    </CRow>        
  )  
}

export default TambahGrade
