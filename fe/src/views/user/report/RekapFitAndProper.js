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
import url from "../../../config/setting"
import axios from "axios"
import LevelAPI from 'src/config/admin/LevelAPI'

const RekapFitAndProper = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [positions, setPositions] = useState([])
  const [levels, setLevels] = useState([])  
  const [mappings, setMappings] = useState([])
  const [message, setMessage] = useState("")

  useEffect(() => {
    setMessage(location?.state?.successMessage)
    getData()
    axios.all([PositionAPI.get(), LevelAPI.get()]).then(
      axios.spread((...res) => {
        console.log(res)
        setPositions(res[0].data.data),
        setLevels(res[1].data.data)
      })
    ) 
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
    if(document.getElementById("filter_position_before").value.length != 0){
      query += `&filters[position_current][id][$eq]=${document.getElementById("filter_position_before").value}`
    }
    if(document.getElementById("filter_projection").value.length != 0){
      query += `&filters[position][id][$eq]=${document.getElementById("filter_projection").value}`
    }
    if(document.getElementById("filter_level_before").value.length != 0){
      query += `&filters[level_current][id][$eq]=${document.getElementById("filter_level_before").value}`
    }
    if(document.getElementById("filter_level").value.length != 0){
      query += `&filters[level][id][$eq]=${document.getElementById("filter_level").value}`
    }
    if(document.getElementById("filter_jobdesc").value.length != 0){
      query += `&filters[jobdesc][$contains]=${document.getElementById("filter_jobdesc").value}`
    }
    if(document.getElementById("filter_schedule").value.length != 0){
      query += `&filters[schedule][$eq]=${document.getElementById("filter_schedule").value}`
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
                    <CFormLabel htmlFor="filter_position_before">Jabatan Sebelumnya</CFormLabel>
                    <CFormSelect name="filter_position_before" id="filter_position_before" aria-label="Large select example">
                      <option value="">Pilih Jabatan Sebelumnya</option>
                      { positions.map(position =>
                        <option key={ position.id } value={ position.id } >{ position.attributes.position_name }</option>
                      )}
                    </CFormSelect>
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="filter_projection">Proyeksi Jabatan</CFormLabel>
                    <CFormSelect name="filter_projection" id="filter_projection" aria-label="Large select example">
                      <option value="">Pilih Proyeksi</option>
                      { positions.map(position =>
                        <option key={ position.id } value={ position.id } >{ position.attributes.position_name }</option>
                      )}
                    </CFormSelect>
                  </CCol>                
                </CRow>
                <CRow className='mt-3'>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="filter_level_before">Jenjang Sebelumnya</CFormLabel>
                    <CFormSelect name="filter_level_before" id="filter_level_before" aria-label="Large select example">
                      <option value="">Pilih Jenjang Sebelumnya</option>
                      { levels.map(level =>
                        <option key={ level.id } value={ level.id }>{ level.attributes.functional_name } - { level.attributes.structural_name }</option>
                      )}
                    </CFormSelect>
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="filter_level">Jenjang Jabatan</CFormLabel>
                    <CFormSelect name="filter_level" id="filter_level" aria-label="Large select example">
                      <option value="">Pilih Jenjang Jabatan</option>
                      { levels.map(level =>
                        <option key={ level.id } value={ level.id }>{ level.attributes.functional_name } - { level.attributes.structural_name }</option>
                      )}
                    </CFormSelect>
                  </CCol>                
                </CRow>
                <CRow className='mt-3'>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="filter_jobdesc">Uraian Jabatan</CFormLabel>
                    <CFormInput type="text" name="filter_jobdesc" id="filter_jobdesc" placeholder='Masukkan Uraian Jabatan . . .' />
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="filter_schedule">Tanggal Pelaksanaan</CFormLabel>
                    <CFormInput type="date" name="filter_schedule" id="filter_schedule"/>
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
              <CTable striped className='text-center'>
                <CTableHead>
                   <CTableRow>
                    <CTableHeaderCell scope="col">No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Foto</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                    <CTableHeaderCell scope="col">NIP</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Jabatan Sebelumnya</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Proyeksi</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Jenjang Sebelumnya</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Jenjang</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Uraian Jabatan</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tanggal</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Penguji</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
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
                      <CTableDataCell>{mapping?.attributes?.position_current?.data?.attributes?.position_name}</CTableDataCell>
                      <CTableDataCell>{mapping?.attributes?.position?.data?.attributes?.position_name}</CTableDataCell>
                      <CTableDataCell>{mapping?.attributes?.level_current?.data?.attributes?.functional_name} - {mapping?.attributes?.level_current?.data?.attributes?.structural_name}</CTableDataCell>
                      <CTableDataCell>{mapping?.attributes?.level?.data?.attributes?.functional_name} - {mapping?.attributes?.level?.data?.attributes?.structural_name}</CTableDataCell>
                      <CTableDataCell>{mapping?.attributes?.jobdesc}</CTableDataCell>
                      <CTableDataCell>{mapping?.attributes?.schedule}</CTableDataCell>
                      <CTableDataCell>
                        {mapping?.attributes?.status == "on_progress" 
                          ? "Belum Finalisasi" 
                          : mapping?.attributes?.status == "passed" 
                            ? "Sudah Finalisasi" + '\n' + "(Lulus)"
                            : "Sudah Finalisasi" + '\n' + "(Tidak Lulus)" 
                        }
                      </CTableDataCell>
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
