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
import DirectorateAPI from '../../../config/admin/DirectorateAPI'
import DivisionAPI from '../../../config/admin/DivisionAPI'

const TambahDivision = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [directorates, setDirectorates] = useState([])
  const [message, setMessage] = useState("");
  const [state, setState] = useState({
    status: location.state.status,
    data: location?.state?.data
  });

  useEffect(() => {
    getDirectorateData()
  }, [])  
  
  const getDirectorateData = () => {
    DirectorateAPI.get().then((res) => {
      setDirectorates(res.data)
    })
  }

  const postData = (event) => {
    event.preventDefault()
    const body = {
      data: {
        division_name: document.getElementById("division_name").value,
        directorate: document.getElementById("directorate").value
      }
    };

    if(state.status == "tambah"){
      DivisionAPI.add(body).then(
        (res) => {
          navigate('/division', {state: { successMessage: 'Division has added successfully' } });  
        },
        (err) => {
          console.log("err", err);
        }
      );    
    } else {
      DivisionAPI.edit(state.data.id, body).then(
        (res) => {
          navigate('/division', {state: { successMessage: 'Division has updated successfully' } });  
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
              <strong>{ state.status == "tambah" ? "Tambah" : "Edit"} Divisi</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={postData} method="post">
                <CRow className="mb-3">
                  <CFormLabel htmlFor="division_name" className="col-sm-2 col-form-label">
                    Nama Divisi
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput 
                      type="text"
                      name="division_name"
                      id="division_name"
                      placeholder='Masukkan Nama Division . . .'
                      defaultValue={ state.status == "tambah" ? "" : state.data.attributes.division_name } />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="directorate" className="col-sm-2 col-form-label">
                    Direktorat
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormSelect name="directorate" id="directorate" className="mb-3" aria-label="Large select example">
                      <option>Pilih Direktorat</option>
                      { directorates.map(directorate =>
                        <option selected={directorate.id == state?.data?.attributes?.directorates?.data[0]?.id} key={ directorate.id } value={ directorate.id } >{ directorate.attributes.directorate_name }</option>
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

export default TambahDivision