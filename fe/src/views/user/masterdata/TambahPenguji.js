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
  CCallout,
  CAlert,
  CSpinner
} from '@coreui/react'
import {useNavigate} from 'react-router-dom'
import DataPengujiAPI from '../../../config/user/DataPengujiAPI'
import AdministrasiUserAPI from '../../../config/admin/AdministrasiUserAPI'

const TambahPenguji = () => {
  const navigate = useNavigate()
  const [nipValue, setNipValue] = useState("")
  const [state, setState] = useState({
    employee: null,
    errorMessage: "",
    visibleSubmit: false,    
  })

  useEffect(() => {
    if (nipValue.length > 1) {
      DataPengujiAPI.findEmployee(nipValue).then(
      (res) => {
        if(res.data.data.length == 1){
          setState({
            ...state,
            employee: res.data.data[0]
          })
        } 
        else {
          setState({
            ...state,
            employee: {
              attributes : {
                Name : ""
              }
            }
          })
        }
      })
    }
  }, [nipValue])

  const generateSlug = (text) => {
    return text.toString().toLowerCase()
      .replace(/^-+/, '')
      .replace(/-+$/, '')
      .replace(/\s+/g, '-')
      .replace(/\-\-+/g, '-')
      .replace(/[^\w\-]+/g, '')
  }

  const postData = (event) => {
    event.preventDefault()
    setState({ ...state, visibleSubmit: true })

    if(state.employee != null){
      const body = {
        data: {
          employee: state?.employee?.id
        }
      }
      DataPengujiAPI.findExaminers(`&filters[employee][NIP][$eq]=${state?.employee?.attributes?.NIP}`).then(
        (res) => {
          if(res.data.data.length == 0){
            DataPengujiAPI.add(body).then(
              (res) => {
                let body = {}
                AdministrasiUserAPI.find(state?.employee?.attributes?.NIP).then(res => {
                  if(res.length != 0){
                    body = {
                      role: 4,
                      cp_role: 4
                    }
                    AdministrasiUserAPI.edit(state?.employee?.attributes?.account?.data?.id, body).then(res => {
                      navigate('/datapenguji', {state: { successMessage: 'Penguji Berhasil Ditambahkan' } })
                    })
                  } else {
                    body = {
                      username : generateSlug(state?.employee?.attributes?.Name),
                      email : state?.employee?.attributes?.Email.toLowerCase(),
                      password: state?.employee?.attributes?.NIP,
                      role: 4,
                      employee: state?.employee?.id,
                      cp_role: 4,
                      cp_photo: state?.employee?.attributes?.Photo?.data?.attributes?.formats?.thumbnail?.url,
                    }
                    AdministrasiUserAPI.add(body).then(res => {
                      navigate('/datapenguji', {state: { successMessage: 'Penguji Berhasil Ditambahkan' } })
                    })
                  }
                })
              }, (err) => {
                setState({ ...state, visibleSubmit: false, errorMessage: err.message })
              }
            )              
          } else {
            setState({ ...state, visibleSubmit: false, errorMessage: "Pegawai Sudah Menjadi Penguji!" })            
          }
        }
      )  
    } else {
      setState({ ...state, visibleSubmit: false, errorMessage: "Masukkan NIP Dengan Benar!" })
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
          { state.errorMessage && <CAlert color="danger" dismissible onClose={() => { setState({errorMessage:""}) }}> { state.errorMessage } </CAlert> }
        </CCol>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Tambah Penguji</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={postData}>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="nip_value" className="col-sm-2 col-form-label">
                    NIP
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput type="text" id="nip_value" name="nip_value" onChange={(e) => setNipValue(e.target.value )} placeholder='Masukkan NIP . . .' />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="nama_karyawan" className="col-sm-2 col-form-label" >
                    Nama
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput type="text" id="nama_karyawan" name="nama_karyawan" value={state?.employee?.attributes?.Name} placeholder='Nama Pegawai Akan Muncul Disini' disabled />
                  </CCol>
                </CRow>
                <CCol xs={12} className="position-relative">
                  <CButton disabled={state.visibleSubmit} type="submit" style={{width:'100%'}} className="p-2 w-100">
                    Submit
                  </CButton>
                  { state.visibleSubmit && <CSpinner color="primary" className='position-absolute' style={{right: "20px", top: "5px"}} /> }
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CCol>
    </CRow>
  )
}

export default TambahPenguji
