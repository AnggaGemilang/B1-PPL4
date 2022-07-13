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
  CImage,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import { useLocation, useNavigate } from "react-router-dom"
import { cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import WawancaraAPI from '../../../config/user/WawancaraAPI'
import PositionAPI from 'src/config/admin/PositionAPI'
import MappingAPI from '../../../config/user/MappingAPI'
import FitAndProperAPI from '../../../config/user/FitAndProperAPI'
import url from "../../../config/setting"
import logoPDF from 'src/assets/images/pdf-icon.png'
import DataPesertaAPI from 'src/config/user/DataPesertaAPI'
import EmployeeAPI from 'src/config/admin/EmployeeAPI'
import axios from "axios"
import LevelAPI from 'src/config/admin/LevelAPI'

const DataPenilaian = () => {
  const location = useLocation()
  const navigate = useNavigate() 

  const [lineMappings, setLineMappings] = useState([])
  const [positions, setPositions] = useState([])
  const [levels, setLevels] = useState([])  
  const [message, setMessage] = useState("")
  const [chosenLineMapping, setChosenLineMapping] = useState({
    visible_finalized: false,
    lineMapping: 0    
  })  

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
      query += `&filters[mapping][registrant][employee][Name][$contains]=${document.getElementById("filter_nama").value}`
    }
    if(document.getElementById("filter_nip").value.length != 0){
      query += `&filters[mapping][registrant][employee][NIP][$contains]=${document.getElementById("filter_nip").value}`
    }
    if(document.getElementById("filter_position_before").value.length != 0){
      query += `&filters[mapping][position_current][id][$eq]=${document.getElementById("filter_position_before").value}`
    }
    if(document.getElementById("filter_projection").value.length != 0){
      query += `&filters[mapping][position][id][$eq]=${document.getElementById("filter_projection").value}`
    }
    if(document.getElementById("filter_level_before").value.length != 0){
      query += `&filters[mapping][level_current][id][$eq]=${document.getElementById("filter_level_before").value}`
    }
    if(document.getElementById("filter_level").value.length != 0){
      query += `&filters[mapping][level][id][$eq]=${document.getElementById("filter_level").value}`
    }
    if(document.getElementById("filter_jobdesc").value.length != 0){
      query += `&filters[mapping][jobdesc][$contains]=${document.getElementById("filter_jobdesc").value}`
    }
    if(document.getElementById("filter_schedule").value.length != 0){
      query += `&filters[schedule_interview][$eq]=${document.getElementById("filter_schedule").value}`
    }
    if(document.getElementById("filter_status").value.length != 0){
      query += `&filters[status_interview][$eq]=${document.getElementById("filter_status").value}`
    }        

    WawancaraAPI.findLineMapping(query).then((res) => {
      setLineMappings(res.data.data)
    })
  }
  
  const getData = () => {
    WawancaraAPI.getLineMapping().then((res) => {
      setLineMappings(res.data.data)
    })
  }

  const interviewFinalized = () => {
    let lolos = 0
    let tidak_lolos = 0
    let sudah_finalisasi = true

    let body = {
      data: {
        interview_finalized: true
      }
    }
    FitAndProperAPI.editLineMapping(chosenLineMapping?.lineMapping.id, body).then(res => {
      FitAndProperAPI.findLineMappingAll(`&filters[mapping][id][$eq]=${chosenLineMapping?.lineMapping?.attributes?.mapping?.data?.id}`)
        .then(res => {
          res.data.data.map(line_mapping => {
            if(line_mapping?.attributes?.is_interview == "true"){
              if(line_mapping?.attributes?.status_interview == false){
                sudah_finalisasi = false
              }
            } else if (line_mapping?.attributes?.is_interview == "false") {
              if(line_mapping?.attributes?.status_fitproper == false){
                sudah_finalisasi = false
              }
            } else if (line_mapping?.attributes?.is_interview == "not_decided"){
              sudah_finalisasi = false
            }
          })
          if(sudah_finalisasi){
            res.data.data.map(line_mapping => {
              if(line_mapping?.attributes?.is_interview == "true"){
                if(line_mapping?.attributes?.passed_interview == "passed"){
                  lolos++
                } else if (line_mapping?.attributes?.passed_interview == "not_passed"){
                  tidak_lolos++
                }
              } else {
                if(line_mapping?.attributes?.passed_fitproper == "passed"){
                  lolos++
                } else if(line_mapping?.attributes?.passed_fitproper == "not_passed"){
                  tidak_lolos++
                }
              }
            })
            body = {
              data: {
                status: (lolos > tidak_lolos) ? "passed" : "not_passed"
              }
            }
            MappingAPI.edit(chosenLineMapping?.lineMapping?.attributes?.mapping?.data?.id, body).then(
              (res) => {
                body = {
                  data: {
                    status: 'non_active'
                  }
                }
                DataPesertaAPI.edit(chosenLineMapping?.lineMapping?.attributes?.mapping?.data?.attributes?.registrant?.data?.id, body).then(
                  (res) => {
                    if(lolos > tidak_lolos){
                      body = {
                        data: {
                          position: chosenLineMapping?.lineMapping?.attributes?.mapping?.data?.attributes?.position?.data?.id,
                          level: chosenLineMapping?.lineMapping?.attributes?.mapping?.data?.attributes?.level?.data?.id
                        }
                      }
                      EmployeeAPI.edit(chosenLineMapping?.lineMapping?.attributes?.mapping?.data?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes?.NIP, body).then(
                        (res) => {
                          setChosenLineMapping({ ...chosenLineMapping, visible_finalized: false })   
                          getData()                        
                        },
                        (err) => {
                          console.log(err.message)
                        }
                      )
                    }
                  },
                  (err) => {
                    console.log(err.message)
                  }
                )
              },
              (err) => {
                console.log(err.message)
              }
            )
          }
        } 
      )
      setChosenLineMapping({ ...chosenLineMapping, visible_finalized: false })   
      getData()
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
                <CRow className='mt-3'>
                  <CCol xs={12}>
                    <CFormLabel htmlFor="filter_status">Status</CFormLabel>
                    <CFormSelect name="filter_status" id="filter_status" aria-label="Large select example">
                      <option value="">Pilih Status</option>
                      <option value="true">Sudah Dinilai</option>
                      <option value="false">Belum Dinilai</option>
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
            <strong>Data Penilaian Wawancara</strong>
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
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                { lineMappings.map( (linemapping, index) =>
                  <CTableRow key={linemapping.id}>
                    <CTableHeaderCell scope="row">{ index+1 }</CTableHeaderCell>
                    <CTableDataCell>
                      <img className='foto_karyawan' src={url + linemapping?.attributes?.mapping?.data?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes?.Photo?.data?.attributes?.formats?.thumbnail?.url} alt="Photo" />                      
                    </CTableDataCell>
                    <CTableDataCell>{linemapping?.attributes?.mapping?.data?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes.Name}</CTableDataCell>
                    <CTableDataCell>{linemapping?.attributes?.mapping?.data?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes.NIP}</CTableDataCell>
                    <CTableDataCell>{linemapping?.attributes?.mapping?.data?.attributes?.position_current?.data?.attributes?.position_name}</CTableDataCell>
                    <CTableDataCell>{linemapping?.attributes?.mapping?.data?.attributes?.position?.data?.attributes?.position_name}</CTableDataCell>
                    <CTableDataCell>{linemapping?.attributes?.mapping?.data?.attributes?.level_current?.data?.attributes?.functional_name} - {linemapping?.attributes?.mapping?.data?.attributes?.level_current?.data?.attributes?.structural_name}</CTableDataCell>
                    <CTableDataCell>{linemapping?.attributes?.mapping?.data?.attributes?.level?.data?.attributes?.functional_name} - {linemapping?.attributes?.mapping?.data?.attributes?.level?.data?.attributes?.structural_name}</CTableDataCell>
                    <CTableDataCell>{linemapping?.attributes?.mapping?.data?.attributes?.jobdesc}</CTableDataCell>
                    <CTableDataCell>{linemapping?.attributes?.schedule_interview}</CTableDataCell>
                    <CTableDataCell>
                      { linemapping?.attributes?.status_interview
                          ? linemapping?.attributes?.passed_interview == "passed" 
                            ? "Sudah Dinilai" + '\n' + "(Lulus)"
                            : "Sudah Dinilai" + '\n' + "(Tidak Lulus)"
                          : "Belum Dinilai"
                      }
                    </CTableDataCell>
                    <CTableDataCell>
                      { (linemapping?.attributes?.status_interview) ? 
                        <CButton
                          color='success'
                          variant="outline"
                          style={{width: '105px', margin: '5px 5px'}}
                          onClick={() => navigate(
                            '/wawancara/datapenilaian/datanilai', 
                            { state: { 
                                position: linemapping?.attributes?.mapping?.data?.attributes?.position?.data?.id, 
                                registrant: linemapping?.attributes?.mapping?.data?.attributes?.registrant?.data?.id,
                                examiner: linemapping?.attributes?.examiner?.data?.id
                            }}
                          )}>
                            Lihat Nilai
                        </CButton>
                        : null
                      }
                      { (linemapping?.attributes?.status_interview && !linemapping?.attributes?.interview_finalized) ? 
                        <CButton
                          color='warning'
                          variant="outline"
                          style={{width: '105px', margin: '5px 5px'}}
                          onClick={() => navigate(
                            '/wawancara/datapenilaian/nilai/edit', 
                            { state: { data: linemapping, status: 'edit' }}
                          )}>
                            Edit
                        </CButton>
                        : null
                      }       
                      { (linemapping?.attributes?.status_interview && !linemapping?.attributes?.interview_finalized) ? 
                        <CButton
                          color='primary'
                          variant="outline"
                          style={{width: '105px', margin: '5px 5px'}}                          
                          onClick={() => setChosenLineMapping({ 
                            visible_finalized: true, 
                            lineMapping: linemapping
                          })}  >
                            Finalisasi
                        </CButton>
                        : null
                      }                                     
                      { (!linemapping?.attributes?.status_interview) ?
                        <CButton
                          color='primary'
                          variant="outline" 
                          style={{width: '105px', margin: '5px 5px'}}
                          onClick={() => navigate(
                            '/wawancara/datapenilaian/nilai', 
                            { state: { data: linemapping, status: 'tambah' } }
                          )}>
                            Nilai
                        </CButton>
                        : null
                      }    
                    </CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
            </CTable>      
            <CModal backdrop="static" visible={chosenLineMapping.visible_finalized} onClose={() => setChosenLineMapping({ visible: false })}>
              <CModalHeader>
                <CModalTitle>Apakah Anda Yakin?</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Dengan ini nilai akan difinalisasi dan data tidak dapat diubah kembali!
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setChosenLineMapping({ visible: false })}>
                  Close
                </CButton>
                <CButton color="primary" onClick={() => interviewFinalized()}>Finalisasi</CButton>
              </CModalFooter>
            </CModal>              
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default DataPenilaian