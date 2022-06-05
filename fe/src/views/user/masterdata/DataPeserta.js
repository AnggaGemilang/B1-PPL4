import React, { Component, useState } from 'react'
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
import DataPesertaAPI from '../../../config/user/DataPesertaAPI'
import { Link } from 'react-router-dom'

export class DataPeserta extends Component {
  constructor(props) {
    super(props)
    this.state = {
      registrants: [],
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
      DataPesertaAPI.findRegistrants(this.state.filter_query).then(
        (res) => {
          if(res.data.length != 0){
            this.setState({
              registrants: res.data,
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
    DataPesertaAPI.get().then((res) => {
      console.log(res.data)
      this.setState({
        registrants: res.data,
        urutan: 1
      })
    }, () => {
      console.log(this.state.registrants)
    })
  }

  deleteData(){
    DataPesertaAPI.delete(this.state.id).then((res) => {
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
              <strong>Data Peserta</strong>
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
                  <Link to={'/tambahpeserta'}>
                    <CButton
                      color='primary'
                      style={{width:'100%'}}
                      variant="outline" >
                        Tambah Peserta
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
                    { this.state.registrants.map(registrant =>
                      <CTableRow key={registrant.id}>
                        <CTableHeaderCell scope="row">{ this.state.urutan++ }</CTableHeaderCell>
                        <CTableDataCell>
                          <img className='foto_karyawan' src={url + registrant.attributes.employee.data.attributes.Photo.data.attributes.formats.thumbnail.url} alt="Photo" />
                        </CTableDataCell>
                        <CTableDataCell>{registrant.attributes.employee.data.attributes.Name}</CTableDataCell>
                        <CTableDataCell>{registrant.attributes.employee.data.attributes.NIP}</CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            color='danger'
                            variant="outline" 
                            onClick={() => this.setState({ 
                              visible: true, 
                              id: registrant.id, 
                              employee_name: registrant.attributes.employee.data.attributes.Name, 
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

export default DataPeserta
