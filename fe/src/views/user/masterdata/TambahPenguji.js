import React, {Component} from 'react'
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
import DataPengujiAPI from '../../../config/user/DataPengujiAPI'

export class TambahPenguji extends Component {

  constructor(props) {
    super(props)
    this.state = {
      nip_value: "",
      id_karyawan: 0,
      nama_karyawan: "",
    };
    this.handlechange= this.handlechange.bind(this);    
  }

  handlechange = (event) => {
    this.setState({ nip_value: event.target.value }, () => {
      DataPengujiAPI.findEmployee(this.state.nip_value).then(
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
      )
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
      DataPengujiAPI.add(body).then(
        (res) => {
          localStorage.setItem('show', true);
          localStorage.setItem('theme', 'primary');
          localStorage.setItem('message', "Examiner has added successfully");
          window.location = "http://localhost:3000/admin#/datapenguji";
        },
        (err) => {
          localStorage.setItem('show', true);
          localStorage.setItem('theme', 'danger');
          localStorage.setItem('message', "Examiner has failed to added");
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
              <strong>Tambah Penguji</strong>
            </CCardHeader>
            <CCardBody>
                <CForm onSubmit={this.postData}>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="nip_value" className="col-sm-2 col-form-label" placeholder='Masukkan NIK'>
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

export default TambahPenguji
