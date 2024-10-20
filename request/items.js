import axios from "axios";
import MAIN_URL from "./apiConfig";
 
export const getallitems = async () =>
 {
    try {
        const res = await axios.get(`${MAIN_URL}/getallitems`);
        return res?.data;
    } 
    catch (error)
    {
        console.log(error);
    }
};
export const saveitem = async (data) =>
 {
    try {
        const res = await axios.post(`${MAIN_URL}/saveitem`,data);
        return res?.data;
    } 
    catch (error)
    {
        console.log(error);
    }
};
