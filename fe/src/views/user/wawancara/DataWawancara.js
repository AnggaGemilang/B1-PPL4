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
import { cilSearch  } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import url from "../../../config/setting"
import MappingAPI from '../../../config/user/MappingAPI'
import PositionAPI from '../../../config/admin/PositionAPI'

const DataWawancara = () => {
  const location = useLocation()
  const navigate = useNavigate() 

  const [mappings, setMappings] = useState([])
  const [positions, setPositions] = useState([])
  const [message, setMessage] = useState("")

  useEffect(() => {
    setMessage(location?.state?.successMessage)
    PositionAPI.get().then((res) => {
      setPositions(res.data.data)
    })    
    getData()
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

    MappingAPI.findWawancara(query).then((res) => {
      setMappings(res.data.data)
    })
  }
  
  const getData = () => {
    MappingAPI.getWawancara().then((res) => {
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
                    <CFormLabel htmlFor="filter_nama">Nama lengkap</CFormLabel>
                    <CFormInput
                      type="text"
                      name='filter_nama'
                      id="filter_nama"
                      placeholder="Masukkan Kata Kunci Pencarian . . ."
                    />
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="filter_nip">NIP</CFormLabel>
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
            <strong>Data Wawancara</strong>
          </CCardHeader>
          <CCardBody style={{ overflowX: "auto"}}>
            <CTable striped className='text-center'>
              <CTableHead>
                 <CTableRow>
                  <CTableHeaderCell scope="col">No</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Foto</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                  <CTableHeaderCell scope="col">NIP</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Jabatan</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Jenjang</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Proyeksi</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Uraian Jabatan</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Penguji</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                { mappings.map( (mapping, index) =>
                  <CTableRow key={mapping.id}>
                    <CTableHeaderCell scope="row">{ index+1 }</CTableHeaderCell>
                    <CTableDataCell>
                      <img className='foto_karyawan' src={url + mapping?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes?.Photo?.data?.attributes?.formats?.thumbnail?.url} alt="Photo" />                      
                    </CTableDataCell>
                    <CTableDataCell>{mapping?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes.Name}</CTableDataCell>
                    <CTableDataCell>{mapping?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes.NIP}</CTableDataCell>
                    <CTableDataCell>{mapping?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes?.position?.data?.attributes?.position_name}</CTableDataCell>
                    <CTableDataCell>{mapping?.attributes?.position?.data?.attributes?.position_name}</CTableDataCell>
                    <CTableDataCell>{mapping?.attributes?.level?.data?.attributes?.functional_name} - {mapping?.attributes?.level?.data?.attributes?.structural_name}</CTableDataCell>
                    <CTableDataCell>{mapping?.attributes?.jobdesc}</CTableDataCell>
                    <CTableDataCell>
                      <ul>
                        { mapping?.attributes?.examiners_interview?.data?.map(examiner  => (
                            <li style={{ textAlign: "left", marginBottom: "4px" }} key={examiner.id}>{examiner.attributes.employee.data.attributes.Name}</li>
                        ))}
                      </ul>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color='success'
                        variant="outline"
                        style={{width: '75px', margin: '5px 5px'}}
                        onClick={() => navigate(
                          '/wawancara/datapenilaian/datanilai', 
                          { state: {
                            position: mapping?.attributes?.position?.data?.id, 
                            registrant: mapping?.attributes?.registrant?.data?.id 
                          } }
                        )}>
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

export default DataWawancara