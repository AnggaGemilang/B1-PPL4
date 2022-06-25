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
  CForm
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useLocation } from "react-router-dom"
import { cilSearch, cilPlus } from '@coreui/icons'
import url from "../../../config/setting"
import DataPesertaAPI from '../../../config/user/DataPesertaAPI'
import { Link } from 'react-router-dom'

const DataPeserta = () => {
  const location = useLocation();
  const [registrants, setRegistrants] = useState([]);
  const [message, setMessage] = useState("");
  const [chosenRegistrant, setChosenRegistrant] = useState({
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

    console.log(query)

    DataPesertaAPI.findRegistrants(query).then(
      (res) => {
        console.log(res.data)
        if(res.data.length != 0){
          setRegistrants(res.data)
        } else {
          setRegistrants([])         
        }
      }
    )    
  }
  
  const getData = () => {
    DataPesertaAPI.get().then((res) => {
      setRegistrants(res.data)
    })
  }

  const deleteData = () => {
    DataPesertaAPI.delete(chosenRegistrant.id).then((res) => {
      setMessage("Registrant has deleted successfully")
      setChosenRegistrant({ visible: false })
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
            <strong>Data Peserta</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs={12}>
                <Link to={'/tambahpeserta'}>
                  <CButton
                    color='primary'
                    style={{width:'17%', borderRadius: "50px", fontSize: "14px"}} >
                      <CIcon icon={cilPlus} style={{ marginRight: "10px", color: "#FFFFFF" }}/>
                      Tambah Peserta
                  </CButton>
                </Link>
              </CCol>
            </CRow>
              <CTable striped className='mt-3 text-center'>
                <CTableHead>
                   <CTableRow>
                    <CTableHeaderCell scope="col">No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Foto</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                    <CTableHeaderCell scope="col">NIP</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  { registrants.map( (registrant, index) =>
                    <CTableRow key={registrant.id}>
                      <CTableHeaderCell scope="row">{ index+1 }</CTableHeaderCell>
                      <CTableDataCell>
                        <img className='foto_karyawan' src={url + registrant?.attributes?.employee?.data?.attributes?.Photo?.data?.attributes?.formats?.thumbnail?.url} alt="Photo" />
                      </CTableDataCell>
                      <CTableDataCell>{registrant?.attributes?.employee?.data?.attributes?.Name}</CTableDataCell>
                      <CTableDataCell>{registrant?.attributes?.employee?.data?.attributes?.NIP}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color='danger'
                          variant="outline" 
                          onClick={() => setChosenRegistrant({ 
                            visible: true, 
                            name: registrant.attributes.employee.data.attributes.Name,
                            id: registrant.id
                          })}
                          style={{marginLeft: '10px'}} >
                            Hapus
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            <CModal backdrop="static" visible={chosenRegistrant.visible} onClose={() => setChosenRegistrant({ visible: false })}>
              <CModalHeader>
                <CModalTitle>Are You Sure?</CModalTitle>
              </CModalHeader>
              <CModalBody>
                This will remove {chosenRegistrant.name} as registrant permanently
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setChosenRegistrant({ visible: false })}>
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

export default DataPeserta
