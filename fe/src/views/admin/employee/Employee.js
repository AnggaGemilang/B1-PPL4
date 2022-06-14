import React, { Component } from 'react'
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
} from '@coreui/react'
import url from "../../../config/setting"
import { Link } from 'react-router-dom'
import EmployeeAPI from '../../../config/admin/EmployeeAPI'

export class Employee extends Component {
  constructor(props) {
    super(props)
    this.state = {
      employees: [],
      urutan : 1,
      filter_query: '',     
      id: 0,
      employee_name: '', 
    }
    this.handlechange = this.handlechange.bind(this);
  }
  
  handlechange = (event) => {
    event.preventDefault()
    this.setState({ filter_query: event.target.value, urutan: 1 }, () => {
      EmployeeAPI.find(this.state.filter_query).then(
        (res) => {
          if(res.data.length != 0){
            this.setState({
              employees: res.data,
              urutan: 1
            });
          }
        }
      )
    });
  };

  componentDidMount(){
    this.getData()
  }

  getData(){
    EmployeeAPI.get().then((res) => {
      console.log(res.data)
      this.setState({
        employees: res.data,
        urutan: 1
      })
    })
  }

  deleteData(){
    EmployeeAPI.delete(this.state.id).then((res) => {
      this.setState({visible:false})
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
            <CCardBody className='mt-3 w-100' style={{ overflowX: "auto"}}>
              <CRow>
                <CCol xs={9}>
                  <CFormInput
                    type="text"
                    name='filter_query'
                    id="filter_query"
                    placeholder="Masukkan Kata Kunci Pencarian . . ."
                    onChange={this.handlechange}
                  />
                </CCol>
                <CCol>
                  <Link to={'/employee/tambah'}>
                    <CButton
                      color='primary'
                      style={{width:'100%'}}
                      variant="outline" >
                        Tambah Karyawan
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
                          <Link 
                            to={{
                              pathname: `/employee/edit/${employee.id}`,
                            }}>
                            <CButton color={'warning'} variant="outline">Edit</CButton>
                          </Link>
                          <CButton 
                            color={'danger'} 
                            variant="outline" 
                            style={{marginLeft: '10px'}}
                            onClick={() => this.setState({ 
                              visible: true, 
                              id: employee.id, 
                              employee_name: employee.attributes.Name, 
                              urutan: 1 
                            })}>Delete</CButton>
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
              </CRow>
              <CModal backdrop="static" visible={this.state.visible} onClose={() => this.setState({ visible: false, urutan: 1 })}>
                <CModalHeader>
                  <CModalTitle>Are You Sure?</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  This will remove {this.state.employee_name} as registrant permanently
                </CModalBody>
                <CModalFooter>
                  <CButton color="secondary" onClick={() => this.setState({ visible: false, urutan: 1 })}>
                    Close
                  </CButton>
                  <CButton color="danger" onClick={() => this.deleteData()}>Delete</CButton>
                </CModalFooter>
              </CModal> 
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    )
  }
}

export default Employee