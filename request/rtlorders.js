import axios from "axios";
import MAIN_URL from "./apiConfig";
 
// for localites
export const getrtlorderbychalannumber = async (params) =>
 {
    try {
        const res = await axios.get(`${MAIN_URL}/getrtlorderbychalannumber`,{
            params: params,
          });
        return res?.data;
    } 
    catch (error)
    {
        console.log(error);
    }
};
export const savertlorder = async (data) =>
 {
    try {
        const res = await axios.post(`${MAIN_URL}/savertlorder`,data);
        return res?.data;
    } 
    catch (error)
    {
        console.log(error);
    }
};
