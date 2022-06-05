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
  CRow,
} from '@coreui/react'
import GradeAPI from '../../../config/admin/GradeAPI'

export class TambahGrade extends Component {
  constructor(props) {
    super(props)
    this.state = {
      grade_name: '',
    }
    this.handlechange= this.handlechange.bind(this);    
  }

  handlechange = (e) => {
    this.setState({grade_name: e.target.value});
  };

  postData = (event) => {
    event.preventDefault()

    var name = this.state.grade_name

    const body = {
      data: {
        grade_name: name,
      }
    };

    GradeAPI.add(body).then(
      (res) => {
          window.location = "http://localhost:3000/admin#/grade";
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
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Tambah Grade</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={this.postData} method="post">
                <CRow className="mb-3">
                  <CFormLabel htmlFor="grade_name" className="col-sm-2 col-form-label" placeholder='Masukkan NIK'>
                    Nama Grade
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput type="text" name="grade_name" id="grade_name" onChange={this.handlechange}/>
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
}

export default TambahGrade
