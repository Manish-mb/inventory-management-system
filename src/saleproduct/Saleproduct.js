import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,

  CModal,

} from '@coreui/react'
import { DocsExample } from 'src/components'
import { getallitems, SubmitOrder } from '../Request/apiRequest'

function Saleproduct() {

  const [itemlist, setItemList] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [customerName, setCustomerName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [customerGST, setCustomerGST] = useState('');
  const [cgst, setCgst] = useState('');
  const [sgst, setSgst] = useState('');
  const [igst, setIgst] = useState('');
  

  const GetallItemsList = async () => {
    try {
      const res = await getallitems();
      if (res && res.result) {
        setItemList(res.result);

        console.log(res.result, "0909090909")
      } else {
        setItemList([]);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }

  useEffect(() => {
    GetallItemsList();
  }, []);


  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Selling Product Form</strong>
            {/* <small>Gutters</small> */}
          </CCardHeader>
          <CCardBody>
            {/* <p className="text-body-secondary small">
              By adding <a href="https://coreui.io/docs/layout/gutters/">gutter modifier classes</a>
              , you can have control over the gutter width in as well the inline as block direction.
            </p> */}

            <p className="text-body-secondary small">
              Type proper details
            </p>

            <CForm className="row g-3">
              <CCol md={6}>
                <CFormLabel htmlFor="inputState">Item List</CFormLabel>
                <CFormSelect >
                  <option value="">Choose...</option>
                  {itemlist.map((item) => ( 
                    <option key={item._id} value={item._id}> 
                      {item.name}
                      { console.log(item.name)}
                    </option>
                ))}
                </CFormSelect>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="inputPassword4">CustomerName</CFormLabel>
                <CFormInput name="" type="text" id="inputPassword4" />
              </CCol>
              <CCol xs={6}>
                <CFormLabel htmlFor="inputAddress">Quantity </CFormLabel>
                <CFormInput name="" type='number' placeholder="" />
              </CCol>
              <CCol xs={6}>
                <CFormLabel htmlFor="inputAddress">Total Amout</CFormLabel>
                <CFormInput name="" type='number' placeholder="" />
              </CCol>
              <CCol xs={6}>
                <CFormLabel htmlFor="inputAddress2">CustomerGST</CFormLabel>
                <CFormInput name="" id="inputAddress2" placeholder="" />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="inputCity">Cgst</CFormLabel>
                <CFormInput name="" />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="inputCity">Sgst</CFormLabel>
                <CFormInput name="" />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="inputCity">Igst</CFormLabel>
                <CFormInput name="" />
              </CCol>
              {/* <CCol md={4}>
                  <CFormLabel htmlFor="inputState">State</CFormLabel>
                  <CFormSelect id="inputState">
                    <option>Choose...</option>
                    <option>...</option>
                  </CFormSelect>
                </CCol> */}

              <CCol xs={12}>
                <CButton color="primary" type="submit">
                  Submit
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Selling Item Table</strong>
            {/* <small>Basic example</small> */}

          </CCardHeader>
          <CCardBody>
            {/* <p className="text-body-secondary small">
              Using the most basic table CoreUI, here&#39;s how <code>&lt;CTable&gt;</code>-based
              tables look in CoreUI.
            </p> */}

            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Product Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Product Quantity</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Selling price</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Selling Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Invoice</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {/* {items.map((item, index) => (
                                            <CTableRow key={item._id || index}>
                                                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                                <CTableDataCell>{item.name}</CTableDataCell>
                                                <CTableDataCell>{item.description}</CTableDataCell>
                                                <CTableDataCell>{item.quantity}</CTableDataCell>
                                                <CTableDataCell>
                                                    <CButton>Edit</CButton>
                                                    <CButton>Delete</CButton>
                                                </CTableDataCell>
                                            </CTableRow>
                                        ))} */}

              </CTableBody>
            </CTable>

          </CCardBody>
        </CCard>
      </CCol>

    </CRow>

  )
}

export default Saleproduct