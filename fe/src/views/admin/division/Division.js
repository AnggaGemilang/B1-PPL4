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
import DivisionAPI from '../../../config/admin/DivisionAPI'
import DirectorateAPI from '../../../config/admin/DirectorateAPI'

const Division = () => {
  const location = useLocation(); 
  const navigate = useNavigate(); 
   
  const [divisions, setDivisions] = useState([])
  const [directorates, setDirectorates] = useState([])
  const [message, setMessage] = useState("");
  const [chosenDivision, setChosenDivision] = useState({
    visible: false,
    name: "",
    id: 0,
  })
  
  useEffect(() => {
    setMessage(location?.state?.successMessage)
    DirectorateAPI.get().then((res) => {
      setDirectorates(res.data)
    })
    getData()
  }, [])    

  const filterSearch = (e) => {
    e.preventDefault()

    let query = ""
    if(document.getElementById("filter_nama").value.length != 0){
      query += `&filters[division_name][$contains]=${document.getElementById("filter_nama").value}`
    }
    if(document.getElementById("filter_directorate").value.length != 0){
      query += `&filters[directorates][id][$eq]=${document.getElementById("filter_directorate").value}`
    }

    DivisionAPI.find(query).then(
      (res) => {
        if(res.data.length != 0){
          setDivisions(res.data)
        } else {
          setDivisions([])
        }
      }
    )
  }

  const getData = () => {
    DivisionAPI.get().then((res) => {
      setDivisions(res.data)
    })
  }

  const deleteData = () => {
    DivisionAPI.delete(chosenDivision.id).then((res) => {
      setChosenDivision({visible:false})
      setMessage("Division has deleted successfully")        
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
                    <CFormLabel htmlFor="exampleFormControlInput1">Division Name</CFormLabel>
                    <CFormInput
                      type="text"
                      name='filter_nama'
                      id="filter_nama"
                      placeholder="Enter Division Name . . ."
                    />
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="exampleFormControlInput1">Directorate</CFormLabel>
                    <CFormSelect name="filter_directorate" id="filter_directorate" className="mb-3" aria-label="Large select example">
                      <option value="">Choose Directorate</option>
                      { directorates.map(directorate =>
                        <option key={ directorate.id } value={ directorate.id } >{ directorate.attributes.directorate_name }</option>
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
          <CCol xs={12} className="mt-3">
            { message && <CAlert color="success" dismissible onClose={() => { setMessage("") }}> { message } </CAlert> }
          </CCol> 
          <CCard className="mb-4 mt-3">
            <CCardHeader>
              <strong>Data Division</strong>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol>
                  <CButton
                    color='primary'
                    style={{width:'18%', borderRadius: "50px", fontSize: "14px"}}
                    onClick={() => navigate('/division/tambah', {state: { status: 'tambah' } }) } >
                    <CIcon icon={cilPlus} style={{ marginRight: "10px", color: "#FFFFFF" }} />
                    Tambah Division
                  </CButton>
                </CCol>
              </CRow>
              <CRow className='pl-2 mr-5'>
                <CTable striped className='mt-3 text-center'>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">No</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Directorate Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    { divisions.map( (division, index) =>
                      <CTableRow key={division.id}>
                        <CTableHeaderCell scope="row">{ index+1 }</CTableHeaderCell>
                        <CTableDataCell>{division?.attributes?.division_name}</CTableDataCell>
                        <CTableDataCell>{division?.attributes?.directorate?.data?.attributes?.directorate_name}</CTableDataCell>
                        <CTableDataCell>
                          <CButton 
                            color={'warning'} 
                            variant="outline" 
                            onClick={() => navigate(
                              '/division/edit', 
                              {state: { data: division, status: 'edit' }})}>
                            Edit</CButton>
                          <CButton 
                            color={'danger'} 
                            variant="outline" 
                            style={{marginLeft: '10px'}}
                            onClick={() => setChosenDivision({ 
                              visible: true, 
                              id: division.id, 
                              name: division.attributes.division_name, 
                            })}>Delete</CButton>
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
              </CRow>
              <CModal backdrop="static" visible={chosenDivision.visible} onClose={() => setChosenDivision({ visible: false })}>
                <CModalHeader>
                  <CModalTitle>Are You Sure?</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  This will remove {chosenDivision.name} permanently
                </CModalBody>
                <CModalFooter>
                  <CButton color="secondary" onClick={() => setChosenDivision({ visible: false })}>
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

export default Division