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
  CForm
} from '@coreui/react'
import { useLocation, useNavigate } from "react-router-dom";
import CriteriaAPI from '../../../config/admin/CriteriaAPI'
import FitAndProperAPI from '../../../config/user/FitAndProperAPI'

const Penilaian = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [criterias, setCriterias] = useState([])
  const [message, setMessage] = useState("")
  const [lineMapping, setLineMapping] = useState(location?.state?.data)

  useEffect(() => {
    getData()
  }, [])  
  
  const postData = (e) => {
    e.preventDefault()

    const data = document.querySelector('#body').children;
    for (let i = 0; i < data.length; i++) {
      const body = {
        data : {
          line_mapping: lineMapping?.id,
          registrant: lineMapping?.attributes?.mapping?.data?.attributes?.registrant?.data?.id,
          examiner: lineMapping.attributes?.examiner?.data?.id,
          criterion: data[i].querySelector('.criteria').getAttribute('id_val'),
          score: data[i].querySelector('#nilai').value,
          type: 1
        }
      }
      FitAndProperAPI.nilai(body).then((res) => {
        const body = {
          data : {
            status_fitproper: true
          }
        }
        FitAndProperAPI.editLineMapping(lineMapping?.id, body).then((res) => {
          navigate('/fitandproper/datapenilaian', {state: { successMessage: 'Penilaian Berhasil' } });        
        })
      })
    }
  }

  const getData = () => {
    CriteriaAPI.get().then((res) => {
      setCriterias(res.data)
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
                  { criterias.map( (criteria, index) => (
                    <CTableRow key={criteria?.id}>
                      <CTableHeaderCell scope="row">{ index+1 }</CTableHeaderCell>
                      <CTableDataCell className='criteria' id_val={ criteria?.id }>{ criteria?.attributes?.criteria }</CTableDataCell>
                      <CTableDataCell>{ criteria?.attributes?.value + "%" }</CTableDataCell>
                      <CTableDataCell>
                        <CFormInput type="number" min={0} max={100} id="nilai" name='nilai' />
                      </CTableDataCell>
                    </CTableRow>
                  ))}  
                </CTableBody>
              </CTable>
              <CButton type="submit" style={{width:'100%'}}>Submit</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Penilaian