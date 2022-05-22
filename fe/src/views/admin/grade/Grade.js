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
import GradeAPI from '../../../config/admin/GradeAPI'

export class Grade extends Component {
  constructor(props) {
    super(props)
    this.state = {
      grades: [],
      urutan : 1,
    }
  }
  
  componentDidMount(){
    this.getData()
  }

  getData(){
    GradeAPI.get().then((res) => {
      console.log(res.data)
      this.setState({
        grades: res.data
      })
    })
  }
  deleteData(id){
    GradeAPI.delete(id).then((res) => {
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
              <strong>Data Grade</strong>
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
                  <Link to={'/admin/grade/tambah'}>
                    <CButton
                      color='primary'
                      style={{width:'100%'}}
                      variant="outline" >
                        Tambah Grade
                    </CButton>
                  </Link>
                </CCol>
              </CRow>
                <CTable striped className='mt-3'>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">No</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    { this.state.grades.map(grade =>
                      <CTableRow key={grade.id}>
                        <CTableHeaderCell scope="row">{ this.state.urutan ++ }</CTableHeaderCell>
                        <CTableDataCell>{grade.attributes.grade_name}</CTableDataCell>
                        <CTableDataCell>
                          <CButton color={'warning'} variant="outline">Edit</CButton>
                          <CButton color={'danger'} variant="outline">Delete</CButton>
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

export default Grade
