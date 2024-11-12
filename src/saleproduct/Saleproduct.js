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

  // const [itemlist, setItemList] = useState([]);
  // const [selectedItems, setSelectedItems] = useState([]);
  // const [quantities, setQuantities] = useState({});
  // const [customerName, setCustomerName] = useState('');
  // const [totalAmount, setTotalAmount] = useState('');
  // const [customerGST, setCustomerGST] = useState('');
  // const [cgst, setCgst] = useState('');
  // const [sgst, setSgst] = useState('');
  // const [igst, setIgst] = useState('');

  const [itemlist, setItemList] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [multiitems, setMultiItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [customerName, setCustomerName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [customerGST, setCustomerGST] = useState('');
  const [cgst, setCgst] = useState('');
  const [sgst, setSgst] = useState('');
  const [igst, setIgst] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = itemlist.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddItem = () => {
    if (selectedItemId) {
      const selectedItem = itemlist.find(item => item._id === selectedItemId);
      if (selectedItem) {
        setMultiItems(prevRecipients => [...prevRecipients, selectedItem]);
        setSelectedItemId('');
      }
    }
  };

  const handleQuantityChange = (id, value) => {
    setQuantities(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemsPayload = multiitems.map(item => ({
      item: item._id,
      quantity: quantities[item._id] || 1,
      price: item.CurruntPrice || 0,
      cgst: parseFloat(cgst),
      sgst: parseFloat(sgst),
      igst: parseFloat(igst)
    }));

    const payload = {
      items: itemsPayload,
      customerName,
      customerGST,
      totalAmount: parseFloat(totalAmount),
      cgst: parseFloat(cgst),
      sgst: parseFloat(sgst),
      igst: parseFloat(igst)
    };

    try {
      const response = await SubmitOrder(payload);
      if (response.success) {
        alert("Order submitted successfully!");
      } else {
        alert("Failed to submit order.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };


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
        <div className="row">
          <div className="col-sm-4">
            <div className="input-block">
              <label className="col-form-label">Search Item</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search item"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="col-sm-4">
            <div className="input-block">
              <label className="col-form-label">Select Item</label>
              <select
                className="form-select"
                value={selectedItemId}
                onChange={(e) => setSelectedItemId(e.target.value)}
              >
                <option value="">Select item</option>
                {filteredItems.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-sm-4 mt-4">
            {""}
            <button className="btn btn-primary form-control" onClick={handleAddItem}>
              Add Item
            </button>
          </div>

          <ul className="list-group my-3 mx-2">
            {multiitems.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <span>{item.name}</span>
                  <input
                    type="number"
                    className="form-control mt-2"
                    placeholder="Enter quantity"
                    value={quantities[item._id] || 1}
                    onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-secondary rounded-circle"
                  type="button"
                  onClick={() =>
                    setMultiItems(multiitems.filter((_, idx) => idx !== index))
                  }
                >
                  ×
                </button>
              </li>
            ))}
          </ul>

          <div className="col-md-6">
            <label>Customer Name</label>
            <input
              type="text"
              className="form-control"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label>Customer GST</label>
            <input
              type="text"
              className="form-control"
              value={customerGST}
              onChange={(e) => setCustomerGST(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label>Total Amount</label>
            <input
              type="number"
              className="form-control"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label>CGST</label>
            <input
              type="number"
              className="form-control"
              value={cgst}
              onChange={(e) => setCgst(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label>SGST</label>
            <input
              type="number"
              className="form-control"
              value={sgst}
              onChange={(e) => setSgst(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label>IGST</label>
            <input
              type="number"
              className="form-control"
              value={igst}
              onChange={(e) => setIgst(e.target.value)}
            />
          </div>

          <div className="col-12">
            <button className="btn btn-primary mt-3"
              onClick={handleSubmit}
            >
              Submit Order
            </button>
          </div>
        </div>
      </CCol>

      <CCol xs={12}>
        <CCard className="mt-5">
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