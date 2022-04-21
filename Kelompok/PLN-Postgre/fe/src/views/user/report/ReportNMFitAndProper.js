import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CFormInput,
  CFormLabel,
  CForm,
} from '@coreui/react'
import { DocsCallout, DocsExample } from 'src/components'
import { Link } from 'react-router-dom'


const Tables = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <Link to={'/dashboard'}>
            <CButton
              color='dark'
              style={{width:'10%'}}
              variant="outline" >
              Kembali
            </CButton>
        </Link>
        <CCard className="mb-4">
        <CCardHeader>
              <strong>Rekap Penilaian Manual Peserta Fit Proper</strong>
            </CCardHeader>  
          <CCardBody>
          <CForm>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="inputEmail3" className="col-sm-1 col-form-label" placeholder='Masukkan NIK'>
                    NIK
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormInput type="text" id="inputEmail3" />
                  </CCol>
                  <CFormLabel htmlFor="inputEmail3" className="col-sm-1 col-form-label" placeholder='Masukkan NIK'>
                    Jabatan Proyeksi
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormInput type="text" id="inputEmail3" />
                  </CCol>
                  <CCol sm={2}>
                    <CFormInput type="text" id="inputEmail3" />
                  </CCol>  
                  <CButton type="submit" style={{width:'10%'}}>Cek</CButton>
                </CRow>
              </CForm>
              <CFormLabel htmlFor="inputEmail3" className="col-sm-1 col-form-label" placeholder='Masukkan NIK'>
                    REPORT
              </CFormLabel>
              <CTable striped style={{ display:'block', 'overflow-x':'scroll'}}>
              <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell rowSpan={2}>No</CTableHeaderCell>
                    <CTableHeaderCell rowSpan={2}>Tim Penilai</CTableHeaderCell>
                    <CTableHeaderCell colSpan={2}>Pengetahuan / Knowledge</CTableHeaderCell>
                    <CTableHeaderCell colSpan={2}>Keterampilan / Skill </CTableHeaderCell>
                    <CTableHeaderCell rowSpan={2}>Rekomendasi Penguji </CTableHeaderCell>
                    <CTableHeaderCell rowSpan={2}>Kelemahan yang harus diperbaiki</CTableHeaderCell>
                    <CTableHeaderCell rowSpan={2}>Kelebihan yang dimiliki</CTableHeaderCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Pengetahuan terhadap proses bisnis (bobot 40%)</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Pengetahuan terhadap tugas pokok dan tanggung jawab / Job Desk yang terkait dengan jabatan yang di proyeksikan (bobot 60%)</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Pemecahan masalah / Pengambilan  Keputusan (bobot 60%)</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Komunikasi dengan Pihak Eksternal (bobot 40%)</CTableHeaderCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">1</CTableHeaderCell>
                  <CTableDataCell><CFormInput type="text" id="inputEmail3" /></CTableDataCell>
                  <CTableDataCell><CFormInput type="text" id="inputEmail3" /></CTableDataCell>
                  <CTableDataCell><CFormInput type="text" id="inputEmail3" /></CTableDataCell>
                  <CTableDataCell><CFormInput type="text" id="inputEmail3" /></CTableDataCell>
                  <CTableDataCell><CFormInput type="text" id="inputEmail3" /></CTableDataCell>
                  <CTableDataCell><CFormInput type="text" id="inputEmail3" /></CTableDataCell>
                  <CTableDataCell><CFormInput type="text" id="inputEmail3" /></CTableDataCell>
                  <CTableDataCell><CFormInput type="text" id="inputEmail3" /></CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">2</CTableHeaderCell>
                  <CTableDataCell><CFormInput type="text" id="inputEmail3" /></CTableDataCell>
                  <CTableDataCell><CFormInput type="text" id="inputEmail3" /></CTableDataCell>
                  <CTableDataCell><CFormInput type="text" id="inputEmail3" /></CTableDataCell>
                  <CTableDataCell><CFormInput type="text" id="inputEmail3" /></CTableDataCell>
                  <CTableDataCell><CFormInput type="text" id="inputEmail3" /></CTableDataCell>
                  <CTableDataCell><CFormInput type="text" id="inputEmail3" /></CTableDataCell>
                  <CTableDataCell><CFormInput type="text" id="inputEmail3" /></CTableDataCell>
                  <CTableDataCell><CFormInput type="text" id="inputEmail3" /></CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">3</CTableHeaderCell>
                  <CTableDataCell><CFormInput type="text" id="inputEmail3" /></CTableDataCell>
                  <CTableDataCell><CFormInput type="text" id="inputEmail3" /></CTableDataCell>
                  <CTableDataCell><CFormInput type="text" id="inputEmail3" /></CTableDataCell>
                  <CTableDataCell><CFormInput type="text" id="inputEmail3" /></CTableDataCell>
                  <CTableDataCell><CFormInput type="text" id="inputEmail3" /></CTableDataCell>
                  <CTableDataCell><CFormInput type="text" id="inputEmail3" /></CTableDataCell>
                  <CTableDataCell><CFormInput type="text" id="inputEmail3" /></CTableDataCell>
                  <CTableDataCell><CFormInput type="text" id="inputEmail3" /></CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">4</CTableHeaderCell>
                  <CTableDataCell><CFormInput type="text" id="inputEmail3" /></CTableDataCell>
                  <CTableDataCell><CFormInput type="text" id="inputEmail3" /></CTableDataCell>
                  <CTableDataCell><CFormInput type="text" id="inputEmail3" /></CTableDataCell>
                  <CTableDataCell><CFormInput type="text" id="inputEmail3" /></CTableDataCell>
                  <CTableDataCell><CFormInput type="text" id="inputEmail3" /></CTableDataCell>
                  <CTableDataCell><CFormInput type="text" id="inputEmail3" /></CTableDataCell>
                  <CTableDataCell><CFormInput type="text" id="inputEmail3" /></CTableDataCell>
                  <CTableDataCell><CFormInput type="text" id="inputEmail3" /></CTableDataCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
              </CTableBody>
            </CTable>
          </CCardBody>
          </CCard>
      </CCol>
    </CRow>
  )
}
export default Tables
