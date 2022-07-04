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
import SubFieldAPI from '../../../config/admin/SubFieldAPI'
import FieldAPI from '../../../config/admin/FieldAPI'

const TambahSubfield = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [fields, setFields] = useState([])
  const [message, setMessage] = useState("")
  const [state, setState] = useState({
    status: location.state.status,
    data: location?.state?.data,
    visibleSubmit: false    
  })  

  useEffect(() => {
    FieldAPI.get().then((res) => {
      setFields(res.data.data)
    })
  }, [])  

  const postData = (event) => {
    event.preventDefault()
    setState({ ...state, visibleSubmit: true })

    const body = {
      data: {
        subfield_name: document.getElementById("subfield_name").value,
        field: document.getElementById("field").value,
      }
    }

    if(state.status == "tambah"){
      SubFieldAPI.add(body).then(
        (res) => {
          navigate('/subfield', {state: { successMessage: 'Sub Bidang Telah Berhasil Ditambahkan!' } })  
        },
        (err) => {
          setMessage(err.message)
          setState({ ...state, visibleSubmit: false })
        }
      )
    } else {
      SubFieldAPI.edit(state.data.id, body).then(
        (res) => {
          navigate('/subfield', {state: { successMessage: 'Sub Bidang Gagal Ditambahkan!' } })  
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
              <li>Data yang dimasukkan meliputi sub bidang dan bidang</li>
              <li>Pilih bidang sesuai dengan opsi yang telah diberikan</li>
            </ul>
          </CCallout>
        </CCol>
        <CCol xs={12}>
          { message && <CAlert color="danger" dismissible onClose={() => { setMessage("") }}> { message } </CAlert> }
        </CCol>     
        <CCol xs={12}>    
          <CCard>
            <CCardHeader>
              <strong>{ state.status == "tambah" ? "Tambah" : "Edit"} Sub Bidang</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={postData} method="post">
                <CRow className="mt-2">
                  <CFormLabel htmlFor="subfield_name" className="col-sm-2 col-form-label">
                    Sub Bidang
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput 
                      type="text" 
                      name="subfield_name"
                      id="subfield_name"
                      placeholder='Masukkan Nama Sub Bidang . . .'
                      defaultValue={ state.status == "tambah" ? "" : state.data.attributes.subfield_name } />
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CFormLabel htmlFor="field" className="col-sm-2 col-form-label">
                    Bidang
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect name="field" id="field" aria-label="Large select example">
                      <option>Pilih Bidang</option>
                      { fields.map(field =>
                        <option selected={field.id == state?.data?.attributes?.fields?.data[0]?.id} key={ field.id } value={ field.id } >{ field.attributes.field_name }</option>
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

export default TambahSubfield
