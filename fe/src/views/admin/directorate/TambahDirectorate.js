import React, { useState, useEffect } from 'react'
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
  CFormSelect,
  CCallout,
  CAlert,
  CSpinner  
} from '@coreui/react'
import { useLocation, useNavigate } from "react-router-dom"
import DirectorateAPI from '../../../config/admin/DirectorateAPI'
import UnitAPI from '../../../config/admin/UnitAPI'

const TambahDirectorate = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [units, setUnits] = useState([])
  const [message, setMessage] = useState("")
  const [state, setState] = useState({
    status: location?.state?.status,
    data: location?.state?.data,
    visibleSubmit: false
  })

  useEffect(() => {
    UnitAPI.get().then((res) => {
      setUnits(res.data.data)
    })
  }, [])  

  const postData = (event) => {
    event.preventDefault()
    setState({ ...state, visibleSubmit: true })

    const body = {
      data: {
        directorate_name: document.getElementById("directorate_name").value,
        unit: document.getElementById("unit").value
      }
    }

    if(state.status == "tambah"){
      DirectorateAPI.add(body).then(
        (res) => {
          navigate('/directorate', {state: { successMessage: 'Direktorat Telah Berhasil Ditambahkan!' } })  
        },
        (err) => {
          setMessage(err.message)
          setState({ ...state, visibleSubmit: false })
        }
      )
    } else {
      DirectorateAPI.edit(state.data.id, body).then(
        (res) => {
          navigate('/directorate', {state: { successMessage: 'Direktorat Telah Berhasil Diperbaharui!' } })  
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
        <CCol xs={12}>
          <CCallout color="info" className="bg-white">
            <p style={{ fontSize: "18px", marginBottom: "4px" }}><b>Catatan Pengisian</b></p>
            <ul className='catatan'>
              <li>Sebelum submit, pastikan seluruh data yang dimasukkan valid</li>
              <li>Masukkan kalimat dengan format huruf kapital pada setiap awal katanya</li>
              <li>Data yang dimasukkan meliputi nama direktorat dan unit</li>
              <li>Pilih unit sesuai dengan opsi yang telah diberikan</li>
            </ul>
          </CCallout>
        </CCol>
        <CCol xs={12}>
          { message && <CAlert color="danger" dismissible onClose={() => { setMessage("") }}> { message } </CAlert> }
        </CCol>
        <CCol xs={12}>
          <CCard>
            <CCardHeader>
              <strong>{ state.status == "tambah" ? "Tambah" : "Edit"} Directorate</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={postData} method="post">
                <CRow className="mt-2">
                  <CFormLabel htmlFor="directorate_name" className="col-sm-2 col-form-label">
                    Nama Direktorat
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput 
                      type="text" 
                      name="directorate_name"
                      id="directorate_name"
                      placeholder='Masukkan Nama Direktorat . . .'
                      defaultValue={ state.status == "tambah" ? "" : state.data.attributes.directorate_name } />
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CFormLabel htmlFor="unit" className="col-sm-2 col-form-label">
                    Unit
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect name="unit" id="unit" aria-label="Large select example">
                      <option>Pilih Unit</option>
                      { units.map(unit =>
                        <option selected={unit.id == state?.data?.attributes?.unit?.data?.id} key={ unit.id } value={ unit.id } >{ unit.attributes.unit_name }</option>
                      )}
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

export default TambahDirectorate
