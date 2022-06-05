import React,  { useState, useEffect } from 'react'
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
import SubfieldAPI from '../../../config/admin/SubFieldAPI'
import FieldAPI from '../../../config/admin/FieldAPI'

const EditSubfield = () => {
  const { id } = useParams();
  const [subfieldName, setSubfieldName] = useState("")
  const [fieldData, setField] = useState("")
  const [fields, setFields] = useState([])

  useEffect(() => {
    FieldAPI.get().then((res) => {
      setFields(res.data)
    })

    SubfieldAPI.findById(id).then((res) => {
      setSubfieldName(res.data[0].attributes.subfield_name)
      setField(res.data[0].attributes.field.data.id)
      console.log(res.data)
    })    
  }, [])

  const postData = (event) => {
    event.preventDefault();
    const body = {
      data: {
        subfield_name: subfieldName,
        field: fieldData,
      }
    };
    SubfieldAPI.edit(id, body).then(
      (res) => {
        window.location = 'http://localhost:3000/admin#/subfield';
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
            <strong>Edit Sub Field</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={postData} method="post">
              <CRow className="mb-3">
                <CFormLabel htmlFor="subfield_name" className="col-sm-2 col-form-label" placeholder='Masukkan NIK'>
                  Sub Field Name
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="text" name="subfield_name" id="subfield_name" value={subfieldName} onChange={(e) => setSubfieldName(e.target.value)}/>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="field" className="col-sm-2 col-form-label" placeholder='Masukkan NIK'>
                  Field
                </CFormLabel>
                <CCol sm={10}>
                  <CFormSelect name="field" id="field" className="mb-3" aria-label="Large select example" onChange={ (e) => setField(e.target.value)}>
                    <option>Choose Field</option>
                    { fields.map(field =>
                      <option selected={fieldData == field.id} value={ field.id } >{ field.attributes.field_name }</option>
                    )}
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

export default EditSubfield
