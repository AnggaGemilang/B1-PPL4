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
    visible: location?.state?.examiner == null ? false : true,
    total: 0,
    message: "",
  })

  useEffect(() => {
    getDataPenguji()
    getData()
  }, [])  
  
  const getDataPenguji = () => {
    MappingAPI.getPenguji(state.registrant, state.position).then((res) => {
      setExaminers(res.data.data[0].attributes.examiners.data)
    })
  }

  const getData = e => {
    const examiner = (location?.state?.examiner == null) ? e?.target?.value : state.examiner
    ScoreAPI.getNilaiFitProper(state.registrant, examiner, state.position).then((res) => {
      if(res?.data?.data[0]?.attributes?.scores_fitproper?.data[0]?.attributes?.score != 0){
        let value = 0
        setScores(res.data.data[0])
        res?.data.data[0]?.attributes?.scores_fitproper?.data.forEach((element) => { 
          value += parseInt(element.attributes.score / 100 * element.attributes.criterion.data.attributes.value)
        })     
        setState({ ...state, visible: true, total: value, message: "" })        
      } else {
        setState({ ...state, visible: false, message: "Penguji belum menilai" })
      }
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
        <CCol xs={12}>
          { state.message && <CAlert color="danger" dismissible onClose={() => { setState({ ...state, message: "" }) }}> { state.message } </CAlert> }
        </CCol>
        <CCol xs={3}>
          { state?.examiner == null ?
            <CFormSelect name="examiner" id="examiner" className="mb-3" aria-label="Large select example" onChange={getData}>
              <option value=''>Pilih Penguji</option>            
                { examiners.map(examiner => (
                  <option key={examiner.id} value={examiner.id}>{ examiner?.attributes?.employee?.data?.attributes?.Name }</option>
                ))}  
            </CFormSelect> :
            null
           }
        </CCol>
        { state.visible ? <CriteriaForm datas={scores?.attributes?.scores_fitproper} total={state.total} type={1}/> : null }
      </CCol>
    </CRow>
  )
}

export default DataNilai