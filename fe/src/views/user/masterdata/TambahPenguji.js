import React from 'react'
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

const TambahPenguji = () => {
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
                  <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label" placeholder='Masukkan NIK'>
                    NIK
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput type="number" id="inputEmail3" />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="inputPassword3" className="col-sm-2 col-form-label" >
                    Nama
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput type="password" id="inputPassword3" placeholder='Nama Pegawai Akan Muncul Disini' disabled />
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

export default TambahPenguji
