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
  CFormSelect,
  CRow,
  CCallout,
  CAlert  
} from '@coreui/react'
import {useNavigate, useLocation} from 'react-router-dom'
import CriteriaAPI from '../../../config/admin/CriteriaAPI'

const TambahCriteria = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [state, setState] = useState({
    status: location.state.status,
    data: location?.state?.data
  });

  const postData = (event) => {
    event.preventDefault();
    const body = {
      data: {
        criteria: document.getElementById("criteria").value,
        value: document.getElementById("value").value,
        useFor: document.getElementById("usefor").value,
      }
    };

    if(state.status == "tambah"){
      CriteriaAPI.add(body).then(
        (res) => {
          navigate('/criteria', {state: { successMessage: 'Criteria has added successfully' } });
        },
        (err) => {
          console.log("err", err);
        }
      );    
    } else {
      CriteriaAPI.edit(state.data.id, body).then(
        (res) => {
          navigate('/criteria', {state: { successMessage: 'Criteria has updated successfully' } });
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
              <strong>{ state.status == "tambah" ? "Tambah" : "Edit"} Kriteria</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={postData} method="post">
                <CRow className="mb-3">
                  <CFormLabel htmlFor="criteria" className="col-sm-2 col-form-label">
                    Nama Criteria
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput 
                      type="text" 
                      name="criteria" 
                      id="criteria" 
                      placeholder='Masukkan Kriteria Penilaian . . .'
                      defaultValue={ state.status == "tambah" ? "" : state.data.attributes.criteria } />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="value" className="col-sm-2 col-form-label">
                    Bobot
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput 
                      type="number"
                      name="value"
                      id="value"
                      placeholder='Masukkan Bobot . . .'
                      defaultValue={ state.status == "tambah" ? "" : state.data.attributes.value } />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="usefor" className="col-sm-2 col-form-label">
                    Penggunaan
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect name="usefor" id="usefor" className="mb-3" aria-label="Large select example">
                      <option>Pilih Penggunaan</option>
                      <option selected={ state?.data?.attributes?.useFor == "am" } value="am">Am</option>
                      <option selected={ state?.data?.attributes?.useFor == "md" } value="md">Md</option>
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

export default TambahCriteria