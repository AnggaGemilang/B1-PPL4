import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CCallout,
  CAlert,
  CSpinner
} from '@coreui/react'
import {useNavigate, useLocation} from 'react-router-dom'
import CriteriaAPI from '../../../config/admin/CriteriaAPI'

const TambahCriteria = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [message, setMessage] = useState("")
  const [state, setState] = useState({
    status: location.state.status,
    data: location?.state?.data,
    visibleSubmit: false,
    visiblePenggunaan: location?.state?.data?.attributes?.defaultUsed == "fitproper" ? true : false,
    interviewValue: ""
  })

  const postData = (event) => {
    event.preventDefault()
    setState({ ...state, visibleSubmit: true })

    const body = {
      data: {
        criteria: document.getElementById("criteria").value,
        value: document.getElementById("value").value,
        defaultUsed: document.getElementById("defaultused").value,
        useFor: document.getElementById("usefor").value,
      }
    }

    if(state.status == "tambah"){
      CriteriaAPI.add(body).then(
        (res) => {
          navigate('/criteria', {state: { successMessage: 'Kriteria Telah Berhasil Ditambah!' } })
        },
        (err) => {
          setMessage(err.message)
          setState({ ...state, visibleSubmit: false })
        }
      )    
    } else {
      CriteriaAPI.edit(state.data.id, body).then(
        (res) => {
          navigate('/criteria', {state: { successMessage: 'Kriteria Telah Berhasil Diperbaharui!' } })
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
              <li>Data yang dimasukkan meliputi nama kriteria, bobot, kategori, dan penggunaan</li>
              <li>Jika kategori berupa wawancara, kita tidak perlu lagi memilih penggunaan</li>
            </ul>
          </CCallout>
        </CCol>
        <CCol xs={12}>
          { message && <CAlert color="danger" dismissible onClose={() => { setMessage("") }}> { message } </CAlert> }
        </CCol>       
        <CCol xs={12}>         
          <CCard>
            <CCardHeader>
              <strong>{ state.status == "tambah" ? "Tambah" : "Edit"} Kriteria</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={postData} method="post">
                <CRow className="mt-2">
                  <CFormLabel htmlFor="criteria" className="col-sm-2 col-form-label">
                    Nama Criteria
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput 
                      type="text" 
                      name="criteria" 
                      id="criteria" 
                      placeholder='Masukkan Kriteria Penilaian . . .'
                      defaultValue={ state.status == "tambah" ? "" : state.data.attributes.criteria } />
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CFormLabel htmlFor="value" className="col-sm-2 col-form-label">
                    Bobot
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput 
                      type="number"
                      name="value"
                      id="value"
                      placeholder='Masukkan Bobot . . .'
                      defaultValue={ state.status == "tambah" ? "" : state.data.attributes.value } />
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CFormLabel htmlFor="defaultused" className="col-sm-2 col-form-label">
                    Kategori
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect 
                      name="defaultused" 
                      id="defaultused"
                      aria-label="Large select example" 
                      onChange={(e) => (e.target.value == "fitproper" || e.target.value == "") ? setState({ ...state, visiblePenggunaan: true, interviewValue: "" }) : setState({ ...state, visiblePenggunaan: false, interviewValue: "am/md" }) }>
                        <option value="">Pilih Kategori</option>
                        <option selected={ state?.data?.attributes?.defaultUsed == "fitproper" } value="fitproper">Fit & Proper</option>
                        <option selected={ state?.data?.attributes?.defaultUsed == "interview" } value="interview">Wawancara</option>
                    </CFormSelect>
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CFormLabel htmlFor="usefor" className="col-sm-2 col-form-label" >
                    Penggunaan
                  </CFormLabel>
                  <CCol sm={10} >
                    <CFormSelect name="usefor" id="usefor" aria-label="Large select example" disabled={ state.visiblePenggunaan == false }>
                      <option>Pilih Penggunaan</option>
                      <option selected={ state?.data?.attributes?.useFor == "am"} value="am">Manajemen Atas</option>
                      <option selected={ state?.data?.attributes?.useFor == "md"} value="md">Manajemen Dasar</option>
                      <option selected={ state?.data?.attributes?.useFor == "am/md" || state.interviewValue == "am/md" } value="am/md">Manajemen Atas/Manajemen Dasar</option>
                    </CFormSelect>
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

export default TambahCriteria