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
  CFormSelect,  
  CCallout,
  CAlert     
} from '@coreui/react'
import {useNavigate, useLocation} from 'react-router-dom'
import PositionAPI from '../../../config/admin/PositionAPI'
import GradeAPI from '../../../config/admin/GradeAPI'

const TambahPosition = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [grades, setGrades] = useState([])
  const [message, setMessage] = useState("");
  const [state, setState] = useState({
    status: location.state.status,
    data: location?.state?.data
  });

  useEffect(() => {
    getGradeData()
  }, [])  
  
  const getGradeData = () => {
    GradeAPI.get().then((res) => {
      setGrades(res.data)
    })
  }

  const postData = (event) => {
    event.preventDefault()
    const body = {
      data: {
        position_name: document.getElementById("position_name").value,
        grade: document.getElementById("grade").value
      }
    };

    if(state.status == "tambah"){
      PositionAPI.add(body).then(
        (res) => {
          navigate('/position', {state: { successMessage: 'Position has added successfully' } });  
        },
        (err) => {
          console.log("err", err);
        }
      );    
    } else {
      PositionAPI.edit(state.data.id, body).then(
        (res) => {
          navigate('/position', {state: { successMessage: 'Position has update successfully' } });  
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
              <strong>{ state.status == "tambah" ? "Tambah" : "Edit"} Jabatan</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={postData} method="post">
                <CRow className="mb-3">
                  <CFormLabel htmlFor="position_name" className="col-sm-2 col-form-label">
                    Nama Jabatan
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput 
                      type="text" 
                      name="position_name" 
                      id="position_name"
                      placeholder='Masukkan Nama Jabatan . . .'
                      defaultValue={ state.status == "tambah" ? "" : state.data.attributes.position_name } />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="grade" className="col-sm-2 col-form-label">
                    Grade
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect name="grade" id="grade" className="mb-3" aria-label="Large select example">
                      <option>Pilih Grade</option>
                      { grades.map(grade =>
                        <option selected={grade.id == state?.data?.attributes?.grades?.data[0]?.id} key={ grade.id } value={ grade.id } >{ grade.attributes.grade_name }</option>
                      )}
                    </CFormSelect>
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

export default TambahPosition