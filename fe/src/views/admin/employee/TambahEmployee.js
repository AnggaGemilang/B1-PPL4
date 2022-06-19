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
import {useNavigate} from 'react-router-dom'
import GradeAPI from '../../../config/admin/GradeAPI'
import LevelAPI from '../../../config/admin/LevelAPI'
import EmployeeAPI from '../../../config/admin/EmployeeAPI'
import SubFieldAPI from '../../../config/admin/SubFieldAPI'

const TambahEmployee = () => {
  const navigate = useNavigate();
  const [grades, setGrades] = useState([])
  const [subfields, setSubfields] = useState([])
  const [levels, setLevels] = useState([])
  const [state, setState] = useState({
    photo: null,
    errorMessage: "",
    data: null   
  });

  useEffect(() => {
    SubFieldAPI.get().then((res) => {
      setSubfields(res.data)
    })
    GradeAPI.get().then((res) => {
      setGrades(res.data)
    })
    LevelAPI.get().then((res) => {
      setLevels(res.data)
    })
  }, [])  

  const postData = (event) => {
    event.preventDefault();
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
        levels: document.getElementById("level").value,
        grades: document.getElementById("grade").value,
        sub_fields: document.getElementById("sub_field").value,
      }
    };

    EmployeeAPI.add(body).then(
      (res) => {
        EmployeeAPI.add(body).then(
          (res) => {
            console.log(res.data.id)
            let formData = new FormData()
            formData.append('files', state.photo)
            formData.append('ref', 'api::employee.employee')
            formData.append('refId', res.data.id)
            formData.append('field', 'Photo')
            EmployeeAPI.addPhoto(formData).then(
              (res) => {
                navigate('/employee', {state: { successMessage: 'Employee has updated successfully' } });            
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
      },
      (err) => {
        console.log("err", err);
      }
    );            
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
              <strong>Tambah Employee</strong>
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
                      placeholder='Enter NIP . . .' />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">
                    Nama Employee
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput 
                      type="text"
                      name="name"
                      id="name"
                      placeholder='Enter Employee Name . . .' />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="gender" className="col-sm-2 col-form-label">
                    Gender
                  </CFormLabel>
                  <CCol sm={10} className="d-flex align-items-center">
                    <CFormCheck
                      inline
                      type="radio"
                      name="gender"
                      id="gender"
                      value="Male"
                      label="Male"
                    />
                    <CFormCheck
                      inline
                      type="radio"
                      name="gender"
                      id="gender"
                      value="Female"
                      label="Female"
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol className='row' sm={6}>
                    <CFormLabel htmlFor="birth_place" className="col-sm-4 col-form-label">
                      Birth Place
                    </CFormLabel>
                    <CCol style={{marginLeft: "9px"}} sm={7}>
                      <CFormInput 
                        type="text"
                        name="birth_place"
                        id="birth_place"
                        placeholder='Enter Birt Place . . .' />
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
                      placeholder='Enter Email . . .' />
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
                      placeholder='Enter Phone Number . . .' />
                  </CCol>
                </CRow>     
                <CRow className="mb-3">
                  <CFormLabel htmlFor="photo" className="col-sm-2 col-form-label">
                    Photo
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput type="file" id="photo" name='photo' onChange={(e) =>  setState({ photo: e.target.files[0] })} />
                  </CCol>                  
                </CRow>     
                <CRow className="mb-3">
                  <CFormLabel htmlFor="religion" className="col-sm-2 col-form-label">
                    Religion
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect name="religion" id="religion" className="mb-3" aria-label="Large select example">
                      <option>Choose Religion</option>
                      <option value="Islam">Islam</option>
                      <option value="Kristen">Kristen</option>
                      <option value="Katolik">Katolik</option>
                      <option value="Buddha">Buddha</option>
                      <option value="Hindu">Hindu</option>
                    </CFormSelect>
                  </CCol>
                </CRow>                              
                <CRow className="mb-3">
                  <CFormLabel htmlFor="grade" className="col-sm-2 col-form-label">
                    Grade
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect name="grade" id="grade" className="mb-3" aria-label="Large select example">
                      <option>Choose Grade</option>
                      { grades.map(grade =>
                        <option selected={ grade.id == state?.data?.attributes?.grades?.data[0]?.id } key={ grade.id } value={ grade.id } >{ grade.attributes.grade_name }</option>
                      )}
                    </CFormSelect>
                  </CCol>
                </CRow>                                       
                <CRow className="mb-3">
                  <CFormLabel htmlFor="level" className="col-sm-2 col-form-label">
                    Level
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect name="level" id="level" className="mb-3" aria-label="Large select example">
                      <option>Choose Level</option>
                      { levels.map(level =>
                        <option selected={ level.id == state?.data?.attributes?.levels?.data[0]?.id } key={ level.id } value={ level.id } >{ level.attributes.functional_name } - { level.attributes.structural_name }</option>
                      )}
                    </CFormSelect>
                  </CCol>
                </CRow>        
                <CRow className="mb-3">
                  <CFormLabel htmlFor="sub_field" className="col-sm-2 col-form-label">
                    Sub Field
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect name="sub_field" id="sub_field" className="mb-3" aria-label="Large select example">
                      <option>Choose Sub Field</option>
                      { subfields.map(subfield =>
                        <option selected={ subfield.id == state?.data?.attributes?.sub_fields?.data[0]?.id } key={ subfield.id } value={ subfield.id } >{ subfield.attributes.subfield_name }</option>
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
