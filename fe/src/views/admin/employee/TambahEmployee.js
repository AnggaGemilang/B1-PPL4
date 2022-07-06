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
  CFormSelect,
  CRow,
  CFormCheck,
  CCallout,
  CAlert,
  CSpinner  
} from '@coreui/react'
import { useNavigate, useLocation } from 'react-router-dom'
import PositionAPI from '../../../config/admin/PositionAPI'
import LevelAPI from '../../../config/admin/LevelAPI'
import url from "../../../config/setting"
import EmployeeAPI from '../../../config/admin/EmployeeAPI'
import SubFieldAPI from '../../../config/admin/SubFieldAPI'
import axios from "axios"
import AdministrasiUserAPI from 'src/config/admin/AdministrasiUserAPI'

const TambahEmployee = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [positions, setPositions] = useState([])
  const [subfields, setSubfields] = useState([])
  const [levels, setLevels] = useState([])
  const [message, setMessage] = useState("")
  const [state, setState] = useState({
    photo: null,
    data: location?.state?.data,
    status: location?.state?.status,
    visibleSubmit: false    
  })

  useEffect(() => {
    axios.all([LevelAPI.get(), PositionAPI.get(), SubFieldAPI.get()]).then(
      axios.spread((...res) => {
        setLevels(res[0]?.data.data),
        setPositions(res[1]?.data.data)
        setSubfields(res[2]?.data.data)
      })
    )
  }, [])  

  const postData = (event) => {
    event.preventDefault()
    setState({ ...state, visibleSubmit: true })

    if(state.status == "tambah"){
      let body = {
        data: {
          NIP: document.getElementById("nip").value,        
          Name: document.getElementById("name").value,
          Gender: document.querySelector("input[name='gender']:checked").value,
          BirthDate: document.getElementById("birth_date").value,
          BirthPlace: document.getElementById("birth_place").value,
          Email: document.getElementById("email").value,
          Religion: document.getElementById("religion").value,
          PhoneNumber: document.getElementById("phone_number").value,
          level: document.getElementById("level").value,
          position: document.getElementById("position").value,
          sub_field: document.getElementById("sub_field").value,
        }
      }
      EmployeeAPI.add(body).then(
        (res) => {
          let formData = new FormData()
          formData.append('files', state.photo)
          formData.append('ref', 'api::employee.employee')
          formData.append('refId', res.data.data.id)
          formData.append('field', 'Photo')
          EmployeeAPI.addPhoto(formData).then(
            (res) => {
              navigate('/employee', {state: { successMessage: 'Pegawai Telah Berhasil Ditambahkan!' } })            
            },
            (err) => {
              setMessage(err.message)
              setState({ ...state, visibleSubmit: false })
            }
          )  
        },
        (err) => {
          setMessage(err.message)
          setState({ ...state, visibleSubmit: false })
        }
      )
    } else {
      let body = {
        data: {   
          Name: document.getElementById("name").value,
          Gender: document.querySelector("input[name='gender']:checked").value,
          BirthDate: document.getElementById("birth_date").value,
          BirthPlace: document.getElementById("birth_place").value,
          Religion: document.getElementById("religion").value,
          PhoneNumber: document.getElementById("phone_number").value,
          level: document.getElementById("level").value,
          position: document.getElementById("position").value,
          sub_field: document.getElementById("sub_field").value,
        }
      }
      EmployeeAPI.edit(state?.data?.id, body).then(
        (res) => {
          if(state.photo != null){
            if(state?.data?.attributes?.Photo?.data != null){
              EmployeeAPI.deletePhoto(state?.data?.attributes?.Photo?.data?.id)
            }
            let formData = new FormData()
            formData.append('files', state?.photo)
            formData.append('ref', 'api::employee.employee')
            formData.append('refId', state?.data?.id)
            formData.append('field', 'Photo')
            EmployeeAPI.addPhoto(formData).then(
              (res) => {
                if(state?.data?.id == JSON.parse(sessionStorage.getItem("auth"))?.user?.employee?.id){
                  let temp = JSON.parse(sessionStorage.getItem("auth"))
                  temp.user.cp_photo = res.data[0]?.formats?.thumbnail?.url
                  sessionStorage.setItem('auth', JSON.stringify(temp))
                }
                const body = {
                  cp_photo: res.data[0]?.formats?.thumbnail?.url
                }
                AdministrasiUserAPI.edit(state?.data?.attributes?.account?.data?.id, body).then(res => {
                  window.location.href = "/employee"
                })
              },
              (err) => {
                setMessage(err.message)
                setState({ ...state, visibleSubmit: false })
              }
            )               
          }
          navigate('/employee', {state: { successMessage: 'Pegawai Telah Berhasil Diperbaharui!' } })
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
              <li>(1) Data yang dimasukkan meliputi NIP, nama pegawai, jenis kelamin, tempat tanggal lahir, email</li>
              <li>(2) Data yang dimasukkan meliputi nomor telepon, foto, agama, jabatan, jenjang dan sub bidang</li>
              <li>Pilih agama, jabatan, jenjang, dan sub bidang sesuai dengan opsi yang telah diberikan</li>
            </ul>
          </CCallout>
        </CCol>
        <CCol xs={12}>
          { message && <CAlert color="danger" dismissible onClose={() => { setMessage("") }}> { message } </CAlert> }
        </CCol>
        <CCol xs={12}>
          <CCard>
            <CCardHeader>
              <strong>{ state.status == "tambah" ? "Tambah" : "Edit"}  Pegawai</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={postData} method="post">
                <CRow className="mt-2">
                  <CFormLabel htmlFor="nip" className="col-sm-2 col-form-label">
                    NIP
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput 
                      type="text" 
                      name="nip"
                      id="nip" 
                      disabled={state.status == "edit"}
                      defaultValue={state.status == "edit" ? state?.data?.attributes?.NIP : ""}
                      placeholder='Masukkan NIP . . .' />
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">
                    Nama Pegawai
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput 
                      type="text"
                      name="name"
                      id="name"
                      defaultValue={state.status == "edit" ? state?.data?.attributes?.Name : ""}                      
                      placeholder='Masukkan Nama Pegawai . . .' />
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CFormLabel htmlFor="gender2" className="col-sm-2 col-form-label">
                    Jenis Kelamin
                  </CFormLabel>
                  <CCol sm={10} className="d-flex align-items-center">
                    <CFormCheck
                      inline
                      type="radio"
                      name="gender"
                      id="gender1"
                      value="Male"
                      label="Laki-laki"
                      defaultChecked={state?.status == "edit" && state?.data?.attributes?.Gender == "Male"}
                    />
                    <CFormCheck
                      inline
                      type="radio"
                      name="gender"
                      id="gender2"
                      value="Female"
                      defaultChecked={state?.status == "edit" && state?.data?.attributes?.Gender == "Female"}
                      label="Perempuan"
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CCol className='row' sm={6}>
                    <CFormLabel htmlFor="birth_place" className="col-sm-4 col-form-label">
                      Tempat Lahir
                    </CFormLabel>
                    <CCol style={{marginLeft: "9px"}} sm={7}>
                      <CFormInput 
                        type="text"
                        name="birth_place"
                        id="birth_place"
                        defaultValue={state.status == "edit" ? state?.data?.attributes?.BirthPlace : ""}
                        placeholder='Masukkan Tempat Lahir . . .' />
                    </CCol>
                  </CCol>
                  <CCol className='row' sm={6}>
                    <CFormLabel htmlFor="birth_date" className="col-sm-4 col-form-label">
                      Birth Date
                    </CFormLabel>
                    <CCol style={{marginLeft: "9px"}} sm={7}>
                      <CFormInput 
                        type="date" 
                        name="birth_date" 
                        defaultValue={state.status == "edit" ? state?.data?.attributes?.BirthDate : ""}
                        id="birth_date" />
                    </CCol>
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CFormLabel htmlFor="email" className="col-sm-2 col-form-label">
                    Email
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput 
                      type="email" 
                      name="email" 
                      id="email" 
                      disabled={state.status == "edit"}
                      defaultValue={state.status == "edit" ? state?.data?.attributes?.Email : ""}
                      placeholder='Masukkan Email . . .' />
                  </CCol>
                </CRow>                
                <CRow className="mt-3">
                  <CFormLabel htmlFor="phone_number" className="col-sm-2 col-form-label">
                    Phone Number
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput 
                      type="text" 
                      name="phone_number" 
                      id="phone_number" 
                      defaultValue={state.status == "edit" ? state?.data?.attributes?.PhoneNumber : ""}                      
                      placeholder='Masukkan Nomor Telepon . . .' />
                  </CCol>
                </CRow>
                <CRow className="mt-3">
                  <CFormLabel htmlFor="photo" className="col-sm-2 col-form-label">
                    Foto
                  </CFormLabel>
                  <CCol sm={10}>
                    { state.status == "edit" ? <img className='foto_karyawan' style={{ marginBottom: "15px", width: "125px", height: "125px" }} src={url + state?.data?.attributes?.Photo?.data?.attributes?.formats?.thumbnail?.url} alt="Photo" /> : null }
                    <CFormInput type="file" id="photo" name='photo' onChange={(e) =>  setState({ ...state, photo: e.target.files[0] })} />
                  </CCol>                  
                </CRow>     
                <CRow className="mt-3">
                  <CFormLabel htmlFor="religion" className="col-sm-2 col-form-label">
                    Agama
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect name="religion" id="religion" aria-label="Large select example">
                      <option>Pilih Agama</option>
                      <option selected={state.status == "edit" && state?.data?.attributes?.Religion == "Islam" } value="Islam">Islam</option>
                      <option selected={state.status == "edit" && state?.data?.attributes?.Religion == "Kristen" } value="Kristen">Kristen</option>
                      <option selected={state.status == "edit" && state?.data?.attributes?.Religion == "Katolik" } value="Katolik">Katolik</option>
                      <option selected={state.status == "edit" && state?.data?.attributes?.Religion == "Buddha" } value="Buddha">Buddha</option>
                      <option selected={state.status == "edit" && state?.data?.attributes?.Religion == "Hindu" } value="Hindu">Hindu</option>
                    </CFormSelect>
                  </CCol>
                </CRow>                              
                <CRow className="mt-3">
                  <CFormLabel htmlFor="position" className="col-sm-2 col-form-label">
                    Jabatan
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect name="position" id="position" aria-label="Large select example">
                      <option>Pilih Jabatan</option>
                      { positions.map(position =>
                        <option selected={ position.id == state?.data?.attributes?.position?.data?.id } key={ position.id } value={ position.id } >{ position.attributes.position_name }</option>
                      )}
                    </CFormSelect>
                  </CCol>
                </CRow>                                       
                <CRow className="mt-3">
                  <CFormLabel htmlFor="level" className="col-sm-2 col-form-label">
                    Jenjang
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect name="level" id="level" aria-label="Large select example">
                      <option>Pilih Jenjang</option>
                      { levels.map(level =>
                        <option selected={ level.id == state?.data?.attributes?.level?.data?.id } key={ level.id } value={ level.id } >{ level.attributes.functional_name } - { level.attributes.structural_name }</option>
                      )}
                    </CFormSelect>
                  </CCol>
                </CRow>        
                <CRow className="mt-3">
                  <CFormLabel htmlFor="sub_field" className="col-sm-2 col-form-label">
                    Sub Bidang
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect name="sub_field" id="sub_field" aria-label="Large select example">
                      <option>Pilih Sub Bidang</option>
                      { subfields.map(subfield =>
                        <option selected={ subfield.id == state?.data?.attributes?.sub_field?.data?.id } key={ subfield.id } value={ subfield.id } >{ subfield.attributes.subfield_name }</option>
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

export default TambahEmployee
