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
  CAlert,
  CImage
} from '@coreui/react'
import {useNavigate, useLocation} from 'react-router-dom'
import MappingAPI from '../../../config/user/MappingAPI'
import FitAndProperAPI from '../../../config/user/FitAndProperAPI'
import DataPengujiAPI from '../../../config/user/DataPengujiAPI'
import DataPesertaAPI from '../../../config/user/DataPesertaAPI'
import LevelAPI from '../../../config/admin/LevelAPI'
import PositionAPI from 'src/config/admin/PositionAPI'
import url from "../../../config/setting"
import logoPDF from 'src/assets/images/pdf-icon.png'

const Pendaftaran = () => {
  const navigate = useNavigate();  
  const location = useLocation();

  const [nipValue, setNipValue] = useState("")
  const [examiners1, setExaminers1] = useState([])
  const [examiners2, setExaminers2] = useState([])
  const [examiners3, setExaminers3] = useState([])
  const [positions, setPositions] = useState([])
  const [levels, setLevels] = useState([])
  const [state, setState] = useState({
    errorMessage: "",
    ppt: null,
    cv: null,
    registrant: null,
    data: location?.state?.data,
    status: location?.state?.status    
  });

  useEffect(() => {
    getExaminerData()
    if (nipValue.length > 1) {
      FitAndProperAPI.findRegistrants(nipValue).then(
      (res) => {
        if(res.data.length == 1){
          setState({
            ...state,
            registrant: res.data[0],
          });
        } 
        else {
          setState({ ...state, registrant: null })
        }
      });
    }
    getLevelData()
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
      if(state.status == "edit"){
        setNipValue(state?.data?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes?.NIP      )
        setExaminers2(res.data)
        setExaminers3(res.data)
      }
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
    let examinersVal = []
    for(let i = 1; i < 4; i++){
      if(document.querySelector("#penguji"+i).value != 0){
        examinersVal.push(parseInt(document.querySelector("#penguji"+i).value))
      }
    }

    if(state.status == "tambah"){
      const body = {
        data: {
          examiners: examinersVal,
          registrant: state?.registrant?.id,
          jobdesc: document.getElementById("jobdesc").value,
          schedule: document.getElementById("schedule").value,
          fitproper_type: document.getElementById("fitproper_type").value,
          level: document.getElementById("level").value,
          position: document.getElementById("projection").value,
        }
      };  
      MappingAPI.add(body).then(
        (res) => {
          for(let i = 0; i < examinersVal.length; i++){
            const body = {
              data: {
                mapping: res.data.id,
                examiner: examinersVal[i],
                status_fitproper: false,
                status_interview: false
              }
            }; 
            FitAndProperAPI.addLineMapping(body).then(
              (res) => {
                console.log("success", res)
              }, 
              (err) => {
                console.log("err", err)
              }
            )
          }
          if(state?.registrant?.attributes?.cv?.data != null){
            DataPesertaAPI.deletePhoto(state?.registrant?.attributes?.cv?.data?.id).then(res => {
              console.log("CV Dihapus dulu")
            })
          }
          if(state?.registrant?.attributes?.ppt?.data != null){
            DataPesertaAPI.deletePhoto(state?.registrant?.attributes?.ppt?.data?.id).then(res => {
              console.log("PPT Dihapus dulu")
            })
          }
          let formData = new FormData()
          formData.append('files', state.ppt)
          formData.append('ref', 'api::registrant.registrant')
          formData.append('refId', state?.registrant?.id)
          formData.append('field', 'ppt')
          DataPesertaAPI.addFile(formData).then(
            (res) => {
              let formData = new FormData()
              formData.append('files', state.cv)
              formData.append('ref', 'api::registrant.registrant')
              formData.append('refId', state?.registrant?.id)
              formData.append('field', 'cv')
              DataPesertaAPI.addFile(formData).then(
                (res) => {
                  navigate('/fitandproper', {state: { successMessage: 'Pendaftaran Berhasil' } });
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
        },
        (err) => {
          console.log("err", err);
        }
      );   
    } else {
      const body = {
        data: {
          examiners: examinersVal,
          registrant: state?.registrant?.id,
          jobdesc: document.getElementById("jobdesc").value,
          schedule: document.getElementById("schedule").value,
          fitproper_type: document.getElementById("fitproper_type").value,
          level: document.getElementById("level").value,
          position: document.getElementById("projection").value,
        }
      };  
      MappingAPI.edit(state?.data?.id, body).then(
        (res) => {
          for(let i = 0; i < examinersVal.length; i++){
            const body = {
              data: {
                mapping: res.data.id,
                examiner: examinersVal[i],
                status_fitproper: false,
                status_interview: false
              }
            };
            MappingAPI.addLineMapping(body).then(
              (res) => {
                console.log("success", res)
              }, 
              (err) => {
                console.log("err", err)
              }
            )
          }
          if(state.ppt != null){
            if(state?.registrant?.attributes?.cv?.data != null){
              DataPesertaAPI.deletePhoto(state?.registrant?.attributes?.ppt?.data?.id).then(res => {
                console.log("Hapus foto berhasil")
              })
            }
            let formData = new FormData()
            formData.append('files', state.ppt)
            formData.append('ref', 'api::registrant.registrant')
            formData.append('refId', state?.registrant?.id)
            formData.append('field', 'ppt')
            DataPesertaAPI.addFile(formData).then(
              (res) => {
                console.log("success", res);
              },
              (err) => {
                console.log("err", err);
              }
            );            
          }
          if(state.cv != null){
            if(state?.registrant?.attributes?.cv?.data != null){
              DataPesertaAPI.deletePhoto(state?.registrant?.attributes?.cv?.data?.id).then(res => {
                console.log("Foto berhasil dihapus")
              })
            }
            let formData = new FormData()
            formData.append('files', state.cv)
            formData.append('ref', 'api::registrant.registrant')
            formData.append('refId', state?.registrant?.id)
            formData.append('field', 'cv')
            DataPesertaAPI.addFile(formData).then(
              (res) => {
                console.log("success", res);
              },
              (err) => {
                console.log("err", err);
              }
            );            
          }
          navigate('/fitandproper', {state: { successMessage: 'Pendaftaran Berhasil Diperbaharui' } });
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
          { state.errorMessage && <CAlert color="danger" dismissible onClose={() => { setState({errorMessage:""}) }}> { state.errorMessage } </CAlert> }
        </CCol>
        <CCol xs={12}>                
          <CCard className="mb-4">
            <CCardHeader>
              <strong>{ state.status == "tambah" ? "Pendaftaran" : "Edit"} Peserta Fit Proper</strong>
            </CCardHeader>
            <CCardBody>
                <CForm onSubmit={postData}>
                  <CRow className="mb-3 ">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">NIP</CFormLabel>
                      <div className="col-sm-10">
                        <CFormInput 
                          type="text" 
                          id="nip" 
                          name="nip" 
                          disabled={ state.status == "edit" }
                          defaultValue={ state.status == "edit" ? state?.data?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes.NIP : ""}
                          onChange={(e) => setNipValue(e.target.value)} placeholder="Masukkan NIP . . ." />
                      </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Nama</CFormLabel>
                        <div className="col-sm-10">
                          <CFormInput 
                            type="input" 
                            id="name" 
                            name="name" 
                            placeholder='Masukkan Nama Peserta' 
                            disabled
                            value={state?.registrant?.attributes?.employee?.data?.attributes?.Name} />
                        </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Jabatan</CFormLabel>
                        <div className="col-sm-10">
                          <CFormInput
                            type="input" 
                            id="position" 
                            name="position" 
                            placeholder='Masukkan Jabatan Peserta' 
                            disabled 
                            value={state?.registrant?.attributes?.employee?.data?.attributes?.position?.data?.attributes?.position_name}/>
                        </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Grade</CFormLabel>
                        <div className="col-sm-10">
                          <CFormInput 
                            type="input" 
                            id="grade" 
                            name="grade" 
                            placeholder='Masukkan Grade Peserta' 
                            disabled 
                            value={state?.registrant?.attributes?.employee?.data?.attributes?.position?.data?.attributes?.grade?.data?.attributes?.grade_name}/>
                        </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Jadwal Pelaksanaan</CFormLabel>
                        <div className="col-sm-10">
                          <CFormInput 
                            type="date" 
                            id="schedule" 
                            name="schedule"s
                            defaultValue={ state.status == "edit" ? state?.data?.attributes?.schedule : ""}
                            placeholder='Masukkan Tanggal'/>
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
                              <option selected={state.status == "edit" && state?.data?.attributes?.position?.data?.id == position.id } value={ position.id } key={ position.id } >{ position.attributes.position_name }</option>
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
                              <option selected={state.status == "edit" && state?.data?.attributes?.level?.data?.id == level.id } value={ level.id } key={ level.id } >{ level.attributes.functional_name } - { level.attributes.structural_name }</option>
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
                          <option selected={state.status == "edit" && state?.data?.attributes?.fitproper_type == "Offline" } value="Offline">Offline</option>
                          <option selected={state.status == "edit" && state?.data?.attributes?.fitproper_type == "Vcon" } value="Vcon">Vcon</option>
                        </CFormSelect>
                      </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Uraian Jabatan</CFormLabel>
                        <div className="col-sm-10">
                          <CFormInput 
                            type="text" 
                            id="jobdesc" 
                            name="jobdesc" 
                            defaultValue={ state.status == "edit" ? state?.data?.attributes?.jobdesc : "" }
                            placeholder='Masukkan Uraian Jabatan'/>
                        </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Upload PPT *.ppt/.pptx</CFormLabel>
                        <div className="col-sm-10">
                          { state.status == "edit" ? <a target="_blank" href={url + state?.data?.attributes?.registrant?.data?.attributes?.ppt?.data?.attributes?.url }><CImage style={{ marginTop: "-10px", marginLeft: "-5px", marginBottom: "10px", width: "70px", height: "70px" }} src={logoPDF} height={35} /></a> : null }                         
                          <CFormInput type="file" id="ppt" name="ppt" onChange={ (e) => setState({ ...state, ppt: e.target.files[0] }) } />
                        </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Upload CV *.doc/.docs</CFormLabel>
                        <div className="col-sm-10">
                          { state.status == "edit" ? <a target="_blank" href={url + state?.data?.attributes?.registrant?.data?.attributes?.cv?.data?.attributes?.url }><CImage style={{ marginTop: "-10px", marginLeft: "-5px", marginBottom: "10px", width: "70px", height: "70px" }} src={logoPDF} height={35} /></a> : null }
                          <CFormInput type="file" id="cv" name="cv" onChange={ (e) => setState({ ...state, cv: e.target.files[0] }) } />
                        </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Penguji 1</CFormLabel>
                      <div className="col-sm-10">
                        <CFormSelect 
                          name="penguji1" 
                          id="penguji1" 
                          aria-label="Large select example"
                          onChange={ (e) => 
                            setExaminers2(deleteNode(e.target.value, examiners1))
                          }>
                          <option value="0">Pilih Penguji 1</option>
                          { examiners1.map(examiner =>
                            <option selected={state.status == "edit" && state?.data?.attributes?.examiners?.data[0]?.id == examiner?.id } value={examiner?.id} key={examiner?.id}>{examiner?.attributes?.employee?.data?.attributes?.Name}</option>                      
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
                          name="penguji2" 
                          id="penguji2" 
                          aria-label="Large select example"
                          onChange={ (e) => 
                            setExaminers3(deleteNode(e.target.value, examiners2))
                          }>
                          <option value="0">Pilih Penguji 2</option>
                          { examiners2.map(examiner =>
                            <option selected={state.status == "edit" && state?.data?.attributes?.examiners?.data[1]?.id == examiner?.id } value={examiner?.id} key={examiner?.id}>{examiner?.attributes?.employee?.data?.attributes?.Name}</option>                      
                          )}
                        </CFormSelect>
                      </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Penguji 3</CFormLabel>
                      <div className="col-sm-10">
                        <CFormSelect name="penguji3" id="penguji3" aria-label="Large select example">
                          <option value="0">Pilih Penguji 3</option>
                          { examiners3.map(examiner =>
                            <option selected={state.status == "edit" && state?.data?.attributes?.examiners?.data[2]?.id == examiner?.id } value={examiner?.id} key={examiner?.id}>{examiner?.attributes?.employee?.data?.attributes?.Name}</option>                      
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