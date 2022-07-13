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
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem, 
  CFormLabel,
  CAlert,
  CForm,
  CFormSelect  
} from '@coreui/react'
import { useLocation } from "react-router-dom"
import { cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import MappingAPI from '../../../config/user/MappingAPI'
import PositionAPI from '../../../config/admin/PositionAPI'
import FitAndProperAPI from '../../../config/user/FitAndProperAPI'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import url from "../../../config/setting"
import axios from "axios"
import LevelAPI from 'src/config/admin/LevelAPI'

const CetakRekapWawancara = () => {
  const location = useLocation()

  const [lineMappings, setLineMappings] = useState([])  
  const [positions, setPositions] = useState([])
  const [levels, setLevels] = useState([])    
  const [mappings, setMappings] = useState([])
  const [message, setMessage] = useState("")

  useEffect(() => {
    setMessage(location?.state?.successMessage)
    getData()
    axios.all([PositionAPI.get(), LevelAPI.get()]).then(
      axios.spread((...res) => {
        console.log(res)
        setPositions(res[0].data.data),
        setLevels(res[1].data.data)
      })
    )
  }, [])  

  const filterSearch = (e) => {
    e.preventDefault()

    let query = ""
    if(document.getElementById("filter_nama").value.length != 0){
      query += `&filters[registrant][employee][Name][$contains]=${document.getElementById("filter_nama").value}`
    }
    if(document.getElementById("filter_nip").value.length != 0){
      query += `&filters[registrant][employee][NIP][$contains]=${document.getElementById("filter_nip").value}`
    }
    if(document.getElementById("filter_position_before").value.length != 0){
      query += `&filters[position_current][id][$eq]=${document.getElementById("filter_position_before").value}`
    }
    if(document.getElementById("filter_projection").value.length != 0){
      query += `&filters[position][id][$eq]=${document.getElementById("filter_projection").value}`
    }
    if(document.getElementById("filter_level_before").value.length != 0){
      query += `&filters[level_current][id][$eq]=${document.getElementById("filter_level_before").value}`
    }
    if(document.getElementById("filter_level").value.length != 0){
      query += `&filters[level][id][$eq]=${document.getElementById("filter_level").value}`
    }
    if(document.getElementById("filter_jobdesc").value.length != 0){
      query += `&filters[jobdesc][$contains]=${document.getElementById("filter_jobdesc").value}`
    }
    if(document.getElementById("filter_schedule").value.length != 0){
      query += `&filters[schedule][$eq]=${document.getElementById("filter_schedule").value}`
    }

    MappingAPI.findWawancara(query).then((res) => {
      setMappings(res.data.data)
    })
  }
  
  const getData = () => {
    MappingAPI.getWawancara().then((res) => {
      setMappings(res.data.data)
    })
  }

  const generatePDF = (e) => {
    if(e.target.getAttribute("status") == "on_progress"){
      setMessage("Penguji Belum Selesai Menilai!")
    } else {
      setMessage("")

      const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

      const date = new Date()
      const day = date.getDate()
      const month = date.getMonth()
      var yy = date.getYear()
      var year = (yy < 1000) ? yy + 1900 : yy

      FitAndProperAPI.getRekapManualWawancara(e.target.getAttribute("registrant_val"), e.target.getAttribute("projection_val")).then((res) => {
        if(res.data.data.length != 0){
          setLineMappings(res.data.data)
  
          var doc = new jsPDF({
              orientation: 'l',
              unit: 'pt',
              format: 'a4'        
          })
  
          doc.setFontSize("18")
          doc.setFont('helvetica', 'bold')
          doc.text(290, 50, "Laporan Hasil Wawancara")        
          doc.setFontSize("12")
          doc.text(40, 90, "Nama Peserta")
          doc.text(40, 110, "NIP")
          doc.text(40, 130, "Jabatan Proyeksi")
          doc.text(40, 150, "Jenjang")
          doc.setFont('helvetica', 'normal')
          doc.text(150, 90, ": " + res.data.data[0].attributes?.mapping?.data?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes?.Name)
          doc.text(150, 110, ": " + res.data.data[0].attributes?.mapping?.data?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes?.NIP)
          doc.text(150, 130, ": " + res.data.data[0].attributes?.mapping?.data?.attributes?.position?.data?.attributes?.position_name)
          doc.text(150, 150, ": " + res.data.data[0].attributes?.mapping?.data?.attributes?.level?.data?.attributes?.functional_name + " - " + res.data.data[0].attributes?.mapping?.data?.attributes?.level?.data?.attributes?.structural_name)
  
          doc.autoTable({
            startY: 175,
            html: '#my-table',
          })
  
          let finalY = doc.lastAutoTable.finalY
  
          doc.setFontSize("12")
          doc.text(40, finalY+=30, "Dengan ini, anda dinyatakan . . .")        
          doc.setFont('helvetica', 'bold')
          doc.setFontSize("18")
  
          let status = ""
          if(res.data.data[0].attributes?.mapping?.data?.attributes?.status == "passed"){
            status = "Lolos"
          } else if(res.data.data[0].attributes?.mapping?.data?.attributes?.status == "not_passed"){
            status = "Tidak Lolos"
          } else {
            status = "Penguji Belum Menilai Semua"
          }
  
          doc.text(40, finalY+=25, status)
  
          doc.setFontSize("12")
          doc.setFont('helvetica', 'normal')
  
          doc.text(40, finalY+=38, "Bandung, " + day + ' ' + months[month] + ' ' + year)
          doc.text(650, finalY, "Bandung, " + day + ' ' + months[month] + ' ' + year)
  
          doc.text(40, finalY+=18, "Kepala Pusat Fit Proper")
          doc.text(650, finalY, "Kepala Human Resource")
  
          doc.text(40, finalY+=70, "Bambang Wisnuadhi, S.Si., M.T.")
          doc.text(650, finalY, "Angga Yunanda Gemilang")
  
          doc.text(40, finalY+6, "_______________________")
          doc.text(650, finalY+6, "_______________________")
  
          doc.text(40, finalY+=24, "NIP. 197201061999031002")
          doc.text(650, finalY, "NIP. 201511036")
  
          doc.save(res.data.data[0].attributes?.mapping?.data?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes?.Name+'_'+res.data.data[0].attributes?.mapping?.data?.attributes?.position?.data?.attributes?.position_name+'.pdf')    
        } else {
          setLineMappings([])        
        }
      })
    }

  }

  return (
    <CRow>
      <CCol>
        <CAccordion>
          <CAccordionItem itemKey={1}>
            <CAccordionHeader><CIcon icon={cilSearch} style={{ marginRight: "10px" }}/>Pencarian Data</CAccordionHeader>
            <CAccordionBody>
              <CForm onSubmit={filterSearch}>
                <CRow className='mt-2'>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="exampleFormControlInput1">Nama lengkap</CFormLabel>
                    <CFormInput
                      type="text"
                      name='filter_nama'
                      id="filter_nama"
                      placeholder="Masukkan Kata Kunci Pencarian . . ."
                    />
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="exampleFormControlInput1">NIP</CFormLabel>
                    <CFormInput
                      type="text"
                      name='filter_nip'
                      id="filter_nip"
                      placeholder="Masukkan Kata Kunci Pencarian . . ."
                    />
                  </CCol>
                </CRow>  
                <CRow className='mt-3'>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="filter_position_before">Jabatan Sebelumnya</CFormLabel>
                    <CFormSelect name="filter_position_before" id="filter_position_before" aria-label="Large select example">
                      <option value="">Pilih Jabatan Sebelumnya</option>
                      { positions.map(position =>
                        <option key={ position.id } value={ position.id } >{ position.attributes.position_name }</option>
                      )}
                    </CFormSelect>
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="filter_projection">Proyeksi Jabatan</CFormLabel>
                    <CFormSelect name="filter_projection" id="filter_projection" aria-label="Large select example">
                      <option value="">Pilih Proyeksi</option>
                      { positions.map(position =>
                        <option key={ position.id } value={ position.id } >{ position.attributes.position_name }</option>
                      )}
                    </CFormSelect>
                  </CCol>                
                </CRow>
                <CRow className='mt-3'>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="filter_level_before">Jenjang Sebelumnya</CFormLabel>
                    <CFormSelect name="filter_level_before" id="filter_level_before" aria-label="Large select example">
                      <option value="">Pilih Jenjang Sebelumnya</option>
                      { levels.map(level =>
                        <option key={ level.id } value={ level.id }>{ level.attributes.functional_name } - { level.attributes.structural_name }</option>
                      )}
                    </CFormSelect>
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="filter_level">Jenjang Jabatan</CFormLabel>
                    <CFormSelect name="filter_level" id="filter_level" aria-label="Large select example">
                      <option value="">Pilih Jenjang Jabatan</option>
                      { levels.map(level =>
                        <option key={ level.id } value={ level.id }>{ level.attributes.functional_name } - { level.attributes.structural_name }</option>
                      )}
                    </CFormSelect>
                  </CCol>                
                </CRow>
                <CRow className='mt-3'>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="filter_jobdesc">Uraian Jabatan</CFormLabel>
                    <CFormInput type="text" name="filter_jobdesc" id="filter_jobdesc" placeholder='Masukkan Uraian Jabatan . . .' />
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="filter_schedule">Tanggal Pelaksanaan</CFormLabel>
                    <CFormInput type="date" name="filter_schedule" id="filter_schedule"/>
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
        <CCol xs={12} className="mt-3">
          { message && <CAlert color="danger" dismissible onClose={() => { setMessage("") }}> { message } </CAlert> }
        </CCol>                 
        <CCard className="mb-4 mt-3">
          <CCardHeader>
            <strong>Cetak Data Wawancara</strong>
          </CCardHeader>
          <CCardBody style={{ overflowX: "auto"}}>
              <CTable striped className='text-center'>
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
                              <li style={{ textAlign: "left", marginBottom: "4px" }} key={examiner?.id}>{examiner?.attributes?.employee?.data?.attributes?.Name}</li>
                          ))}
                        </ul>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          projection_val={mapping?.attributes?.position?.data?.id}
                          registrant_val={mapping?.attributes?.registrant?.data?.id}
                          status={mapping?.attributes?.status}
                          color='success'
                          variant="outline"
                          onClick={generatePDF}
                          style={{width: '75px', marginBottom: '10px'}} >
                            Cetak Nilai
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>    
          </CCardBody>
        </CCard>
      </CCol>

      <CTable striped style={{ display:'none' }} id='my-table'>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">No</CTableHeaderCell>
            <CTableHeaderCell scope="col">Tim Penilai</CTableHeaderCell>
            { lineMappings[0]?.attributes?.scores_interview?.data.map(criteria =>
              <CTableHeaderCell key={ criteria?.attributes?.criterion?.data?.id } scope="col">{ criteria?.attributes?.criterion?.data?.attributes?.criteria } (Bobot {criteria?.attributes?.criterion?.data?.attributes?.value}%)</CTableHeaderCell>
            )}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          { lineMappings?.map( (lineMapping, index) =>
            <CTableRow key={lineMapping.id}>
              <CTableHeaderCell scope="row">{index+1}</CTableHeaderCell>
              <CTableDataCell key={lineMapping?.id} scope="col">{ lineMapping?.attributes?.examiner?.data?.attributes?.employee?.data?.attributes?.Name }</CTableDataCell>
              { lineMapping?.attributes?.scores_interview?.data.map(score =>
                <CTableDataCell key={score?.id}>{ score?.attributes?.score }</CTableDataCell>
              )}
            </CTableRow>
          )}
        </CTableBody>
      </CTable>
    </CRow>
  )
}

export default CetakRekapWawancara