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
import { getallitems, SaveItems, EditItems } from '../../Request/apiRequest';

function Items() {

    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Edit item modal visibility
    const [editItemId, setEditItemId] = useState(null);

    const [newItem, setNewItem] = useState({
        name: "",
        AttachmentID: null,
        sku: "",
        description: "",
        quantity: "",
        cgst: "",
        sgst: "",
        igst: "",
        CurruntPrice: ""
    });

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        const updatedValue = name === 'AttachmentID' ? files[0] : value;
        setNewItem((prevState) => ({ ...prevState, [name]: updatedValue }));
    };

    // const handleInputChange = (e) => {
    //     const { name, value, files } = e.target;
    //     if (name === 'AttachmentID') {
    //         setNewItem({ ...newItem, AttachmentID: files[0] });  // store file
    //     } else {
    //         setNewItem({ ...newItem, [name]: value });
    //     }

    // };

    const handleAddNewItem = async () => {

        if (!newItem.name || !newItem.quantity || !newItem.CurruntPrice || !newItem.sku) {

            alert("Please fill out required fields.");
            return;
        }

        try {
            const response = await SaveItems(newItem);
            if (response && response.status === "success") {
                alert("Item added successfully!");

                setTimeout(() => {
                    setIsModalOpen(false); // Close the modal
                    setNewItem({
                        name: '',
                        AttachmentID: '',
                        description: '',
                        quantity: '',
                        sku: '',
                        cgst: '',
                        sgst: '',
                        igst: '',
                        CurruntPrice: '',
                    });
                    GetallItemsList();

                }, 2000)

            } else {
                alert("Failed to add item.");
            }
        } catch (error) {
            console.error("Error adding item:", error);
        }

    };


    const GetallItemsList = async () => {
        try {
            const res = await getallitems();
            if (res && res.result) {
                setItems(res.result); // Set items to the 'result' array from the response

                console.log(res.result, "uyuiuittiuiuooo")
            } else {
                setItems([]); // Set items to an empty array if result is undefined
            }
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    useEffect(() => {
        GetallItemsList();
    }, []);

    const handleEditItems = (item) => {
        setNewItem(item); // Pre-fill the form with item data
        setEditItemId(item._id);
        setIsEditModalOpen(true); // Open the edit modal
    };
    //    const  handleEditItems = () =>{

    //    }

    const handleUpdateItem = async () => {
        try {
            console.log("Updating Item:", newItem);
            const response = await EditItems(editItemId, newItem);
            if (response && response.status === "success") {

                setTimeout(() => {
                    alert("Item updated successfully!");
                    setIsEditModalOpen(false);
                    GetallItemsList();
                }, 2000);

            } else {
                alert("Failed to update item.");
            }
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };



    return (
        <>
            <div>
                <CRow>
                    <CCol xs={12}>
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong>Item Table</strong>
                                <CButton
                                    // className='btn btn-primary btn-outline'
                                    color='primary'
                                    variant="outline"

                                    onClick={() => setIsModalOpen(true)} // Open modal on click
                                    style={{ float: "right" }}
                                >
                                    Add New Item
                                </CButton>
                            </CCardHeader>
                            <CCardBody>
                                {/* <p className="text-body-secondary small">
              Using the most basic table CoreUI, here&#39;s how <code>&lt;CTable&gt;</code>-based
              tables look in CoreUI.
            </p> */}

                                <CTable hover>
                                    <CTableHead>
                                        <CTableRow>
                                            <CTableHeaderCell scope="col">Item Img</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Product Name</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Product Description</CTableHeaderCell>
                                            <CTableHeaderCell scope="col" style={{ backgroundColor: "#B0E0E6", textAlign: "center"}}>Total Quantity</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Product Price</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Added Date</CTableHeaderCell>
                                            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        {items.map((item, index) => (
                                            <CTableRow key={item._id || index}>
                                                {/* <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell> */}
                                                <CTableDataCell>Items Img</CTableDataCell>
                                                <CTableDataCell>{item.name}</CTableDataCell>
                                                <CTableDataCell>{item.description}</CTableDataCell>
                                                <CTableDataCell style={{ backgroundColor: "#B0E0E6", textAlign: "center"}}>{item.quantity}</CTableDataCell>
                                                <CTableDataCell>{item.CurruntPrice}</CTableDataCell>
                                                <CTableDataCell>{new Date(item.createdAt).toLocaleDateString('en-GB', { year: '2-digit', month: '2-digit', day: '2-digit' })}</CTableDataCell>
                                                <CTableDataCell>
                                                    <CButton color='success' variant="outline" size='sm' onClick={() => handleEditItems(item)}>Edit</CButton>
                                                </CTableDataCell>
                                            </CTableRow>
                                        ))}

                                    </CTableBody>
                                </CTable>

                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>

                {/* Modal for adding new item */}
                <CModal visible={isModalOpen} onClose={() => setIsModalOpen(false)}  >
                    <CModalHeader onClose={() => setIsModalOpen(false)}>
                        <CModalTitle>Add New Item</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CForm>
                            <CRow className="mb-3">
                                <CCol md={6}>
                                    <CFormLabel>Name</CFormLabel>
                                    <CFormInput
                                        type="text"
                                        name="name"
                                        value={newItem.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel>Item Img</CFormLabel>
                                    <CFormInput
                                        type="file"
                                        name="AttachmentID"
                                        value={newItem.AttachmentID}
                                        onChange={handleInputChange}
                                    />
                                </CCol>

                                <CCol md={12}>
                                    <CFormLabel>Description</CFormLabel>
                                    <CFormInput
                                        type="text"
                                        name="description"
                                        value={newItem.description}
                                        onChange={handleInputChange}
                                    />
                                </CCol>
                                <CCol md={12}>
                                    <CFormLabel>Quantity</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        name="quantity"
                                        value={newItem.quantity}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </CCol>
                                <CCol md={12}>
                                    <CFormLabel>Product No.</CFormLabel>
                                    <CFormInput
                                        type="text"
                                        name="sku"
                                        value={newItem.sku}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </CCol>
                                <CCol md={12}>
                                    <CFormLabel>Cgst</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        name="cgst"
                                        value={newItem.cgst}
                                        onChange={handleInputChange}
                                    />
                                </CCol>
                                <CCol md={12}>
                                    <CFormLabel>Sgst</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        name="sgst"
                                        value={newItem.sgst}
                                        onChange={handleInputChange}
                                    />
                                </CCol>
                                <CCol md={12}>
                                    <CFormLabel>Igst</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        name="igst"
                                        value={newItem.igst}
                                        onChange={handleInputChange}
                                    />
                                </CCol>
                                <CCol md={12}>
                                    <CFormLabel>Item Price</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        name="CurruntPrice"
                                        value={newItem.CurruntPrice}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </CCol>

                            </CRow>
                        </CForm>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </CButton>
                        <CButton color="primary" onClick={handleAddNewItem}>
                            Add Item
                        </CButton>
                    </CModalFooter>
                </CModal>


                {/* Modal for editing item */}
                <CModal visible={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                    <CModalHeader>
                        <CModalTitle>Edit Item</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CForm>
                            {/* Form fields for editing item */}
                            <CFormLabel>Name</CFormLabel>
                            <CFormInput type="text"
                                name="name"
                                value={newItem.name}
                                onChange={handleInputChange}
                                required
                            />
                            <CCol md={6}>
                                <CFormLabel>Item Img</CFormLabel>
                                <CFormInput
                                    type="file"
                                    name="AttachmentID"
                                    value={newItem.AttachmentID}
                                    onChange={handleInputChange}
                                />
                            </CCol>

                            <CCol md={12}>
                                <CFormLabel>Description</CFormLabel>
                                <CFormInput
                                    type="text"
                                    name="description"
                                    value={newItem.description}
                                    onChange={handleInputChange}
                                />
                            </CCol>
                            <CCol md={12}>
                                <CFormLabel>Quantity</CFormLabel>
                                <CFormInput
                                    type="number"
                                    name="quantity"
                                    value={newItem.quantity}
                                    onChange={handleInputChange}
                                    required
                                />
                            </CCol>
                            <CCol md={12}>
                                <CFormLabel>Product No.</CFormLabel>
                                <CFormInput
                                    type="text"
                                    name="sku"
                                    value={newItem.sku}
                                    onChange={handleInputChange}
                                    required
                                />
                            </CCol>
                            <CCol md={12}>
                                <CFormLabel>Cgst</CFormLabel>
                                <CFormInput
                                    type="number"
                                    name="cgst"
                                    value={newItem.cgst}
                                    onChange={handleInputChange}
                                />
                            </CCol>
                            <CCol md={12}>
                                <CFormLabel>Sgst</CFormLabel>
                                <CFormInput
                                    type="number"
                                    name="sgst"
                                    value={newItem.sgst}
                                    onChange={handleInputChange}
                                />
                            </CCol>
                            <CCol md={12}>
                                <CFormLabel>Igst</CFormLabel>
                                <CFormInput
                                    type="number"
                                    name="igst"
                                    value={newItem.igst}
                                    onChange={handleInputChange}
                                />
                            </CCol>
                            <CCol md={12}>
                                <CFormLabel>Item Price</CFormLabel>
                                <CFormInput
                                    type="number"
                                    name="CurruntPrice"
                                    value={newItem.CurruntPrice}
                                    onChange={handleInputChange}
                                    required
                                />
                            </CCol>
                        </CForm>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="primary" onClick={handleUpdateItem}>Update Item</CButton>
                        <CButton color="secondary" onClick={() => setIsEditModalOpen(false)}>Cancel</CButton>
                    </CModalFooter>
                </CModal>
            </div>
        </>
    )
}

export default Items