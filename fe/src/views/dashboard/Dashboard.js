import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CButton,
  CTableHead,
  CTableHeaderCell,
  CTableDataCell,
  CTableRow,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem, 
  CFormLabel,
  CForm,
  CWidgetStatsC,
  CFormSelect,
  CImage,
  CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilSearch,
  cilChartPie,
  cilPeople,
  cil3d,
  cilClock,
  cilDoubleQuoteSansLeft
} from '@coreui/icons'

import logoPDF from 'src/assets/images/pdf-icon.png'
import url from "src/config/setting"
import DataPesertaAPI from 'src/config/user/DataPesertaAPI'
import PositionAPI from 'src/config/admin/PositionAPI'
import DashboardAPI from 'src/config/admin/DashboardAPI'
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const navigate = useNavigate() 

  const [registrants, setRegistrants] = useState([])
  const [projections, setProjections] = useState([])
  const [mappings, setMappings] = useState([])
  const [state, setState] = useState({
    visible: false,
    keterangan1: "",
    keterangan2: "",
    keterangan3: "",
    keterangan4: "",
    message: ""
  })

  useEffect(() => {
    if(JSON.parse(sessionStorage.getItem("auth"))?.user?.cp_role == 4){
      getKeteranganPenguji()
    } else {
      getKeteranganPublic()
    }
    axios.all([DataPesertaAPI.get(), PositionAPI.get()]).then(
      axios.spread((...res) => {
        setRegistrants(res[0]?.data.data),
        setProjections(res[1]?.data.data)
      })
    )
  }, []) 

  const getKeteranganPenguji = () => {
    axios.all([
      DashboardAPI.getKeteragan1Penguji(), 
      DashboardAPI.getKeteragan2Penguji(),
      DashboardAPI.getKeteragan3Penguji(),
      DashboardAPI.getKeteragan4Penguji()
    ]).then(
      axios.spread((...res) => {
        setState({
          ...state,
          keterangan1: res[0]?.data?.meta?.pagination?.total,
          keterangan2: res[1]?.data?.meta?.pagination?.total,
          keterangan3: res[2]?.data?.meta?.pagination?.total,
          keterangan4: res[3]?.data?.meta?.pagination?.total,
        })
      })
    )
  }

  const getKeteranganPublic = () => {
    axios.all([
      DashboardAPI.getKeteragan1Publik(), 
      DashboardAPI.getKeteragan2Publik(),
      DashboardAPI.getKeteragan3Publik(),
      DashboardAPI.getKeteragan4Publik()]).then(
      axios.spread((...res) => {
        setState({
          ...state,
          keterangan1: res[0]?.data?.meta?.pagination?.total,
          keterangan2: res[1]?.data?.meta?.pagination?.total,
          keterangan3: res[2]?.data?.meta?.pagination?.total,
          keterangan4: res[3]?.data?.meta?.pagination?.total,
        })
      })
    )
  }

  const generateData = (e) => {
    e.preventDefault()

    let query = ""

    if(JSON.parse(sessionStorage.getItem("auth"))?.user?.cp_role == 4){
      if (document.getElementById("filter_category").value != ""){
        setState({ ...state, message: "" })
        if(document.getElementById("filter_registrant").value != ""){
          query += `&filters[mapping][registrant][id][$eq]=${document.getElementById("filter_registrant").value}`
        }
        if (document.getElementById("filter_projection").value != ""){
          query += `&filters[mapping][position][id][$eq]=${document.getElementById("filter_projection").value}`
        }
        if(document.getElementById("filter_category").value == "fitproper"){
          DashboardAPI.getPenguji(query).then((res) => {
            if(res.data.data.length > 0){
              setMappings(res.data.data)
              setState({ ...state, visible: true, message: "" })
            } else {
              setState({ ...state, visible: false, message: "Data Tidak Ditemukan" })
            }
          })
        } else if (document.getElementById("filter_category").value == "interview"){
          query += `&filters[is_interview][$eq]=true`
          DashboardAPI.getPenguji(query).then((res) => {
            if(res.data.data.length > 0){
              setMappings(res.data.data)
              setState({ ...state, visible: true, message: "" })
            } else {
              setState({ ...state, visible: false, message: "Data Tidak Ditemukan" })
            }
          })
        }
      } else {
        setState({ ...state, message: "Pilih Kategori!" })
      }
    } else {
      if (document.getElementById("filter_category").value != ""){
        setState({ ...state, message: "" })
        if(document.getElementById("filter_registrant").value != ""){
          query += `&filters[registrant][id][$eq]=${document.getElementById("filter_registrant").value}`
        }
        if (document.getElementById("filter_projection").value != ""){
          query += `&filters[position][id][$eq]=${document.getElementById("filter_projection").value}`
        }
        
        if(document.getElementById("filter_category").value == "fitproper"){
          DashboardAPI.getPublic(query).then((res) => {
            if(res.data.data.length > 0){
              setMappings(res.data.data)
              setState({ ...state, visible: true, message: "" })
            } else {
              setState({ ...state, visible: false, message: "Data Tidak Ditemukan" })
            }
          })
        } else if (document.getElementById("filter_category").value == "interview"){
          query += `&filters[is_interview][$eq]=true`
          DashboardAPI.getPublic(query).then((res) => {
            if(res.data.data.length > 0){
              setMappings(res.data.data)
              setState({ ...state, visible: true, message: "" })
            } else {
              setState({ ...state, visible: false, message: "Data Tidak Ditemukan" })
            }
          })
        }
      } else {
        setState({ ...state, message: "Pilih Kategori!" })
      }
    }    
  }  

  return (
    <CRow>
      <CCol>
          { JSON.parse(sessionStorage.getItem("auth"))?.user?.cp_role != 4 ?
            <CRow>
              <CCol sm={6} md={3}>
                <CWidgetStatsC
                  color="primary"
                  icon={<CIcon icon={cilPeople} height={36} />}
                  value={ state.keterangan1 + " Orang"}
                  title="Jumlah Pegawai"
                  inverse
                  progress={{ value: 75 }}
                  className="mb-4"
                />
              </CCol>
              <CCol sm={6} md={3}>
                <CWidgetStatsC
                  color="info"
                  icon={<CIcon icon={cilPeople} height={36} />}
                  value={ state.keterangan2 + " Orang"}
                  title="Jumlah Peserta Fit & Proper"
                  inverse
                  progress={{ value: 75 }}
                  className="mb-4"
                />
              </CCol>
              <CCol sm={6} md={3}>
                <CWidgetStatsC
                  color="warning"
                  icon={<CIcon icon={cilChartPie} height={36} />}
                  value={ state.keterangan3 + " Buah"}
                  title="Pengajuan Dalam Proses"
                  inverse
                  progress={{ value: 75 }}
                  className="mb-4"
                />
              </CCol>
              <CCol sm={6} md={3}>
                <CWidgetStatsC
                  color="danger"
                  icon={<CIcon icon={cilDoubleQuoteSansLeft} height={36} />}
                  value={ state.keterangan4 + " Buah"}
                  title="Pengajuan Selesai"
                  inverse
                  progress={{ value: 75 }}
                  className="mb-4"
                />   
              </CCol>
            </CRow>
            :
            <CRow>
              <CCol sm={6} md={3}>
                <CWidgetStatsC
                  color="primary"
                  icon={<CIcon icon={cilChartPie} height={36} />}
                  value={ state.keterangan1 + " Buah"}
                  title="Fit & Proper Belum Dinilai"
                  inverse
                  progress={{ value: 75 }}
                  className="mb-4"
                />
              </CCol>
              <CCol sm={6} md={3}>
                <CWidgetStatsC
                  color="info"
                  icon={<CIcon icon={cil3d} height={36} />}
                  value={ state.keterangan2 + " Buah"}
                  title="Wawancara Belum Dinilai"
                  inverse
                  progress={{ value: 75 }}
                  className="mb-4"
                />
              </CCol>
              <CCol sm={6} md={3}>
                <CWidgetStatsC
                  color="warning"
                  icon={<CIcon icon={cilClock} height={36} />}
                  value={ state.keterangan3 + " Buah"}
                  title="Fit & Proper Telah Dinilai"
                  inverse
                  progress={{ value: 75 }}
                  className="mb-4"
                />
              </CCol>
              <CCol sm={6} md={3}>
                <CWidgetStatsC
                  color="danger"
                  icon={<CIcon icon={cilDoubleQuoteSansLeft} height={36} />}
                  value={ state.keterangan4 + " Buah"}
                  title="Wawancara Telah Dinilai"
                  inverse
                  progress={{ value: 75 }}
                  className="mb-4"
                />   
              </CCol>    
            </CRow>
          }
          <CRow>
            <CCol xs={12}>
              { state?.message && <CAlert color="danger" dismissible onClose={() => { setState({ ...state, message: "" }) }}> { state?.message } </CAlert> }
            </CCol>             
          </CRow>
          <CRow>
            <CCol xs={12} className="mt-2">
              <CAccordion>
                <CAccordionItem itemKey={1}>
                  <CAccordionHeader><CIcon icon={cilSearch} style={{ marginRight: "10px" }}/>Pencarian Data</CAccordionHeader>
                  <CAccordionBody>
                    <CForm onSubmit={generateData}>
                      <CRow className='mt-2'>
                        <CCol xs={6}>
                          <CFormLabel htmlFor="exampleFormControlInput1">Peserta</CFormLabel>
                          <CFormSelect name="filter_registrant" id="filter_registrant" aria-label="Large select example">
                            <option value="">Pilih Peserta</option>
                            { registrants?.map(registrant =>
                              <option key={ registrant.id } value={ registrant.id } >{ registrant?.attributes?.employee?.data?.attributes?.Name }</option>
                            )}
                          </CFormSelect>
                        </CCol>
                        <CCol xs={6}>
                          <CFormLabel htmlFor="filter_usefor">Proyeksi</CFormLabel>
                          <CFormSelect name="filter_projection" id="filter_projection" aria-label="Large select example">
                            <option value="">Pilih Proyeksi</option>
                            { projections?.map(projection =>
                              <option value={ projection.id } key={ projection.id } >{ projection.attributes.position_name }</option>
                            )}
                          </CFormSelect>
                        </CCol>
                      </CRow>
                      <CRow className='mt-2'>
                        <CCol xs={12}>
                          <CFormLabel htmlFor="exampleFormControlInput1">Kategori</CFormLabel>
                          <CFormSelect name="filter_category" id="filter_category" aria-label="Large select example">
                            <option value="">Pilih Kategori</option>
                            <option value="fitproper">Fit & Proper</option>
                            <option value="interview">Wawancara</option>
                          </CFormSelect>
                        </CCol>
                      </CRow>                      
                      <CRow>
                        <hr className='mt-4' style={{ marginLeft: "12px", width: "97.6%" }} />
                      </CRow>
                      <CRow>
                        <CCol style={{ display: "flex", justifyContent: "right" }}>
                          <CButton
                              type='submit'
                              color='primary'
                              style={{ width:'10%', borderRadius: "50px", fontSize: "14px" }} >
                              <CIcon icon={cilSearch} style={{ marginRight: "10px", color: "#FFFFFF" }}/>
                                Cari
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CAccordionBody>
                </CAccordionItem>
              </CAccordion>
            </CCol>    
            <CCol xs={12} >
              { state.visible ? 
                <CCard className="mt-3">
                  <CCardHeader>
                    <strong>Pencarian Data Fit Proper dan Wawancara</strong>
                  </CCardHeader>
                  { JSON.parse(sessionStorage.getItem("auth"))?.user?.cp_role != 4 ?
                    <CCardBody style={{ overflowX: "auto"}}>
                    { document.getElementById("filter_category").value == "fitproper" ?
                      <CTable striped className='mt-3 text-center'>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">No</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Foto</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                            <CTableHeaderCell scope="col">NIP</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Jabatan Sebelumnya</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Proyeksi</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Jenjang Sebelumnya</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Jenjang</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Uraian Jabatan</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Tanggal</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Penguji</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Lampiran File</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          { mappings.map( (mapping, index) =>
                            <CTableRow key={mapping.id}>
                              <CTableHeaderCell scope="row">{ index+1 }</CTableHeaderCell>
                              <CTableDataCell>
                                <img className='foto_karyawan' src={url + mapping?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes?.Photo?.data?.attributes?.formats?.thumbnail?.url} alt="Photo" />                      
                              </CTableDataCell>
                              <CTableDataCell>{mapping?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes.Name}</CTableDataCell>
                              <CTableDataCell>{mapping?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes.NIP}</CTableDataCell>
                              <CTableDataCell>{mapping?.attributes?.position_current?.data?.attributes?.position_name}</CTableDataCell>
                              <CTableDataCell>{mapping?.attributes?.position?.data?.attributes?.position_name}</CTableDataCell>
                              <CTableDataCell>{mapping?.attributes?.level_current?.data?.attributes?.functional_name} - {mapping?.attributes?.level_current?.data?.attributes?.structural_name}</CTableDataCell>
                              <CTableDataCell>{mapping?.attributes?.level?.data?.attributes?.functional_name} - {mapping?.attributes?.level?.data?.attributes?.structural_name}</CTableDataCell>
                              <CTableDataCell>{mapping?.attributes?.jobdesc}</CTableDataCell>
                              <CTableDataCell>{mapping?.attributes?.schedule}</CTableDataCell>
                              <CTableDataCell>
                                <ul>
                                  { mapping.attributes.examiners.data.map(examiner  => (
                                    <li style={{ textAlign: "left", marginBottom: "4px" }} key={examiner.id}>{examiner.attributes.employee.data.attributes.Name}</li>
                                  ))}
                                </ul>
                              </CTableDataCell>
                              <CTableDataCell>
                                <ul>
                                  <li style={{ textAlign: "left", marginBottom: "4px" }}>
                                    <p>CV</p>
                                    <a target="_blank" href={url + mapping?.attributes?.registrant?.data?.attributes?.cv?.data?.attributes?.url }><CImage style={{ marginTop: "-10px", marginLeft: "-5px" }} src={logoPDF} height={35} /></a>
                                  </li>
                                  <li style={{ textAlign: "left" }}>
                                    <p>PPT</p>
                                    <a target="_blank" href={ url + mapping?.attributes?.registrant?.data?.attributes?.ppt?.data?.attributes?.url }><CImage style={{ marginTop: "-10px", marginLeft: "-5px" }} src={logoPDF} height={35} /></a>
                                  </li>                            
                                </ul>
                              </CTableDataCell>
                              <CTableDataCell>
                                {mapping?.attributes?.status == "on_progress" 
                                  ? "Belum Finalisasi" 
                                  : mapping?.attributes?.status == "passed" 
                                    ? "Sudah Finalisasi" + '\n' + "(Lulus)"
                                    : "Sudah Finalisasi" + '\n' + "(Tidak Lulus)" 
                                }
                              </CTableDataCell>
                              <CTableDataCell>
                                <CButton
                                  color='success'
                                  variant="outline"
                                  onClick={() => navigate(
                                    '/fitandproper/datapenilaian/datanilai', 
                                    { state: { position: mapping?.attributes?.position?.data?.id, registrant: mapping?.attributes?.registrant?.data?.id } }
                                  )}
                                  style={{width: '75px', marginBottom: '10px'}} >
                                  Lihat Nilai
                                </CButton>
                              </CTableDataCell>
                            </CTableRow>
                          )}
                        </CTableBody>
                      </CTable>
                    : 
                      <CTable striped className='mt-3 text-center'>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">No</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Foto</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                            <CTableHeaderCell scope="col">NIP</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Jabatan Sebelumnya</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Proyeksi</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Jenjang Sebelumnya</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Jenjang</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Uraian Jabatan</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Penguji</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          { mappings.map( (mapping, index) =>
                            <CTableRow key={mapping.id}>
                              <CTableHeaderCell scope="row">{ index+1 }</CTableHeaderCell>
                              <CTableDataCell>
                                <img className='foto_karyawan' src={url + mapping?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes?.Photo?.data?.attributes?.formats?.thumbnail?.url} alt="Photo" />                      
                              </CTableDataCell>
                              <CTableDataCell>{mapping?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes.Name}</CTableDataCell>
                              <CTableDataCell>{mapping?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes.NIP}</CTableDataCell>
                              <CTableDataCell>{mapping?.attributes?.position_current?.data?.attributes?.position_name}</CTableDataCell>
                              <CTableDataCell>{mapping?.attributes?.position?.data?.attributes?.position_name}</CTableDataCell>
                              <CTableDataCell>{mapping?.attributes?.level_current?.data?.attributes?.functional_name} - {mapping?.attributes?.level_current?.data?.attributes?.structural_name}</CTableDataCell>
                              <CTableDataCell>{mapping?.attributes?.level?.data?.attributes?.functional_name} - {mapping?.attributes?.level?.data?.attributes?.structural_name}</CTableDataCell>
                              <CTableDataCell>{mapping?.attributes?.jobdesc}</CTableDataCell>
                              <CTableDataCell>
                                <ul>
                                  { mapping?.attributes?.examiners_interview?.data?.map(examiner  => (
                                    <li style={{ textAlign: "left", marginBottom: "4px" }} key={examiner.id}>{examiner.attributes.employee.data.attributes.Name}</li>
                                  ))}
                                </ul>
                              </CTableDataCell>
                              <CTableDataCell>
                                <CButton
                                  color='success'
                                  variant="outline"
                                  onClick={() => navigate(
                                    '/wawancara/datapenilaian/datanilai', 
                                    { state: {
                                      position: mapping?.attributes?.position?.data?.id, 
                                      registrant: mapping?.attributes?.registrant?.data?.id 
                                    } }
                                  )}
                                  style={{width: '75px', marginBottom: '10px'}} >
                                    Lihat Nilai
                                </CButton>                   
                              </CTableDataCell>
                            </CTableRow>
                          )}
                        </CTableBody>
                      </CTable>
                    }
                    </CCardBody>
                  :
                    <CCardBody style={{ overflowX: "auto"}}>
                    { document.getElementById("filter_category").value == "fitproper" ?
                      <CTable striped className='mt-3 text-center'>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">No</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Foto</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                            <CTableHeaderCell scope="col">NIP</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Jabatan Sebelumnya</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Proyeksi</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Jenjang Sebelumnya</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Jenjang</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Uraian Jabatan</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Tanggal</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Lampiran File</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          { mappings.map( (linemapping, index) =>
                            <CTableRow key={linemapping.id}>
                              <CTableHeaderCell scope="row">{ index+1 }</CTableHeaderCell>
                              <CTableDataCell>
                                <img className='foto_karyawan' src={url + linemapping?.attributes?.mapping?.data?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes?.Photo?.data?.attributes?.formats?.thumbnail?.url} alt="Photo" />                      
                              </CTableDataCell>
                              <CTableDataCell>{linemapping?.attributes?.mapping?.data?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes.Name}</CTableDataCell>
                              <CTableDataCell>{linemapping?.attributes?.mapping?.data?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes.NIP}</CTableDataCell>
                              <CTableDataCell>{linemapping?.attributes?.mapping?.data?.attributes?.position_current?.data?.attributes?.position_name}</CTableDataCell>
                              <CTableDataCell>{linemapping?.attributes?.mapping?.data?.attributes?.position?.data?.attributes?.position_name}</CTableDataCell>
                              <CTableDataCell>{linemapping?.attributes?.mapping?.data?.attributes?.level_current?.data?.attributes?.functional_name} - {linemapping?.attributes?.mapping?.data?.attributes?.level_current?.data?.attributes?.structural_name}</CTableDataCell>
                              <CTableDataCell>{linemapping?.attributes?.mapping?.data?.attributes?.level?.data?.attributes?.functional_name} - {linemapping?.attributes?.mapping?.data?.attributes?.level?.data?.attributes?.structural_name}</CTableDataCell>
                              <CTableDataCell>{linemapping?.attributes?.mapping?.data?.attributes?.jobdesc}</CTableDataCell>
                              <CTableDataCell>{linemapping?.attributes?.mapping?.data?.attributes?.schedule}</CTableDataCell>
                              <CTableDataCell>
                                <ul>
                                    <li style={{ textAlign: "left", marginBottom: "4px" }}>
                                      <p>CV</p>
                                      <a target="_blank" href={url + linemapping?.attributes?.mapping?.data?.attributes?.registrant?.data?.attributes?.cv?.data?.attributes?.url }><CImage style={{ marginTop: "-10px", marginLeft: "-5px" }} src={logoPDF} height={35} /></a>
                                    </li>
                                    <li style={{ textAlign: "left" }}>
                                      <p>PPT</p>
                                      <a target="_blank" href={ url + linemapping?.attributes?.mapping?.data?.attributes?.registrant?.data?.attributes?.ppt?.data?.attributes?.url }><CImage style={{ marginTop: "-10px", marginLeft: "-5px" }} src={logoPDF} height={35} /></a>
                                    </li>                            
                                </ul>
                              </CTableDataCell>
                              <CTableDataCell>
                                { linemapping?.attributes?.status_fitproper
                                    ? linemapping?.attributes?.passed_fitproper == "passed" 
                                      ? "Sudah Dinilai" + '\n' + "(Lulus)"
                                      : "Sudah Dinilai" + '\n' + "(Tidak Lulus)"
                                    : "Belum Dinilai"
                                }                                            
                              </CTableDataCell>                              
                              <CTableDataCell>
                                { (linemapping?.attributes?.status_fitproper) ? 
                                  <CButton
                                    color='success'
                                    variant="outline"
                                    style={{width: '105px', margin: '5px 5px'}}
                                    onClick={() => navigate(
                                      '/fitandproper/datapenilaian/datanilai', 
                                      { state: { 
                                          position: linemapping?.attributes?.mapping?.data?.attributes?.position?.data?.id, 
                                          registrant: linemapping?.attributes?.mapping?.data?.attributes?.registrant?.data?.id,
                                          examiner: linemapping?.attributes?.examiner?.data?.id
                                      }}
                                    )}>
                                      Lihat Nilai
                                  </CButton>
                                  : null
                                }
                                { (linemapping?.attributes?.status_fitproper && !linemapping?.attributes?.fitproper_finalized) ? 
                                  <CButton
                                    color='warning'
                                    variant="outline"
                                    style={{width: '105px', margin: '5px 5px'}}
                                    onClick={() => navigate(
                                      '/fitandproper/datapenilaian/nilai/edit', 
                                      { state: { data: linemapping, status: 'edit' }}
                                    )}>
                                      Edit
                                  </CButton>
                                  : null
                                }                                  
                                { (!linemapping?.attributes?.status_fitproper) ?
                                  <CButton
                                    color='primary'
                                    variant="outline" 
                                    style={{width: '105px', margin: '5px 5px'}}
                                    onClick={() => navigate(
                                      '/fitandproper/datapenilaian/nilai', 
                                      { state: { data: linemapping, status: 'tambah' } }
                                    )}>
                                      Nilai
                                  </CButton>
                                  : null
                                }    
                              </CTableDataCell>
                            </CTableRow>
                          )}
                        </CTableBody>
                      </CTable>
                    :
                      <CTable striped className='mt-3 text-center'>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">No</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Foto</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                            <CTableHeaderCell scope="col">NIP</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Jabatan Sebelumnya</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Proyeksi</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Jenjang Sebelumnya</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Jenjang</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Uraian Jabatan</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Tanggal</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          { mappings.map( (linemapping, index) =>
                            <CTableRow key={linemapping.id}>
                              <CTableHeaderCell scope="row">{ index+1 }</CTableHeaderCell>
                              <CTableDataCell>
                                <img className='foto_karyawan' src={url + linemapping?.attributes?.mapping?.data?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes?.Photo?.data?.attributes?.formats?.thumbnail?.url} alt="Photo" />                      
                              </CTableDataCell>
                              <CTableDataCell>{linemapping?.attributes?.mapping?.data?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes.Name}</CTableDataCell>
                              <CTableDataCell>{linemapping?.attributes?.mapping?.data?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes.NIP}</CTableDataCell>
                              <CTableDataCell>{linemapping?.attributes?.mapping?.data?.attributes?.position_current?.data?.attributes?.position_name}</CTableDataCell>
                              <CTableDataCell>{linemapping?.attributes?.mapping?.data?.attributes?.position?.data?.attributes?.position_name}</CTableDataCell>
                              <CTableDataCell>{linemapping?.attributes?.mapping?.data?.attributes?.level_current?.data?.attributes?.functional_name} - {linemapping?.attributes?.mapping?.data?.attributes?.level_current?.data?.attributes?.structural_name}</CTableDataCell>
                              <CTableDataCell>{linemapping?.attributes?.mapping?.data?.attributes?.level?.data?.attributes?.functional_name} - {linemapping?.attributes?.mapping?.data?.attributes?.level?.data?.attributes?.structural_name}</CTableDataCell>
                              <CTableDataCell>{linemapping?.attributes?.mapping?.data?.attributes?.jobdesc}</CTableDataCell>
                              <CTableDataCell>{linemapping?.attributes?.schedule_interview}</CTableDataCell>
                              <CTableDataCell>
                                { linemapping?.attributes?.status_interview
                                    ? linemapping?.attributes?.passed_interview == "passed" 
                                      ? "Sudah Dinilai" + '\n' + "(Lulus)"
                                      : "Sudah Dinilai" + '\n' + "(Tidak Lulus)"
                                    : "Belum Dinilai"
                                }                                            
                              </CTableDataCell>
                              <CTableDataCell>
                                { (linemapping?.attributes?.status_interview) ? 
                                  <CButton
                                    color='success'
                                    variant="outline"
                                    style={{width: '105px', margin: '5px 5px'}}
                                    onClick={() => navigate(
                                      '/wawancara/datapenilaian/datanilai', 
                                      { state: { 
                                          position: linemapping?.attributes?.mapping?.data?.attributes?.position?.data?.id, 
                                          registrant: linemapping?.attributes?.mapping?.data?.attributes?.registrant?.data?.id,
                                          examiner: linemapping?.attributes?.examiner?.data?.id
                                      }}
                                    )}>
                                      Lihat Nilai
                                  </CButton>
                                  : null
                                }
                                { (linemapping?.attributes?.status_interview && !linemapping?.attributes?.interview_finalized) ? 
                                  <CButton
                                    color='warning'
                                    variant="outline"
                                    style={{width: '105px', margin: '5px 5px'}}
                                    onClick={() => navigate(
                                      '/wawancara/datapenilaian/nilai/edit', 
                                      { state: { data: linemapping, status: 'edit' }}
                                    )}>
                                      Edit
                                  </CButton>
                                  : null
                                }                     
                                { (!linemapping?.attributes?.status_interview) ?
                                  <CButton
                                    color='primary'
                                    variant="outline" 
                                    style={{width: '105px', margin: '5px 5px'}}
                                    onClick={() => navigate(
                                      '/wawancara/datapenilaian/nilai', 
                                      { state: { data: linemapping, status: 'tambah' } }
                                    )}>
                                      Nilai
                                  </CButton>
                                  : null
                                }    
                              </CTableDataCell>
                            </CTableRow>
                          )}
                        </CTableBody>
                      </CTable>      
                    }
                    </CCardBody>
                  }
                </CCard>
                : null
              }             
            </CCol>          
          </CRow>
        </CCol>
      </CRow>
    )
}

export default Dashboard
