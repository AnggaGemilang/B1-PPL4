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
            { props?.datas?.data?.map( (lineMapping, index) => (
              <CTableRow key={lineMapping.id}>
                <CTableHeaderCell scope="row">{ index+1 }</CTableHeaderCell>
                <CTableDataCell type="text">{ lineMapping?.attributes?.criterion?.data?.attributes?.criteria }</CTableDataCell>
                <CTableDataCell type="text">{ lineMapping?.attributes?.criterion?.data?.attributes?.value + "%"}</CTableDataCell>
                <CTableDataCell scope="row">{ lineMapping?.attributes?.score }</CTableDataCell>
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
