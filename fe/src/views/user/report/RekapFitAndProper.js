import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CButton,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem, 
  CFormLabel,
  CAlert,
  CForm,
  CFormSelect  
} from '@coreui/react'
import { useLocation, useNavigate } from "react-router-dom"
import { cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import MappingAPI from '../../../config/user/MappingAPI'
import PositionAPI from '../../../config/admin/PositionAPI'

const RekapFitAndProper = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [positions, setPositions] = useState([])
  const [mappings, setMappings] = useState([])
  const [message, setMessage] = useState("")

  useEffect(() => {
    setMessage(location?.state?.successMessage)
    getData()
    PositionAPI.get().then((res) => {
      setPositions(res.data.data)
    })    
  }, [])  

  const filterSearch = (e) => {
    e.preventDefault()

    let query = ""
    if(document.getElementById("filter_nama").value.length != 0){
      query += `&filters[registrant][employee][Name][$contains]=${document.getElementById("filter_nama").value}`
    }
    if(document.getElementById("filter_nip").value.length != 0){
      query += `&filters[registrant][employee][NIP][$contains]=${document.getElementById("filter_nip").value}`
    }
    if(document.getElementById("filter_position").value.length != 0){
      query += `&filters[registrant][employee][position][id][$eq]=${document.getElementById("filter_position").value}`
    }
    if(document.getElementById("filter_projection").value.length != 0){
      query += `&filters[position][id][$eq]=${document.getElementById("filter_projection").value}`
    }

    MappingAPI.findFitProper(query).then((res) => {
      setMappings(res.data.data)
    })  
  }
  
  const getData = () => {
    MappingAPI.get().then((res) => {
      setMappings(res.data.data)
    })
  }

  return (
    <CRow>
      <CCol>
        <CAccordion>
          <CAccordionItem itemKey={1}>
            <CAccordionHeader><CIcon icon={cilSearch} style={{ marginRight: "10px" }}/>Pencarian Data</CAccordionHeader>
            <CAccordionBody>
              <CForm onSubmit={filterSearch}>
                <CRow className='mt-2'>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="exampleFormControlInput1">Nama lengkap</CFormLabel>
                    <CFormInput
                      type="text"
                      name='filter_nama'
                      id="filter_nama"
                      placeholder="Masukkan Kata Kunci Pencarian . . ."
                    />
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="exampleFormControlInput1">NIP</CFormLabel>
                    <CFormInput
                      type="text"
                      name='filter_nip'
                      id="filter_nip"
                      placeholder="Masukkan Kata Kunci Pencarian . . ."
                    />
                  </CCol>
                </CRow>
                <CRow className='mt-3'>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="filter_position">Jabatan</CFormLabel>
                    <CFormSelect name="filter_position" id="filter_position" className="mb-3" aria-label="Large select example">
                      <option value="">Pilih Jabatan</option>
                      { positions.map(position =>
                        <option key={ position.id } value={ position.id } >{ position.attributes.position_name }</option>
                      )}
                    </CFormSelect>
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="filter_projection">Proyeksi</CFormLabel>
                    <CFormSelect name="filter_projection" id="filter_projection" className="mb-3" aria-label="Large select example">
                      <option value="">Pilih Proyeksi</option>
                      { positions.map(position =>
                        <option key={ position.id } value={ position.id } >{ position.attributes.position_name }</option>
                      )}
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
        <CCol xs={12} className="mt-3">
          { message && <CAlert color="success" dismissible onClose={() => { setMessage("") }}> { message } </CAlert> }
        </CCol>
        <CCard className="mb-4 mt-3">
          <CCardHeader>
            <strong>Rekap Data Fit & Proper</strong>
          </CCardHeader>
          <CCardBody style={{ overflowX: "auto"}}>
              <CTable striped className='mt-3 text-center'>
                <CTableHead>
                   <CTableRow>
                    <CTableHeaderCell scope="col">No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                    <CTableHeaderCell scope="col">NIP</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Jabatan</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Proyeksi</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Uraian Jabatan</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tanggal</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Penguji</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  { mappings.map( (mapping, index) =>
                    <CTableRow key={mapping.id}>
                      <CTableHeaderCell scope="row">{ index+1 }</CTableHeaderCell>
                      <CTableDataCell>{mapping?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes.Name}</CTableDataCell>
                      <CTableDataCell>{mapping?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes.NIP}</CTableDataCell>
                      <CTableDataCell>{mapping?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes?.position?.data?.attributes?.position_name}</CTableDataCell>
                      <CTableDataCell>{mapping?.attributes?.position?.data?.attributes?.position_name}</CTableDataCell>
                      <CTableDataCell>{mapping?.attributes?.jobdesc}</CTableDataCell>
                      <CTableDataCell>{mapping?.attributes?.schedule}</CTableDataCell>
                      <CTableDataCell>
                        <ul>
                          { mapping?.attributes?.examiners?.data.map(examiner  => (
                              <li style={{ textAlign: "left", marginBottom: "4px" }} key={examiner?.id}>{examiner?.attributes?.employee?.data?.attributes?.Name}</li>
                          ))}
                        </ul>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color='success'
                          variant="outline"
                          onClick={() => navigate(
                            '/fitandproper/datapenilaian/datanilai', 
                            { state: { position: mapping?.attributes?.position?.data?.id, registrant: mapping?.attributes?.registrant?.data?.id } }
                          )}
                          style={{width: '75px', marginBottom: '10px'}} >
                            Lihat Nilai
                        </CButton>                      
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>      
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default RekapFitAndProper
