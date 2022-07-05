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
import {useNavigate, useLocation} from 'react-router-dom'
import PositionAPI from '../../../config/admin/PositionAPI'
import GradeAPI from '../../../config/admin/GradeAPI'

const TambahPosition = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [grades, setGrades] = useState([])
  const [message, setMessage] = useState("")
  const [state, setState] = useState({
    status: location.state.status,
    data: location?.state?.data,
    visibleSubmit: false,
  })

  useEffect(() => {
    GradeAPI.get().then((res) => {
      setGrades(res.data.data)
    })
  }, [])  
  
  const postData = (event) => {
    event.preventDefault()
    setState({ ...state, visibleSubmit: true })

    const body = {
      data: {
        position_name: document.getElementById("position_name").value,
        grade: document.getElementById("grade").value
      }
    }

    if(state.status == "tambah"){
      PositionAPI.add(body).then(
        (res) => {
          navigate('/position', {state: { successMessage: 'Jabatan Telah Berhasil Ditambahkan!' } })  
        },
        (err) => {
          setMessage(err.message)
          setState({ ...state, visibleSubmit: false })
        }
      )    
    } else {
      PositionAPI.edit(state.data.id, body).then(
        (res) => {
          navigate('/position', {state: { successMessage: 'Jabatan Telah Berhasil Diperbaharui!' } })  
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
              <li>Data yang dimasukkan meliputi nama jabatan, dan grade</li>
              <li>Pilih grade sesuai dengan opsi yang diberikan</li>
            </ul>
          </CCallout>
        </CCol>
        <CCol xs={12}>
          { message && <CAlert color="danger" dismissible onClose={() => { setMessage("") }}> { message } </CAlert> }
        </CCol>     
        <CCol xs={12}>       
          <CCard>
            <CCardHeader>
              <strong>{ state.status == "tambah" ? "Tambah" : "Edit"} Jabatan</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={postData} method="post">
                <CRow className="mt-2">
                  <CFormLabel htmlFor="position_name" className="col-sm-2 col-form-label">
                    Nama Jabatan
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput 
                      type="text" 
                      name="position_name" 
                      id="position_name"
                      placeholder='Masukkan Nama Jabatan . . .'
                      defaultValue={ state.status == "tambah" ? "" : state.data.attributes.position_name } />
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CFormLabel htmlFor="grade" className="col-sm-2 col-form-label">
                    Grade
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect name="grade" id="grade" aria-label="Large select example">
                      <option>Pilih Grade</option>
                      { grades.map(grade =>
                        <option selected={grade.id == state?.data?.attributes?.grade?.data?.id} key={ grade.id } value={ grade.id } >{ grade.attributes.grade_name }</option>
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

export default TambahPosition