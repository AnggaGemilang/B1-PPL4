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
import { useLocation, useNavigate } from "react-router-dom"
import { cilSearch, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import CriteriaAPI from '../../../config/admin/CriteriaAPI'

const Criteria = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const [criterias, setCriterias] = useState([])
  const [message, setMessage] = useState("");
  const [chosenCriteria, setChosenCriteria] = useState({
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
    if(document.getElementById("filter_nama").value.length != 0){
      query += `&filters[criteria][$contains]=${document.getElementById("filter_nama").value}`
    }
    if(document.getElementById("filter_value").value.length != 0){
      query += `&filters[value][$eq]=${document.getElementById("filter_value").value}`
    }    
    if(document.getElementById("filter_usefor").value.length != 0){
      query += `&filters[useFor][$eq]=${document.getElementById("filter_usefor").value}`
    }

    CriteriaAPI.find(query).then(
      (res) => {
        if(res.data.length != 0){
          setCriterias(res.data)
        } else {
          setCriterias([])
        }
      }
    )
  }

  const getData = () => {
    CriteriaAPI.get().then((res) => {
      setCriterias(res.data)
    })
  }

  const deleteData = () => {
    CriteriaAPI.delete(chosenCriteria.id).then((res) => {
      setChosenCriteria({visible:false})
      setMessage("Criteria has deleted successfully")
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
                    <CFormLabel htmlFor="filter_nama">Nama Kriteria</CFormLabel>
                    <CFormInput
                      type="text"
                      name='filter_nama'
                      id="filter_nama"
                      placeholder="Masukkan Nama Kriteria . . ."
                    />
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="filter_value">Bobot</CFormLabel>
                    <CFormInput
                      type="text"
                      name='filter_value'
                      id="filter_value"
                      placeholder="Masukkan Bobot . . ."
                    />
                  </CCol>
                </CRow>             
                <CRow className='mt-3'>
                  <CCol xs={12}>
                    <CFormLabel htmlFor="filter_usefor">Penggunaan</CFormLabel>
                    <CFormSelect name="filter_usefor" id="filter_usefor" className="mb-3" aria-label="Large select example">
                      <option value="">Pilih Penggunaan</option>
                      <option value="am">Manajemen Atas</option>
                      <option value="md">Manajemen Dasar</option>
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
              <strong>Data Kriteria</strong>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol>
                  <CButton
                    color='primary'
                    style={{width:'18%', borderRadius: "50px", fontSize: "14px"}}
                    onClick={() => navigate('/criteria/tambah', {state: { status: 'tambah' } }) } >
                    <CIcon icon={cilPlus} style={{ marginRight: "10px", color: "#FFFFFF" }} />
                    Tambah Criteria
                  </CButton>
                </CCol>
              </CRow>
              <CRow className='pl-2 mr-5'>
                <CTable striped className='mt-3 text-center'>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">No</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Nama Kriteria</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Bobot</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Penggunaan</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    { criterias.map( (criteria, index) =>
                      <CTableRow key={criteria.id}>
                        <CTableHeaderCell scope="row">{ index+1 }</CTableHeaderCell>
                        <CTableDataCell>{criteria.attributes.criteria}</CTableDataCell>
                        <CTableDataCell>{criteria.attributes.value}</CTableDataCell>
                        <CTableDataCell>{criteria.attributes.useFor == "am" ? "Manajemen Atas" : "Manajemen Dasar"}</CTableDataCell>
                        <CTableDataCell>
                          <CButton 
                            color={'warning'} 
                            variant="outline"
                            style={{width: '75px'}}
                            onClick={() => navigate(
                              '/criteria/edit', 
                              {state: { data: criteria, status: 'edit' }})}>
                            Edit</CButton>
                          <CButton 
                            color={'danger'} 
                            variant="outline" 
                            style={{marginTop: '10px'}}
                            onClick={() => setChosenCriteria({ 
                              visible: true, 
                              id: criteria.id, 
                              name: criteria.attributes.criteria, 
                            })}>Hapus</CButton>
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
              </CRow>
              <CModal backdrop="static" visible={chosenCriteria.visible} onClose={() => setChosenCriteria({ visible: false })}>
                <CModalHeader>
                  <CModalTitle>Are You Sure?</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  This will remove {chosenCriteria.name} permanently
                </CModalBody>
                <CModalFooter>
                  <CButton color="secondary" onClick={() => setChosenCriteria({ visible: false })}>
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

export default Criteria