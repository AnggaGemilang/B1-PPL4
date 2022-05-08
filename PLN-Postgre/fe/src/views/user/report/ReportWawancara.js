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
} from '@coreui/react'
import { DocsCallout, DocsExample } from 'src/components'
import { Link } from 'react-router-dom'

const Tables = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
          <CCardHeader>
              <strong>Rekap Penilaian Peserta Wawancara</strong>
            </CCardHeader>
            <CTable striped>
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
export default Tables