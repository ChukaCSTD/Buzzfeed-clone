import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const DataContext = createContext();

const DataProvider = ({ children }) => {
  
    const [loggedUser, setLoggedUser] = useState({});
    const [category, setCategory] = useState([]);

    const values = {
        loggedUser,
        setLoggedUser,
        category,
    };

    useEffect(() => {
        const local_storage_user = localStorage.getItem("buzzfeed_user");
        const user = JSON.parse(local_storage_user);
        setLoggedUser((prev) => (prev = user));

        const getCategory = async () => {
            try {
                const resp = await axios.get('http://localhost:5000/api/category');
                setCategory(resp.data.data);
                //console.log(resp.data)
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        getCategory();
    }, []);

    return (
        <DataContext.Provider value={values}>{children}</DataContext.Provider>
    );
};
export default DataProvider;