import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,   
  CFormLabel,
  CForm,  
  CFormInput,
  CFormSelect      
} from '@coreui/react'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilPlus } from '@coreui/icons'

const RekapWawancara = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCol xs={12} className="mt-3">
          <CAccordion>
            <CAccordionItem itemKey={1}>
              <CAccordionHeader><CIcon icon={cilSearch} style={{ marginRight: "10px" }}/>Pencarian Data</CAccordionHeader>
              <CAccordionBody>
                <CForm>
                  <CRow className='mt-2'>
                    <CCol xs={6}>
                      <CFormLabel htmlFor="filter_nama">Criteria Name</CFormLabel>
                      <CFormInput
                        type="text"
                        name='filter_nama'
                        id="filter_nama"
                        placeholder="Enter Criteria Name . . ."
                      />
                    </CCol>
                    <CCol xs={6}>
                      <CFormLabel htmlFor="filter_value">Value</CFormLabel>
                      <CFormInput
                        type="text"
                        name='filter_value'
                        id="filter_value"
                        placeholder="Enter Value . . ."
                      />
                    </CCol>
                  </CRow>             
                  <CRow className='mt-3'>
                    <CCol xs={12}>
                      <CFormLabel htmlFor="filter_usefor">Use For</CFormLabel>
                      <CFormSelect name="filter_usefor" id="filter_usefor" className="mb-3" aria-label="Large select example">
                        <option value="">Choose Use For</option>
                        <option value="am">Ahli Madya</option>
                        <option value="md">Modern Madya</option>
                      </CFormSelect>
                    </CCol>
                  </CRow>                
                  <CRow>
                    <hr className='mt-4' style={{ marginLeft: "12px", width: "97.6%" }} />
                  </CRow>
                  <CRow>
                    <CCol style={{ display: "flex", justifyContent: "right" }}>
                      <CButton
                          type='submit'
                          color='primary'
                          style={{ width:'10%', borderRadius: "50px", fontSize: "14px" }} >
                          <CIcon icon={cilSearch} style={{ marginRight: "10px", color: "#FFFFFF" }}/>
                            Cari
                      </CButton>                                          
                    </CCol>
                  </CRow>
                </CForm>
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion> 
        </CCol>            
        <CCard className="mt-3">
          <CCardHeader>
            <strong>Rekap Penilaian Peserta Fit Proper</strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">No</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                  <CTableHeaderCell scope="col">NIP</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Proyeksi</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Jenjang</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tgl Fit Proper</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Penguji</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nilai</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableHeaderCell scope="row">1</CTableHeaderCell>
                  <CTableDataCell>SOFAZ GENIALZENI</CTableDataCell>
                  <CTableDataCell>8310073Z</CTableDataCell>
                  <CTableDataCell>ANALYST PENGEMBANGAN EKSEKUTIF</CTableDataCell>
                  <CTableDataCell>APE</CTableDataCell>
                  <CTableDataCell>20-03-2022</CTableDataCell>
                  <CTableDataCell>-</CTableDataCell>
                  <CTableDataCell>                  
                    <Link to={'/report/detailreport'}>
                    <CButton
                      color='info'
                      style={{width:'100%'}}
                      variant="outline" >
                       Lihat Nilai
                    </CButton>
                  </Link>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">2</CTableHeaderCell>
                  <CTableDataCell>GARANG SYAHPUTRA SIREGAR</CTableDataCell>
                  <CTableDataCell>9519721ZY</CTableDataCell>
                  <CTableDataCell>ASSISTANT ANALYST PENGEMBANGAN EKSEKUTIF</CTableDataCell>
                  <CTableDataCell>AAPE</CTableDataCell>
                  <CTableDataCell>22-03-2022</CTableDataCell>
                  <CTableDataCell>-</CTableDataCell>
                  <CTableDataCell>-</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
export default RekapWawancara