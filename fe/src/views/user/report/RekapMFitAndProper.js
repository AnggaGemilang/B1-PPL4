import React, { useState, useEffect } from 'react'
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
  CFormInput,
  CFormLabel,
  CForm,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CAlert,
  CFormSelect    
} from '@coreui/react'
import { useLocation, useNavigate } from "react-router-dom"
import { cilSearch, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'


const RekapMFitAndProper = () => {
  const [chosenCriteria, setChosenCriteria] = useState({
    visible: false,
    name: "",
    id: 0,
  })

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
                      <CFormLabel htmlFor="filter_nama">NIP</CFormLabel>
                      <CFormInput
                        type="text"
                        name='filter_nip'
                        id="filter_nip"
                        placeholder="Enter NIP . . ."
                      />
                    </CCol>
                    <CCol xs={6}>
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
            <strong>Rekap Penilaian Manual Peserta Fit Proper</strong>
          </CCardHeader>  
          <CCardBody>
            <CTable align="center" striped style={{ display:'block', 'overflow-x':'auto'}}>
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
export default RekapMFitAndProper
