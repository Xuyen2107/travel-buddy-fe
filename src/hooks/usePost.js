import { useEffect, useState } from "react";
import { postAPI } from "../apis/postAPI";
import useAxios from "./useAxios";
import { useFormik } from "formik";
import postValidation from "../validations/postValidation";
import { vacationAPI } from "../services/api";

const usePost = (post, vacation, milestone, onProcessDone) => {
   const [images, setImages] = useState(null);
   const [actionType, setActionType] = useState("");
   const [selectVacations, setSelectVacations] = useState([]);
   const [selectMilestones, setSelectMilestones] = useState([]);
   const { data: dataAllVacationUser, fetchData: fetchDataAllVacationUser } = useAxios(vacationAPI.getAllByUser);
   const {
      data: dataAllPost,
      loading: allPostsLoading,
      error: allPostsError,
      setData: setDataAllPost,
      fetchData: fetchDataAllPosts,
   } = useAxios(postAPI.getAll);
   const {
      data: dataPostMilestone,
      loading: loadingPostMilestone,
      error: errorPostMilestone,
      setData: setDataPostMilestone,
      fetchData: fetchDataPostMilestone,
   } = useAxios(postAPI.getAllByMilestone);
   const { data: dataPostUser, fetchData: fetchDataPostUser } = useAxios(postAPI.getAllByUser);

   const { loading: loadingCreatePost, fetchData: handleCreatePost } = useAxios(postAPI.create);
   const { data: dataUpdatePost, loading: loadingUpdatePost, fetchData: handleUpdatePost } = useAxios(postAPI.update);
   const { data, fetchData } = useAxios(postAPI.like);
   const formik = useFormik({
      initialValues: {
         vacation: post?.vacation || vacation?._id || "",
         milestone: post?.milestone || milestone || "",
         content: post?.content || "",
         isPublic: post?.isPublic || 1,
         images: post?.images || "",
      },

      onSubmit: async (values) => {
         const formData = new FormData();
         if (actionType === "create") {
            const data = {
               vacation: values?.vacation,
               milestone: values?.milestone,
               content: values?.content,
               isPublic: values?.isPublic,
            };
            formData.append("data", JSON.stringify(data));
            images.forEach((item) => {
               formData.append("images", item);
            });
            await handleCreatePost(formData);
            await fetchDataPostMilestone();
            onProcessDone();
         }

         if (actionType === "update") {
            const data = {
               vacation: values?.vacation,
               milestone: values?.milestone,
               content: values?.content,
               isPublic: values?.isPublic,
               images: values?.images,
            };
            formData.append("data", JSON.stringify(data));
            if (images) {
               images.forEach((item) => {
                  formData.append("images", item);
               });
            }
            await handleUpdatePost(formData);
            onProcessDone();
            console.log(onProcessDone);
         }
      },

      validationSchema: postValidation("create"),
   });

   useEffect(() => {
      fetchDataAllPosts();
      fetchDataAllVacationUser();
   }, []);

   useEffect(() => {
      if (dataAllVacationUser) {
         const newData = dataAllVacationUser?.map((item) => ({ id: item._id, title: item.title, milestones: item.milestones }));
         setSelectVacations(newData);
      }
   }, [dataAllVacationUser]);

   useEffect(() => {
      if (dataUpdatePost) {
         setDataAllPost((prevData) => prevData.map((item) => (item._id === dataAllVacationUser?._id ? dataAllVacationUser : item)));
      }
   }, [dataUpdatePost]);

   useEffect(() => {
      if (data) {
         setDataAllPost((prevData) => prevData.map((item) => (item._id === data?._id ? data : item)));
      }
   }, [data]);

   useEffect(() => {
      if (vacation) {
         const newMilestones = vacation?.milestones.map((item) => ({ label: item.time + ": " + item.description, id: item._id }));
         setSelectMilestones(newMilestones);
      }
   }, [vacation]);

   const handleSelectVacationChange = (e, value) => {
      formik.setFieldValue("vacation", value.id);
      formik.setFieldValue("milestone", "");
      const newMilestones = value?.milestones.map((item) => ({ label: item.time + ": " + item.description, id: item._id }));
      setSelectMilestones(newMilestones);
   };

   const handleImageChange = (e) => {
      const files = e.target.files;

      if (files.length > 0) {
         const imagesArray = Array.from(files);
         setImages(imagesArray);
         const urlPath = imagesArray.map((item) => {
            return URL.createObjectURL(item);
         });
         formik.setFieldValue("images", urlPath);
      }
   };

   const handleLikePost = async (postId) => {
      await fetchData(postId);
   };

   return {
      dataPostUser,
      fetchDataPostUser,
      dataPostMilestone,
      fetchDataPostMilestone,
      formik,
      selectMilestones,
      selectVacations,
      dataAllVacationUser,
      dataAllPost,
      allPostsLoading,
      allPostsError,
      loadingCreatePost,
      loadingUpdatePost,
      setActionType,
      handleImageChange,
      handleSelectVacationChange,
      fetchDataAllPosts,
      handleLikePost,
   };
};

export default usePost;
