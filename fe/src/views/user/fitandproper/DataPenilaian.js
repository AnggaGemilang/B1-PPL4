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
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem, 
  CFormLabel,
  CAlert,
  CForm,
  CImage,
} from '@coreui/react'
import { useLocation, useNavigate } from "react-router-dom";
import { cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import FitAndProperAPI from '../../../config/user/FitAndProperAPI'
import WawancaraAPI from '../../../config/user/WawancaraAPI'
import MappingAPI from '../../../config/user/MappingAPI'
import url from "../../../config/setting"
import logoPDF from 'src/assets/images/pdf-icon.png'

const DataPenilaian = () => {
  const location = useLocation();
  const navigate = useNavigate(); 

  const [lineMappings, setLineMappings] = useState([]);
  const [message, setMessage] = useState("");
  const [chosenLineMapping, setChosenLineMapping] = useState({
    visible: false,
    name: "",
    lineMapping: 0    
  })

  useEffect(() => {
    setMessage(location?.state?.successMessage)
    getData()
  }, [])  

  const filterSearch = (e) => {
    e.preventDefault()

    let query = ""
    if(document.getElementById("filter_nama").value.length != 0){
      query += `&filters[employee][Name][$contains]=${document.getElementById("filter_nama").value}`
    }
    if(document.getElementById("filter_nip").value.length != 0){
      query += `&filters[employee][NIP][$contains]=${document.getElementById("filter_nip").value}`
    }

    DataPesertaAPI.findRegistrants(query).then(
      (res) => {
        if(res.data.length != 0){
          setRegistrants(res.data)
        } else {
          setRegistrants([])         
        }
      }
    )    
  }
  
  const getData = () => {
    FitAndProperAPI.getLineMapping().then((res) => {
      setLineMappings(res.data)
    })
  }

  const daftarWawancara = () => {
    const body = {
      data: {
        schedule_interview: document.getElementById("schedule").value,
        is_interview: true
      }
    }
    WawancaraAPI.edit(chosenLineMapping?.lineMapping?.id, body).then(res => {
      let examiners = 
        (chosenLineMapping?.lineMapping?.attributes?.mapping?.data?.attributes?.examiners_interview == null) ? 
        [] : chosenLineMapping?.lineMapping?.attributes?.mapping?.data?.attributes?.examiners_interview
      examiners.push(chosenLineMapping?.lineMapping?.attributes?.examiner?.data?.id)
      const body = {
        data: {
          is_interview: true,
          examiners_interview: examiners
        }
      }
      MappingAPI.edit(chosenLineMapping?.lineMapping?.attributes?.mapping?.data?.id, body).then(res => {
        setChosenLineMapping({ ...chosenLineMapping, visible: false })
        getData()
      })      
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
            <strong>Data Penilaian Fit & Proper</strong>
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
                    <CTableDataCell>{linemapping?.attributes?.status_fitproper ? "Sudah Dinilai" : "Belum Dinilai"}</CTableDataCell>
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
                      { (linemapping?.attributes?.status_fitproper && !linemapping?.attributes?.is_interview) ? 
                        <CButton
                          color='primary'
                          variant="outline" 
                          onClick={() => setChosenLineMapping({ 
                            visible: true, 
                            lineMapping: linemapping
                          })}
                          style={{marginLeft: '10px', marginBottom: '10px'}} >
                            Ajukan
                        </CButton>
                        : null
                      }
                      { (linemapping?.attributes?.status_fitproper) ? 
                        <CButton
                          color='success'
                          variant="outline"
                          onClick={() => navigate(
                            '/fitandproper/datapenilaian/datanilai', 
                            { state: { data: linemapping }}
                          )}
                          style={{marginLeft: '10px', marginBottom: '10px', width: "80px"}} >
                            Lihat Nilai
                        </CButton>
                        : null
                      }
                      { (linemapping?.attributes?.status_fitproper) ? 
                        <CButton
                          color='warning'
                          variant="outline"
                          onClick={() => navigate(
                            '/fitandproper/datapenilaian/edit', 
                            { state: { data: linemapping }}
                          )}
                          style={{marginLeft: '10px', marginBottom: '10px', width: "80px"}} >
                            Edit
                        </CButton>
                        : null
                      }                      
                      { (!linemapping?.attributes?.status_fitproper) ?
                        <CButton
                          color='primary'
                          variant="outline" 
                          onClick={() => navigate(
                            '/fitandproper/datapenilaian/nilai', 
                            { state: { data: linemapping } }
                          )}
                          style={{marginLeft: '10px', marginBottom: '10px'}} >
                            Nilai
                        </CButton>
                        : null
                      }                              
                    </CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
            </CTable>
            <CModal backdrop="static" visible={chosenLineMapping.visible} onClose={() => setChosenLineMapping({ visible: false })}>
              <CModalHeader>
                <CModalTitle>Apakah Anda Yakin?</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Dengan ini peserta akan melanjutkan penilaian ke tahap wawancara, yang akan dilaksanakan pada:
                <CRow className='mt-2'>
                  <CCol>
                    <CFormInput 
                      type="date" 
                      id="schedule" 
                      name="schedule"
                      placeholder='Masukkan Tanggal'/>                    
                  </CCol>
                </CRow>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setChosenLineMapping({ visible: false })}>
                  Close
                </CButton>
                <CButton color="primary" onClick={() => daftarWawancara()}>Submit</CButton>
              </CModalFooter>
            </CModal>             
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default DataPenilaian