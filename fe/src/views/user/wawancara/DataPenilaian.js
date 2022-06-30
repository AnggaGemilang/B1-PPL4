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
  CFormSelect  
} from '@coreui/react'
import { useLocation, useNavigate } from "react-router-dom"
import { cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import WawancaraAPI from '../../../config/user/WawancaraAPI'
import PositionAPI from 'src/config/admin/PositionAPI'
import url from "../../../config/setting"
import logoPDF from 'src/assets/images/pdf-icon.png'

const DataPenilaian = () => {
  const location = useLocation()
  const navigate = useNavigate() 

  const [lineMappings, setLineMappings] = useState([])
  const [positions, setPositions] = useState([])
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
      query += `&filters[mapping][registrant][employee][Name][$contains]=${document.getElementById("filter_nama").value}`
    }
    if(document.getElementById("filter_nip").value.length != 0){
      query += `&filters[mapping][registrant][employee][NIP][$contains]=${document.getElementById("filter_nip").value}`
    }
    if(document.getElementById("filter_position").value.length != 0){
      query += `&filters[mapping][registrant][employee][position][id][$eq]=${document.getElementById("filter_position").value}`
    }
    if(document.getElementById("filter_projection").value.length != 0){
      query += `&filters[mapping][position][id][$eq]=${document.getElementById("filter_projection").value}`
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
                    <CFormSelect name="filter_position" id="filter_position" aria-label="Large select example">
                      <option value="">Pilih Jabatan</option>
                      { positions.map(position =>
                        <option key={ position.id } value={ position.id } >{ position.attributes.position_name }</option>
                      )}
                    </CFormSelect>
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="filter_projection">Proyeksi</CFormLabel>
                    <CFormSelect name="filter_projection" id="filter_projection" aria-label="Large select example">
                      <option value="">Pilih Proyeksi</option>
                      { positions.map(position =>
                        <option key={ position.id } value={ position.id } >{ position.attributes.position_name }</option>
                      )}
                    </CFormSelect>
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
          <CCardBody>
            <CTable striped className='mt-3 text-center'>
              <CTableHead>
                 <CTableRow>
                  <CTableHeaderCell scope="col">No</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                  <CTableHeaderCell scope="col">NIP</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Jabatan</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Proyeksi</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tanggal</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Lampiran File</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                { lineMappings.map( (linemapping, index) =>
                  <CTableRow key={linemapping.id}>
                    <CTableHeaderCell scope="row">{ index+1 }</CTableHeaderCell>
                    <CTableDataCell>{linemapping?.attributes?.mapping?.data?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes.Name}</CTableDataCell>
                    <CTableDataCell>{linemapping?.attributes?.mapping?.data?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes.NIP}</CTableDataCell>
                    <CTableDataCell>{linemapping?.attributes?.mapping?.data?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes?.position?.data?.attributes?.position_name}</CTableDataCell>
                    <CTableDataCell>{linemapping?.attributes?.mapping?.data?.attributes?.position?.data?.attributes?.position_name}</CTableDataCell>
                    <CTableDataCell>{linemapping?.attributes?.mapping?.data?.attributes?.schedule}</CTableDataCell>
                    <CTableDataCell>{linemapping?.attributes?.status_interview ? "Sudah Dinilai" : "Belum Dinilai"}</CTableDataCell>
                    <CTableDataCell>
                      <ul>
                          <li style={{ textAlign: "left", marginBottom: "4px" }}>
                            <p>CV</p>
                            <a target="_blank" href={url + linemapping?.attributes?.mapping?.data?.attributes?.registrant?.data?.attributes?.cv?.data?.attributes?.url }><CImage style={{ marginTop: "-10px", marginLeft: "-5px" }} src={logoPDF} height={35} /></a>
                          </li>
                          <li style={{ textAlign: "left" }}>
                            <p>PPT</p>
                            <a target="_blank" href={ url + linemapping?.attributes?.mapping?.data?.attributes?.registrant?.data?.attributes?.ppt?.data?.attributes?.url }><CImage style={{ marginTop: "-10px", marginLeft: "-5px" }} src={logoPDF} height={35} /></a>
                          </li>                            
                      </ul>
                    </CTableDataCell>
                    <CTableDataCell>
                      { (linemapping?.attributes?.status_interview) ? 
                        <CButton
                          color='success'
                          variant="outline"
                          style={{width: '75px', margin: '5px 5px'}}
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
                      { (linemapping?.attributes?.status_interview) ? 
                        <CButton
                          color='warning'
                          variant="outline"
                          style={{width: '75px', margin: '5px 5px'}}
                          onClick={() => navigate(
                            '/wawancara/datapenilaian/nilai/edit', 
                            { state: { data: linemapping }}
                          )}>
                            Edit
                        </CButton>
                        : null
                      }                      
                      { (!linemapping?.attributes?.status_interview) ?
                        <CButton
                          color='primary'
                          variant="outline" 
                          style={{width: '75px', margin: '5px 5px'}}
                          onClick={() => navigate(
                            '/wawancara/datapenilaian/nilai', 
                            { state: { data: linemapping } }
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
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default DataPenilaian