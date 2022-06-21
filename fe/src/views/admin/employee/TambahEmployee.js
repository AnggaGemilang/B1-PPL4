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
  CAlert
} from '@coreui/react'
import { useNavigate, useLocation } from 'react-router-dom'
import PositionAPI from '../../../config/admin/PositionAPI'
import LevelAPI from '../../../config/admin/LevelAPI'
import url from "../../../config/setting"
import EmployeeAPI from '../../../config/admin/EmployeeAPI'
import SubFieldAPI from '../../../config/admin/SubFieldAPI'

const TambahEmployee = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [positions, setPositions] = useState([])
  const [subfields, setSubfields] = useState([])
  const [levels, setLevels] = useState([])
  const [state, setState] = useState({
    photo: null,
    errorMessage: "",
    data: location?.state?.data,
    status: location?.state?.status
  });

  useEffect(() => {
    SubFieldAPI.get().then((res) => {
      setSubfields(res.data)
    })
    PositionAPI.get().then((res) => {
      setPositions(res.data)
    })
    LevelAPI.get().then((res) => {
      setLevels(res.data)
    })
  }, [])  

  const postData = (event) => {
    event.preventDefault()
    if(state.status == "tambah"){
      let body = {
        data: {
          NIP: document.getElementById("nip").value,        
          Name: document.getElementById("name").value,
          Gender: document.getElementById("gender").value,
          BirthDate: document.getElementById("birth_date").value,
          BirthPlace: document.getElementById("birth_place").value,
          Email: document.getElementById("email").value,
          Religion: document.getElementById("religion").value,
          PhoneNumber: document.getElementById("phone_number").value,
          level: document.getElementById("level").value,
          position: document.getElementById("position").value,
          sub_field: document.getElementById("sub_field").value,
        }
      };
      EmployeeAPI.add(body).then(
        (res) => {
          let formData = new FormData()
          formData.append('files', state.photo)
          formData.append('ref', 'api::employee.employee')
          formData.append('refId', res.data.id)
          formData.append('field', 'Photo')
          EmployeeAPI.addPhoto(formData).then(
            (res) => {
              navigate('/employee', {state: { successMessage: 'Pegawai telah berhasil ditambahkan' } });            
            },
            (err) => {
              console.log("err", err);
            }
          );  
        },
        (err) => {
          console.log("err", err);
        }
      );
    } else {
      let body = {
        data: {   
          Name: document.getElementById("name").value,
          Gender: document.getElementById("gender").value,
          BirthDate: document.getElementById("birth_date").value,
          BirthPlace: document.getElementById("birth_place").value,
          Religion: document.getElementById("religion").value,
          PhoneNumber: document.getElementById("phone_number").value,
          level: document.getElementById("level").value,
          position: document.getElementById("position").value,
          sub_field: document.getElementById("sub_field").value,
        }
      };
      EmployeeAPI.edit(state?.data?.id, body).then(
        (res) => {
          if(state.photo != null){
            if(state?.data?.attributes?.Photo?.data != null){
              EmployeeAPI.deletePhoto(state?.data?.attributes?.Photo?.data?.id).then(res => {
                console.log("Foto Berhasil Dihapus")
              });
            }
            let formData = new FormData()
            formData.append('files', state?.photo)
            formData.append('ref', 'api::employee.employee')
            formData.append('refId', state?.data?.id)
            formData.append('field', 'Photo')
            EmployeeAPI.addPhoto(formData).then(
              (res) => {
                navigate('/employee', {state: { successMessage: 'Pegawai telah berhasil diperbaharui' } });            
              },
              (err) => {
                console.log("err", err);
              }
            );               
          }
        },
        (err) => {
          console.log("err", err);
        }
      );      
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
              <strong>{ state.status == "tambah" ? "Tambah" : "Edit"}  Pegawai</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={postData} method="post">
                <CRow className="mb-3">
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
                <CRow className="mb-3">
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
                <CRow className="mb-3">
                  <CFormLabel htmlFor="gender" className="col-sm-2 col-form-label">
                    Jenis Kelamin
                  </CFormLabel>
                  <CCol sm={10} className="d-flex align-items-center">
                    <CFormCheck
                      inline
                      type="radio"
                      name="gender"
                      id="gender"
                      value="Male"
                      label="Laki-laki"
                      defaultChecked={state?.status == "edit" && state?.data?.attributes?.Gender == "Male"}
                    />
                    <CFormCheck
                      inline
                      type="radio"
                      name="gender"
                      id="gender"
                      value="Female"
                      defaultChecked={state?.status == "edit" && state?.data?.attributes?.Gender == "Female"}
                      label="Perempuan"
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
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
                <CRow className="mb-3">
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
                <CRow className="mb-3">
                  <CFormLabel htmlFor="phone_number" className="col-sm-2 col-form-label">
                    Phone Number
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput 
                      type="number" 
                      name="phone_number" 
                      id="phone_number" 
                      defaultValue={state.status == "edit" ? state?.data?.attributes?.PhoneNumber : ""}                      
                      placeholder='Masukkan Nomor Telepon . . .' />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="photo" className="col-sm-2 col-form-label">
                    Foto
                  </CFormLabel>
                  <CCol sm={10}>
                    { state.status == "edit" ? <img className='foto_karyawan' style={{ marginBottom: "15px", width: "125px", height: "125px" }} src={url + state?.data?.attributes?.Photo?.data?.attributes?.formats?.thumbnail?.url} alt="Photo" /> : null }
                    <CFormInput type="file" id="photo" name='photo' onChange={(e) =>  setState({ ...state, photo: e.target.files[0] })} />
                  </CCol>                  
                </CRow>     
                <CRow className="mb-3">
                  <CFormLabel htmlFor="religion" className="col-sm-2 col-form-label">
                    Agama
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect name="religion" id="religion" className="mb-3" aria-label="Large select example">
                      <option>Pilih Agama</option>
                      <option selected={state.status == "edit" && state?.data?.attributes?.Religion == "Islam" } value="Islam">Islam</option>
                      <option selected={state.status == "edit" && state?.data?.attributes?.Religion == "Kristen" } value="Kristen">Kristen</option>
                      <option selected={state.status == "edit" && state?.data?.attributes?.Religion == "Katolik" } value="Katolik">Katolik</option>
                      <option selected={state.status == "edit" && state?.data?.attributes?.Religion == "Buddha" } value="Buddha">Buddha</option>
                      <option selected={state.status == "edit" && state?.data?.attributes?.Religion == "Hindu" } value="Hindu">Hindu</option>
                    </CFormSelect>
                  </CCol>
                </CRow>                              
                <CRow className="mb-3">
                  <CFormLabel htmlFor="position" className="col-sm-2 col-form-label">
                    Jabatan
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect name="position" id="position" className="mb-3" aria-label="Large select example">
                      <option>Pilih Jabatan</option>
                      { positions.map(position =>
                        <option selected={ position.id == state?.data?.attributes?.position?.data?.id } key={ position.id } value={ position.id } >{ position.attributes.position_name }</option>
                      )}
                    </CFormSelect>
                  </CCol>
                </CRow>                                       
                <CRow className="mb-3">
                  <CFormLabel htmlFor="level" className="col-sm-2 col-form-label">
                    Jenjang
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect name="level" id="level" className="mb-3" aria-label="Large select example">
                      <option>Pilih Jenjang</option>
                      { levels.map(level =>
                        <option selected={ level.id == state?.data?.attributes?.level?.data?.id } key={ level.id } value={ level.id } >{ level.attributes.functional_name } - { level.attributes.structural_name }</option>
                      )}
                    </CFormSelect>
                  </CCol>
                </CRow>        
                <CRow className="mb-3">
                  <CFormLabel htmlFor="sub_field" className="col-sm-2 col-form-label">
                    Sub Bidang
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect name="sub_field" id="sub_field" className="mb-3" aria-label="Large select example">
                      <option>Pilih Sub Bidang</option>
                      { subfields.map(subfield =>
                        <option selected={ subfield.id == state?.data?.attributes?.sub_field?.data?.id } key={ subfield.id } value={ subfield.id } >{ subfield.attributes.subfield_name }</option>
                      )}
                    </CFormSelect>
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

export default TambahEmployee
