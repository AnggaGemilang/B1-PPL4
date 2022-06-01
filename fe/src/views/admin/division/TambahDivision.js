import React, {useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import DivisionAPI from '../../../config/admin/DivisionAPI'
import Axios from "axios";

function TambahDivision() {
  const url = "https://e624-140-0-220-95.ap.ngrok.io/api/divisions?populate[fields][populate]&populate[directorate][populate]=divisionhttps://e624-140-0-220-95.ap.ngrok.io/api/divisions?populate[fields][populate]&populate[directorate][populate]=division"
  const [data, setData] = useState({
    division_name: "",
  })

  function submit(e){
    e.preventDefault();
    Axios.post (url, {
      division_name: data.division_name
    })
    .then(res=> {
      console.log(res.data)
    })
  }

  function handle(e) {
    const newData={...data}
    newData[e.target.id] = e.target.value
    setData(newData)
    console.log(newData)
  }
  return (
      <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Tambah Division</strong>
              </CCardHeader>
              <CCardBody>
                  <CForm onSubmit={(e) => submit(e)}>

                    <CRow className="mb-3">
                      <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label" placeholder='Masukkan NIK'>
                        Nama Divisi 
                      </CFormLabel>
                      <CCol sm={10}>
                        <CFormInput onChange={(e)=>handle(e)} id="division_name" value={data.division_name} type="text"  placeholder='Nama Divisi' />
                      </CCol>
                    </CRow>

                    <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Nama Field</CFormLabel>
                        <div className="col-sm-6">
                          <CFormSelect aria-label="Default select example">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </CFormSelect>
                        </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Nama Direktorat</CFormLabel>
                        <div className="col-sm-6">
                          <CFormSelect aria-label="Default select example">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </CFormSelect>
                        </div>
                    </CInputGroup>
                  </CRow>
                    <CButton type="submit" style={{width:'100%'}}>Submit</CButton>
                  </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
  )
}


export default TambahDivision
