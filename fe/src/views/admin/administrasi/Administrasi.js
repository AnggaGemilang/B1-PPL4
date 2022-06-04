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
import AdministrasiUserAPI from '../../../config/admin/AdministrasiUserAPI'

export class Employee extends Component {
  constructor(props) {
    super(props)
    this.state = {
      employees: [],
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
        employees: res.data
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
            <CCardBody className='mt-3'>
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
                      <CTableHeaderCell scope="col">NIP</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Gender</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Religion</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Place and Date Birth</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Phone Number</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Photo</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    { this.state.employees.map(employee =>
                      <CTableRow key={employee.id}>
                        <CTableHeaderCell scope="row">{ this.state.urutan ++ }</CTableHeaderCell>
                        <CTableDataCell>{employee.attributes.NIP}</CTableDataCell>
                        <CTableDataCell>{employee.attributes.Name}</CTableDataCell>
                        <CTableDataCell>{employee.attributes.Gender}</CTableDataCell>
                        <CTableDataCell>{employee.attributes.Religion}</CTableDataCell>
                        <CTableDataCell>{employee.attributes.BirthPlace}, {employee.attributes.BirthDate}</CTableDataCell>
                        <CTableDataCell>{employee.attributes.Email}</CTableDataCell>
                        <CTableDataCell>{employee.attributes.PhoneNumber}</CTableDataCell>
                        <CTableDataCell>
                          {
                            employee.attributes.Photo.data != null ?
                              <img src={"https://e624-140-0-220-95.ap.ngrok.io" + employee.attributes.Photo.data.attributes.formats.thumbnail.url} alt="Photo" />  :
                              <h3>-</h3>
                          }
                        </CTableDataCell>
                        <CTableDataCell>
                          <CFormSelect size="md" className="mb-3" aria-label="Large select example">
                            <option>Pilih Penggunaan</option>
                            <option value="1">Am</option>
                            <option value="2">Md</option>
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

export default Employee