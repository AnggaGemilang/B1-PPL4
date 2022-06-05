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
  CRow,
} from '@coreui/react'
import { useParams } from 'react-router-dom';
import DirectorateAPI from '../../../config/admin/DirectorateAPI'

const EditDirectorate = () => {

  const { id } = useParams();
  const [directorateName, setDirectorateName] = useState("")

  useEffect(() => {
    DirectorateAPI.findById(id).then(
      (res) => {
        setDirectorateName(res.data[0].attributes.directorate_name)
      },
      (err) => {
        console.log("err", err);
      }
    );      
  }, [])

  const postData = (event) => {
    event.preventDefault()
    const body = {
      data: {
        directorate_name: directorateName,
      }
    };

    DirectorateAPI.edit(id, body).then(
      (res) => {
          window.location = "http://localhost:3000/admin#/directorate";
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
            <strong>Tambah Directorate</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={postData} method="post">
              <CRow className="mb-3">
                <CFormLabel htmlFor="directorate_name" className="col-sm-2 col-form-label" placeholder='Masukkan NIK'>
                  Nama Direktorat
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" name="directorate_name" id="directorate_name" value={directorateName} onChange={(e) => setDirectorateName(e.target.value)}/>
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

export default EditDirectorate
