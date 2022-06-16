import React, { Component } from 'react'
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
import GradeAPI from '../../../config/admin/GradeAPI'
import LevelAPI from '../../../config/admin/LevelAPI'
import EmployeeAPI from '../../../config/admin/EmployeeAPI'
import SubFieldAPI from '../../../config/admin/SubFieldAPI'

export class TambahEmployee extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subfields: [],
      grades: [],
      levels: [],
      nip: 0,
      name: "",
      gender: "",
      birthDate: "",
      birthPlace: "",
      email: "",
      religion: "",
      phone_number: "",
      photo: null,
      level: 0,
      grade: 0,
      sub_field: 0
    };
    this.handlechange= this.handlechange.bind(this);    
    this.handlefile= this.handlefile.bind(this);    
  }

  componentDidMount(){
    this.getSubFieldData()
    this.getGradeData()
    this.getLevelData()
  }

  handlefile = (event) => {
    let file = event.target.files[0]
    this.setState({photo: file})
  }

  handlechange = (event) => {
    const value = event.target.value
    this.setState({[event.target.name]: value}, () => {
      console.log(this.state);
    })
  };

  getSubFieldData(){
    SubFieldAPI.get().then((res) => {
      console.log(res.data)
      this.setState({
        subfields: res.data,
      })
    })
  }
  
  getGradeData(){
    GradeAPI.get().then((res) => {
      console.log(res.data)
      this.setState({
        grades: res.data,
      })
    })
  }
  
  getLevelData(){
    LevelAPI.get().then((res) => {
      console.log(res.data)
      this.setState({
        levels: res.data,
      })
    })
  }  

  postData = (event) => {
    event.preventDefault();
    const body = {
      data: {
        NIP: this.state.nip,
        Name: this.state.name,
        Gender: this.state.gender,
        BirthDate: this.state.birthDate,
        BirthPlace: this.state.birthPlace,
        Email: this.state.email,
        Religion: this.state.religion,
        PhoneNumber: this.state.phone_number,
        level: this.state.level,
        grade: this.state.grade,
        sub_field: this.state.sub_field,
      }
    };
    EmployeeAPI.add(body).then(
      (res) => {
        console.log(res.data.id)
        let formData = new FormData()
        formData.append('files', this.state.photo)
        formData.append('ref', 'api::employee.employee')
        formData.append('refId', res.data.id)
        formData.append('field', 'Photo')
        EmployeeAPI.addPhoto(formData).then(
          (res) => {
            window.location = 'http://localhost:3000/admin#/employee';
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

  render(){
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
            {/* { state.errorMessage && <CAlert color="danger" dismissible onClose={() => { setState({errorMessage:""}) }}> { state.errorMessage } </CAlert> } */}
          </CCol>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Tambah Employee</strong>
              </CCardHeader>
              <CCardBody>
                <CForm onSubmit={this.postData} method="post">
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="nip" className="col-sm-2 col-form-label">
                      NIP
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput type="number" name="nip" id="nip" onChange={this.handlechange}/>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">
                      Nama Employee
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput type="text" name="name" id="name" onChange={this.handlechange}/>
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
                        onChange={this.handlechange}
                      />
                      <CFormCheck
                        inline
                        type="radio"
                        name="gender"
                        id="gender"
                        value="Female"
                        label="Female"
                        onChange={this.handlechange}
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol className='row' sm={6}>
                      <CFormLabel htmlFor="birthPlace" className="col-sm-4 col-form-label">
                        Birth Place
                      </CFormLabel>
                      <CCol style={{marginLeft: "9px"}} sm={7}>
                        <CFormInput type="text" name="birthPlace" id="birthPlace" onChange={this.handlechange}/>
                      </CCol>
                    </CCol>
                    <CCol className='row' sm={6}>
                      <CFormLabel htmlFor="birthDate" className="col-sm-4 col-form-label">
                        Birth Date
                      </CFormLabel>
                      <CCol style={{marginLeft: "9px"}} sm={7}>
                        <CFormInput type="date" name="birthDate" id="birthDate" onChange={this.handlechange}/>
                      </CCol>
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="email" className="col-sm-2 col-form-label">
                      Email
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput type="email" name="email" id="email" onChange={this.handlechange}/>
                    </CCol>
                  </CRow>                
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="phone_number" className="col-sm-2 col-form-label">
                      Phone Number
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput type="number" name="phone_number" id="phone_number" onChange={this.handlechange}/>
                    </CCol>
                  </CRow>     
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="phone_number" className="col-sm-2 col-form-label">
                      Photo
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput type="file" id="photo" name='photo' onChange={this.handlefile} />
                    </CCol>                  
                  </CRow>     
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="religion" className="col-sm-2 col-form-label">
                      Religion
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormSelect name="religion" id="religion" className="mb-3" aria-label="Large select example" onChange={this.handlechange}>
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
                      <CFormSelect name="grade" id="grade" className="mb-3" aria-label="Large select example" onChange={this.handlechange}>
                        <option>Choose Grade</option>
                        { this.state.grades.map(grade =>
                          <option value={ grade.id } >{ grade.attributes.grade_name }</option>
                        )}
                      </CFormSelect>
                    </CCol>
                  </CRow>                                       
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="level" className="col-sm-2 col-form-label">
                      Level
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormSelect name="level" id="level" className="mb-3" aria-label="Large select example" onChange={this.handlechange}>
                        <option>Choose Level</option>
                        { this.state.levels.map(level =>
                          <option value={ level.id } >{ level.attributes.functional_name } - { level.attributes.structural_name }</option>
                        )}
                      </CFormSelect>
                    </CCol>
                  </CRow>        
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="sub_field" className="col-sm-2 col-form-label">
                      Sub Field
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormSelect name="sub_field" id="sub_field" className="mb-3" aria-label="Large select example" onChange={this.handlechange}>
                        <option>Choose Sub Field</option>
                        { this.state.subfields.map(subfield =>
                          <option value={ subfield.id } >{ subfield.attributes.subfield_name }</option>
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
}

export default TambahEmployee
