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
} from '@coreui/react'
import DataPesertaAPI from '../../../config/user/DataPesertaAPI'
import { Link } from 'react-router-dom'

export class DataPeserta extends Component {
  constructor(props) {
    super(props)
    this.state = {
      registrants: [],
      urutan : 1,
    }
  }
  
  componentDidMount(){
    this.getData()
  }

  getData(){
    DataPesertaAPI.get().then((res) => {
      console.log(res.data)
      this.setState({
        registrants: res.data
      })
    }, () => {
      console.log(this.state.registrants)
    })
  }

  deleteData(id){
    DataPesertaAPI.delete(id).then((res) => {
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
              <strong>Data Peserta</strong>
            </CCardHeader>
            <CCardBody className='mt-3'>
              <CRow>
                <CCol xs={9}>
                  <CForm>
                      <CFormInput
                        type="text"
                        id="exampleFormControlInput1"
                        placeholder="Masukkan Kata Kunci Pencarian . . ."
                      />
                  </CForm>
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
                <CTable striped className='mt-3'>
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
                          <img src={"https://e624-140-0-220-95.ap.ngrok.io" + registrant.attributes.employee.data.attributes.Photo.data.attributes.formats.thumbnail.url} alt="Photo" />
                        </CTableDataCell>
                        <CTableDataCell>{registrant.attributes.employee.data.attributes.Name}</CTableDataCell>
                        <CTableDataCell>{registrant.attributes.employee.data.attributes.NIP}</CTableDataCell>
                        <CTableDataCell>
                          <Link to={'/tambahpeserta'}>
                            <CButton
                              color='danger'
                              variant="outline" 
                              style={{marginLeft: '10px'}} >
                                Hapus
                            </CButton>
                          </Link>
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

export default DataPeserta
