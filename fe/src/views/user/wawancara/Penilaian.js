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
  CFormLabel,
  CAlert,
  CCallout,  
  CForm,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CFormSelect  
} from '@coreui/react'
import { useLocation, useNavigate } from "react-router-dom";
import { cilX, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import CriteriaAPI from '../../../config/admin/CriteriaAPI'
import FitAndProperAPI from '../../../config/user/FitAndProperAPI'

const Penilaian = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedCriteria, setSelectedCriteria] = useState([])
  const [criterias, setCriterias] = useState([])
  const [message, setMessage] = useState("")
  const [lineMapping, setLineMapping] = useState(location?.state?.data)

  useEffect(() => {
    getData()
  }, [])  
  
  const tambahKriteria = (event) => {
    event.preventDefault();
    const body = {
      data: {
        criteria: document.getElementById("criteria").value,
        value: document.getElementById("value").value,
        useFor: document.getElementById("usefor").value,
      }
    };

    CriteriaAPI.add(body).then(
      (res) => {
        setMessage('Kriteria baru telah ditambahkan')
        document.getElementById("criteria").value = "",
        document.getElementById("value").value = "",
        document.getElementById("usefor").value = ""
        getData() 
      },
      (err) => {
        console.log("err", err);
      }
    ); 
  }

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
          type: 2
        }
      }
      FitAndProperAPI.nilai(body).then((res) => {
        const body = {
          data : {
            status_interview: true
          }
        }
        FitAndProperAPI.editLineMapping(lineMapping?.id, body).then((res) => {
          navigate('/fitandproper/datapenilaian', {state: { successMessage: 'Penilaian Berhasil' } });        
        })
      })
    }
  }

  const addRow = (id) => {
    console.log(id)
    CriteriaAPI.findById(id).then((res) => {
      setSelectedCriteria([...selectedCriteria, res.data[0]])
      console.log(res.data[0])
    })
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
        <CAccordion>
          <CAccordionItem itemKey={1}>
            <CAccordionHeader><CIcon icon={cilPlus} style={{ marginRight: "10px" }}/>Tambah Kriteria</CAccordionHeader>
            <CAccordionBody>
              <CForm onSubmit={tambahKriteria}>
                <CRow className='mt-2'>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="exampleFormControlInput1">Nama Kriteria</CFormLabel>
                    <CFormInput 
                      type="text" 
                      name="criteria" 
                      id="criteria" 
                      placeholder='Masukkan Kriteria Penilaian . . .' />
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="exampleFormControlInput1">Bobot</CFormLabel>
                    <CFormInput 
                      type="number"
                      name="value"
                      id="value"
                      placeholder='Masukkan Bobot . . .' />
                  </CCol>
                </CRow>               
                <CRow className='mt-3'>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="exampleFormControlInput1">Penggunaan</CFormLabel>
                    <CFormSelect name="usefor" id="usefor" className="mb-3" aria-label="Large select example">
                      <option>Pilih Penggunaan</option>
                      <option value="am">Am</option>
                      <option value="md">Md</option>
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
                      style={{ width:'18%', borderRadius: "50px", fontSize: "14px" }} >
                        <CIcon icon={cilPlus} style={{ marginRight: "10px", color: "#FFFFFF" }}/>
                        Tambah Kriteria
                    </CButton>                                          
                  </CCol>
                </CRow>
              </CForm>
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>            
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
                    <CTableHeaderCell scope="col" width="100">Bobot</CTableHeaderCell>
                    <CTableHeaderCell scope="col" width="100">Nilai</CTableHeaderCell>
                    <CTableHeaderCell scope="col" width="100">Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody id="body">
                  { selectedCriteria?.map( (criteria, index) => (
                    <CTableRow key={criteria?.id}>
                      <CTableHeaderCell scope="row">{ index+1 }</CTableHeaderCell>
                      <CTableDataCell className='criteria' id_val={ criteria?.id }>{ criteria?.attributes?.criteria }</CTableDataCell>
                      <CTableDataCell>{ criteria?.attributes?.value + "%" }</CTableDataCell>
                      <CTableDataCell>
                        <CFormInput type="number" min={0} max={100} id="nilai" name='nilai' />
                      </CTableDataCell>
                      <CTableDataCell>
                        <CIcon 
                          icon={cilX} 
                          style={{ width: "30px", height: "30px" }}/>
                      </CTableDataCell>
                    </CTableRow>
                  ))}                    
                  <CTableRow>
                    <CTableDataCell colSpan={2} className='criteria'>
                      <CFormSelect style={{ marginTop: "15px" }} className="mb-3" aria-label="Large select example" name="used_criteria" id="used_criteria">
                        <option>Pilih Kriteria</option>
                        {criterias.map(criteria => (
                          <option key={criteria.id} value={criteria.id}>{ criteria.attributes.criteria }</option>
                        ))}  
                      </CFormSelect>
                    </CTableDataCell>
                    <CTableDataCell colSpan={3}>
                      <CButton
                        color='primary'
                        style={{ width: "100%", borderRadius: "50px", fontSize: "14px" }}
                        onClick={() => addRow(document.getElementById("used_criteria").value)} >
                          Tambah Penilaian
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
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