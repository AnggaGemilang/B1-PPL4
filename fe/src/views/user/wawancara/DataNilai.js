import React, { useState, useEffect } from 'react'
import {
  CCol,
  CRow,
  CCallout,  
  CFormSelect  
} from '@coreui/react'
import { useLocation } from "react-router-dom";
import MappingAPI from '../../../config/user/MappingAPI'
import CriteriaForm from 'src/components/CriteriaForm';
import ScoreAPI from '../../../config/user/ScoreAPI'

const DataNilai = () => {
  const location = useLocation();

  const [scores, setScores] = useState([])
  const [examiners, setExaminers] = useState([])
  const [state, setState] = useState({
    registrant: location?.state?.registrant,
    position: location?.state?.position,
    examiner: location?.state?.examiner,
    visible: location?.state?.examiner == null ? false : true,
    total: 0
  })

  useEffect(() => {
    getDataPenguji()
    getData()
  }, [])  
  
  const getDataPenguji = () => {
    MappingAPI.getPenguji(state.registrant, state.position).then((res) => {
      setExaminers(res.data[0].attributes.examiners.data)
    })
  }

  const getData = e => {
    const examiner = (location?.state?.examiner == null) ? e?.target?.value : state.examiner
    ScoreAPI.getWawancara(state.registrant, examiner, state.position).then((res) => {
      if(res.data.length > 0){
        let value = 0
        setScores(res.data)
        res.data.forEach((element) => { 
          value += parseInt(element.attributes.score / 100 * element.attributes.criterion.data.attributes.value)
        })     
        setState({ ...state, visible: true, total: value })        
      } else {
        setState({ ...state, visible: false })
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
        { state.visible ? <CriteriaForm data={scores} total={state.total} /> : null }
      </CCol>
    </CRow>
  )
}

export default DataNilai