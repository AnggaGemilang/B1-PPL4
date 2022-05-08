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
  CFormSelect,
  CFormInput,
} from '@coreui/react'
import { DocsCallout, DocsExample } from 'src/components'

const Tables = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
            <CCardHeader>
              <strong>Rekap Penilaian Peserta Fit Proper</strong>
            </CCardHeader>
          <CCardBody>
            <CTable className='mt-3'>
                <CRow >
                <CCol xs >
                    <CFormInput placeholder="Karyawan" aria-label="Last name"/>
                </CCol>
                <CCol xs>
                    <CFormInput placeholder="Jabatan" aria-label="Last name"/>
                </CCol>
                <CCol sm={3}>
                    <CFormInput placeholder="Tanggal" aria-label="Last name"/>
                </CCol>
            </CRow>                
            </CTable>
            <CTable striped style={{ display:'block', 'overflow-x':'scroll'}}>
              <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell rowSpan={2}>No</CTableHeaderCell>
                    <CTableHeaderCell rowSpan={2}>Tim Penilai</CTableHeaderCell>
                    <CTableHeaderCell colSpan={8}>Key Competencies (Bobot 50%)</CTableHeaderCell>
                    <CTableHeaderCell colSpan={4}>Proyeksi Jabatan (Bobot 25%)</CTableHeaderCell>
                    <CTableHeaderCell colSpan={3}>Personal Endurance (Bobot 25%)</CTableHeaderCell>
                    <CTableHeaderCell rowSpan={2}>Total Bobot</CTableHeaderCell>
                    <CTableHeaderCell rowSpan={2}>Kelemahan</CTableHeaderCell>
                    <CTableHeaderCell rowSpan={2}>Kelebihan</CTableHeaderCell>
                  </CTableRow>
                  <CTableRow>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                    <CTableHeaderCell scope="col">Enthusiasthic for Challange</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Creative and Innovative</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Building Business Partnership</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Strategic Orientation</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Customer Focus Oriented</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Driving Execution</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Visionary Leadership</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Empowering/Developing Others</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Aspek KEANDALAN SISTEM</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Aspek KECEPATAN RECOVERY</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Aspek MANAJEMEN ASET</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Strategi dan breakthrough yang jelas dalam hal kontribusi KPI di Kontrak Manajemen</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Internal Readness</CTableHeaderCell>
                    <CTableHeaderCell scope="col">External Readness</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Cultural politics,economics and business change readness</CTableHeaderCell>
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