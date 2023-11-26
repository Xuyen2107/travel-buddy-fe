import useAxios from "./useAxios";
import { vacationAPI } from "../apis/vacationAPI";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import vacationValidation from "../validations/vacationValidation";

const useVacation = (vacation, onProcessDone) => {
   const [image, setImage] = useState(null);
   const [actionType, setActionType] = useState("");
   const { data: dataCreateVacation, loading: loadingCreateVacation, fetchData: fetchDataCreateVacation } = useAxios(vacationAPI.create);
   const { data: dataVacationUpdate, loading: loadingUpdate, fetchData: handleUpdateVacation } = useAxios(vacationAPI.update);
   const {
      data: dataVacation,
      loading: loadingVacation,
      error: errorVacation,
      setData: setVacation,
      fetchData: fetchDataVacation,
   } = useAxios(vacationAPI.getSingle);
   const { data: dataLike, fetchData: fetchDataLikeVacation } = useAxios(vacationAPI.like);
   const {
      data: allVacationData,
      loading: allVacationLoading,
      error: allVacationError,
      setData: setDataAllVacation,
      fetchData: fetchDataAllVacation,
   } = useAxios(vacationAPI.getAll);

   const formik = useFormik({
      initialValues: {
         title: vacation?.title || "",
         avatarVacation: vacation?.avatarVacation || "",
         description: vacation?.description || "",
         listUsers: vacation?.listUsers || [],
         isPublic: vacation?.isPublic || 1,
         startDay: vacation?.startDay || "",
         endDay: vacation?.endDay || "",
         milestones: vacation?.milestones || [{ time: "", description: "" }],
      },

      onSubmit: async (values) => {
         const formData = new FormData();

         if (image) {
            formData.append("avatarVacation", image);
         }

         if (actionType === "create") {
            const data = {
               title: values.title,
               description: values.description,
               listUsers: values.listUsers,
               isPublic: values.isPublic,
               startDay: values.startDay,
               endDay: values.endDay,
               milestones: values?.milestones,
            };
            formData.append("data", JSON.stringify(data));
            await fetchDataCreateVacation(formData);
            await fetchDataAllVacation();
            onProcessDone();
         }

         if (actionType === "update") {
            const data = {
               title: values.title,
               avatarVacation: values.avatarVacation,
               description: values.description,
               listUsers: values.listUsers,
               isPublic: values.isPublic,
               startDay: values.startDay,
               endDay: values.endDay,
               milestones: values?.milestones,
            };
            formData.append("data", JSON.stringify(data));
            await handleUpdateVacation(vacation?._id, formData);
            onProcessDone();
         }
      },

      validationSchema: vacationValidation("create"),
   });

   useEffect(() => {
      if (dataVacationUpdate) {
         setDataAllVacation((prevData) => prevData?.map((item) => (item._id === dataVacationUpdate?._id ? dataVacationUpdate : item)));
      }
   }, [dataVacationUpdate]);

   const handleCreateVacation = async (formData) => {
      await fetchDataVacation(formData);
   };

   const handleImageChange = async (e) => {
      const file = e.target.files[0];
      setImage(file);
      const filePath = URL.createObjectURL(file);
      formik.setFieldValue("avatarVacation", filePath);
   };

   const handleLikeVacation = async (vacationId) => {
      await fetchDataLikeVacation(vacationId);
   };

   return {
      setDataAllVacation,
      dataVacationUpdate,
      dataCreateVacation,
      dataLike,
      dataVacation,
      loadingVacation,
      errorVacation,
      setVacation,
      fetchDataVacation,
      allVacationData,
      formik,
      image,
      allVacationLoading,
      allVacationError,
      loadingCreateVacation,
      loadingUpdate,
      setActionType,
      handleLikeVacation,
      handleImageChange,
      handleCreateVacation,
      fetchDataAllVacation,
   };
};

export default useVacation;
