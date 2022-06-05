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
import DirectorateAPI from '../../../config/admin/DirectorateAPI'

export class TambahDirectorate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      directorate_name: '',
    }
    this.handlechange= this.handlechange.bind(this);    
  }

  handlechange = (e) => {
    this.setState({directorate_name: e.target.value});
  };

  postData = (event) => {
    event.preventDefault()

    var name = this.state.directorate_name

    const body = {
      data: {
        directorate_name: name,
      }
    };

    DirectorateAPI.add(body).then(
      (res) => {
          window.location = "http://localhost:3000/admin#/directorate";
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
              <strong>Tambah Directorate</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={this.postData} method="post">
                <CRow className="mb-3">
                  <CFormLabel htmlFor="directorate_name" className="col-sm-2 col-form-label" placeholder='Masukkan NIK'>
                    Nama Direktorat
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput type="text" name="directorate_name" id="directorate_name" onChange={this.handlechange}/>
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

export default TambahDirectorate
