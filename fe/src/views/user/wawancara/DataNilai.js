import React, { useState, useEffect } from 'react'
import {
  CCol,
  CRow,
  CCallout,  
  CFormSelect,
  CAlert
} from '@coreui/react'
import { useLocation } from "react-router-dom"
import MappingAPI from '../../../config/user/MappingAPI'
import CriteriaForm from 'src/components/CriteriaForm'
import ScoreAPI from '../../../config/user/ScoreAPI'

const DataNilai = () => {
  const location = useLocation()

  const [scores, setScores] = useState([])
  const [examiners, setExaminers] = useState([])
  const [state, setState] = useState({
    registrant: location?.state?.registrant,
    position: location?.state?.position,
    examiner: location?.state?.examiner,
    message: "",
    visible: location?.state?.examiner == null ? false : true,
    total: 0
  })

  useEffect(() => {
    getDataPenguji()
    getData()
  }, [])  
  
  const getDataPenguji = () => {
    MappingAPI.getPenguji(state.registrant, state.position).then((res) => {
      setExaminers(res.data.data[0].attributes.examiners_interview.data)
    })
  }

  const getData = e => {
    const examiner = (location?.state?.examiner == null) ? e?.target?.value : state.examiner
    ScoreAPI.getNilaiWawancara(state.registrant, examiner, state.position).then((res) => {
      if(res?.data?.data[0]?.attributes?.scores_interview?.data?.length > 0){
        let value = 0
        setScores(res.data.data[0])
        res?.data?.data[0]?.attributes?.scores_interview?.data.forEach((element) => { 
          value += parseInt(element.attributes.score / 100 * element.attributes.criterion.data.attributes.value)
        })
        setState({ ...state, visible: true, total: value, message: "" })        
      } else {
        setState({ ...state, visible: false, message: "Penguji Belum Menilai!" })
      }
    })
  }

  return (
    <CRow>
      <CCol>
        <CCol xs={12}>
          <CCallout color="info" className="bg-white">
            <p style={{ fontSize: "18px", marginBottom: "4px" }}><b>Catatan</b></p>
            <ul className='catatan'>
              { state?.examiner == null ?  <li>Pilih terlebih dahulu penguji untuk menampilkan data nilai</li> : null }
              <li>Sistem menampilkan no urut, kriteria penilaian, bobot, dan skor peserta</li>
              <li>Nilai ditampilkan ke dalam bentuk tabel yang dilengkapi dengan total nilai</li>
            </ul>
          </CCallout>
        </CCol>       
        <CCol xs={12}>
          { state.message && <CAlert color="danger" dismissible onClose={() => { setState({ ...state, message: "" }) }}> { state.message } </CAlert> }
        </CCol>        
        <CCol xs={3}>
          { state?.examiner == null ?
            <CFormSelect name="examiner" id="examiner" className="mb-3" aria-label="Large select example" onChange={getData}>
              <option value='0'>Pilih Penguji</option>            
                { examiners.map(examiner => (
                  <option key={examiner.id} value={examiner.id}>{ examiner?.attributes?.employee?.data?.attributes?.Name }</option>
                ))}  
            </CFormSelect> :
            null
           }
        </CCol>
        { state.visible ? <CriteriaForm datas={scores?.attributes?.scores_interview} total={state.total} type={2}/> : null }
      </CCol>
    </CRow>
  )
}

export default DataNilai