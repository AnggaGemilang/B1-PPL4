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
import DataPengujiAPI from '../../../config/user/DataPengujiAPI'
import { Link } from 'react-router-dom'

export class DataPenguji extends Component {
  constructor(props) {
    super(props)
    this.state = {
      examiners: [],
      urutan : 1,
      data: {
        filter_query: '',        
      }
    }
    this.handlechange = this.handlechange.bind(this);
  }
  
  handlechange = (event) => {
    const newData = { ...this.state.data, filter_query: event.target.value };
    this.setState({ newData });
    
    console.log(newData)

    // DataPengujiAPI.findEmployeeName(newData.filter_query).then(
    //   (res) => {
    //     if(res.data.length != 0){
    //       this.setState({
    //         examiners: res.data
    //       });
    //     } else {
    //       this.setState({
    //         examiners: {}
    //       });          
    //     }
    //   },
    //   (err) => {
    //     console.log("err", err)
    //   }
    // );
  };

  componentDidMount(){
    this.getData()
  }

  getData(){
    DataPengujiAPI.get().then((res) => {
      console.log(res.data)
      this.setState({
        examiners: res.data
      })
    })
  }
  
  deleteData(id){
    DataPengujiAPI.delete(id).then((res) => {
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
              <strong>Data Penguji</strong>
            </CCardHeader>
            <CCardBody className='mt-3'>
              <CRow>
                <CCol xs={9}>
                  <CForm>
                      <CFormInput
                        type="text"
                        name='filter_query'
                        id="filter_query"
                        placeholder="Masukkan Kata Kunci Pencarian . . ."
                        onChange={this.handlechange}
                      />
                  </CForm>
                </CCol>
                <CCol>
                  <Link to={'/tambahpenguji'}>
                    <CButton
                      color='primary'
                      style={{width:'100%'}}
                      variant="outline" >
                        Tambah Penguji
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
                    { this.state.examiners.map(examiner =>
                      <CTableRow key={examiner.id}>
                        <CTableHeaderCell scope="row">{ this.state.urutan ++ }</CTableHeaderCell>
                        <CTableDataCell>
                          <img src={"https://d77a-123-253-233-233.ap.ngrok.io" + examiner.attributes.employee.data.attributes.Photo.data.attributes.formats.thumbnail.url} alt="Photo" />
                        </CTableDataCell>
                        <CTableDataCell>{examiner.attributes.employee.data.attributes.Name}</CTableDataCell>
                        <CTableDataCell>{examiner.attributes.employee.data.attributes.NIP}</CTableDataCell>
                        <CTableDataCell>
                          <Link to={'/tambahpeserta'}>
                            <CButton color='danger' variant="outline">
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

export default DataPenguji
