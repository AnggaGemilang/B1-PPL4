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
import { useLocation, useNavigate } from "react-router-dom";
import { cilSearch, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import LevelAPI from '../../../config/admin/LevelAPI'

const Level = () => {
  const location = useLocation(); 
  const navigate = useNavigate();

  const [levels, setLevels] = useState([])
  const [message, setMessage] = useState("");
  const [chosenLevel, setChosenLevel] = useState({
    visible: false,
    name: "",
    id: 0,
  })

  useEffect(() => {
    setMessage(location?.state?.successMessage)
    getData()
  }, [])    

  const filterSearch = (e) => {
    e.preventDefault()

    let query = ""
    if(document.getElementById("filter_snama").value.length != 0){
      query += `&filters[structural_name][$contains]=${document.getElementById("filter_snama").value}`
    }
    if(document.getElementById("filter_fnama").value.length != 0){
      query += `&filters[functional_name][$contains]=${document.getElementById("filter_fnama").value}`
    }

    LevelAPI.find(query).then(
      (res) => {
        if(res.data.length != 0){
          setLevels(res.data)
        } else {
          setLevels([])
        }
      }
    )
  }

  const getData = () => {
    LevelAPI.get().then((res) => {
      setLevels(res.data)
      console.log(res.data)
    })
  }

  const deleteData = () => {
    LevelAPI.delete(chosenLevel.id).then((res) => {
      setChosenLevel({ visible:false })
      setMessage("Level has deleted successfully")  
      getData()
    })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CAccordion>
          <CAccordionItem itemKey={1}>
            <CAccordionHeader><CIcon icon={cilSearch} style={{ marginRight: "10px" }}/>Pencarian Data</CAccordionHeader>
            <CAccordionBody>
              <CForm onSubmit={filterSearch}>
                <CRow className='mt-2'>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="exampleFormControlInput1">Nama Struktural</CFormLabel>
                    <CFormInput
                      type="text"
                      name='filter_snama'
                      id="filter_snama"
                      placeholder="Masukkan Nama Struktural . . ."
                    />
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="exampleFormControlInput1">Nama Fungsional</CFormLabel>
                    <CFormInput
                      type="text"
                      name='filter_fnama'
                      id="filter_fnama"
                      placeholder="Masukkan Nama Fungsional . . ."
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
              <strong>Data Jenjang</strong>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol>
                  <CButton
                    color='primary'
                    style={{width:'18%', borderRadius: "50px", fontSize: "14px"}}
                    onClick={() => navigate('/level/tambah', {state: { status: 'tambah' } }) } >
                    <CIcon icon={cilPlus} style={{ marginRight: "10px", color: "#FFFFFF" }} />
                    Tambah Jenjang
                  </CButton>
                </CCol>
              </CRow>
              <CRow className='pl-2 mr-5'>
                <CTable striped className='mt-3 text-center'>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">No</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Nama Struktural</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Nama Fungsional</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    { levels.map( (level, index) =>
                      <CTableRow key={level.id}>
                        <CTableHeaderCell scope="row">{ index+1 }</CTableHeaderCell>
                        <CTableDataCell>{level?.attributes?.structural_name}</CTableDataCell>
                        <CTableDataCell>{level?.attributes?.functional_name}</CTableDataCell>
                        <CTableDataCell>
                          <CButton 
                            color={'warning'} 
                            variant="outline"
                            onClick={() => navigate(
                              '/level/edit', 
                              {state: { data: level, status: 'edit' }})}>
                            Edit</CButton>
                          <CButton 
                            color={'danger'} 
                            variant="outline" 
                            style={{marginLeft: '10px'}}
                            onClick={() => setChosenLevel({ 
                              visible: true, 
                              id: level.id, 
                              name: level.attributes.structural_name + " - " + level.attributes.functional_name, 
                            })}>Delete</CButton>
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
              </CRow>
              <CModal backdrop="static" visible={chosenLevel.visible} onClose={() => setChosenLevel({ visible: false })}>
                <CModalHeader>
                  <CModalTitle>Are You Sure?</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  This will remove {chosenLevel.name} permanently
                </CModalBody>
                <CModalFooter>
                  <CButton color="secondary" onClick={() => setChosenLevel({ visible: false })}>
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

export default Level