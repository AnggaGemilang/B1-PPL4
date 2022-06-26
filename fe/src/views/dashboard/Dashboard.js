import React from 'react'
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCol,
  CRow,
  CWidgetStatsC,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CFormLabel,
  CForm,
  CFormSelect,
  CButton,  
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilSearch,
  cilBasket,
  cilChartPie,
  cilPeople,
  cilSpeedometer,
} from '@coreui/icons'

const Dashboard = () => {

  return (
    <CRow>
      <CCol>
        <CRow>
          <CCol sm={6} md={3}>
            <CWidgetStatsC
              color="primary"
              icon={<CIcon icon={cilChartPie} height={36} />}
              value="28%"
              title="Returning Visitors"
              inverse
              progress={{ value: 75 }}
              className="mb-4"
            />
          </CCol>
          <CCol sm={6} md={3}>
            <CWidgetStatsC
              color="info"
              icon={<CIcon icon={cilPeople} height={36} />}
              value="87.500"
              title="Visitors"
              inverse
              progress={{ value: 75 }}
              className="mb-4"
            />
          </CCol>
          <CCol sm={6} md={3}>
            <CWidgetStatsC
              color="warning"
              icon={<CIcon icon={cilBasket} height={36} />}
              value="1238"
              title="Products sold"
              inverse
              progress={{ value: 75 }}
              className="mb-4"
            />
          </CCol>
          <CCol sm={6} md={3}>
            <CWidgetStatsC
              color="danger"
              icon={<CIcon icon={cilSpeedometer} height={36} />}
              value="5:34:11"
              title="Avg. Time"
              inverse
              progress={{ value: 75 }}
              className="mb-4"
            />   
          </CCol>    
        </CRow>
        <CRow>
          <CCol xs={12} className="mt-2">
            <CAccordion>
              <CAccordionItem itemKey={1}>
                <CAccordionHeader><CIcon icon={cilSearch} style={{ marginRight: "10px" }}/>Pencarian Data</CAccordionHeader>
                <CAccordionBody>
                  <CForm>
                    <CRow className='mt-2'>
                      <CCol xs={6}>
                        <CFormLabel htmlFor="exampleFormControlInput1">Peserta</CFormLabel>
                        <CFormSelect name="filter_registrant" id="filter_registrant" className="mb-3" aria-label="Large select example">
                          <option value="">Pilih Peserta</option>
                        </CFormSelect>
                      </CCol>
                      <CCol xs={6}>
                        <CFormLabel htmlFor="filter_usefor">Proyeksi</CFormLabel>
                        <CFormSelect name="filter_projection" id="filter_projection" className="mb-3" aria-label="Large select example">
                          <option value="">Pilih Proyeksi</option>
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
        </CRow>
      </CCol>
    </CRow>
  )
}

export default Dashboard
