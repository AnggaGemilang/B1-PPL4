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
  CFormSelect,
  CSpinner,
  CCallout
} from '@coreui/react'
import { cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import DataPesertaAPI from '../../../config/user/DataPesertaAPI'
import FitAndProperAPI from '../../../config/user/FitAndProperAPI'
import PositionAPI from 'src/config/admin/PositionAPI'
import ScoreAPI from 'src/config/user/ScoreAPI'
import axios from "axios"

const RekapMFitAndProper = () => {

  const [registrants, setRegistrants] = useState([])
  const [projections, setProjections] = useState([])
  const [lineMappings, setLineMappings] = useState([])
  const [state, setState] = useState({
    visible: false,
    visibleSubmit: false,    
    message: "",
    color: ""
  })

  useEffect(() => {
    axios.all([DataPesertaAPI.get(), PositionAPI.get()]).then(
      axios.spread((...res) => {
        setRegistrants(res[0]?.data.data),
        setProjections(res[1]?.data.data)
      })
    )
  }, []) 

  const generateData = (e) => {
    e.preventDefault()

    const registrant = document.getElementById("filter_registrant").value
    const projection = document.getElementById("filter_projection").value

    FitAndProperAPI.getRekapManualFitProper(registrant, projection).then((res) => {
      if(res?.data?.data?.length != 0){
        if(res?.data?.data[0]?.attributes?.mapping?.data?.attributes?.status == "on_progress"){
          setState({ ...state, visible: true, message: "", color: "" })
          setLineMappings(res.data.data)
        } else {
          setState({ ...state, visible: false, message: "Data Sudah Difinalisasi!", color: "danger" })        
        }
      } else {
        setState({ ...state, visible: false, message: "Data Tidak Ditemukan!", color: "danger" })        
        setLineMappings([])        
      }
    })    
  }

  const postData = (e) => {
    e.preventDefault()    
    setState({ ...state, visibleSubmit: true })

    const data = document.querySelector('#body').children
    for (let i = 0; i < data.length; i++) {
      const score = data[i].querySelectorAll('#score')
      for (let i = 0; i < score.length; i++) {
        const body = {
          data : {
            score: score[i].value
          }
        }
        ScoreAPI.edit(score[i].getAttribute('score_id'), body).then(
          (res) => {
            setState({ ...state, visibleSubmit: false, message: "Nilai Berhasil Diperbaharui", color: 'success' })
          }, 
          (err) => {
            setMessage(err.message)
            setState({ ...state, visibleSubmit: false })
          }
        )                
      }
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCol xs={12}>
          <CCallout color="info" className="bg-white">
            <p style={{ fontSize: "18px", marginBottom: "4px" }}><b>Catatan Pengisian</b></p>
            <ul className='catatan'>
              <li>Sistem memungkinkan administrator untuk mengisikan nilai peserta</li>
              <li>Pilih terlebih dahulu peserta dan proyeksi untuk menampilkan nilai</li>
              <li>Nilai hanya dapat diubah sebelum pengajuan telah difinalisasi</li>
              <li>Sebelum submit, pastikan nilai peserta sudah benar</li>
            </ul>
          </CCallout>
        </CCol>
        <CCol xs={12}>
          { state.message && <CAlert color={state.color} dismissible onClose={() => { setState({ ...state, message: "" }) }}> { state.message } </CAlert> }
        </CCol> 
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
                        <option value="0">Pilih Peserta</option>
                        { registrants?.map(registrant =>
                          <option key={ registrant.id } value={ registrant.id } >{ registrant?.attributes?.employee?.data?.attributes?.Name }</option>
                        )}
                      </CFormSelect>
                    </CCol>
                    <CCol xs={6}>
                      <CFormLabel htmlFor="filter_usefor">Proyeksi</CFormLabel>
                      <CFormSelect name="filter_projection" id="filter_projection" className="mb-3" aria-label="Large select example">
                        <option value="0">Pilih Proyeksi</option>
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
                  <CTable striped id='my-table' style={{ display:'block', overflowX:'auto'}}>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">No</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Tim Penilai</CTableHeaderCell>
                        { lineMappings[0]?.attributes?.scores_fitproper?.data.map(criteria =>
                          <CTableHeaderCell key={ criteria?.attributes?.criterion?.data?.id } scope="col">{ criteria?.attributes?.criterion?.data?.attributes?.criteria } (Bobot {criteria?.attributes?.criterion?.data?.attributes?.value}%)</CTableHeaderCell>
                        )}
                      </CTableRow>
                    </CTableHead>
                    <CTableBody id="body">
                      { lineMappings?.map( (lineMapping, index) =>
                        <CTableRow key={lineMapping.id} id="row-data">
                          <CTableHeaderCell scope="row">{index+1}</CTableHeaderCell>
                          <CTableDataCell id='examiner' key={lineMapping?.id} examiner_id={lineMapping?.attributes?.examiner?.data?.id} scope="col">{ lineMapping?.attributes?.examiner?.data?.attributes?.employee?.data?.attributes?.Name }</CTableDataCell>
                          { lineMapping?.attributes?.scores_fitproper?.data.map(score =>
                            <CTableDataCell key={score?.id}>
                              <CFormInput type="text" id="score" score_id={score?.id} defaultValue={score?.attributes?.score || 0}/>
                            </CTableDataCell>
                          )}
                        </CTableRow>
                      )}
                    </CTableBody>
                  </CTable>
                  <CRow className='mt-4'>
                    <CCol xs={12} className="position-relative">
                      <CButton disabled={state.visibleSubmit} type="submit" style={{width:'100%'}} className="p-2 w-100" onClick={postData}>
                        Ubah Data
                      </CButton>
                      { state.visibleSubmit && <CSpinner color="primary" className='position-absolute' style={{right: "20px", top: "5px"}} /> }
                    </CCol>
                  </CRow>
                </CCardBody>
            </CCard>
          : null
        }                        
      </CCol>
    </CRow>
  )
}
export default RekapMFitAndProper
