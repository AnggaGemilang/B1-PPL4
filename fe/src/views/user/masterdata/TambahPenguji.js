import React, { useState, useEffect } from 'react'
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
  CCallout,
  CAlert
} from '@coreui/react'
import {useNavigate} from 'react-router-dom'
import DataPengujiAPI from '../../../config/user/DataPengujiAPI'

const TambahPenguji = () => {
  const navigate = useNavigate();
  const [nipValue, setNipValue] = useState("")
  const [state, setState] = useState({
    namaKaryawan: "",
    idKaryawan: 0,
    errorMessage: ""
  });

  useEffect(() => {
    if (nipValue.length > 1) {
      DataPengujiAPI.findEmployee(nipValue).then(
      (res) => {
        console.log(res)
        if(res.data.length == 1){
          console.log(res.data[0].attributes.Name)
          setState({
            namaKaryawan: res.data[0].attributes.Name,
            idKaryawan: res.data[0].id
          });
        } 
        else {
          setState({
            namaKaryawan: '',
            idKaryawan: 0,
          });
        }
      });
    }
  }, [nipValue])

  const postData = (event) => {
    event.preventDefault();
    if(state.namaKaryawan.length > 0){
      const body = {
        data: {
          employee: state.idKaryawan
        }
      }
      DataPengujiAPI.add(body).then(
        (res) => {
          navigate('/datapenguji', {state: { successMessage: 'Examiner has added successfully' } });
        },
        (err) => {
          setState({ errorMessage: "" })
        }
      );    
    } else {
      setState({ errorMessage: "Enter NIP properly" })
    }
  }

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
          { state.errorMessage && <CAlert color="danger" dismissible onClose={() => { setState({errorMessage:""}) }}> { state.errorMessage } </CAlert> }
        </CCol>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Tambah Penguji</strong>
            </CCardHeader>
            <CCardBody>
                <CForm onSubmit={postData}>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="nip_value" className="col-sm-2 col-form-label" placeholder='Masukkan NIK'>
                      NIP
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput type="text" id="nip_value" name="nip_value" onChange={(e) => setNipValue(e.target.value )} />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel htmlFor="nama_karyawan" className="col-sm-2 col-form-label" >
                      Nama
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput type="text" id="nama_karyawan" name="nama_karyawan"  value={state.namaKaryawan} placeholder='Nama Pegawai Akan Muncul Disini' disabled />
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

export default TambahPenguji
