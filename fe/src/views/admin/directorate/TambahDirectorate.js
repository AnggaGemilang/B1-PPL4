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
import { useLocation, useNavigate } from "react-router-dom";
import DirectorateAPI from '../../../config/admin/DirectorateAPI'
import UnitAPI from '../../../config/admin/UnitAPI'

const TambahDirectorate = () => {
  const navigate = useNavigate();
  const location = useLocation();    
  const [units, setUnits] = useState([])
  const [message, setMessage] = useState("");
  const [state, setState] = useState({
    status: location.state.status,
    data: location?.state?.data
  });

  useEffect(() => {
    getUnitData()
  }, [])  
  
  const getUnitData = () => {
    UnitAPI.get().then((res) => {
      setUnits(res.data)
    })
  }

  const postData = (event) => {
    event.preventDefault()

    const body = {
      data: {
        directorate_name: document.getElementById("directorate_name").value,
        units: document.getElementById("unit").value
      }
    };

    if(state.status == "tambah"){
      DirectorateAPI.add(body).then(
        (res) => {
          navigate('/directorate', {state: { successMessage: 'Directorate has added successfully' } });  
        },
        (err) => {
          console.log("err", err);
        }
      );
    } else {
      DirectorateAPI.edit(state.data.id, body).then(
        (res) => {
          navigate('/directorate', {state: { successMessage: 'Directorate has updated successfully' } });  
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
              <strong>{ state.status == "tambah" ? "Tambah" : "Edit"} Directorate</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={postData} method="post">
                <CRow className="mb-3">
                  <CFormLabel htmlFor="directorate_name" className="col-sm-2 col-form-label">
                    Nama Direktorat
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput 
                      type="text" 
                      name="directorate_name"
                      id="directorate_name"
                      placeholder='Enter Directorate Name . . .'
                      defaultValue={ state.status == "tambah" ? "" : state.data.attributes.directorate_name } />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="unit" className="col-sm-2 col-form-label">
                    Unit
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect name="unit" id="unit" className="mb-3" aria-label="Large select example">
                      <option>Choose Unit</option>
                      { units.map(unit =>
                        <option selected={unit.id == state?.data?.attributes?.units?.data[0]?.id} key={ unit.id } value={ unit.id } >{ unit.attributes.unit_name }</option>
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

export default TambahDirectorate
