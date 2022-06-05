import React, { Component } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CFormSelect,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CForm,
  CFormInput,
} from '@coreui/react'
import url from "../../../config/setting"
import AdministrasiUserAPI from '../../../config/admin/AdministrasiUserAPI'

export class Administrasi extends Component {
  constructor(props) {
    super(props)
    this.state = {
      employees: [],
      role: "",
      id: 0,
      nip_value: "",
      password: "",
      urutan : 1,
    }
  }
  
  componentDidMount(){
    this.getData()
  }

  getData(){
    AdministrasiUserAPI.get().then((res) => {
      console.log(res.data)
      this.setState({
        employees: res.data,
        urutan: 1,        
      })
    })
  }

  deleteData(id){
    AdministrasiUserAPI.delete(id).then((res) => {
      this.setState({
        Response: res.data.id
      })
    }, () => {
      this.getData()
    })
  }

  render(){
    return (
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Data Karyawan</strong>
            </CCardHeader>
            <CCardBody className='mt-3' style={{overflowX: "scroll"}}>
              <CRow>
                <CCol xs={12}>
                  <CForm>
                      <CFormInput
                        type="text"
                        id="exampleFormControlInput1"
                        placeholder="Masukkan Kata Kunci Pencarian . . ."
                      />
                  </CForm>
                </CCol>
              </CRow>
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
                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    { this.state.employees.map(employee =>
                      <CTableRow key={employee.id}>
                        <CTableHeaderCell scope="row">{ this.state.urutan ++ }</CTableHeaderCell>
                        <CTableDataCell>
                          {
                            employee.attributes.Photo.data != null ?
                              <img className='foto_karyawan' src={url + employee.attributes.Photo.data.attributes.formats.thumbnail.url} alt="Photo" />  :
                              <h3>-</h3>
                          }
                        </CTableDataCell>
                        <CTableDataCell>{employee.attributes.NIP}</CTableDataCell>
                        <CTableDataCell>{employee.attributes.Name}</CTableDataCell>
                        <CTableDataCell>{employee.attributes.Gender}</CTableDataCell>
                        <CTableDataCell>{employee.attributes.Religion}</CTableDataCell>
                        <CTableDataCell>{employee.attributes.BirthPlace}, {employee.attributes.BirthDate}</CTableDataCell>
                        <CTableDataCell>{employee.attributes.Email}</CTableDataCell>
                        <CTableDataCell>{employee.attributes.PhoneNumber}</CTableDataCell>
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
                            <option selected={employee.attributes.account.data != null && employee.attributes.account.data.attributes.role == 1} value="1">Administrator</option>
                            <option selected={employee.attributes.account.data != null && employee.attributes.account.data.attributes.role == 2} value="2">HR Manager</option>
                            <option selected={employee.attributes.account.data != null && employee.attributes.account.data.attributes.role == 3} value="3">HR Specialist</option>
                            <option selected={employee.attributes.account.data != null && employee.attributes.account.data.attributes.role == 4} value="4">Penguji</option>
                          </CFormSelect>
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    )
  }
}

export default Administrasi