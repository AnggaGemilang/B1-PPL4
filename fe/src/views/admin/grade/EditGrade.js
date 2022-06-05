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
import GradeAPI from '../../../config/admin/GradeAPI'

const EditGrade = () => {

  const { id } = useParams();
  const [gradeName, setGradeName] = useState("")

  const handlechange = event => {
    setGradeName(event.target.value);
  };

  useEffect(() => {
    GradeAPI.findById(id).then(
      (res) => {
        setGradeName(res.data[0].attributes.grade_name)
      },
      (err) => {
        console.log("err", err);
      }
    );      
  }, [])

  if(localStorage.getItem("auth") == null){
    window.location = "/#/login";
  }

  const postData = (event) => {
    event.preventDefault()

    const body = {
      data: {
        grade_name: gradeName,
      }
    };

    GradeAPI.edit(id, body).then(
      (res) => {
          window.location = "http://localhost:3000/admin#/grade";
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
            <strong>Tambah Grade</strong>
          </CCardHeader>
          <CCardBody>
            <CForm method="post" onSubmit={postData}>
              <CRow className="mb-3">
                <CFormLabel htmlFor="grade_name" className="col-sm-2 col-form-label" placeholder='Masukkan NIK'>
                  Nama Grade
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" name="grade_name" id="grade_name" value={gradeName} onChange={handlechange}/>
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

export default EditGrade
