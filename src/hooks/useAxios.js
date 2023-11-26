import { useState } from "react";

const useAxios = (apiFunc, ...args) => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   const fetchData = async (...params) => {
      setLoading(true);
      try {
         const response = await apiFunc(...(params.length ? params : args));
         setData(response.data);
      } catch (error) {
         setError(error);
         setData(null);
         setLoading(false);
      } finally {
         setLoading(false);
      }
   };

   return {
      data,
      loading,
      error,
      setData,
      fetchData,
   };
};

export default useAxios;
