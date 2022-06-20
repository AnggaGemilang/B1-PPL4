import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

const DataNilai = (props) => {

  return (
    <CCard className="mb-4 mt-3">
      <CCardHeader>
        <strong>Hasil Penilaian</strong>
      </CCardHeader>
      <CCardBody>
        <CTable striped className='mt-3 text-center'>
          <CTableHead>
            <CTableRow>
             <CTableHeaderCell scope="col">No</CTableHeaderCell>
              <CTableHeaderCell scope="col" width="60%">Kriteria Penilaian</CTableHeaderCell>
              <CTableHeaderCell scope="col">Bobot</CTableHeaderCell>
              <CTableHeaderCell scope="col">Nilai</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody id="body">
            { props?.data.map( (score, index) => (
              <CTableRow key={score.id}>
                <CTableHeaderCell scope="row">{ index+1 }</CTableHeaderCell>
                <CTableDataCell type="text">{ score.attributes.criterion.data.attributes.criteria }</CTableDataCell>
                <CTableDataCell type="text">{ score.attributes.criterion.data.attributes.value + "%"}</CTableDataCell>
                <CTableDataCell scope="row">{ score.attributes.score }</CTableDataCell>
              </CTableRow>
            ))}
            <CTableRow>
              <CTableHeaderCell colSpan={3}>Nilai Akhir</CTableHeaderCell>
              <CTableDataCell>{ props?.total }</CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default DataNilai
