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
  CFormSelect,  
} from '@coreui/react'
import DirectorateAPI from '../../../config/admin/DirectorateAPI'
import UnitAPI from '../../../config/admin/UnitAPI'

export class TambahDirectorate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      units: [],
      directorate_name: '',
      unit: 0,
    }
    this.handlechange= this.handlechange.bind(this);    
  }

  componentDidMount(){
    this.getUnitData()
  }

  getUnitData(){
    UnitAPI.get().then((res) => {
      console.log(res.data)
      this.setState({
        units: res.data,
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
    event.preventDefault()

    const body = {
      data: {
        directorate_name: this.state.directorate_name,
        unit: this.state.unit
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

    if(localStorage.getItem("auth") == null){
      window.location = "/#/login";
    }

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
                <CRow className="mb-3">
                  <CFormLabel htmlFor="unit" className="col-sm-2 col-form-label" placeholder='Masukkan NIK'>
                    Unit
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect name="unit" id="unit" className="mb-3" aria-label="Large select example" onChange={this.handlechange}>
                      <option>Choose Unit</option>
                      { this.state.units.map(unit =>
                        <option value={ unit.id } >{ unit.attributes.unit_name }</option>
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

export default TambahDirectorate
