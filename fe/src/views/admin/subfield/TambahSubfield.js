import React, { useEffect, useState } from 'react'
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
import SubFieldAPI from '../../../config/admin/SubFieldAPI'
import FieldAPI from '../../../config/admin/FieldAPI'

const TambahSubfield = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [fields, setFields] = useState([])
  const [message, setMessage] = useState("");
  const [state, setState] = useState({
    status: location.state.status,
    data: location?.state?.data
  });  

  useEffect(() => {
    getFieldData()
  }, [])  

  const getFieldData = () => {
    FieldAPI.get().then((res) => {
      setFields(res.data)
    })
  }

  const postData = (event) => {
    event.preventDefault();
    const body = {
      data: {
        subfield_name: document.getElementById("subfield_name").value,
        fields: document.getElementById("field").value,
      }
    };
    if(state.status == "tambah"){
      SubFieldAPI.add(body).then(
        (res) => {
          navigate('/subfield', {state: { successMessage: 'Sub field has added successfully' } });  
        },
        (err) => {
          console.log("err", err);
        }
      );
    } else {
      SubFieldAPI.edit(state.data.id, body).then(
        (res) => {
          navigate('/subfield', {state: { successMessage: 'Sub field has updated successfully' } });  
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
              <strong>{ state.status == "tambah" ? "Tambah" : "Edit"} Sub Field</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={postData} method="post">
                <CRow className="mb-3">
                  <CFormLabel htmlFor="subfield_name" className="col-sm-2 col-form-label">
                    Sub Field Name
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput 
                      type="text" 
                      name="subfield_name"
                      id="subfield_name"
                      placeholder='Enter Sub field . . .'
                      defaultValue={ state.status == "tambah" ? "" : state.data.attributes.subfield_name } />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="field" className="col-sm-2 col-form-label">
                    Field
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect name="field" id="field" className="mb-3" aria-label="Large select example">
                      <option>Choose Field</option>
                      { fields.map(field =>
                        <option selected={field.id == state?.data?.attributes?.fields?.data[0]?.id} key={ field.id } value={ field.id } >{ field.attributes.field_name }</option>
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

export default TambahSubfield
