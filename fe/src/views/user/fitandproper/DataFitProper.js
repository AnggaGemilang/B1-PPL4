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
import { useLocation, useNavigate } from "react-router-dom"
import { cilSearch, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import MappingAPI from '../../../config/user/MappingAPI'
import url from "../../../config/setting"
import logoPDF from 'src/assets/images/pdf-icon.png'

const DataFitProper = () => {
  const location = useLocation()
  const navigate = useNavigate() 

  const [mappings, setMappings] = useState([])
  const [message, setMessage] = useState("")
  const [chosenMapping, setChosenMapping] = useState({
    visible: false,
    name: "",
    id: 0    
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
        if(res.data.data.length != 0){
          setRegistrants(res.data.data)
        } else {
          setRegistrants([])         
        }
      }
    )    
  }
  
  const getData = () => {
    MappingAPI.get().then((res) => {
      setMappings(res.data.data)
    })
  }

  const deleteData = () => {
    MappingAPI.delete(chosenMapping.id).then((res) => {
      setMessage("Pendaftaran Telah Dihapus")
      setChosenMapping({ visible: false })
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
            <strong>Data Pendaftaran Fit & Proper</strong>
          </CCardHeader>
          <CCardBody style={{ overflowX: "auto"}}>
            <CRow>
              <CCol xs={12}>
                <CButton
                  color='primary'
                  style={{width:'19%', borderRadius: "50px", fontSize: "14px"}}
                  onClick={() => 
                    navigate('/fitandproper/daftar', {state: { status: 'tambah' } })
                  } >
                    <CIcon icon={cilPlus} style={{ marginRight: "10px", color: "#FFFFFF" }}/>
                    Tambah Pendaftaran
                </CButton>
              </CCol>
            </CRow>
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
                    <CTableHeaderCell scope="col">Lampiran File</CTableHeaderCell>
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
                          { mapping.attributes.examiners.data.map(examiner  => (
                              <li style={{ textAlign: "left", marginBottom: "4px" }} key={examiner.id}>{examiner.attributes.employee.data.attributes.Name}</li>
                          ))}
                        </ul>
                      </CTableDataCell>
                      <CTableDataCell>
                        <ul>
                            <li style={{ textAlign: "left", marginBottom: "4px" }}>
                              <p>CV</p>
                              <a target="_blank" href={url + mapping?.attributes?.registrant?.data?.attributes?.cv?.data?.attributes?.url }><CImage style={{ marginTop: "-10px", marginLeft: "-5px" }} src={logoPDF} height={35} /></a>
                            </li>
                            <li style={{ textAlign: "left" }}>
                              <p>PPT</p>
                              <a target="_blank" href={ url + mapping?.attributes?.registrant?.data?.attributes?.ppt?.data?.attributes?.url }><CImage style={{ marginTop: "-10px", marginLeft: "-5px" }} src={logoPDF} height={35} /></a>
                            </li>                            
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
                        <CButton 
                          color={'warning'} 
                          variant="outline" 
                          style={{width: '75px', marginBottom: '10px'}}
                          onClick={() => 
                            navigate('/fitandproper/edit', {state: { data: mapping, status: 'edit' } })
                          }>
                          Edit
                        </CButton>                        
                        <CButton
                          color='danger'
                          variant="outline" 
                          style={{width: '75px'}}                          
                          onClick={() => setChosenMapping({ 
                            visible: true, 
                            id: mapping.id
                          })}>
                            Hapus
                        </CButton>                        
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            <CModal backdrop="static" visible={chosenMapping.visible} onClose={() => setChosenMapping({ visible: false })}>
              <CModalHeader>
                <CModalTitle>Are You Sure?</CModalTitle>
              </CModalHeader>
              <CModalBody>
                This will remove permanently
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setChosenMapping({ visible: false })}>
                  Close
                </CButton>
                <CButton color="danger" onClick={() => deleteData()}>Delete</CButton>
              </CModalFooter>
            </CModal>           
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default DataFitProper
