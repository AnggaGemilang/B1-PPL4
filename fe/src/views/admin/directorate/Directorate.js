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
  CForm,
  CFormSelect  
} from '@coreui/react'
import { cilSearch, cilPlus } from '@coreui/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import DirectorateAPI from '../../../config/admin/DirectorateAPI'
import UnitAPI from '../../../config/admin/UnitAPI'

const Directorate = () => {
  const location = useLocation() 
  const navigate = useNavigate() 
  
  const [directorates, setDirectorates] = useState([])
  const [units, setUnits] = useState([])
  const [message, setMessage] = useState("")
  const [chosenDirectorate, setChosenDirectorate] = useState({
    visible: false,
    name: "",
    id: 0,
  })

  useEffect(() => {
    setMessage(location?.state?.successMessage)
    UnitAPI.get().then((res) => {
      setUnits(res.data.data)
    })
    getData()
  }, [])    

  const filterSearch = (e) => {
    e.preventDefault()

    let query = ""
    if(document.getElementById("filter_nama").value.length != 0){
      query += `&filters[directorate_name][$contains]=${document.getElementById("filter_nama").value}`
    }
    if(document.getElementById("filter_unit").value.length != 0){
      query += `&filters[unit][id][$eq]=${document.getElementById("filter_unit").value}`
    }

    DirectorateAPI.find(query).then(
      (res) => {
        if(res.data.data.length != 0){
          setDirectorates(res.data.data)
        } else {
          setDirectorates([])
        }
      }
    )
  }

  const getData = () => {
    DirectorateAPI.get().then((res) => {
      setDirectorates(res.data.data)
    })
  }

  const deleteData = () => {
    DirectorateAPI.delete(chosenDirectorate.id).then((res) => {
      setChosenDirectorate({ ...chosenDirectorate, visible: false })
      setMessage("Direktorat Telah Berhasil Dihapus!")      
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
                      <CFormLabel htmlFor="filter_nama">Nama Direktorat</CFormLabel>
                      <CFormInput
                        type="text"
                        name='filter_nama'
                        id="filter_nama"
                        placeholder="Masukkan Nama Direktorat . . ."
                      />
                    </CCol>
                    <CCol xs={6}>
                      <CFormLabel htmlFor="filter_unit">Unit</CFormLabel>
                      <CFormSelect name="filter_unit" id="filter_unit" className="mb-3" aria-label="Large select example">
                        <option value="">Pilih Unit</option>
                        { units.map(unit =>
                          <option key={ unit.id } value={ unit.id } >{ unit.attributes.unit_name }</option>
                        )}
                      </CFormSelect>
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
            <strong>Data Direktorat</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol>
                <CButton
                  color='primary'
                  style={{width:'18%', borderRadius: "50px", fontSize: "14px"}}
                  onClick={() => navigate('/directorate/tambah', {state: { status: 'tambah' } }) }>
                  <CIcon icon={cilPlus} style={{ marginRight: "10px", color: "#FFFFFF" }} />
                    Tambah Direktorat
                </CButton>
              </CCol>
            </CRow>
            <CRow className='pl-2 mr-5'>
              <CTable striped className='mt-3 text-center'>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nama Direktorat</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nama Unit</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  { directorates.map( (directorate, index) =>
                    <CTableRow key={directorate.id}>
                      <CTableHeaderCell scope="row">{ index+1 }</CTableHeaderCell>
                      <CTableDataCell>{directorate?.attributes?.directorate_name}</CTableDataCell>
                      <CTableDataCell>{directorate?.attributes?.unit?.data?.attributes?.unit_name}</CTableDataCell>
                      <CTableDataCell>
                        <CButton 
                          color={'warning'} 
                          variant="outline" 
                          style={{width: '75px', margin: '5px 5px'}}
                          onClick={() => navigate(
                            '/directorate/edit', 
                            {state: { data: directorate, status: 'edit' }})}>
                          Edit
                        </CButton>
                        <CButton 
                          color={'danger'} 
                          variant="outline"
                          style={{margin: '5px 5px'}}
                          onClick={() => setChosenDirectorate({ 
                            visible: true, 
                            id: directorate.id, 
                            name: directorate.attributes.directorate_name, })}>
                            Delete
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </CRow>
            <CModal backdrop="static" visible={chosenDirectorate.visible} onClose={() => setChosenDirectorate({ visible: false })}>
              <CModalHeader>
                <CModalTitle>Apakah Anda Yakin?</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Ini akan menghapus {chosenDirectorate.name} secara permanen
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setChosenDirectorate({ visible: false })}>
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

export default Directorate
