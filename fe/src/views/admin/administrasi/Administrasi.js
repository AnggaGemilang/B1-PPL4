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
  CFormCheck,
  CFormSelect,  
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilPlus } from '@coreui/icons'
import url from "../../../config/setting"
import { Link } from 'react-router-dom'
import EmployeeAPI from '../../../config/admin/EmployeeAPI'
import GradeAPI from '../../../config/admin/GradeAPI'
import LevelAPI from '../../../config/admin/LevelAPI'
import SubFieldAPI from '../../../config/admin/SubFieldAPI'
import { useLocation } from "react-router-dom";

const Administrasi = () => {
  const [employees, setEmployees] = useState([])
  const [levels, setLevels] = useState([])
  const [grades, setGrades] = useState([])
  const [subfields, setSubfields] = useState([])
  const [message, setMessage] = useState("");
  const [chosenEmployee, setChosenEmployee] = useState({
    visible: false,
    name: "",
    id: 0,
  })

  useEffect(() => {
    setMessage(location?.state?.successMessage)
    LevelAPI.get().then((res) => {
      setLevels(res.data)
    })
    GradeAPI.get().then((res) => {
      setGrades(res.data)
    })
    SubFieldAPI.get().then((res) => {
      setSubfields(res.data)
    })    
    getData()
  }, [])    

  const filterSearch = (e) => {
    e.preventDefault()

    let query = ""
    if(document.getElementById("filter_nip").value.length != 0){
      query += `&filters[NIP][$contains]=${document.getElementById("filter_nip").value}`
    }
    if(document.getElementById("filter_nama").value.length != 0){
      query += `&filters[Name][$contains]=${document.getElementById("filter_nama").value}`
    }
    if(document.querySelector('input[name="filter_gender"]:checked') != undefined){
      query += `&filters[Gender][$contains]=${document.querySelector('input[name="filter_gender"]:checked').value}`
    }
    if(document.getElementById("filter_birthplace").value.length != 0){
      query += `&filters[BirthPlace][$contains]=${document.getElementById("filter_birthplace").value}`
    }        
    if(document.querySelector('input[type="date"]').value.length != 0){
      query += `&filters[BirthDate][$gte]=${document.querySelector('input[type="date"]').value}`
    }
    if(document.getElementById("filter_email").value.length != 0){
      query += `&filters[Email][$contains]=${document.getElementById("filter_email").value}`
    }
    if(document.getElementById("filter_phonenumber").value.length != 0){
      query += `&filters[PhoneNumber][$contains]=${document.getElementById("filter_phonenumber").value}`
    }
    if(document.getElementById("filter_religion").value.length != 0){
      query += `&filters[Religion][$contains]=${document.getElementById("filter_religion").value}`
    }
    if(document.getElementById("filter_grade").value.length != 0){
      query += `&filters[grades][id][$eq]=${document.getElementById("filter_grade").value}`
    }
    if(document.getElementById("filter_level").value.length != 0){
      query += `&filters[levels][id][$eq]=${document.getElementById("filter_level").value}`
    }
    if(document.getElementById("filter_subfield").value.length != 0){
      query += `&filters[sub_fields][id][$eq]=${document.getElementById("filter_subfield").value}`
    }    

    EmployeeAPI.find(query).then(
      (res) => {
        console.log(res.data)
        if(res.data.length != 0){
          setEmployees(res.data)
        } else {
          setEmployees([])
        }
      }
    )
  }

  const getData = () => {
    EmployeeAPI.get().then((res) => {
      console.log(res.data)
      setEmployees(res.data)
    })
  }

  const deleteData = () => {
    EmployeeAPI.delete(chosenEmployee.id).then((res) => {
      setChosenEmployee({visible:false})
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
                    <CFormLabel htmlFor="exampleFormControlInput1">NIP</CFormLabel>
                    <CFormInput
                      type="text"
                      name='filter_nip'
                      id="filter_nip"
                      placeholder="Enter NIP . . ."
                    />
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="exampleFormControlInput1">Nama Lengkap</CFormLabel>
                    <CFormInput
                      type="text"
                      name='filter_nama'
                      id="filter_nama"
                      placeholder="Enter Full Name . . ."
                    />
                  </CCol>
                </CRow>
                <CRow className='mt-3'>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="gender">Gender</CFormLabel>                      
                    <CCol xs={12}>
                      <CFormCheck
                        inline
                        type="radio"
                        name="filter_gender"
                        id="filter_gender1"
                        value=""
                        label="None"
                      />
                      <CFormCheck
                        inline
                        type="radio"
                        name="filter_gender"
                        id="filter_gender2"
                        value="Male"
                        label="Male"
                      />
                      <CFormCheck
                        inline
                        type="radio"
                        name="filter_gender"
                        id="filter_gender3"
                        value="Female"
                        label="Female"
                      />
                    </CCol>
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="exampleFormControlInput1">Birth Place</CFormLabel>
                    <CFormInput type="text" name="filter_birthplace" id="filter_birthplace" placeholder='Enter Birth Place . . .' />
                  </CCol>
                </CRow>
                <CRow className='mt-3'>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="exampleFormControlInput1">Birth Date</CFormLabel>
                    <CFormInput type="date" name="filter_birthDate" id="filter_birthDate"/>
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="exampleFormControlInput1">Email</CFormLabel>
                    <CFormInput type="email" name="filter_email" id="filter_email" placeholder='Enter Email . . .'/>
                  </CCol>
                </CRow> 
                <CRow className='mt-3'>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="exampleFormControlInput1">Phone Number</CFormLabel>
                    <CFormInput type="number" name="filter_phonenumber" id="filter_phonenumber" placeholder='Enter Phone Number . . .'/>
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="exampleFormControlInput1">Religion</CFormLabel>
                    <CFormSelect name="filter_religion" id="filter_religion" className="mb-3" aria-label="Large select example">
                      <option value="">Choose Religion</option>
                      <option value="Islam">Islam</option>
                      <option value="Kristen">Kristen</option>
                      <option value="Katolik">Katolik</option>
                      <option value="Buddha">Buddha</option>
                      <option value="Hindu">Hindu</option>
                    </CFormSelect>
                  </CCol>
                </CRow> 
                <CRow className='mt-3'>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="exampleFormControlInput1">Grade</CFormLabel>
                    <CFormSelect name="filter_grade" id="filter_grade" className="mb-3" aria-label="Large select example">
                      <option value="">Choose Grade</option>
                      { grades.map(grade =>
                        <option key={ grade.id } value={ grade.id } >{ grade.attributes.grade_name }</option>
                      )}
                    </CFormSelect>
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="exampleFormControlInput1">Level</CFormLabel>
                    <CFormSelect name="filter_level" id="filter_level" className="mb-3" aria-label="Large select example">
                      <option value="">Choose Level</option>
                      { levels.map(level =>
                        <option key={ level.id } value={ level.id } >{ level.attributes.functional_name } - { level.attributes.structural_name }</option>
                      )}
                    </CFormSelect>
                  </CCol>
                </CRow>
                <CRow className='mt-3'>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="exampleFormControlInput1">Subfied</CFormLabel>
                    <CFormSelect name="filter_subfield" id="filter_subfield" className="mb-3" aria-label="Large select example">
                      <option value="">Choose Subfield</option>
                      { subfields.map(subfield =>
                        <option key={ subfield.id } value={ subfield.id } >{ subfield.attributes.subfield_name }</option>
                      )}
                    </CFormSelect>
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="exampleFormControlInput1">Role</CFormLabel>
                    <CFormSelect name="filter_role" id="filter_role" className="mb-3" aria-label="Large select example">
                      <option value="">Choose Role</option>
                      <option value="">Choose Role</option>
                      <option value="">Choose Role</option>
                      <option value="">Choose Role</option>
                      <option value="">Choose Role</option>
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
            <strong>Data Administrasi</strong>
          </CCardHeader>
          <CCardBody style={{ overflowX: "auto"}}>
            <CRow>
              <CCol>
                <Link to={'/employee/tambah'}>
                  <CButton
                    color='primary'
                    style={{width:'20%', borderRadius: "50px", fontSize: "14px"}} >
                    <CIcon icon={cilPlus} style={{ marginRight: "10px", color: "#FFFFFF" }}/>
                      Tambah Administrasi
                  </CButton>
                </Link>
              </CCol>
            </CRow>
            <CRow className='pl-2 mr-5'>
              <CTable striped className='mt-3 text-center'>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Photo</CTableHeaderCell>
                    <CTableHeaderCell scope="col">NIP</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Gender</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Religion</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Place and Date Birth</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Phone Number</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Grade</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Level</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Subfield</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  { employees.map((employee, index) =>
                    <CTableRow key={employee.id}>
                      <CTableHeaderCell scope="row">{ index+1 }</CTableHeaderCell>
                      <CTableDataCell>
                        {
                          <img className='foto_karyawan' src={url + employee?.attributes?.Photo?.data?.attributes?.formats?.thumbnail?.url} alt="Photo" />
                        }
                      </CTableDataCell>
                      <CTableDataCell>{employee.attributes.NIP}</CTableDataCell>
                      <CTableDataCell>{employee.attributes.Name}</CTableDataCell>
                      <CTableDataCell>{employee.attributes.Gender}</CTableDataCell>
                      <CTableDataCell>{employee.attributes.Religion}</CTableDataCell>
                      <CTableDataCell>{employee.attributes.BirthPlace}, {employee.attributes.BirthDate}</CTableDataCell>
                      <CTableDataCell>{employee.attributes.Email}</CTableDataCell>
                      <CTableDataCell>{employee.attributes.PhoneNumber}</CTableDataCell>
                      <CTableDataCell>{employee?.attributes?.grades?.data[0]?.attributes?.grade_name}</CTableDataCell>
                      <CTableDataCell>{employee?.attributes?.levels?.data[0]?.attributes?.functional_name} - {employee?.attributes?.levels?.data[0]?.attributes?.structural_name} </CTableDataCell>
                      <CTableDataCell>{employee?.attributes?.sub_fields?.data[0]?.attributes?.subfield_name}</CTableDataCell>
                      <CTableDataCell>
                        <CFormSelect name='role' id='role' className="mb-3" aria-label="Large select example"
                          onChange={(e) => this.setState({ 
                            id: employee.id,
                            role: e.target.value, 
                            nip_value: employee.attributes.NIP,
                            password: employee.attributes.NIP,
                          }, () => {
                            if(this.state.role == 999){
                              AdministrasiUserAPI.find(this.state.nip_value).then(
                                (res) => {
                                  if(res.data.length != 0){
                                    AdministrasiUserAPI.delete(employee.attributes.account.data.id).then(
                                      (res) => {
                                        this.getData()
                                    })
                                    this.getData()
                                  }
                                }
                              )
                            } else {
                              AdministrasiUserAPI.find(this.state.nip_value).then(
                              (res) => {
                                const body = {
                                  data: {
                                    employee: this.state.id,
                                    password: this.state.password,
                                    role: this.state.role
                                  }
                                }
                                if(res.data.length != 0){
                                  AdministrasiUserAPI.edit(employee.attributes.account.data.id, body).then(
                                    (res) => {
                                      this.getData()
                                  })
                                  this.getData()
                                } else {
                                  AdministrasiUserAPI.add(body).then(
                                    (res) => {
                                    this.getData()
                                  })
                                }
                              }
                            )                                
                          }
                        })}>
                          <option value="999">Pilih Penggunaan</option>
                          {/* <option selected={employee.attributes.account.data != null && employee.attributes.account.data.attributes.role == 1} value="1">Administrator</option>
                          <option selected={employee.attributes.account.data != null && employee.attributes.account.data.attributes.role == 2} value="2">HR Manager</option>
                          <option selected={employee.attributes.account.data != null && employee.attributes.account.data.attributes.role == 3} value="3">HR Specialist</option>
                          <option selected={employee.attributes.account.data != null && employee.attributes.account.data.attributes.role == 4} value="4">Penguji</option> */}
                        </CFormSelect>
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </CRow>
            <CModal backdrop="static" visible={chosenEmployee.visible} onClose={() => setChosenEmployee({ visible: false })}>
              <CModalHeader>
                <CModalTitle>Are You Sure?</CModalTitle>
              </CModalHeader>
              <CModalBody>
                This will remove {chosenEmployee.name} as employee permanently
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setChosenEmployee({ visible: false })}>
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

export default Administrasi