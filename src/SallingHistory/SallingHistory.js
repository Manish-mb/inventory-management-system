import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableCaption,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CForm,
    CFormLabel,
    CFormInput,
    CModalFooter
} from '@coreui/react'
import { DocsExample } from 'src/components';
import { GetAllorders, GetOrderInvoice, getOrderDetailsById } from '../Request/apiRequest';

function SallingHistory() {

    const [orderlist, setOrderList] = useState([]);
    const [orderdetails, setOrderDetails] = useState(null);
    const [detailsModalVisible, setDetailsModalVisible] = useState(false);








    const GetAllOrderHistory = async () => {
        try {
            const res = await GetAllorders();
            if (res && res.result) {
                setOrderList(res.result); // Set items to the 'result' array from the response
                const sortedOrders = res.result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setOrderList(sortedOrders);

                console.log(res.result, "orderrrrrrrrrrrrrrrrr")
            } else {
                setOrderList([]); // Set items to an empty array if result is undefined
            }
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    const GetOrderDetails = async (orderId) => {
        try {
            const res = await getOrderDetailsById(orderId);
            if (res && res.result) {
                setOrderDetails(res.result);
                setDetailsModalVisible(true);
                // console.log(res.result, "details909090")
            } else {
                setOrderDetails(null);
            }
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    useEffect(() => {
        GetAllOrderHistory();
        // GetOrderDetails();
    }, []);

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
        <div>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Salling History Table</strong>

                        </CCardHeader>
                        <CCardBody>
                            {/* <p className="text-body-secondary small">
              Using the most basic table CoreUI, here&#39;s how <code>&lt;CTable&gt;</code>-based
              tables look in CoreUI.
            </p> */}

                            <CTable hover>
                                <CTableHead>
                                    <CTableRow>
                                        {/* <CTableHeaderCell scope="col">Item Img</CTableHeaderCell> */}
                                        <CTableHeaderCell scope="col">Product Name</CTableHeaderCell>
                                        <CTableHeaderCell scope="col" style={{ textAlign: "center"}}>Sale Quantity</CTableHeaderCell>
                                        <CTableHeaderCell scope="col" style={{ textAlign: "center"}}>Salling Price</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Salling Date</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Order Details</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Order Invoice</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {orderlist.map((order) => (
                                        order.items.map((item, index) => (

                                            <CTableRow key={`${order._id}-${index}`}>
                                                {/* <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell> */}
                                                <CTableDataCell>{item.item.name}</CTableDataCell>
                                                <CTableDataCell style={{ textAlign: "center"}}>{item.quantity}</CTableDataCell>
                                                <CTableDataCell style={{ textAlign: "center"}}>{order.totalAmount}</CTableDataCell>
                                                <CTableDataCell>{new Date(order.createdAt).toLocaleDateString('en-GB', { year: '2-digit', month: '2-digit', day: '2-digit' })}</CTableDataCell>
                                                <CTableDataCell>
                                                    <CButton color='success' variant="outline" size='sm' onClick={() => GetOrderDetails(order._id)} >View Details</CButton>
                                                </CTableDataCell>
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

            {/* Order Details Modal */}
            <CModal visible={detailsModalVisible} onClose={() => setDetailsModalVisible(false)}>
                <CModalHeader>
                    <CModalTitle>Order Details</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {orderdetails ? (
                        <div>
                            <p><strong>Customer Name:</strong> {orderdetails.customerName}</p>
                            <p><strong>Customer GST:</strong> {orderdetails.customerGST}</p>
                            <p><strong>Total Amount:</strong> {orderdetails.totalAmount}</p>
                            <hr />
                            {orderdetails.items.map((itemDetail, idx) => (
                                <div key={idx}>
                                    <p><strong>Item Name:</strong> {itemDetail.item.name}</p>
                                    <p><strong>Quantity:</strong> {itemDetail.quantity}</p>
                                    <p><strong>Item Price:</strong> {itemDetail.price}</p>
                                    <p><strong>CGST:</strong> {itemDetail.cgst}</p>
                                    <p><strong>SGST:</strong> {itemDetail.sgst}</p>
                                    <p><strong>IGST:</strong> {itemDetail.igst}</p>
                                    <hr />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No details available.</p>
                    )}
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setDetailsModalVisible(false)}>
                        Close
                    </CButton>
                </CModalFooter>
            </CModal>

        </div>
    )
}

export default SallingHistory