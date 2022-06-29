import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CFormInput,
  CFormLabel,
  CForm,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CAlert,
  CFormSelect    
} from '@coreui/react'
import { cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import DataPesertaAPI from '../../../config/user/DataPesertaAPI'
import FitAndProperAPI from '../../../config/user/FitAndProperAPI'
import PositionAPI from 'src/config/admin/PositionAPI'

const RekapMFitAndProper = () => {

  const [registrants, setRegistrants] = useState([])
  const [projections, setProjections] = useState([])
  const [lineMappings, setLineMappings] = useState([])
  const [state, setState] = useState({
    visible: false
  })

  useEffect(() => {
    getDataPeserta()
    getDataProyeksi()
  }, []) 

  const generateData = (e) => {
    e.preventDefault()

    const registrant = document.getElementById("filter_registrant").value
    const projection = document.getElementById("filter_projection").value

    FitAndProperAPI.getRekapManualFitProper(registrant, projection).then((res) => {
      if(res.data.data.length != 0){
        setState({ ...state, visible: true })
        setLineMappings(res.data.data)
      } else {
        setState({ ...state, visible: false })        
        setLineMappings([])        
      }
    })    
  }

  const getDataPeserta = () => {
    DataPesertaAPI.get().then((res) => {
      setRegistrants(res.data.data)
    })
  }

  const getDataProyeksi = () => {
    PositionAPI.get().then((res) => {
      setProjections(res.data.data)
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
                <CForm onSubmit={generateData}>
                  <CRow className='mt-2'>
                    <CCol xs={6}>
                      <CFormLabel htmlFor="exampleFormControlInput1">Peserta</CFormLabel>
                      <CFormSelect name="filter_registrant" id="filter_registrant" className="mb-3" aria-label="Large select example">
                        <option value="">Pilih Peserta</option>
                        { registrants?.map(registrant =>
                          <option key={ registrant.id } value={ registrant.id } >{ registrant?.attributes?.employee?.data?.attributes?.Name }</option>
                        )}
                      </CFormSelect>
                    </CCol>
                    <CCol xs={6}>
                      <CFormLabel htmlFor="filter_usefor">Proyeksi</CFormLabel>
                      <CFormSelect name="filter_projection" id="filter_projection" className="mb-3" aria-label="Large select example">
                        <option value="">Pilih Proyeksi</option>
                        { projections?.map(projection =>
                          <option value={ projection.id } key={ projection.id } >{ projection.attributes.position_name }</option>
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
          { state.visible ? 
            <CCard className="mt-3">
              <CCardHeader>
                <strong>Rekap Penilaian Manual Peserta Fit Proper</strong>
              </CCardHeader>
                <CCardBody>
                  <CTable striped style={{ display:'block', overflowX:'auto'}}>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">No</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Tim Penilai</CTableHeaderCell>
                        { lineMappings[0]?.attributes?.scores_fitproper?.data.map(criteria =>
                          <CTableHeaderCell key={ criteria?.attributes?.criterion?.data?.id } scope="col">{ criteria?.attributes?.criterion?.data?.attributes?.criteria } (Bobot {criteria?.attributes?.criterion?.data?.attributes?.value}%)</CTableHeaderCell>
                        )}
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      { lineMappings?.map( (lineMapping, index) =>
                        <CTableRow key={lineMapping.id}>
                          <CTableHeaderCell scope="row">{index+1}</CTableHeaderCell>
                          <CTableDataCell key={lineMapping?.id} scope="col">{ lineMapping?.attributes?.examiner?.data?.attributes?.employee?.data?.attributes?.Name }</CTableDataCell>
                          { lineMapping?.attributes?.scores_fitproper?.data.map(score =>
                            <CTableDataCell key={score?.id}><CFormInput type="text" id="inputEmail3" defaultValue={score?.attributes?.score || 0}/></CTableDataCell>
                          )}
                        </CTableRow>
                      )}
                    </CTableBody>
                  </CTable>
                    <CButton
                      color='primary'
                      style={{width: '100%', marginBottom: '10px'}} >
                        Ubah Data
                    </CButton>                  
                </CCardBody>
            </CCard>
          : null
        }                        
      </CCol>
    </CRow>
  )
}
export default RekapMFitAndProper
