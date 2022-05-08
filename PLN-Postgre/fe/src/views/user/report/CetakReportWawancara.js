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
              <strong>Cetak Nilai Wawancara</strong>
            </CCardHeader>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">No</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tanggal</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Proyeksi Jabatan</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Lihat</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableHeaderCell scope="row">1</CTableHeaderCell>
                  <CTableDataCell>24-03-2022</CTableDataCell>
                  <CTableDataCell>Manajer UP3</CTableDataCell>
                  <CTableDataCell>                  
                    <Link to={'/report/detailreport'}>
                    <CButton
                      color='info'
                      style={{width:'100%'}}
                      variant="outline" >
                       Lihat Cetak
                    </CButton>
                  </Link>
                  </CTableDataCell>
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