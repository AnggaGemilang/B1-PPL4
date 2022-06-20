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
import FieldAPI from '../../../config/admin/FieldAPI'
import DivisionAPI from '../../../config/admin/DivisionAPI'

const TambahField = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [divisions, setDivisionss] = useState([])
  const [message, setMessage] = useState("");
  const [state, setState] = useState({
    status: location.state.status,
    data: location?.state?.data
  });

  useEffect(() => {
    getDivisionData()
  }, [])  
  
  const getDivisionData = () => {
    DivisionAPI.get().then((res) => {
      setDivisionss(res.data)
    })
  }

  const postData = (event) => {
    event.preventDefault()
    const body = {
      data: {
        field_name: document.getElementById("field_name").value,
        division: document.getElementById("division").value
      }
    };

    if(state.status == "tambah"){
      FieldAPI.add(body).then(
        (res) => {
          navigate('/field', {state: { successMessage: 'Field has added successfully' } });  
        },
        (err) => {
          console.log("err", err);
        }
      );  
    } else {
      FieldAPI.edit(state.data.id, body).then(
        (res) => {
          navigate('/field', {state: { successMessage: 'Field has update successfully' } });  
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
        <CCol xs={12}>
          { message && <CAlert color="danger" dismissible onClose={() => { setMessage("") }}> { message } </CAlert> }
        </CCol>  
        <CCol xs={12}>      
          <CCard className="mb-4">
            <CCardHeader>
              <strong>{ state.status == "tambah" ? "Tambah" : "Edit"} Bidang</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={postData} method="post">
                <CRow className="mb-3">
                  <CFormLabel htmlFor="field_name" className="col-sm-2 col-form-label">
                    Nama Bidang
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput 
                      type="text"
                      name="field_name"
                      id="field_name"
                      placeholder='Masukkan Nama Bidang . . .'
                      defaultValue={ state.status == "tambah" ? "" : state.data.attributes.field_name } />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="division" className="col-sm-2 col-form-label">
                    Divisi
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect name="division" id="division" className="mb-3" aria-label="Large select example">
                      <option>Pilih Divisi</option>
                      { divisions.map(division =>
                        <option selected={division.id == state?.data?.attributes?.divisions?.data[0]?.id} key={ division.id } value={ division.id } >{ division.attributes.division_name }</option>
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

export default TambahField