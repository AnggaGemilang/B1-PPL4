import React, { Component } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
  CInputGroup,
  CFormSelect,
  CInputGroupText,
} from '@coreui/react'
import PendaftaranFitProperAPI from '../../../config/user/PendaftaranFitProperAPI'
import ExaminerAPI from '../../../config/user/DataPengujiAPI'
import LevelAPI from '../../../config/admin/LevelAPI'

export class PendaftaranFitProper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      levels: [],
      positions: [],
      examiners: [],
      nip_value: "",
      nama_karyawan: '',
      jabatan: '',
      grade: '',
      proyeksi: '',
      jenjangjabatan: '',
      jenis_fitproper:'',
      urjab:'',
      ppt: null,
      cv: null,
      level: 0,
      position: 0,
      date: "",
    };
    this.handlenipchange = this.handlenipchange.bind(this); 
    this.handlechange = this.handlechange.bind(this); 
    this.handlefile= this.handlefile.bind(this);
  }

  componentDidMount(){
    this.getLevelData()
    this.getExaminerData()
  }

  handlefile = (event) => {
    let file = event.target.files[0]
    this.setState({photo: file})
  }

  handlechange = (event) => {
    const value = event.target.value
    this.setState({[event.target.name]: value}, () => {
      console.log(this.state);
    })
  };

  handlenipchange = (event) => {
    this.setState({nip_value: event.target.value }, ()=>{
      PendaftaranFitProperAPI.findRegistrants(this.state.nip_value).then(
        (res) => {
          if(res.data.length != 0){
            console.log(res.data)
            this.setState({
              id_karyawan: res.data[0].id,              
              nama_karyawan: res.data[0].attributes.employee.data.attributes.Name,
              jabatan: res.data[0].attributes.employee.data.attributes.position.data.attributes.position_name,
              grade: res.data[0].attributes.employee.data.attributes.grade.data.attributes.grade_name,
            });
          } else {
            this.setState({
              nama_karyawan: '',
              jabatan: '',
              id: 0,
            });
          }
        },
        (err) => {
          console.log("err", err)
        }
      );
    })
  };

  getLevelData(){
    LevelAPI.get().then((res) => {
      console.log(res.data)
      this.setState({
        levels: res.data,
      })
    })
  }  

  getExaminerData(){
    ExaminerAPI.get().then((res) => {
      console.log(res.data)
      this.setState({
        examiners: res.data,
      })
    })
  }  

  postData = (event) => {
    event.preventDefault();
      const body = {
        data: {
          NIP: this.state.nip_value,
          Name: this.state.nama_karyawan,
          position: this.state.jabatan,
          grade: this.state.grade,
          position: this.state.proyeksi,
          level: this.state.jenjangjabatan,
          fitproper_type: this.state.jenis_fitproper,
          urjab: this.state.urjab,
          examiner: this.state.penguji,
        }
      };  
      PendaftaranFitProperAPI.add(body).then(
        (res) => {
          console.log(res.data.id)
          let formData = new FormData()
          formData.append('files', this.state.photo)
          formData.append('ref', 'api::employee.employee')
          formData.append('refId', res.data.id)
          formData.append('field', 'Photo')
          PendaftaranFitProperAPI.addPhoto(formData).then(
            (res) => {
              window.location = 'http://localhost:3000/masterdata#/fitproper';
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
    }

  render(){
    return (
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Pendaftaran Peserta Fit Proper</strong>
            </CCardHeader>
            <CCardBody>
                <CForm onSubmit={this.postData}>
                  <CRow className="mb-3 ">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">NIP</CFormLabel>
                        <div className="col-sm-10">
                          <CFormInput type="text" id="Nip" name="Nip" onChange={this.handlenipchange} />
                        </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Nama</CFormLabel>
                        <div className="col-sm-10">
                          <CFormInput type="input" id="Nama" placeholder='Masukkan Nama Peserta' disabled value={this.state.nama_karyawan} />
                        </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Jabatan</CFormLabel>
                        <div className="col-sm-10">
                          <CFormInput type="input" id="Jabatan" placeholder='Masukkan Jabatan Peserta' disabled value={this.state.jabatan}/>
                        </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Grade</CFormLabel>
                        <div className="col-sm-10">
                          <CFormInput type="input" id="Grade" placeholder='Masukkan Jabatan Peserta' disabled value={this.state.grade}/>
                        </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Date</CFormLabel>
                        <div className="col-sm-10">
                          <CFormInput type="date" id="Date" placeholder='Masukkan Tanggal'/>
                        </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Proyeksi</CFormLabel>
                        <div className="col-sm-10">
                          <CFormSelect id="Proyeksi" aria-label="Default select example">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </CFormSelect>
                        </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Jenjang Jabatan</CFormLabel>
                        <div className="col-sm-10">
                        <CFormSelect name="level" id="jenjangjabatan" className="mb-3" aria-label="Large select example" onChange={this.handlechange}>
                            <option>Choose Level</option>
                            { this.state.levels.map(level =>
                              <option value={ level.id } >{ level.attributes.functional_name } - { level.attributes.structural_name }</option>
                            )}
                        </CFormSelect>
                        </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                  <CInputGroup>
                    <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Jenis Fit and Propper</CFormLabel>
                      <div className="col-sm-10">
                        <CFormSelect id="JFitProper" aria-label="Default select example">
                          <option>Open this select menu</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </CFormSelect>
                      </div>
                  </CInputGroup>
                </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Pilih Uraian Jabatan</CFormLabel>
                        <div className="col-sm-10">
                          <CFormSelect id="urjab" aria-label="Default select example">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </CFormSelect>
                        </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Upload PPT *.ppt/.pptx</CFormLabel>
                        <div className="col-sm-10">
                          <CFormInput type="file" id="ppt" />
                        </div>
                    </CInputGroup>
                  </CRow> 
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Upload CV *.doc/.docs</CFormLabel>
                        <div className="col-sm-10">
                          <CFormInput type="file" id="cv" />
                        </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Penguji 1</CFormLabel>
                        <div className="col-sm-10">
                          <CFormSelect aria-label="Default select example">
                            <option>Choose Examiner</option>
                            { this.state.examiners.map(examiner =>
                              <option value={examiner.id}>{examiner.attributes.employee.data.attributes.Name}</option>                      
                            )}
                          </CFormSelect>
                        </div>
                    </CInputGroup>
                  </CRow>
                  <CRow className="mb-3">
                    <CInputGroup>
                      <CFormLabel htmlFor="input" className="col-sm-2 col-form-label">Penguji 2</CFormLabel>
                        <div className="col-sm-10">
                          <CFormSelect aria-label="Default select example">
                            <option>Choose Examiner</option>
                            { this.state.examiners.map(examiner =>
                              <option value={examiner.id}>{examiner.attributes.employee.data.attributes.Name}</option>                      
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
                            <option>Choose Examiner</option>
                            { this.state.examiners.map(examiner =>
                              <option value={examiner.id}>{examiner.attributes.employee.data.attributes.Name}</option>                      
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
      </CRow>
    )
  }
}

export default PendaftaranFitProper