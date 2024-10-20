import axios from "axios";
import MAIN_URL from "./apiConfig";
 
// for localites
export const getorderbychalannumber = async (params) =>
 {
    try {
        const res = await axios.get(`${MAIN_URL}/getorderbychalannumber`,{
            params: params,
          });
        return res?.data;
    } 
    catch (error)
    {
        console.log(error);
    }
};
export const saveorder = async (data) =>
 {
    try {
        const res = await axios.post(`${MAIN_URL}/saveorder`,data);
        return res?.data;
    } 
    catch (error)
    {
        console.log(error);
    }
};
