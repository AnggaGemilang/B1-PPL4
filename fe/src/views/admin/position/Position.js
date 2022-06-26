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
  CFormSelect  
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useLocation, useNavigate } from "react-router-dom"
import { cilSearch, cilPlus } from '@coreui/icons'
import GradeAPI from '../../../config/admin/GradeAPI'
import PositionAPI from '../../../config/admin/PositionAPI'

const Grade = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [grades, setGrades] = useState([])
  const [positions, setPositions] = useState([])
  const [message, setMessage] = useState("")
  const [chosenPosition, setChosenPosition] = useState({
    visible: false,
    name: "",
    id: 0,
  })

  useEffect(() => {
    setMessage(location?.state?.successMessage)
    GradeAPI.get().then((res) => {
      setGrades(res.data)
    })
    getData()
  }, [])    

  const filterSearch = (e) => {
    e.preventDefault()

    let query = ""
    if(document.getElementById("filter_nama").value.length != 0){
      query += `&filters[position_name][$contains]=${document.getElementById("filter_nama").value}`
    }
    if(document.getElementById("filter_grade").value.length != 0){
      query += `&filters[grades][id][$eq]=${document.getElementById("filter_grade").value}`
    }

    PositionAPI.find(query).then(
      (res) => {
        if(res.data.length != 0){
          setPositions(res.data)
        } else {
          setPositions([])
        }
      }
    )
  }

  const getData = () => {
    PositionAPI.get().then((res) => {
      setPositions(res.data)
    })
  }

  const deleteData = () => {
    PositionAPI.delete(chosenPosition.id).then((res) => {
      setChosenPosition({ ...state, visible: false })
      setMessage("Jabatan Telah Berhasil Dihapus!")        
      getData()
    })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCol xs={12}>
          <CAccordion>
            <CAccordionItem itemKey={1}>
              <CAccordionHeader><CIcon icon={cilSearch} style={{ marginRight: "10px" }}/>Pencarian Data</CAccordionHeader>
              <CAccordionBody>
                <CForm onSubmit={filterSearch}>
                  <CRow className='mt-2'>
                    <CCol xs={6}>
                      <CFormLabel htmlFor="exampleFormControlInput1">Jabatan</CFormLabel>
                      <CFormInput
                        type="text"
                        name='filter_nama'
                        id="filter_nama"
                        placeholder="Masukkan Nama Jabatan . . ."
                      />
                    </CCol>
                    <CCol xs={6}>
                      <CFormLabel htmlFor="exampleFormControlInput1">Grade</CFormLabel>
                      <CFormSelect name="filter_grade" id="filter_grade" className="mb-3" aria-label="Large select example">
                        <option value="">Pilih Grade</option>
                        { grades.map(grade =>
                          <option key={ grade.id } value={ grade.id } >{ grade.attributes.grade_name}</option>
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
        </CCol>
        <CCol xs={12} className="mt-3">
          { message && <CAlert color="success" dismissible onClose={() => { setMessage("") }}> { message } </CAlert> }
        </CCol> 
        <CCard className="mb-4 mt-3">
          <CCardHeader>
            <strong>Data Jabatan</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol>
                <CButton
                  color='primary'
                  style={{width:'18%', borderRadius: "50px", fontSize: "14px"}}
                  onClick={() => navigate('/position/tambah', {state: { status: 'tambah' } }) } >
                  <CIcon icon={cilPlus} style={{ marginRight: "10px", color: "#FFFFFF" }} />
                  Tambah Jabatan
                </CButton>
              </CCol>
            </CRow>
            <CRow className='pl-2 mr-5'>
              <CTable striped className='mt-3 text-center'>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nama Jabatan</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Grade</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  { positions.map( (position, index) =>
                    <CTableRow key={position.id}>
                      <CTableHeaderCell scope="row">{ index+1 }</CTableHeaderCell>
                      <CTableDataCell>{position?.attributes?.position_name}</CTableDataCell>
                      <CTableDataCell>{position?.attributes?.grade?.data?.attributes?.grade_name}</CTableDataCell>
                      <CTableDataCell>
                        <CButton 
                          color={'warning'} 
                          variant="outline"
                          onClick={() => navigate(
                            '/position/edit', 
                            {state: { data: position, status: 'edit' }})}>
                          Edit</CButton>
                        <CButton 
                          color={'danger'} 
                          variant="outline" 
                          style={{marginLeft: '10px'}}
                          onClick={() => setChosenPosition({ 
                            visible: true, 
                            id: position.id, 
                            name: position.attributes.position_name, 
                          })}>Delete
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </CRow>
            <CModal backdrop="static" visible={chosenPosition.visible} onClose={() => setChosenPosition({ visible: false })}>
              <CModalHeader>
                <CModalTitle>Apakah Anda Yakin?</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Ini akan menghapus {chosenPosition.name} secara permanen
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setChosenPosition({ visible: false })}>
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

export default Grade