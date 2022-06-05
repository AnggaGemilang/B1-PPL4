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
import DataPesertaAPI from '../../../config/user/DataPesertaAPI'

export class TambahPeserta extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nip_value: "",
      nama_karyawan: '',
      id_karyawan: 0
    };
    this.handlechange = this.handlechange.bind(this);    
  }

  handlechange = (event) => {
    this.setState({nip_value: event.target.value }, ()=>{
      DataPesertaAPI.findEmployee(this.state.nip_value).then(
        (res) => {
          if(res.data.length == 1){
            this.setState({
              nama_karyawan: res.data[0].attributes.Name,
              id_karyawan: res.data[0].id
            });
          } else {
            this.setState({
              nama_karyawan: '',
              id: 0,
            });
          }
        },
        (err) => {
          console.log("err", err)
        }
      );
    })
  };

  postData = (event) => {
    event.preventDefault();
    if(this.state.nama_karyawan.length > 0){
      const body = {
        data: {
          employee: this.state.id_karyawan
        }
      }
      DataPesertaAPI.add(body).then(
        (res) => {
          console.log("SUCCESSSSSSS",res);
        },
        (err) => {
          console.log("err", err);
        }
      );    
    } else {
      
    }
  }

  render(){
    return (
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Tambah Peserta</strong>
            </CCardHeader>
            <CCardBody>
                <CForm onSubmit={this.postData}>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="nip_value" className="col-sm-2 col-form-label" placeholder='Masukkan NIP . . .' >
                      NIP
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput type="text" id="nip_value" name="nip_value" onChange={this.handlechange} />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="nama_karyawan" className="col-sm-2 col-form-label" >
                      Nama
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput type="text" id="nama_karyawan" name="nama_karyawan" placeholder='Nama Pegawai Akan Muncul Disini' disabled value={this.state.nama_karyawan} />
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

export default TambahPeserta
