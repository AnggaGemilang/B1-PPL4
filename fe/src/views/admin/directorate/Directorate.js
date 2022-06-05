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
import DirectorateAPI from '../../../config/admin/DirectorateAPI'

export class Directorate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      directorates: [],
      urutan : 1,
      id: 0,
      directorate_name: '',
      visible: false,
      filter_query: '',      
    }
    this.handlechange = this.handlechange.bind(this);
  }
  
  handlechange = (event) => {
    event.preventDefault()
    this.setState({ filter_query: event.target.value, urutan: 1 }, () => {
      DirectorateAPI.find(this.state.filter_query).then(
        (res) => {
          if(res.data.length != 0){
            this.setState({
              directorates: res.data,
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
    DirectorateAPI.get().then((res) => {
      console.log(res.data)
      this.setState({
        directorates: res.data,
        urutan: 1        
      })
    })
  }

  deleteData(){
    DirectorateAPI.delete(this.state.id).then((res) => {
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
              <strong>Data Direktorat</strong>
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
                  <Link to={'/directorate/tambah'}>
                    <CButton
                      color='primary'
                      style={{width:'100%'}}
                      variant="outline" >
                        Tambah Direktorat
                    </CButton>
                  </Link>
                </CCol>
              </CRow>
                <CTable striped className='mt-3 text-center'>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">No</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    { this.state.directorates.map(directorate =>
                      <CTableRow key={directorate.id}>
                        <CTableHeaderCell scope="row">{ this.state.urutan++ }</CTableHeaderCell>
                        <CTableDataCell>{directorate.attributes.directorate_name}</CTableDataCell>
                        <CTableDataCell>
                          <CButton color={'warning'} variant="outline">Edit</CButton>
                          <CButton 
                            color={'danger'} 
                            variant="outline" 
                            style={{marginLeft: '10px'}}
                            onClick={() => this.setState({ 
                              visible: true, 
                              id: directorate.id, 
                              directorate_name: directorate.attributes.directorate_name, 
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
                  This will remove {this.state.directorate_name} as registrant permanently
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

export default Directorate
