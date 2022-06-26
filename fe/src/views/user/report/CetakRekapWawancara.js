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
  CForm
} from '@coreui/react'
import { useLocation } from "react-router-dom";
import { cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import MappingAPI from '../../../config/user/MappingAPI'
import FitAndProperAPI from '../../../config/user/FitAndProperAPI'
import jsPDF from 'jspdf'
import 'jspdf-autotable';

const CetakRekapWawancara = () => {
  const location = useLocation();

  const [lineMappings, setLineMappings] = useState([])  
  const [mappings, setMappings] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(location?.state?.successMessage)
    getData()
  }, [])  

  const filterSearch = (e) => {
    e.preventDefault()

    let query = ""
    if(document.getElementById("filter_nama").value.length != 0){
      query += `&filters[employee][Name][$contains]=${document.getElementById("filter_nama").value}`
    }
    if(document.getElementById("filter_nip").value.length != 0){
      query += `&filters[employee][NIP][$contains]=${document.getElementById("filter_nip").value}`
    }

    DataPesertaAPI.findRegistrants(query).then(
      (res) => {
        if(res.data.length != 0){
          setRegistrants(res.data)
        } else {
          setRegistrants([])         
        }
      }
    )    
  }
  
  const getData = () => {
    MappingAPI.getWawancara().then((res) => {
      setMappings(res.data)
    })
  }

  const generatePDF = (e) => {

    FitAndProperAPI.getRekapManualWawancara(e.target.getAttribute("registrant_val"), e.target.getAttribute("projection_val")).then((res) => {
      console.log(e.target.getAttribute("registrant_val"))
      console.log(e.target.getAttribute("projection_val"))
      console.log(res.data)

      if(res.data.length != 0){
        setLineMappings(res.data)

        var doc = new jsPDF({
            orientation: 'l',
            unit: 'pt',
            format: 'a4'        
        });

        doc.setFontSize("18")
        doc.setFont('helvetica', 'bold')
        doc.text(290, 50, "Laporan Hasil Wawancara")        
        doc.setFontSize("12")
        doc.text(40, 90, "Nama Peserta")
        doc.text(40, 110, "NIP")
        doc.text(40, 130, "Jabatan Proyeksi")
        doc.text(40, 150, "Jenjang")
        doc.setFont('helvetica', 'normal')
        doc.text(150, 90, ": " + res.data[0].attributes?.mapping?.data?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes?.Name)
        doc.text(150, 110, ": " + res.data[0].attributes?.mapping?.data?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes?.NIP)
        doc.text(150, 130, ": " + res.data[0].attributes?.mapping?.data?.attributes?.position?.data?.attributes?.position_name)
        doc.text(150, 150, ": " + res.data[0].attributes?.mapping?.data?.attributes?.level?.data?.attributes?.functional_name + " - " + res.data[0].attributes?.mapping?.data?.attributes?.level?.data?.attributes?.structural_name)

        doc.autoTable({
          startY: 175,
          html: '#my-table',
        })

        doc.save(res.data[0].attributes?.mapping?.data?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes?.Name+'_'+res.data[0].attributes?.mapping?.data?.attributes?.position?.data?.attributes?.position_name+'.pdf')    
      } else {
        setLineMappings([])        
      }
    })
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
          { message && <CAlert color="success" dismissible onClose={() => { setMessage("") }}> { message } </CAlert> }
        </CCol>                 
        <CCard className="mb-4 mt-3">
          <CCardHeader>
            <strong>Cetak Data Wawancara</strong>
          </CCardHeader>
          <CCardBody style={{ overflowX: "auto"}}>
              <CTable striped className='mt-3 text-center'>
                <CTableHead>
                   <CTableRow>
                    <CTableHeaderCell scope="col">No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                    <CTableHeaderCell scope="col">NIP</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Jabatan</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Proyeksi</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Uraian Jabatan</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Penguji</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  { mappings.map( (mapping, index) =>
                    <CTableRow key={mapping.id}>
                      <CTableHeaderCell scope="row">{ index+1 }</CTableHeaderCell>
                      <CTableDataCell>{mapping?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes.Name}</CTableDataCell>
                      <CTableDataCell>{mapping?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes.NIP}</CTableDataCell>
                      <CTableDataCell>{mapping?.attributes?.registrant?.data?.attributes?.employee?.data?.attributes?.position?.data?.attributes?.position_name}</CTableDataCell>
                      <CTableDataCell>{mapping?.attributes?.position?.data?.attributes?.position_name}</CTableDataCell>
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