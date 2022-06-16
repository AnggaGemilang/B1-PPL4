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
import { cilSearch, cilPlus } from '@coreui/icons'
import { Link } from 'react-router-dom'
import SubFieldAPI from '../../../config/admin/SubFieldAPI'
import FieldAPI from '../../../config/admin/FieldAPI'

const SubField = () => {
  const [subFields, setSubFields] = useState([])
  const [fields, setFields] = useState([])
  const [message, setMessage] = useState("");
  const [chosenSubField, setChosenSubField] = useState({
    visible: false,
    name: "",
    id: 0,
  })
  useEffect(() => {
    setMessage(location?.state?.successMessage)
    FieldAPI.get().then((res) => {
      setFields(res.data)
    })
    getData()
  }, [])    

  const filterSearch = (e) => {
    e.preventDefault()

    let query = ""
    if(document.getElementById("filter_nama").value.length != 0){
      query += `&filters[subfield_name][$contains]=${document.getElementById("filter_nama").value}`
    }
    if(document.getElementById("filter_field").value.length != 0){
      query += `&filters[fields][id][$eq]=${document.getElementById("filter_field").value}`
    }

    SubFieldAPI.find(query).then(
      (res) => {
        if(res.data.length != 0){
          setSubFields(res.data)
        } else {
          setSubFields([])
        }
      }
    )
  }

  const getData = () => {
    SubFieldAPI.get().then((res) => {
      setSubFields(res.data)
    })
  }

  const deleteData = () => {
    SubFieldAPI.delete(state.id).then((res) => {
      setChosenSubField({ visible:false })
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
                    <CFormLabel htmlFor="exampleFormControlInput1">Sub Field Name</CFormLabel>
                    <CFormInput
                      type="text"
                      name='filter_nama'
                      id="filter_nama"
                      placeholder="Enter Sub Field Name . . ."
                    />
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="exampleFormControlInput1">Field</CFormLabel>
                    <CFormSelect name="filter_field" id="filter_field" className="mb-3" aria-label="Large select example">
                      <option value="">Choose Field</option>
                      { fields.map(field =>
                        <option key={ field.id } value={ field.id } >{ field.attributes.field_name }</option>
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
              <strong>Data Sub Field</strong>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol>
                  <Link to={'/directorate/tambah'}>
                    <CButton
                      color='primary'
                      style={{width:'18%', borderRadius: "50px", fontSize: "14px"}} >
                      <CIcon icon={cilPlus} style={{ marginRight: "10px", color: "#FFFFFF" }} />
                        Tambah Sub Field
                    </CButton>
                  </Link>
                </CCol>
              </CRow>
              <CRow className='pl-2 mr-5'>
                <CTable striped className='mt-3 text-center'>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">No</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Field Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    { subFields.map( (subField, index) =>
                      <CTableRow key={subField.id}>
                        <CTableHeaderCell scope="row">{ index+1 }</CTableHeaderCell>
                        <CTableDataCell>{subField.attributes.subfield_name}</CTableDataCell>
                        <CTableDataCell>{subField?.attributes?.fields?.data[0]?.attributes?.field_name}</CTableDataCell>
                        <CTableDataCell>
                          <Link 
                            to={{
                              pathname: `/subField/edit/${subField.id}`,
                            }}>
                            <CButton color={'warning'} variant="outline">Edit</CButton>
                          </Link>
                          <CButton 
                            color={'danger'} 
                            variant="outline" 
                            style={{marginLeft: '10px'}}
                            onClick={() => setChosenSubField({ 
                              visible: true, 
                              id: subField.id, 
                              name: subField.attributes.subfield_name, 
                            })}>Delete</CButton>
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
              </CRow>
              <CModal backdrop="static" visible={chosenSubField.visible} onClose={() => setChosenSubField({ visible: false })}>
                <CModalHeader>
                  <CModalTitle>Are You Sure?</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  This will remove {chosenSubField.name} permanently
                </CModalBody>
                <CModalFooter>
                  <CButton color="secondary" onClick={() => setChosenSubField({ visible: false })}>
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

export default SubField