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
  CFormCheck,
  CFormSelect,  
  CCallout  
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'
import url from "../../../config/setting"
import EmployeeAPI from '../../../config/admin/EmployeeAPI'
import PositionAPI from '../../../config/admin/PositionAPI'
import LevelAPI from '../../../config/admin/LevelAPI'
import SubFieldAPI from '../../../config/admin/SubFieldAPI'
import AdministrasiUserAPI from '../../../config/admin/AdministrasiUserAPI'
import axios from "axios"

const Administrasi = () => {
  const [employees, setEmployees] = useState([])
  const [levels, setLevels] = useState([])
  const [positions, setPositions] = useState([])
  const [subfields, setSubfields] = useState([])
  const [message, setMessage] = useState("")

  useEffect(() => {
    setMessage(location?.state?.successMessage)

    axios.all([LevelAPI.get(), PositionAPI.get(), SubFieldAPI.get()]).then(
      axios.spread((...res) => {
        setLevels(res[0]?.data.data),
        setPositions(res[1]?.data.data)
        setSubfields(res[2]?.data.data)
      })
    )
    getData()
  }, [])    

  const filterSearch = (e) => {
    e.preventDefault()
    let query = ""
    if(document.getElementById("filter_nip").value.length != 0){
      query += `&filters[NIP][$contains]=${document.getElementById("filter_nip").value}`
    }
    if(document.getElementById("filter_nama").value.length != 0){
      query += `&filters[Name][$contains]=${document.getElementById("filter_nama").value}`
    }
    if(document.querySelector('input[name="filter_gender"]:checked') != undefined){
      query += `&filters[Gender][$contains]=${document.querySelector('input[name="filter_gender"]:checked').value}`
    }
    if(document.getElementById("filter_email").value.length != 0){
      query += `&filters[Email][$contains]=${document.getElementById("filter_email").value}`
    }
    if(document.getElementById("filter_position").value.length != 0){
      query += `&filters[position][id][$eq]=${document.getElementById("filter_position").value}`
    }
    if(document.getElementById("filter_level").value.length != 0){
      query += `&filters[level][id][$eq]=${document.getElementById("filter_level").value}`
    }
    if(document.getElementById("filter_subfield").value.length != 0){
      query += `&filters[sub_field][id][$eq]=${document.getElementById("filter_subfield").value}`
    }
    if(document.getElementById("filter_role").value.length != 0){
      query += `&filters[account][cp_role][$eq]=${document.getElementById("filter_role").value}`
    }    

    EmployeeAPI.find(query).then(
      (res) => {
        if(res.data.data.length != 0){
          setEmployees(res.data.data)
        } else {
          setEmployees([])
        }
      }
    )    
  }

  const getData = () => {
    EmployeeAPI.get().then((res) => {
      setEmployees(res.data.data)
    })
  }

  const generateSlug = (text) => {
    return text.toString().toLowerCase()
      .replace(/^-+/, '')
      .replace(/-+$/, '')
      .replace(/\s+/g, '-')
      .replace(/\-\-+/g, '-')
      .replace(/[^\w\-]+/g, '')
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCallout color="info" className="bg-white">
          <p style={{ fontSize: "18px", marginBottom: "4px" }}><b>Catatan Pengisian</b></p>
          <ul className='catatan'>
            <li>Sebelum mengubah peran, pastikan terlebih dahulu peran dari seorang pegawai telah valid</li>
            <li>Pilih peran sesuai dengan opsi yang telah diberikan</li>
            <li>Pilihan peran terdiri dari Administrator, HR Manager, HR Specialist, dan Penguji</li>
            <li>Sistem memungkinkan untuk mengubah dan menghapus peran pegawai</li>
            <li>Jika peran pegawai dikembalikan menjadi 'Pilih Penggunaan', sistem akan menghapus peran pegawai</li>
          </ul>
        </CCallout>
      </CCol>
      <CCol xs={12}>
        <CAccordion>
          <CAccordionItem itemKey={1}>
            <CAccordionHeader><CIcon icon={cilSearch} style={{ marginRight: "10px" }}/>Pencarian Data</CAccordionHeader>
            <CAccordionBody>
              <CForm onSubmit={filterSearch}>
                <CRow className='mt-2'>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="exampleFormControlInput1">NIP</CFormLabel>
                    <CFormInput
                      type="text"
                      name='filter_nip'
                      id="filter_nip"
                      placeholder="Masukkan NIP . . ."
                    />
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="exampleFormControlInput1">Nama Lengkap</CFormLabel>
                    <CFormInput
                      type="text"
                      name='filter_nama'
                      id="filter_nama"
                      placeholder="Masukkan Nama Pegawai . . ."
                    />
                  </CCol>
                </CRow>
                <CRow className='mt-3'>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="gender">Jenis Kelamin</CFormLabel>                      
                    <CCol xs={12}>
                      <CFormCheck
                        inline
                        type="radio"
                        name="filter_gender"
                        id="filter_gender1"
                        value=""
                        label="None"
                      />
                      <CFormCheck
                        inline
                        type="radio"
                        name="filter_gender"
                        id="filter_gender2"
                        value="Male"
                        label="Laki-laki"
                      />
                      <CFormCheck
                        inline
                        type="radio"
                        name="filter_gender"
                        id="filter_gender3"
                        value="Female"
                        label="Perempuan"
                      />
                    </CCol>
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="filter_email">Email</CFormLabel>
                    <CFormInput type="email" name="filter_email" id="filter_email" placeholder='Masukkan Email . . .'/>
                  </CCol>
                </CRow>
                <CRow className='mt-3'>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="filter_position">Jabatan</CFormLabel>
                    <CFormSelect name="filter_position" id="filter_position" aria-label="Large select example">
                      <option value="">Pilih Jabatan</option>
                      { positions.map(position =>
                        <option key={ position.id } value={ position.id } >{ position.attributes.position_name }</option>
                      )}
                    </CFormSelect>
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="filter_level">Jenjang</CFormLabel>
                    <CFormSelect name="filter_level" id="filter_level" aria-label="Large select example">
                      <option value="">Pilih Jenjang</option>
                      { levels.map(level =>
                        <option key={ level.id } value={ level.id } >{ level.attributes.functional_name } - { level.attributes.structural_name }</option>
                      )}
                    </CFormSelect>
                  </CCol>
                </CRow>
                <CRow className='mt-3'>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="filter_subfield">Sub Bidang</CFormLabel>
                    <CFormSelect name="filter_subfield" id="filter_subfield" className="mb-3" aria-label="Large select example">
                      <option value="">Pilih Sub Bidang</option>
                      { subfields.map(subfield =>
                        <option key={ subfield.id } value={ subfield.id } >{ subfield.attributes.subfield_name }</option>
                      )}
                    </CFormSelect>
                  </CCol>
                  <CCol xs={6}>
                    <CFormLabel htmlFor="filter_role">Peran</CFormLabel>
                    <CFormSelect name="filter_role" id="filter_role" className="mb-3" aria-label="Large select example">
                      <option value=''>Pilih Role</option>
                      <option value="3">Administrator</option>
                      <option value="5">HR Manager</option>
                      <option value="6">HR Specialist</option>
                      <option value="4">Penguji</option>
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
        <CCol xs={12} className="mt-3">
          { message && <CAlert color="success" dismissible onClose={() => { setMessage("") }}> { message } </CAlert> }
        </CCol>          
        <CCard className="mb-4 mt-3">
          <CCardHeader>
            <strong>Data Administrasi</strong>
          </CCardHeader>
          <CCardBody style={{ overflowX: "auto"}}>
            <CRow className='pl-2 mr-5'>
              <CTable striped className='text-center'>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Foto</CTableHeaderCell>
                    <CTableHeaderCell scope="col">NIP</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Jenis Kelamin</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Jabatan</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Jenjang</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Sub Bidang</CTableHeaderCell>
                    <CTableHeaderCell scope="col" width="600">Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  { employees.map((employee, index) =>
                    <CTableRow key={employee.id}>
                      <CTableHeaderCell scope="row">{ index+1 }</CTableHeaderCell>
                      <CTableDataCell>
                        {
                          <img className='foto_karyawan' src={url + employee?.attributes?.Photo?.data?.attributes?.formats?.thumbnail?.url} alt="Photo" />
                        }
                      </CTableDataCell>
                      <CTableDataCell>{employee?.attributes?.NIP}</CTableDataCell>
                      <CTableDataCell>{employee?.attributes?.Name}</CTableDataCell>
                      <CTableDataCell>{employee?.attributes?.Gender}</CTableDataCell>
                      <CTableDataCell>{employee?.attributes?.Email}</CTableDataCell>
                      <CTableDataCell>{employee?.attributes?.position?.data?.attributes?.position_name}</CTableDataCell>
                      <CTableDataCell>{employee?.attributes?.level?.data?.attributes?.functional_name} - {employee?.attributes?.level?.data?.attributes?.structural_name} </CTableDataCell>
                      <CTableDataCell>{employee?.attributes?.sub_field?.data?.attributes?.subfield_name}</CTableDataCell>
                      <CTableDataCell style={{ paddingRight: "25px" }}>
                        <CFormSelect name='role' id='role' className="mb-3" aria-label="Large select example" style={{ width: "185px" }} 
                          onChange={ (e) => {
                            if(e.target.value == 999){
                              AdministrasiUserAPI.find(employee?.attributes?.NIP).then(res => {
                                if(res?.data?.data?.length != 0){
                                  AdministrasiUserAPI.delete(employee?.attributes?.account?.data?.id).then(res => {
                                    getData()
                                    setMessage("Peran Pegawai Berhasil Dihapus!")
                                  })
                                }
                              })
                            } else {
                              AdministrasiUserAPI.find(employee?.attributes?.NIP).then(res => {
                                if(res?.data?.length != 0){
                                  const body = {
                                    role: e.target.value,
                                    cp_role: e.target.value,
                                  }
                                  AdministrasiUserAPI.edit(employee.attributes.account.data.id, body).then(res => {
                                    getData()
                                    setMessage("Peran Pegawai Telah Berhasil Diperbaharui!")
                                  })
                                } else {
                                  const body = {
                                    username : generateSlug(employee?.attributes?.Name),
                                    email : employee?.attributes?.Email.toLowerCase(),
                                    password: employee?.attributes?.NIP,
                                    role: e.target.value,
                                    employee: employee?.id,
                                    cp_role: e.target.value,
                                    cp_photo: employee?.attributes?.Photo?.data?.attributes?.formats?.thumbnail?.url,
                                  }
                                  AdministrasiUserAPI.add(body).then(res => {
                                    getData()
                                    setMessage("Peran Pegawai Telah Berhasil Ditambahkan!")
                                  })
                                }
                              })
                            }     
                          }}>
                          <option value="999">Pilih Penggunaan</option>
                          <option selected={employee?.attributes?.account?.data != null && employee?.attributes?.account?.data?.attributes?.cp_role == 3} value="3">Administrator</option>
                          <option selected={employee?.attributes?.account?.data != null && employee?.attributes?.account?.data?.attributes?.cp_role == 5} value="5">HR Manager</option>
                          <option selected={employee?.attributes?.account?.data != null && employee?.attributes?.account?.data?.attributes?.cp_role == 6} value="6">HR Specialist</option>
                          <option selected={employee?.attributes?.account?.data != null && employee?.attributes?.account?.data?.attributes?.cp_role == 4} value="4">Penguji</option>
                        </CFormSelect>
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Administrasi