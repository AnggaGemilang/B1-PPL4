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
  CFormTextarea,
  CCallout,
  CAlert   
} from '@coreui/react'
import {useNavigate, useLocation} from 'react-router-dom'
import UnitAPI from '../../../config/admin/UnitAPI'

const TambahUnit = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [state, setState] = useState({
    status: location.state.status,
    data: location?.state?.data
  });

  const postData = (event) => {
    event.preventDefault()
    var name = document.getElementById("unit_name").value
    var address = document.getElementById("address").value
    const body = {
      data: {
        unit_name: name,
        address: address
      }
    };

    if(state.status == "tambah"){
      UnitAPI.add(body).then(
        (res) => {
          navigate('/unit', {state: { successMessage: 'Unit has added successfully' } }); 
        },
        (err) => {
          console.log("err", err);
        }
      )
    } else {
      UnitAPI.edit(state.data.id, body).then(
        (res) => {
          navigate('/unit', {state: { successMessage: 'Unit has added successfully' } }); 
        },
        (err) => {
          console.log("err", err);
        }
      )      
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
              <strong>Tambah Unit</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={postData} method="post">
                <CRow className="mb-3" style={{ alignItem: "center" }}>
                  <CFormLabel htmlFor="unit_name" className="col-sm-2 col-form-label">
                    Nama Unit
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput 
                      type="text" 
                      name="unit_name" 
                      id="unit_name" 
                      placeholder='Masukkan Nama Unit . . .'
                      defaultValue={ state.status == "tambah" ? "" : state.data.attributes.unit_name } />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="address" className="col-sm-2 col-form-label">
                    Alamat Unit
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormTextarea name="address" id="address" rows="3" placeholder='Masukkan Alamat Unit . . .'>
                      { state.status == "tambah" ? "" : state.data.attributes.address }
                    </CFormTextarea>
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

export default TambahUnit