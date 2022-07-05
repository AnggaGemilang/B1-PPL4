import React, { useState, useEffect } from 'react'
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
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem, 
  CFormLabel,
  CAlert,
  CForm
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useLocation, useNavigate } from "react-router-dom"
import { cilSearch, cilPlus } from '@coreui/icons'
import UnitAPI from '../../../config/admin/UnitAPI'

const Unit = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [units, setUnits] = useState([])
  const [message, setMessage] = useState("")
  const [chosenUnit, setChosenUnit] = useState({
    visible: false,
    name: "",
    id: 0,
  })

  useEffect(() => {
    setMessage(location?.state?.successMessage)
    getData()
  }, [])    

  const filterSearch = (e) => {
    e.preventDefault()

    let query = ""
    if(document.getElementById("filter_nama").value.length != 0){
      query += `&filters[unit_name][$contains]=${document.getElementById("filter_nama").value}`
    }
    if(document.getElementById("filter_address").value.length != 0){
      query += `&filters[address][$contains]=${document.getElementById("filter_address").value}`
    }

    UnitAPI.find(query).then(
      (res) => {
        if(res.data.length != 0){
          setUnits(res.data.data)
        } else {
          setUnits([])
        }
      }
    )
  }

  const getData = () => {
    UnitAPI.get().then((res) => {
      setUnits(res.data.data)
    })
  }

  const deleteData = () => {
    UnitAPI.delete(chosenUnit.id).then((res) => {
      setChosenUnit({ ...chosenUnit, visible: false })
      setMessage("Unit Telah Berhasil Dihapus!")        
      getData()
    })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCol xs={12}>
          <CAccordion>
            <CAccordionItem itemKey={1}>
              <CAccordionHeader><CIcon icon={cilSearch} style={{ marginRight: "10px" }}/>Pencarian Data</CAccordionHeader>
              <CAccordionBody>
                <CForm onSubmit={filterSearch}>
                  <CRow className='mt-2'>
                    <CCol xs={6}>
                      <CFormLabel htmlFor="filter_nama">Nama Unit</CFormLabel>
                      <CFormInput
                        type="text"
                        name='filter_nama'
                        id="filter_nama"
                        placeholder="Masukkan Nama Unit . . ."
                      />
                    </CCol>
                    <CCol xs={6}>
                      <CFormLabel htmlFor="filter_address">Alamat Unit</CFormLabel>
                      <CFormInput
                        type="text"
                        name='filter_address'
                        id="filter_address"
                        placeholder="Masukkan Alamat Unit . . ."
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <hr className='mt-4' style={{ marginLeft: "12px", width: "97.6%" }} />
                  </CRow>
                  <CRow>
                    <CCol style={{ display: "flex", justifyContent: "right" }}>
                      <CButton
                        type='submit'
                        color='primary'
                        style={{ width:'10%', borderRadius: "50px", fontSize: "14px" }} >
                          <CIcon icon={cilSearch} style={{ marginRight: "10px", color: "#FFFFFF" }}/>
                          Cari
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
        </CCol>
        <CCol xs={12} className="mt-3">
          { message && <CAlert color="success" dismissible onClose={() => { setMessage("") }}> { message } </CAlert> }
        </CCol> 
        <CCard className="mb-4 mt-3">
          <CCardHeader>
            <strong>Data Unit</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol>
                <CButton
                  color='primary'
                  style={{width:'18%', borderRadius: "50px", fontSize: "14px"}}
                  onClick={() => navigate('/unit/tambah', {state: { status: 'tambah' } }) } >
                  <CIcon icon={cilPlus} style={{ marginRight: "10px", color: "#FFFFFF" }} />
                  Tambah Unit
                </CButton>
              </CCol>
            </CRow>
            <CRow className='pl-2 mr-5'>
              <CTable striped className='mt-3 text-center'>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nama Unit</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Alamat</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  { units.map( (unit, index) =>
                    <CTableRow key={unit.id}>
                      <CTableHeaderCell scope="row">{ index+1 }</CTableHeaderCell>
                      <CTableDataCell>{unit?.attributes?.unit_name}</CTableDataCell>
                      <CTableDataCell>{unit?.attributes?.address}</CTableDataCell>
                      <CTableDataCell>
                        <CButton 
                          color={'warning'} 
                          variant="outline"
                          style={{width: '75px', margin: '5px 5px'}}
                          onClick={() => navigate(
                            '/unit/edit', 
                            {state: { data: unit, status: 'edit' }})}>
                          Edit
                        </CButton>
                        <CButton 
                          color={'danger'} 
                          variant="outline" 
                          style={{margin: '5px 5px'}}
                          onClick={() => setChosenUnit({ 
                            visible: true, 
                            id: unit.id, 
                            name: unit.attributes.unit_name, 
                          })}>Delete</CButton>
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </CRow>
            <CModal backdrop="static" visible={chosenUnit.visible} onClose={() => setChosenUnit({ visible: false })}>
              <CModalHeader>
                <CModalTitle>Apakah Anda Yakin?</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Ini akan menghapus {chosenUnit.name} secara permanen
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setChosenUnit({ visible: false })}>
                  Tutup
                </CButton>
                <CButton color="danger" onClick={() => deleteData()}>Hapus</CButton>
              </CModalFooter>
            </CModal>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Unit