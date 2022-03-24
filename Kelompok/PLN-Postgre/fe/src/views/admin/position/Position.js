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
} from '@coreui/react'
import PositionAPI from '../../../config/admin/PositionAPI'
import { DocsCallout, DocsExample } from 'src/components'

export class Position extends Component {
  constructor(props) {
    super(props)
    this.state = {
      positions: [],
      urutan : 1,
    }
  }
  
  componentDidMount(){
    this.getData()
  }

  getData(){
    PositionAPI.get().then((res) => {
      console.log(res.data)
      this.setState({
        positions: res.data
      })
    })
  }
  deleteData(id){
    PositionAPI.delete(id).then((res) => {
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
          <DocsCallout name="Table" href="components/table" />
        </CCol>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>React Table</strong> <small>Striped rows</small>
            </CCardHeader>
            <CCardBody>
              <p className="text-medium-emphasis small">
                Use <code>striped</code> property to add zebra-striping to any table row within the{' '}
                <code>&lt;CTableBody&gt;</code>.
              </p>
              <DocsExample href="components/table#striped-rows">
                <CTable striped>
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
                    { this.state.positions.map(team =>
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
                    )}
                  </CTableBody>
                </CTable>
              </DocsExample>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    )
  }
}

export default Position
