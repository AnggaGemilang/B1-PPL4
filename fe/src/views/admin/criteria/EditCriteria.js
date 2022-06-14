import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react'
import { useParams } from 'react-router-dom';
import CriteriaAPI from '../../../config/admin/CriteriaAPI'

const EditCriteria = () => {

  const { id } = useParams();
  const [criteriaData, setCriteria] = useState("")
  const [valueData, setValue] = useState("")
  const [useForData, setUseFor] = useState("")

  if(localStorage.getItem("auth") == null){
    window.location = "/#/login";
  }

  useEffect(() => {
    CriteriaAPI.findById(id).then((res) => {
      setCriteria(res.data[0].attributes.criteria)
      setValue(res.data[0].attributes.value)
      setUseFor(res.data[0].attributes.usefor)
    })    
  }, [])

  const postData = (event) => {
    event.preventDefault();
    const body = {
      data: {
        criteria: criteriaData,
        value: valueData,
        usefor: useForData,
      }
    };
    console.log("Dipencet")
    CriteriaAPI.edit(id, body).then(
      (res) => {
        window.location = 'http://localhost:3000/admin#/criteria';
      },
      (err) => {
        console.log("err", err);
      }
    );    
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit Kriteria</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={postData} method="post">
              <CRow className="mb-3">
                <CFormLabel htmlFor="criteria" className="col-sm-2 col-form-label" placeholder='Masukkan NIK'>
                  Nama Criteria
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" name="criteria" id="criteria" value={criteriaData} onChange={(e) => setCriteria(e.target.value)}/>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="value" className="col-sm-2 col-form-label" placeholder='Masukkan NIK'>
                  Bobot
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="number" name="value" id="value" value={valueData} onChange={(e) => setValue(e.target.value)}/>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="usefor" className="col-sm-2 col-form-label" placeholder='Masukkan NIK'>
                  Penggunaan
                </CFormLabel>
                <CCol sm={10}>
                  <CFormSelect name="usefor" id="usefor" className="mb-3" aria-label="Large select example" onChange={(e) => setUseFor(e.target.value)}>
                    <option>Pilih Penggunaan</option>
                    <option selected={useForData == "am"} value="am">Am</option>
                    <option selected={useForData == "md"} value="md">Md</option>
                  </CFormSelect>
                </CCol>
              </CRow>                                
              <CButton type="submit" style={{width:'100%'}}>Submit</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>        
  )
}

export default EditCriteria
