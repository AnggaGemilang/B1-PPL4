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
import SubfieldAPI from '../../../config/admin/SubFieldAPI'
import FieldAPI from '../../../config/admin/FieldAPI'

export class TambahSubfield extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: [],
      subfield_name: "",
      field: 0,
    };
    this.handlechange= this.handlechange.bind(this);    
  }

  componentDidMount(){
    this.getFieldData()
  }

  getFieldData(){
    FieldAPI.get().then((res) => {
      console.log(res.data)
      this.setState({
        fields: res.data,
      })
    })
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
        subfield_name: this.state.subfield_name,
        field: this.state.field,
      }
    };
    SubfieldAPI.add(body).then(
      (res) => {
        window.location = 'http://localhost:3000/admin#/subfield';
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
                  <CFormLabel htmlFor="subfield_name" className="col-sm-2 col-form-label" placeholder='Masukkan NIK'>
                    Sub Field Name
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput type="text" name="subfield_name" id="subfield_name" onChange={this.handlechange}/>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="field" className="col-sm-2 col-form-label" placeholder='Masukkan NIK'>
                    Field
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect name="field" id="field" className="mb-3" aria-label="Large select example" onChange={this.handlechange}>
                      <option>Choose Field</option>
                      { this.state.fields.map(field =>
                        <option value={ field.id } >{ field.attributes.field_name }</option>
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
}

export default TambahSubfield
