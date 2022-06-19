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
import FieldAPI from '../../../config/admin/FieldAPI'
import DivisionAPI from '../../../config/admin/DivisionAPI'

const Field = () => {
  const location = useLocation(); 
  const navigate = useNavigate();
  
  const [fields, setFields] = useState([])
  const [divisions, setDivisions] = useState([])
  const [message, setMessage] = useState("");
  const [chosenField, setChosenField] = useState({
    visible: false,
    name: "",
    id: 0,
  })
  
  useEffect(() => {
    setMessage(location?.state?.successMessage)
    DivisionAPI.get().then((res) => {
      setDivisions(res.data)
    })
    getData()
  }, [])    

  const filterSearch = (e) => {
    e.preventDefault()

    let query = ""
    if(document.getElementById("filter_nama").value.length != 0){
      query += `&filters[field_name][$contains]=${document.getElementById("filter_nama").value}`
    }
    if(document.getElementById("filter_division").value.length != 0){
      query += `&filters[divisions][id][$eq]=${document.getElementById("filter_division").value}`
    }

    FieldAPI.find(query).then(
      (res) => {
        if(res.data.length != 0){
          setFields(res.data)
        } else {
          setFields([])
        }
      }
    )
  }

  const getData = () => {
    FieldAPI.get().then((res) => {
      setFields(res.data)
    })
  }

  const deleteData = () => {
    FieldAPI.delete(chosenField.id).then((res) => {
      setChosenField({ visible:false })
      setMessage("Field has deleted successfully")         
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
                    <CFormLabel htmlFor="exampleFormControlInput1">Field Name</CFormLabel>
                    <CFormInput
                      type="text"
                      name='filter_nama'
                      id="filter_nama"
                      placeholder="Enter Field Name . . ."
                    />
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="exampleFormControlInput1">Division</CFormLabel>
                    <CFormSelect name="filter_division" id="filter_division" className="mb-3" aria-label="Large select example">
                      <option value="">Choose Division</option>
                      { divisions.map(division =>
                        <option key={ division.id } value={ division.id } >{ division.attributes.division_name }</option>
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
              <strong>Data Field</strong>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol>
                  <CButton
                    color='primary'
                    style={{width:'18%', borderRadius: "50px", fontSize: "14px"}}
                    onClick={() => navigate('/field/tambah', {state: { status: 'tambah' } }) } >
                    <CIcon icon={cilPlus} style={{ marginRight: "10px", color: "#FFFFFF" }} />
                    Tambah Field
                  </CButton>
                </CCol>
              </CRow>
              <CRow className='pl-2 mr-5'>
                <CTable striped className='mt-3 text-center'>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">No</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Division Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    { fields.map( (field, index) =>
                      <CTableRow key={field.id}>
                        <CTableHeaderCell scope="row">{ index+1 }</CTableHeaderCell>
                        <CTableDataCell>{field?.attributes?.field_name}</CTableDataCell>
                        <CTableDataCell>{field?.attributes?.division?.data?.attributes?.division_name}</CTableDataCell>
                        <CTableDataCell>
                          <CButton 
                            color={'warning'} 
                            variant="outline" 
                            onClick={() => navigate(
                              '/field/edit', 
                              {state: { data: field, status: 'edit' }})}>
                            Edit</CButton>
                          <CButton 
                            color={'danger'} 
                            variant="outline" 
                            style={{marginLeft: '10px'}}
                            onClick={() => setChosenField({ 
                              visible: true, 
                              id: field.id, 
                              name: field.attributes.field_name, 
                            })}>Delete</CButton>
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
              </CRow>
              <CModal backdrop="static" visible={chosenField.visible} onClose={() => setChosenField({ visible: false })}>
                <CModalHeader>
                  <CModalTitle>Are You Sure?</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  This will remove {chosenField.name} permanently
                </CModalBody>
                <CModalFooter>
                  <CButton color="secondary" onClick={() => setChosenField({ visible: false })}>
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

export default Field