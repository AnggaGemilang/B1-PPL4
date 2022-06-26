import React, { useState } from 'react'
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
  CCallout,
  CAlert         
} from '@coreui/react'
import {useNavigate, useLocation} from 'react-router-dom'
import GradeAPI from '../../../config/admin/GradeAPI'

const TambahGrade = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [state, setState] = useState({
    status: location.state.status,
    data: location?.state?.data
  });  

  const postData = (event) => {
    event.preventDefault()
    var name = document.getElementById("grade_name").value
    const body = {
      data: {
        grade_name: name,
      }
    };

    if(state.status == "tambah"){
      GradeAPI.add(body).then(
        (res) => {
          navigate('/grade', {state: { successMessage: 'Grade has added successfully' } }); 
        },
        (err) => {
          console.log("err", err);
        }
      );    
    } else {
      GradeAPI.edit(state.data.id, body).then(
        (res) => {
          navigate('/grade', {state: { successMessage: 'Grade has updated successfully' } }); 
        },
        (err) => {
          console.log("err", err);
        }
      );
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCol xs={12} >
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
          { message && <CAlert color="danger" dismissible onClose={() => { setMessage("") }}> { message } </CAlert> }
        </CCol>     
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>{ state.status == "tambah" ? "Tambah" : "Edit"} Grade</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={postData} method="post">
                <CRow className="mb-3">
                  <CFormLabel htmlFor="grade_name" className="col-sm-2 col-form-label" placeholder='Masukkan NIK'>
                    Nama Grade
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      name="grade_name"
                      id="grade_name"
                      placeholder='Masukkan Nama Grade . . .'
                      defaultValue={ state.status == "tambah" ? "" : state.data.attributes.grade_name } />
                  </CCol>
                </CRow>
                <CButton type="submit" style={{width:'100%'}}>Submit</CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>  
      </CCol>
    </CRow>        
  )  
}

export default TambahGrade
