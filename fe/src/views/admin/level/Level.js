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
import LevelAPI from '../../../config/admin/LevelAPI'

export class Level extends Component {
  constructor(props) {
    super(props)
    this.state = {
      levels: [],
      urutan : 1,
    }
  }
  
  componentDidMount(){
    this.getData()
  }

  getData(){
    LevelAPI.get().then((res) => {
      console.log(res.data)
      this.setState({
        levels: res.data
      })
    })
  }
  deleteData(id){
    LevelAPI.delete(id).then((res) => {
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
              <strong>Data Jenjang</strong>
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
                  <Link to={'/admin/level/tambah'}>
                    <CButton
                      color='primary'
                      style={{width:'100%'}}
                      variant="outline" >
                        Tambah Jenjang
                    </CButton>
                  </Link>
                </CCol>
              </CRow>
                <CTable striped className='mt-3'>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">No</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Place and Date Birth</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Position</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Photo</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {/* { this.state.levels.map(team =>
                      <CTableRow key={team.id}>
                        <CTableHeaderCell scope="row">{ this.state.urutan ++ }</CTableHeaderCell>
                        <CTableDataCell>{team.attributes.name}</CTableDataCell>
                        <CTableDataCell>{((team.attributes.description).length <= 25) ? team.attributes.description : team.attributes.description.substring(0, 25) + "...."}</CTableDataCell>
                        <CTableDataCell>{team.attributes.placeBirth}, {team.attributes.dateBirth}</CTableDataCell>
                        <CTableDataCell>{team.attributes.position.data.attributes.title}</CTableDataCell>
                        <CTableDataCell>
                          <img src={"http://localhost:1337" + team.attributes.photo.data.attributes.formats.thumbnail.url} alt="user icon" />
                        </CTableDataCell>
                        <CTableDataCell>
                          <CButton color={'warning'} variant="outline">
                          Edit</CButton>
                          <CButton color={'danger'} variant="outline">
                          Delete</CButton>
                        </CTableDataCell>
                      </CTableRow>
                    )} */}
                  </CTableBody>
                </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    )
  }
}

export default Level
