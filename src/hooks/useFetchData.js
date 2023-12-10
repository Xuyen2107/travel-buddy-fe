import { useEffect, useState } from "react";

const useFetchData = (apiFunc, ...params) => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = async () => {
      const newApiFunc = params ? apiFunc(...params) : apiFunc();
      try {
         const response = await newApiFunc;
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

export default useFetchData;
