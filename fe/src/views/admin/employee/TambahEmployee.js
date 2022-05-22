import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'

const TambahEmployee = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Tambah Employee</strong>
          </CCardHeader>
          <CCardBody>
              <CForm>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label" placeholder='Masukkan NIK'>
                    NIP
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput type="number" id="inputEmail3" />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="inputState" className="col-sm-2 col-form-label">Jenjang</CFormLabel>
                  <CCol>
                    <CFormSelect id="inputState">
                      <option>Pilih Jenjang</option>
                      <option>...</option>
                    </CFormSelect>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="inputState" className="col-sm-2 col-form-label">Direktorat</CFormLabel>
                  <CCol>  
                    <CFormSelect id="inputState">
                      <option>Pilih Direktorat</option>
                      <option>...</option>
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

export default TambahEmployee
