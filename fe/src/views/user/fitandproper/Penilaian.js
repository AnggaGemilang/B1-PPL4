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
  })

  useEffect(() => {
    getScore()
    console.log(location?.state?.data)
    console.log(location?.state?.status)
  }, [])  
  
  const postData = (e) => {
    e.preventDefault()
    setState({ ...state, visibleSubmit: true })

    const data = document.querySelector('#body').children
    for (let i = 0; i < data.length; i++) {
      const body = {
        data : {
          score: data[i].querySelector('#nilai').value,
          examiner: state?.lineMapping?.attributes?.examiner?.data?.id,
        }
      }
      FitAndProperAPI.nilai(data[i].querySelector('#score').getAttribute('id_val'), body).then(
        (res) => {
          const body = {
            data : {
              status_fitproper: true
            }
          }
          FitAndProperAPI.editLineMapping(state?.lineMapping?.id, body).then((res) => {
            navigate('/fitandproper/datapenilaian', {state: { successMessage: 'Penilaian Berhasil' } })        
          })
        }, 
        (err) => {
          setMessage(err.message)
          setState({ ...state, visibleSubmit: false })
        }
      )
    }
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
            <p style={{ fontSize: "18px", marginBottom: "0px" }}><b>Catatan</b></p>
            <ul className='catatan' style={{ marginBottom: "0px" }}>
              <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
              <li>Contrary to popular belief, Lorem Ipsum is not simply random text</li>
              <li>It is a long established fact that a reader will be distracted by the</li>
              <li>There are many variations of passages of Lorem Ipsum available</li>
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
                      <CTableDataCell id='score' id_val={ score?.id }>{ score?.attributes?.criterion?.data?.attributes?.criteria }</CTableDataCell>
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