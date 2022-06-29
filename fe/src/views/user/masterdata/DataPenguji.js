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
import { useLocation } from "react-router-dom"
import CIcon from '@coreui/icons-react'
import { cilSearch, cilPlus } from '@coreui/icons'
import url from "../../../config/setting"
import DataPengujiAPI from '../../../config/user/DataPengujiAPI'
import { Link } from 'react-router-dom'

const DataPenguji = () => {
  const location = useLocation()
  const [examiners, setExaminers] = useState([])
  const [message, setMessage] = useState("")
  const [chosenExaminer, setChosenExaminer] = useState({
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

    DataPengujiAPI.findExaminers(query).then(
      (res) => {
        if(res.data.data.length != 0){
          setExaminers(res.data.data)
        } else {
          setExaminers([]) 
        }
      }
    )    
  }

  const getData = () => {
    DataPengujiAPI.get().then((res) => {
      setExaminers(res.data.data)
    })
  }
  
  const deleteData = () => {
    DataPengujiAPI.delete(chosenExaminer.id).then((res) => {
      setMessage("Penguji Telah Berhasil Dihapus!")
      setChosenExaminer({ visible: false })
      getData()
    })
  }

  return (
    <CRow className='position-relative'>                      
      <CCol xs={12}>
        <CCol xs={12}>
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
        </CCol>
        <CCol xs={12} className="mt-3">
          { message && <CAlert color="success" dismissible onClose={() => { setMessage("") }}> { message } </CAlert> }
        </CCol>          
        <CCard className="mb-4 mt-3">
          <CCardHeader>
            <strong>Data Penguji</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol>
                <Link to={'/tambahpenguji'}>
                  <CButton
                    color='primary'
                    style={{width:'17%', borderRadius: "50px", fontSize: "14px"}} >
                      <CIcon icon={cilPlus} style={{ marginRight: "10px", color: "#FFFFFF" }}/>
                      Tambah Penguji
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
                  { examiners.map((examiner, index) =>
                    <CTableRow key={examiner.id}>
                      <CTableHeaderCell scope="row">{ index+1 }</CTableHeaderCell>
                      <CTableDataCell>
                        <img className='foto_karyawan' src={url + examiner?.attributes?.employee?.data?.attributes?.Photo?.data?.attributes?.formats?.thumbnail?.url} alt="Photo" />
                      </CTableDataCell>
                      <CTableDataCell>{examiner?.attributes?.employee?.data?.attributes?.Name}</CTableDataCell>
                      <CTableDataCell>{examiner?.attributes?.employee?.data?.attributes?.NIP}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color='danger'
                          variant="outline" 
                          onClick={() => setChosenExaminer({ 
                            visible: true, 
                            name: examiner.attributes.employee.data.attributes.Name,
                            id: examiner.id
                          })}
                          style={{marginLeft: '10px'}} >
                            Hapus
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            <CModal backdrop="static" visible={chosenExaminer.visible} onClose={() => setChosenExaminer({ visible: false })}>
              <CModalHeader>
                <CModalTitle>Apakah Anda Yakin?</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Ini akan menghapus {chosenExaminer.name} sebagai penguji secara permanen
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setChosenExaminer({ visible: false })}>
                  Tutup
                </CButton>
                <CButton color="danger" onClick={() => deleteData()}>Hapus</CButton>
              </CModalFooter>
            </CModal>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default DataPenguji
