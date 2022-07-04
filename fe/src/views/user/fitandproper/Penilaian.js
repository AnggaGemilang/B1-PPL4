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
  CAlert,
  CCallout,
  CForm,
  CSpinner  
} from '@coreui/react'
import { useLocation, useNavigate } from "react-router-dom"
import FitAndProperAPI from '../../../config/user/FitAndProperAPI'
import ScoreAPI from 'src/config/user/ScoreAPI'

const Penilaian = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [scores, setScores] = useState([])
  const [message, setMessage] = useState("")
  const [state, setState] = useState({
    lineMapping: location?.state?.data,
    status: location?.state?.status,
    visibleSubmit: false,
    nilaiMax: 0,
    totalNilai: 0
  })

  useEffect(() => {
    getScore()
  }, [])  
  
  const postData = (e) => {
    e.preventDefault()

    const data = document.querySelector('#body').children
    for (let i = 0; i < data.length; i++) {
      setState({ 
        ...state, 
        visibleSubmit: true,
        nilaiMax: state.nilaiMax += parseInt(100 / 100 * data[i].querySelector('#criteria').getAttribute('bobot_val')),
        totalNilai: state.totalNilai += parseInt(data[i].querySelector('#nilai').value / 100 * data[i].querySelector('#criteria').getAttribute('bobot_val'))
      })
      const body = {
        data : {
          score: data[i].querySelector('#nilai').value,
          examiner: state?.lineMapping?.attributes?.examiner?.data?.id,
        }
      }
      FitAndProperAPI.nilai(data[i].querySelector('#criteria').getAttribute('id_val'), body)
    }
    const body = {
      data : {
        status_fitproper: true,
        passed_fitproper: (state.totalNilai >= ((75*state.nilaiMax)/100)) ? 'passed' : 'not_passed'
      }
    }
    FitAndProperAPI.editLineMapping(state?.lineMapping?.id, body).then(
      (res) => {
        navigate('/fitandproper/datapenilaian', {state: { successMessage: 'Penilaian Berhasil' } })        
      },
      (err) => {
        setMessage(err.message)
        setState({ ...state, visibleSubmit: false })
      }      
    )    
  }

  const getScore = () => {
    ScoreAPI.getFitProperPenilaian(state?.lineMapping?.id).then((res) => {
      setScores(res.data.data)
    })
  }

  return (
    <CRow>
      <CCol>
        <CCol xs={12}>
          <CCallout color="info" className="bg-white">
            <p style={{ fontSize: "18px", marginBottom: "4px" }}><b>Catatan Pengisian</b></p>
            <ul className='catatan'>
              <li>Sebelum submit, pastikan seluruh data yang dimasukkan valid</li>
              <li>Data yang dimasukkan berupa penilaian pada setiap kriteria terhadap peserta</li>
              <li>Nilai yang dapat dimasukkan memiliki jangkauan 0 - 100</li>
              <li>Untuk memaksimalkan penilaian, perhatikan bobot pada setiap kriteria</li>
            </ul>
          </CCallout>
        </CCol>        
        <CCol xs={12} className="mt-3">
          { message && <CAlert color="success" dismissible onClose={() => { setMessage("") }}> { message } </CAlert> }
        </CCol>                 
        <CCard className="mb-4 mt-3">
          <CCardHeader>
            <strong>Formulir Penilaian</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={postData}>
              <CTable striped className='mt-3 text-center'>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Kriteria Penilaian</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Bobot</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nilai</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody id="body">
                  { scores?.map( (score, index) => (
                    <CTableRow key={score?.id}>
                      <CTableHeaderCell scope="row">{ index+1 }</CTableHeaderCell>
                      <CTableDataCell id='criteria' id_val={ score?.id } bobot_val={score?.attributes?.criterion?.data?.attributes?.value}>{ score?.attributes?.criterion?.data?.attributes?.criteria }</CTableDataCell>
                      <CTableDataCell>{ score?.attributes?.criterion?.data?.attributes?.value + "%" }</CTableDataCell>
                      <CTableDataCell>
                        <CFormInput type="number" min={0} max={100} id="nilai" name='nilai' defaultValue={ state.status == "edit" ? score?.attributes?.score : '' } />
                      </CTableDataCell>
                    </CTableRow>
                  ))}  
                </CTableBody>
              </CTable>
              <CRow className='mt-4'>
                <CCol xs={12} className="position-relative">
                  <CButton disabled={state.visibleSubmit} type="submit" style={{width:'100%'}} className="p-2 w-100">
                    Submit
                  </CButton>
                  { state.visibleSubmit && <CSpinner color="primary" className='position-absolute' style={{right: "20px", top: "5px"}} /> }
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Penilaian