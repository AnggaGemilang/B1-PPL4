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
import { Link } from 'react-router-dom'
import SubFieldAPI from '../../../config/admin/SubFieldAPI'

export class Subfield extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subfields: [],
      urutan : 1,
      filter_query: '',
      visible: false,  
      id: 0,
      subfield_name: '' 
    }
    this.handlechange = this.handlechange.bind(this);
  }
  
  handlechange = (event) => {
    event.preventDefault()
    this.setState({ filter_query: event.target.value, urutan: 1 }, () => {
      SubFieldAPI.find(this.state.filter_query).then(
        (res) => {
          if(res.data.length != 0){
            this.setState({
              subfields: res.data,
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
    SubFieldAPI.get().then((res) => {
      console.log(res.data)
      this.setState({
        subfields: res.data,
        urutan: 1,
      })
    })
  }

  deleteData(){
    SubFieldAPI.delete(this.state.id).then((res) => {
      this.setState({visible:false})
      this.getData()
    })
  }

  render(){

    if(localStorage.getItem("auth") == null){
      window.location = "/#/login";
    }

    return (
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Data Sub Bidang</strong>
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
                  <Link to={'/subfield/tambah'}>
                    <CButton
                      color='primary'
                      style={{width:'100%'}}
                      variant="outline" >
                        Tambah Sub Bidang
                    </CButton>
                  </Link>
                </CCol>
              </CRow>
                <CTable striped className='mt-3 text-center'>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">No</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Bidang</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    { this.state.subfields.map(subfield =>
                      <CTableRow key={subfield.id}>
                        <CTableHeaderCell scope="row">{ this.state.urutan ++ }</CTableHeaderCell>
                        <CTableDataCell>{subfield.attributes.subfield_name}</CTableDataCell>
                        <CTableDataCell>{subfield.attributes.field.data.attributes.field_name}</CTableDataCell>
                        <CTableDataCell>
                          <Link 
                            to={{
                              pathname: `/subfield/edit/${subfield.id}`,
                            }}>
                            <CButton color={'warning'} variant="outline">Edit</CButton>
                          </Link>
                          <CButton 
                            color={'danger'}
                            variant="outline"
                            style={{marginLeft: '10px'}}
                            onClick={() => this.setState({ 
                              visible: true, 
                              id: subfield.id, 
                              subfield_name: subfield.attributes.subfield_name, 
                              urutan: 1 
                            })}>Delete</CButton>
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
                  This will remove {this.state.subfield_name} as registrant permanently
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

export default Subfield
