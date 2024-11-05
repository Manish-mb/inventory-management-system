import MAIN_URL from "./apiConfig";
import axios from "axios";



export const getallitems = async () => {
    try {
        const res = await axios.get(`${MAIN_URL}/getallinventory`);
        return res?.data;
    }
    catch (error) {
        console.log(error);
    }
};


export const SaveItems = async (itemData) => {
    try {
        const res = await axios.post(`${MAIN_URL}/saveitem`, itemData);
        return res?.data;
    }
    catch (error) {
        console.log(error);
    }
}

export const EditItems = async (id, itemData) => {
    try {
        const res = await axios.post(`${MAIN_URL}/edititem`, { _id: id, ...itemData });
        return res?.data;
    }
    catch (error) {
        console.log(error);
    }
}

export const SubmitOrder = async () => {
    try {
        const res = await axios.post(`${MAIN_URL}/saveorder`);
        return res?.data;
    }
    catch (error) {
        console.log(error);
    }
}

export const GetAllorders = async () => {
    try {
        const res = await axios.get(`${MAIN_URL}/getAllorders`);
        return res?.data;
    }
    catch (error) {
        console.log(error);
    }
};

export const getOrderDetailsById = async (id) =>
    {
       try {
           const res = await axios.get(`${MAIN_URL}/getOrderByID`, {
            params: { _id: id}
           });
           return res?.data;
       } 
       catch (error)
       {
           console.log(error);
       }
   };

   export const GetOrderInvoice = async (id) =>
    {
       try {
           const res = await axios.get(`${MAIN_URL}/getorderinvoice`, {
            params: { _id: id}
           });
           return res?.data;
       } 
       catch (error)
       {
           console.log(error);
       }
   };




export const getorderbychalannumber = async (params) => {
    try {
        const res = await axios.get(`${MAIN_URL}/getorderbychalannumber`, {
            params: params,
        });
        return res?.data;
    }
    catch (error) {
        console.log(error);
    }
};
export const saveorder = async (data) => {
    try {
        const res = await axios.post(`${MAIN_URL}/saveorder`, data);
        return res?.data;
    }
    catch (error) {
        console.log(error);
    }
};



export const getcurruntstock = async () => {
    try {
        const res = await axios.get(`${MAIN_URL}/getcurruntstock`);
        return res?.data;
    }
    catch (error) {
        console.log(error);
    }
};
export const saveinventory = async (data) => {
    try {
        const res = await axios.post(`${MAIN_URL}/saveinventory`, data);
        return res?.data;
    }
    catch (error) {
        console.log(error);
    }
};