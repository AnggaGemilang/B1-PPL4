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
  CForm,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import CriteriaAPI from '../../../config/admin/CriteriaAPI'

export class Criteria extends Component {
  constructor(props) {
    super(props)
    this.state = {
      criterias: [],
      urutan : 1,
      id: 0,
      filter_query: '',      
      criteria_name: '',
      visible: false
    }
    this.handlechange = this.handlechange.bind(this);
  }
  
  handlechange = (event) => {
    event.preventDefault()
    this.setState({ filter_query: event.target.value, urutan: 1 }, () => {
      CriteriaAPI.find(this.state.filter_query).then(
        (res) => {
          if(res.data.length != 0){
            this.setState({
              criterias: res.data,
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
    CriteriaAPI.get().then((res) => {
      console.log(res.data)
      this.setState({
        criterias: res.data,
        urutan: 1
      })
    })
  }

  deleteData(){
    CriteriaAPI.delete(this.state.id).then((res) => {
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
              <strong>Data Criteria</strong>
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
                  <Link to={'/criteria/tambah'}>
                    <CButton
                      color='primary'
                      style={{width:'100%'}}
                      variant="outline" >
                        Tambah Kriteria
                    </CButton>
                  </Link>
                </CCol>
              </CRow>
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
                    { this.state.criterias.map(criteria =>
                      <CTableRow key={criteria.id}>
                        <CTableHeaderCell scope="row">{ this.state.urutan ++ }</CTableHeaderCell>
                        <CTableDataCell>{criteria.attributes.criteria}</CTableDataCell>
                        <CTableDataCell>{criteria.attributes.value}</CTableDataCell>
                        <CTableDataCell>{criteria.attributes.usefor}</CTableDataCell>
                        <CTableDataCell>
                          <CButton color={'warning'} variant="outline">Edit</CButton>
                          <CButton color={'danger'} 
                            variant="outline" 
                            style={{marginLeft: '10px'}}
                            onClick={() => this.setState({ 
                              visible: true, 
                              id: criteria.id, 
                              criteria_name: criteria.attributes.criteria, 
                              urutan: 1 
                            })}
                            >Delete</CButton>
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
                  This will remove {this.state.criteria_name} as registrant permanently
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

export default Criteria
