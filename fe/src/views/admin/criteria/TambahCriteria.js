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
} from '@coreui/react'
import CriteriaAPI from '../../../config/admin/CriteriaAPI'

export class TambahCriteria extends Component {
  constructor(props) {
    super(props)
    this.state = {
      criteria: "",
      value: "",
      usefor: "",
    };
    this.handlechange= this.handlechange.bind(this);    
  }

  handlechange = (event) => {
    const value = event.target.value
    this.setState({[event.target.name]: value}, () => {
      console.log(this.state);
    })
  };

  postData = (event) => {
    event.preventDefault();
    const body = {
      data: {
        criteria: this.state.criteria,
        value: this.state.value,
        usefor: this.state.usefor,
      }
    };
    CriteriaAPI.add(body).then(
      (res) => {
        window.location = 'http://localhost:3000/admin#/criteria';
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
              <strong>Tambah Kriteria</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={this.postData} method="post">
                <CRow className="mb-3">
                  <CFormLabel htmlFor="criteria" className="col-sm-2 col-form-label" placeholder='Masukkan NIK'>
                    Nama Criteria
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput type="text" name="criteria" id="criteria" onChange={this.handlechange}/>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="value" className="col-sm-2 col-form-label" placeholder='Masukkan NIK'>
                    Bobot
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput type="number" name="value" id="value" onChange={this.handlechange}/>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="usefor" className="col-sm-2 col-form-label" placeholder='Masukkan NIK'>
                    Penggunaan
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect name="usefor" id="usefor" className="mb-3" aria-label="Large select example" onChange={this.handlechange}>
                      <option>Pilih Penggunaan</option>
                      <option value="Am">Am</option>
                      <option value="Md">Md</option>
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
}

export default TambahCriteria
