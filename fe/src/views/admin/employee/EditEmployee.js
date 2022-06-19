import React, { useState, useEffect }  from 'react'
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
  CFormCheck  
} from '@coreui/react'
import { useParams } from 'react-router-dom';
import GradeAPI from '../../../config/admin/GradeAPI'
import LevelAPI from '../../../config/admin/LevelAPI'
import EmployeeAPI from '../../../config/admin/EmployeeAPI'
import SubFieldAPI from '../../../config/admin/SubFieldAPI'

const EditEmployee = () => {

  const { id } = useParams();
  const [gradesData, setGrades] = useState([])
  const [gradeData, setGrade] = useState("")
  const [levelsData, setLevels] = useState([])
  const [levelData, setLevel] = useState("")
  const [subFieldsData, setSubfields] = useState([])
  const [subFieldData, setSubfield] = useState("")
  const [nipData, setNip] = useState("")
  const [nameData, setName] = useState("")
  const [genderData, setGender] = useState("")
  const [birthDateData, setBirthDate] = useState("")
  const [birthPlaceData, setBirthPlace] = useState("")
  const [emailData, setEmail] = useState("")
  const [religionData, setReligion] = useState("")
  const [phoneNumberData, setPhoneNumber] = useState("")
  const [photoData, setPhoto] = useState("")

  useEffect(() => {
    getEmployeeData()    
    getSubFieldData()
    getGradeData()
    getLevelData()
  }, [])  

  const getEmployeeData = () => {
    EmployeeAPI.findById(id).then(
      (res) => {
        setNip(res.data[0].attributes.NIP)
        setName(res.data[0].attributes.Name)
        setGender(res.data[0].attributes.Gender)
        setBirthDate(res.data[0].attributes.BirthDate)
        setBirthPlace(res.data[0].attributes.BirthPlace)
        setEmail(res.data[0].attributes.Email)
        setReligion(res.data[0].attributes.Religion)
        setPhoneNumber(res.data[0].attributes.PhoneNumber)
        setLevel(res.data[0].attributes.levels.data[0].id)
        setGrade(res.data[0].attributes.grades.data[0].id)
        setSubfield(res.data[0].attributes.sub_fields.data[0].id)
        console.log(nipData)
      },
      (err) => {
        console.log("err", err);
      }
    );      
  }

  const getSubFieldData = () => {
    SubFieldAPI.get().then((res) => {
      setSubfields(res.data)
    })
  }
  
  const getGradeData = () => {
    GradeAPI.get().then((res) => {
      setGrades(res.data)
    })
  }
  
  const getLevelData = () => {
    LevelAPI.get().then((res) => {
      setLevels(res.data)
    })
  }  

  const postData = (event) => {
    event.preventDefault();
    let body = {
      data: {   
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
    EmployeeAPI.edit(state.data.id, body).then(
      (res) => {
        if(state.photo != null){
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
        }
        navigate('/employee', {state: { successMessage: 'Employee has updated successfully' } });                      
      },
      (err) => {
        console.log("err", err);
      }
    );
  }

  return (
    <CRow>
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
                  <CFormInput type="text" name="nip" id="nip" value={nipData} disabled/>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">
                  Nama Employee
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" name="name" id="name" value={nameData} onChange={(e) => setName(e.target.value)}/>
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
                    checked={genderData == "Male"}
                    label="Male"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <CFormCheck
                    inline
                    type="radio"
                    name="gender"
                    id="gender"
                    checked={genderData == "Female"}                    
                    value="Female"
                    label="Female"
                    onChange={(e) => setGender(e.target.value)}
                  />
                 </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol className='row' sm={6}>
                  <CFormLabel htmlFor="birthPlace" className="col-sm-4 col-form-label">
                    Birth Place
                  </CFormLabel>
                  <CCol style={{marginLeft: "9px"}} sm={7}>
                    <CFormInput type="text" name="birthPlace" id="birthPlace" value={birthPlaceData} onChange={(e) => setBirthPlace(e.target.value)}/>
                  </CCol>
                </CCol>
                <CCol className='row' sm={6}>
                  <CFormLabel htmlFor="birthDate" className="col-sm-4 col-form-label">
                    Birth Date
                  </CFormLabel>
                  <CCol style={{marginLeft: "9px"}} sm={7}>
                    <CFormInput type="date" name="birthDate" id="birthDate" value={birthDateData} onChange={(e) => setBirthDate(e.target.value)}/>
                  </CCol>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="email" className="col-sm-2 col-form-label">
                  Email
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="email" name="email" id="email" value={emailData} onChange={(e) => setEmail(e.target.value)}/>
                </CCol>
              </CRow>                
              <CRow className="mb-3">
                <CFormLabel htmlFor="phone_number" className="col-sm-2 col-form-label">
                  Phone Number
                </CFormLabel>
                <CCol sm={10}>
                    <CFormInput type="number" name="phone_number" id="phone_number" value={phoneNumberData} onChange={(e) => setPhoneNumber(e.target.value)}/>
                </CCol>
              </CRow>     
              <CRow className="mb-3">
                <CFormLabel htmlFor="phone_number" className="col-sm-2 col-form-label">
                  Photo
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="file" id="photo" name='photo' onChange={(e) => setPhoto(e.target.files[0])} />
                </CCol>                  
              </CRow>     
              <CRow className="mb-3">
                <CFormLabel htmlFor="religion" className="col-sm-2 col-form-label">
                  Religion
                </CFormLabel>
                <CCol sm={10}>
                  <CFormSelect name="religion" id="religion" className="mb-3" aria-label="Large select example" onChange={(e) => setReligion(e.target.value)}>
                    <option>Choose Religion</option>
                    <option selected={religionData == "Islam"} value="Islam">Islam</option>
                    <option selected={religionData == "Kristen"} value="Kristen">Kristen</option>
                    <option selected={religionData == "Katolik"} value="Katolik">Katolik</option>
                    <option selected={religionData == "Buddha"} value="Buddha">Buddha</option>
                    <option selected={religionData == "Hindu"} value="Hindu">Hindu</option>
                  </CFormSelect>
                </CCol>
              </CRow>                              
              <CRow className="mb-3">
                <CFormLabel htmlFor="grade" className="col-sm-2 col-form-label">
                  Grade
                </CFormLabel>
                <CCol sm={10}>
                  <CFormSelect name="grade" id="grade" className="mb-3" aria-label="Large select example" onChange={(e) => setGrade(e.target.value)}>
                    <option>Choose Grade</option>
                    { gradesData.map(grade =>
                      <option selected={gradeData == grade.id} value={ grade.id } >{ grade.attributes.grade_name }</option>
                    )}
                  </CFormSelect>
                </CCol>
              </CRow>                                       
              <CRow className="mb-3">
                <CFormLabel htmlFor="level" className="col-sm-2 col-form-label">
                  Level
                </CFormLabel>
                <CCol sm={10}>
                  <CFormSelect name="level" id="level" className="mb-3" aria-label="Large select example" onChange={(e) => setLevel(e.target.value)}>
                    <option>Choose Level</option>
                    { levelsData.map(level =>
                      <option selected={levelData == level.id} value={ level.id } >{ level.attributes.functional_name } - { level.attributes.structural_name }</option>
                    )}
                  </CFormSelect>
                </CCol>
              </CRow>        
              <CRow className="mb-3">
                <CFormLabel htmlFor="sub_field" className="col-sm-2 col-form-label">
                  Sub Field
                </CFormLabel>
                <CCol sm={10}>
                  <CFormSelect name="sub_field" id="sub_field" className="mb-3" aria-label="Large select example" onChange={(e) => setSubfield(e.target.value)}>
                    <option>Choose Sub Field</option>
                    { subFieldsData.map(subfield =>
                      <option selected={subFieldData == subfield.id} value={ subfield.id } >{ subfield.attributes.subfield_name }</option>
                    )}
                  </CFormSelect>
                </CCol>
              </CRow>                        
              <CButton type="submit" style={{width:'100%'}}>Submit</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>        
  )  
}

export default EditEmployee
