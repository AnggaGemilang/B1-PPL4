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
      data: {
        nip_value: "",
      },
      nama_karyawan: "",
    };
    this.handlechange= this.handlechange.bind(this);    
  }

  handlechange = (event) => {
    
    const newData = { ...this.state.data, nip_value: event.target.value };
    this.setState({ newData });
    
    DataPengujiAPI.find(newData.nip_value).then(
      (res) => {
        if(res.data.length == 1){
          this.setState({
            nama_karyawan: res.data[0].attributes.Name
          });
        } else {
          this.setState({
            nama_karyawan: '',
          });
        }

        console.log(res);
      },
      (err) => {
        console.log("err", err)
      }
    );
  };

  postData = (event) => {
    event.preventDefault();
    var nip_value = this.state.data.nip_value;

    DataPengujiAPI.find(nip_value).then(
      (res) => {
        console.log("res post",res);
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
              <strong>Tambah Penguji</strong>
            </CCardHeader>
            <CCardBody>
                <CForm>
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
