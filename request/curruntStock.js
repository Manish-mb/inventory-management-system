import axios from "axios";
import MAIN_URL from "./apiConfig";
 
// for localites
export const getcurruntstock = async () =>
 {
    try {
        const res = await axios.get(`${MAIN_URL}/getcurruntstock`);
        return res?.data;
    } 
    catch (error)
    {
        console.log(error);
    }
};
export const saveinventory = async (data) =>
 {
    try {
        const res = await axios.post(`${MAIN_URL}/saveinventory`,data);
        return res?.data;
    } 
    catch (error)
    {
        console.log(error);
    }
};
