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
import DivisionAPI from '../../../config/admin/DivisionAPI'

export class Directorate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      teams: [],
      urutan : 1,
    }
  }
  
  componentDidMount(){
    this.getData()
  }

  getData(){
    DivisionAPI.get().then((res) => {
      console.log(res.data)
      this.setState({
        directorates: res.data
      })
    })
  }
  deleteData(id){
    DivisionAPI.delete(id).then((res) => {
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
              <strong>Data Divisi</strong>
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
                  <CButton
                    color='primary'
                    style={{width:'100%'}}
                    variant="outline" >
                      Tambah Divisi
                  </CButton>
                </CCol>
              </CRow>
                <CTable striped className='mt-3'>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">No</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Fields</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Directorate</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {  this.state.teams.map(team =>
                      <CTableRow key={team.id}>
                        <CTableHeaderCell scope="row">{this.state.urutan ++}</CTableHeaderCell>
                        <CTableDataCell>{team.attributes.division_name}</CTableDataCell>
                        <CTableDataCell>{team.attributes.fields.data.attributes.field_name}</CTableDataCell>
                        <CTableDataCell>{team.attributes.fields.data.attributes.directorate.data.attributes.directorate_name}</CTableDataCell>
                        <CTableDataCell>
                          <CButton color={'warning'} variant="outline">
                          Edit</CButton>
                          <CButton color={'danger'} variant="outline">
                          Delete</CButton>
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

export default Directorate
