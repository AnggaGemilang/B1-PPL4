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
import LevelAPI from '../../../config/admin/LevelAPI'

const TambahLevel = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [message, setMessage] = useState("")
  const [state, setState] = useState({
    status: location.state.status,
    data: location?.state?.data,
    visibleSubmit: false,
  })

  const postData = (event) => {
    event.preventDefault()
    setState({ ...state, visibleSubmit: true })

    const body = {
      data: {
        functional_name: document.getElementById("functional_name").value,
        structural_name: document.getElementById("structural_name").value
      }
    }

    if(state.status == "tambah"){
      LevelAPI.add(body).then(
        (res) => {
          navigate('/level', {state: { successMessage: 'Jenjang Telah Berhasil Ditambahkan!' } }) 
        },
        (err) => {
          setMessage(err.message)
          setState({ ...state, visibleSubmit: false })
        }
      )
    } else {
      LevelAPI.edit(state.data.id, body).then(
        (res) => {
          navigate('/level', {state: { successMessage: 'Jenjang Telah Berhasil Diperbaharui!' } }) 
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
            <p style={{ fontSize: "18px", marginBottom: "4px" }}><b>Catatan Pengisian</b></p>
            <ul className='catatan'>
              <li>Sebelum submit, pastikan seluruh data yang dimasukkan valid</li>
              <li>Masukkan kalimat dengan format huruf kapital pada setiap awal katanya</li>
              <li>Data yang dimasukkan meliputi nama struktural dan nama fungsional</li>
            </ul>
          </CCallout>
        </CCol>
        <CCol xs={12}>
          { message && <CAlert color="danger" dismissible onClose={() => { setMessage("") }}> { message } </CAlert> }
        </CCol>     
        <CCol xs={12}>
          <CCard>
            <CCardHeader>
              <strong>{ state.status == "tambah" ? "Tambah" : "Edit"} Jenjang</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={postData} method="post">
                <CRow className="mt-2">
                  <CFormLabel htmlFor="structural_name" className="col-sm-2 col-form-label">
                    Nama Struktural
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput 
                      type="text"
                      name="structural_name"
                      id="structural_name"
                      placeholder='Masukkan Nama Struktural . . .'
                      defaultValue={ state.status == "tambah" ? "" : state.data.attributes.structural_name }/>
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CFormLabel htmlFor="functional_name" className="col-sm-2 col-form-label">
                    Nama Fungsional
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput 
                      type="text"
                      name="functional_name"
                      id="functional_name"
                      placeholder='Masukkan Nama Fungsional . . .'
                      defaultValue={ state.status == "tambah" ? "" : state.data.attributes.functional_name } />
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

export default TambahLevel
