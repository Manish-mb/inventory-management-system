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
  CTableDataCell,

} from '@coreui/react'
import { DocsExample } from 'src/components'
import { getallitems, SubmitOrder, GetAllorders, GetOrderInvoice, getOrderDetailsById } from '../Request/apiRequest'

function Saleproduct() {

  const [orderlist, setOrderList] = useState([]);

  const [itemlist, setItemList] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [multiitems, setMultiItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [customerName, setCustomerName] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [customerGST, setCustomerGST] = useState('');
  const [cgst, setCgst] = useState(0);
  const [sgst, setSgst] = useState(0);
  const [igst, setIgst] = useState(0);
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
    const parsedValue = value === '' ? '' : Math.max(1, Number(value));

    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: parsedValue,
    }));
    // setQuantities(prev => ({ ...prev, [id]: value }));
  };

  const calculateTotalAmount = () => {
    let subtotal = 0;

    multiitems.forEach(item => {
      const quantity = quantities[item._id] || 1;
      const itemTotal = item.CurruntPrice * quantity;
      subtotal += itemTotal;
    });

    const totalGST = (subtotal * (parseFloat(cgst) + parseFloat(sgst) + parseFloat(igst))) / 100;
    setTotalAmount(subtotal + totalGST);
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [multiitems, quantities, cgst, sgst, igst]);

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
      if (response && response.status === "success") {
        alert("Order submitted successfully!");
        clearForm();
      } else {
        alert("Failed to submit order.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  const clearForm = () => {
    setMultiItems([]);
    setQuantities({});
    setCustomerName('');
    setCustomerGST('');
    setTotalAmount(0);
    setCgst(0);
    setSgst(0);
    setIgst(0);
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
    GetAllOrderHistory();
  }, []);

  const GetAllOrderHistory = async () => {
    try {
      const res = await GetAllorders();
      if (res && res.result) {
        setOrderList(res.result); // Set items to the 'result' array from the response
        const sortedOrders = res.result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrderList(sortedOrders.slice(0, 5));
        
        console.log(res.result, "orderrrrrrrrrrrrrrrrr")
      } else {
        setOrderList([]); // Set items to an empty array if result is undefined
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };


  const downloadInvoice = async (orderId) => {
    try {
      const res = await GetOrderInvoice(orderId);
      if (res && res.result && res.result.invoice) {
        // Decode the base64 data and create a downloadable link
        const base64Data = res.result.invoice;
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });

        // Create a link to download the file
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `invoice_${orderId}.pdf`;
        link.click();

        console.log("Invoice downloaded successfully");
      } else {
        console.error("Failed to download invoice: Invalid response format");
      }
    } catch (error) {
      console.error("Error downloading invoice:", error);
    }
  };

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

          <div className="col-sm-5">
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

          <div className="col-sm-3 mt-4">
            {""}
            <button className="btn btn-outline-primary  form-control" onClick={handleAddItem}>
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
                    value={quantities[item._id] || ''}
                    onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                    onBlur={(e) => {
                      // Reset to 1 if the input is cleared
                      if (!e.target.value) {
                        handleQuantityChange(item._id, 1);
                      }
                    }}
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

          <div className="col-md-4">
            <label>Customer Name</label>
            <input
              type="text"
              className="form-control"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label>Customer GST (%)</label>
            <input
              type="text"
              className="form-control"
              value={customerGST}
              onChange={(e) => setCustomerGST(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label>CGST  (%)</label>
            <input
              type="number"
              className="form-control"
              value={cgst}
              onChange={(e) => setCgst(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label>SGST (%)</label>
            <input
              type="number"
              className="form-control"
              value={sgst}
              onChange={(e) => setSgst(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label>IGST (%)</label>
            <input
              type="number"
              className="form-control"
              value={igst}
              onChange={(e) => setIgst(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label>Total Amount</label>
            <input
              type="number"
              className="form-control"
              value={totalAmount.toFixed(2)}
              onChange={(e) => setTotalAmount(e.target.value)}
            />
          </div>

          <div className="col-12">
            <button className="btn btn-outline-primary mt-3" type="button" style={{ width: "250px", float: "right" }}
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
                {orderlist.map((order) => (
                  order.items.map((item, index) => (

                    <CTableRow key={`${order._id}-${index}`}>
                      {/* <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell> */}
                      <CTableDataCell>{item.item.name}</CTableDataCell>
                      <CTableDataCell>{item.quantity}</CTableDataCell>
                      <CTableDataCell>{order.totalAmount}</CTableDataCell>
                      <CTableDataCell>{new Date(order.createdAt).toLocaleDateString()}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color='primary' variant="outline" size='sm' onClick={() => downloadInvoice(order._id)} >Download Invoice</CButton>
                      </CTableDataCell>

                    </CTableRow>
                  ))

                ))}

              </CTableBody>
            </CTable>

          </CCardBody>
        </CCard>
      </CCol>

    </CRow>

  )
}

export default Saleproduct