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
  CInputGroup,
  CFormSelect,
  CCallout,  
  CAlert  
} from '@coreui/react'
import {useNavigate} from 'react-router-dom'
import MappingAPI from '../../../config/user/MappingAPI'
import DataPengujiAPI from '../../../config/user/DataPengujiAPI'
import DataPesertaAPI from '../../../config/user/DataPesertaAPI'
import LevelAPI from '../../../config/admin/LevelAPI'
import PositionAPI from 'src/config/admin/PositionAPI'

const Pendaftaran = () => {
  const navigate = useNavigate();  
  const [nipValue, setNipValue] = useState("")
  const [examiners1, setExaminers1] = useState([])
  const [examiners2, setExaminers2] = useState([])
  const [examiners3, setExaminers3] = useState([])
  const [positions, setPositions] = useState([])
  const [levels, setLevels] = useState([])
  const [state, setState] = useState({
    id: '',
    namaKaryawan: "",
    errorMessage: "",
    grade: "",
    position: "",
    ppt: null,
    cv: null,    
  });

  useEffect(() => {
    if (nipValue.length > 1) {
      DataPesertaAPI.findRegistrants(nipValue).then(
      (res) => {
        if(res.data.length == 1){
          setState({
            ...state,
            id: res.data[0]?.id,
            namaKaryawan: res.data[0]?.attributes?.employee?.data?.attributes?.Name,
            grade: res.data[0]?.attributes?.employee?.data?.attributes?.position?.data?.attributes?.grade?.data?.attributes?.grade_name,
            position: res.data[0]?.attributes?.employee?.data?.attributes?.position?.data?.attributes?.position_name
          });
        } 
        else {
          setState({
            id: '',
            namaKaryawan: '',
            idKaryawan: 0,
            grade: "",
            position: ""
          });
        }
      });
    }
    getLevelData()
    getExaminerData()
    getPositionData()
  }, [nipValue])

  const getLevelData = () => {
    LevelAPI.get().then((res) => {
      setLevels(res.data)
    })
  }  

  const getExaminerData = () => {
    DataPengujiAPI.get().then((res) => {
      setExaminers1(res.data)
    })
  }  

  const getPositionData = () => {
    PositionAPI.get().then((res) => {
      setPositions(res.data)
    })
  }

  const deleteNode = (value, arr) => {
    const temp = [...arr]
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].id == value) {
        temp.splice(i, 1)
      }
    }
    return temp
  }

  const postData = (event) => {
    event.preventDefault();
    const body = {
      data: {
        examiners: [34,38,42],
        registrant: state.id,
        jobdesc: document.getElementById("jobdesc").value,
        schedule: document.getElementById("schedule").value,
        fitproper_type: document.getElementById("fitproper_type").value,
        level: document.getElementById("level").value,
        position: document.getElementById("projection").value,        
        is_interview: false,
        status: false,
        status_intervie: false
      }
    };  
    MappingAPI.add(body).then(
      (res) => {
        let formData = new FormData()
        formData.append('files', state.ppt)
        formData.append('ref', 'api::registrant.registrant')
        formData.append('refId', state.id)
        formData.append('field', 'ppt')
        DataPesertaAPI.addFile(formData).then(
          (res) => {
            let formData = new FormData()
            formData.append('files', state.cv)
            formData.append('ref', 'api::registrant.registrant')
            formData.append('refId', state.id)
            formData.append('field', 'cv')
            DataPesertaAPI.addFile(formData).then(
              (res) => {
                navigate('/fitandproper/datapendaftaran', {state: { successMessage: 'Pendaftaran Berhasil' } });
              },
              (err) => {
                console.log("err", err);
              }
            );  
          },
          (err) => {
            console.log("err", err);
          }
        );  
          navigate('/fitandproper/datapendaftaran', {state: { successMessage: 'Pendaftaran Telah Berhasil' } });
      },
      (err) => {
        console.log("err", err);
      }
    );    
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
          { state.errorMessage && <CAlert color="danger" dismissible onClose={() => { setState({errorMessage:""}) }}> { state.errorMessage } </CAlert> }
        </CCol>
        <CCol xs={12}>                
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Pendaftaran Peserta Fit Proper</strong>
            </CCardHeader>
            <CCardBody>
                <CForm onSubmit={postData}>
                  <CRow className="mb-3 ">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">NIP</CFormLabel>
                      <div className="col-sm-10">
                        <CFormInput type="text" id="nip" name="nip" onChange={(e) => setNipValue(e.target.value )} placeholder="Masukkan NIP . . ." />
                      </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Nama</CFormLabel>
                        <div className="col-sm-10">
                          <CFormInput type="input" id="name" name="name" placeholder='Masukkan Nama Peserta' disabled value={state.namaKaryawan} />
                        </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Jabatan</CFormLabel>
                        <div className="col-sm-10">
                          <CFormInput type="input" id="position" name="position" placeholder='Masukkan Jabatan Peserta' disabled value={state.position}/>
                        </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Grade</CFormLabel>
                        <div className="col-sm-10">
                          <CFormInput type="input" id="grade" name="grade" placeholder='Masukkan Grade Peserta' disabled value={state.grade}/>
                        </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Jadwal Pelaksanaan</CFormLabel>
                        <div className="col-sm-10">
                          <CFormInput type="date" id="schedule" name="schedule" placeholder='Masukkan Tanggal'/>
                        </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Jabatan Proyeksi</CFormLabel>
                        <div className="col-sm-10">
                        <CFormSelect name="projection" id="projection" className="mb-3" aria-label="Large select example">
                            <option>Pilih Proyeksi</option>
                            { positions.map(position =>
                              <option value={ position.id } key={ position.id } >{ position.attributes.position_name }</option>
                            )}
                        </CFormSelect>
                        </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Jenjang Jabatan</CFormLabel>
                        <div className="col-sm-10">
                        <CFormSelect name="level" id="level" className="mb-3" aria-label="Large select example">
                            <option>Pilih Jenjang</option>
                            { levels.map(level =>
                              <option value={ level.id } key={ level.id } >{ level.attributes.functional_name } - { level.attributes.structural_name }</option>
                            )}
                        </CFormSelect>
                        </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Jenis Fit and Propper</CFormLabel>
                      <div className="col-sm-10">
                        <CFormSelect id="fitproper_type" aria-label="Default select example">
                          <option>Pilih Jenis Fit & Proper</option>
                          <option value="Offline">Offline</option>
                          <option value="Vcon">Vcon</option>
                        </CFormSelect>
                      </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Uraian Jabatan</CFormLabel>
                        <div className="col-sm-10">
                          <CFormInput type="text" id="jobdesc" name="jobdesc" placeholder='Masukkan Uraian Jabatan'/>
                        </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Upload PPT *.ppt/.pptx</CFormLabel>
                        <div className="col-sm-10">
                          <CFormInput type="file" id="ppt" name="ppt" onChange={ (e) => setState({ ...state, ppt: e.target.files[0] }) } />
                        </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Upload CV *.doc/.docs</CFormLabel>
                        <div className="col-sm-10">
                          <CFormInput type="file" id="cv" name="cv" onChange={ (e) => setState({ ...state, cv: e.target.files[0] }) } />
                        </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Penguji 1</CFormLabel>
                      <div className="col-sm-10">
                        <CFormSelect 
                          aria-label="Default select example"
                          onChange={ (e) => 
                            setExaminers2(deleteNode(e.target.value, examiners1))
                          }>
                          <option>Choose Examiner 1</option>
                          { examiners1.map(examiner =>
                            <option value={examiner.id} key={examiner.id}>{examiner.attributes.employee.data.attributes.Name}</option>                      
                          )}
                        </CFormSelect>
                      </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Penguji 2</CFormLabel>
                      <div className="col-sm-10">
                        <CFormSelect 
                          aria-label="Default select example"
                          onChange={ (e) => 
                            setExaminers3(deleteNode(e.target.value, examiners2))
                          }>
                          <option>Choose Examiner 2</option>
                          { examiners2.map(examiner =>
                            <option value={examiner.id} key={examiner.id}>{examiner.attributes.employee.data.attributes.Name}</option>                      
                          )}
                        </CFormSelect>
                      </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Penguji 3</CFormLabel>
                      <div className="col-sm-10">
                        <CFormSelect aria-label="Default select example">
                          <option>Choose Examiner 3</option>
                          { examiners3.map(examiner =>
                            <option value={examiner.id} key={examiner.id}>{examiner.attributes.employee.data.attributes.Name}</option>                      
                          )}
                        </CFormSelect>
                      </div>
                    </CInputGroup>
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

export default Pendaftaran