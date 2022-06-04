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
import DirectorateAPI from '../../../config/admin/DirectorateAPI'

export class TambahCriteria extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        directorate_name: "asdasd",
      }
    };
    this.handlechange= this.handlechange.bind(this);    
  }

  handlechange = (event) => {
    const newData = { ...this.state.data, title: event.target.value };
    this.setState({ newData });
    console.log(newData);
  };

  postData = (event) => {
    event.preventDefault();
    var name = this.state.data.directorate_name;

    const data = {
      directorate_name: name,
    };

    DirectorateAPI.add(data).then(
      (res) => {
        console.log("res post",res);
        // window.location = '/#/admin/directorate';
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
                  <CFormLabel htmlFor="directorate_name" className="col-sm-2 col-form-label" placeholder='Masukkan NIK'>
                    Nama Criteria
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput type="text" name="directorate_name" id="directorate_name" onChange={this.handlechange}/>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="directorate_name" className="col-sm-2 col-form-label" placeholder='Masukkan NIK'>
                    Bobot
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput type="text" name="directorate_name" id="directorate_name" onChange={this.handlechange}/>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="directorate_name" className="col-sm-2 col-form-label" placeholder='Masukkan NIK'>
                    Penggunaan
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect size="md" className="mb-3" aria-label="Large select example">
                      <option>Pilih Penggunaan</option>
                      <option value="1">Am</option>
                      <option value="2">Md</option>
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
