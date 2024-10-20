import axios from "axios";
import MAIN_URL from "./apiConfig";
 
export const getallsubdistributors = async () =>
 {
    try {
        const res = await axios.get(`${MAIN_URL}/getallsubdistributors`);
        return res?.data;
    } 
    catch (error)
    {
        console.log(error);
    }
};
export const savesubdistributor = async (data) =>
 {
    try {
        const res = await axios.post(`${MAIN_URL}/savesubdistributor`,data);
        return res?.data;
    } 
    catch (error)
    {
        console.log(error);
    }
};
