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
import DataPengujiAPI from '../../../config/user/DataPengujiAPI'
import { Link } from 'react-router-dom'

export class DataPenguji extends Component {
  constructor(props) {
    super(props)
    this.state = {
      examiners: [],
      urutan : 1,
      filter_query: '',
      visible: false,
      id: 0,
      employee_name : ""
    }
    this.handlechange = this.handlechange.bind(this);
  }
  
  handlechange = (event) => {
    event.preventDefault()
    this.setState({ filter_query: event.target.value, urutan: 1 }, () => {
      DataPengujiAPI.findExaminers(this.state.filter_query).then(
        (res) => {
          if(res.data.length != 0){
            this.setState({
              examiners: res.data,
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
    DataPengujiAPI.get().then((res) => {
      console.log(res.data)
      this.setState({
        examiners: res.data,
        urutan: 1
      })
    }, () => {
      console.log(this.state.examiners)
    })
  }
  
  deleteData(){
    DataPengujiAPI.delete(this.state.id).then((res) => {
      this.setState({visible:false})
      this.getData()
    })
  }

  render(){

    if(localStorage.getItem("auth") == null){
      window.location = "/#/login";
    }

    return (
      <CRow className='position-relative'>                      
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Data Penguji</strong>
            </CCardHeader>
            <CCardBody className='mt-3'>
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
                  <Link to={'/tambahpenguji'}>
                    <CButton
                      color='primary'
                      style={{width:'100%'}}
                      variant="outline" >
                        Tambah Penguji
                    </CButton>
                  </Link>
                </CCol>
              </CRow>
                <CTable striped className='mt-3 text-center'>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">No</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Foto</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                      <CTableHeaderCell scope="col">NIP</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    { this.state.examiners.map(examiner =>
                      <CTableRow key={examiner.id}>
                        <CTableHeaderCell scope="row">{ this.state.urutan ++ }</CTableHeaderCell>
                        <CTableDataCell>
                          <img className='foto_karyawan' src={url + examiner.attributes.employee.data.attributes.Photo.data.attributes.formats.thumbnail.url} alt="Photo" />
                        </CTableDataCell>
                        <CTableDataCell>{examiner.attributes.employee.data.attributes.Name}</CTableDataCell>
                        <CTableDataCell>{examiner.attributes.employee.data.attributes.NIP}</CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            color='danger'
                            variant="outline" 
                            onClick={() => this.setState({ 
                              visible: true, 
                              id: examiner.id, 
                              employee_name: examiner.attributes.employee.data.attributes.Name, 
                              urutan: 1 
                            })}
                            style={{marginLeft: '10px'}} >
                              Hapus
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
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

export default DataPenguji
