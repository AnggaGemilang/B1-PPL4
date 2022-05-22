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
import { Link } from 'react-router-dom'
import SubFieldAPI from '../../../config/admin/SubFieldAPI'

export class Subfield extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subfields: [],
      urutan : 1,
    }
  }
  
  componentDidMount(){
    this.getData()
  }

  getData(){
    SubFieldAPI.get().then((res) => {
      console.log(res.data)
      this.setState({
        subfields: res.data
      })
    })
  }
  deleteData(id){
    SubFieldAPI.delete(id).then((res) => {
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
              <strong>Data Sub Bidang</strong>
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
                  <Link to={'/admin/subfield/tambah'}>
                    <CButton
                      color='primary'
                      style={{width:'100%'}}
                      variant="outline" >
                        Tambah Sub Bidang
                    </CButton>
                  </Link>
                </CCol>
              </CRow>
                <CTable striped className='mt-3'>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">No</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Bidang</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    { this.state.subfields.map(team =>
                      <CTableRow key={team.id}>
                        <CTableHeaderCell scope="row">{ this.state.urutan ++ }</CTableHeaderCell>
                        <CTableDataCell>{team.attributes.subfield_name}</CTableDataCell>
                        <CTableDataCell>{team.attributes.field.data.attributes.field_name}</CTableDataCell>
                        <CTableDataCell>
                          <CButton color={'warning'} variant="outline">
                            Edit
                          </CButton>
                          <CButton color={'danger'} variant="outline" style={{marginLeft: '10px'}}>
                            Delete
                          </CButton>
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

export default Subfield
