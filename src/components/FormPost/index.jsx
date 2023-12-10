import PropTypes from "prop-types";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Autocomplete, Box, Button, CardMedia, CircularProgress, FormHelperText, TextField } from "@mui/material";
import { postAPI, vacationAPI } from "../../apis";
import CardHeaderCustom from "../CardHeaderCustom";
import { useCrudApi, useFetchData } from "../../hooks";
import postValidation from "../../validations/postValidation";
import { BoxColumn, TextFieldCustom, VisuallyHiddenInput } from "../../styles/index";

const CreatePost = ({ post, vacation, milestoneId, type, onProcessDone }) => {
   //================================================================
   const [actionType, setActionType] = useState("");
   const [images, setImages] = useState([]);
   const [selectVacations, setSelectVacations] = useState([]);
   const [selectMilestones, setSelectMilestones] = useState([]);
   const [vacationIndex, setVacationIndex] = useState(-1);
   const [milestoneIndex, setMilestoneIndex] = useState(-1);
   //================================================================
   const { userLogin } = useSelector((state) => state.auth);
   const { data: allVacationHaveUser, loading } = useFetchData(vacationAPI.getAllHaveUser);
   const { loading: createPostLoading, fetchData: handleCreatePost } = useCrudApi(postAPI.create);
   const { loading: updatePostLoading, fetchData: handleUpdatePost } = useCrudApi(postAPI.update);
   const formik = useFormik({
      initialValues: {
         vacation: post?.vacation || vacation?._id || "",
         milestone: post?.milestone || milestoneId || "",
         content: post?.content || "",
         isPublic: post?.isPublic || 1,
         images: post?.images || [],
      },

      onSubmit: async (values) => {
         const formData = new FormData();
         if (images.length > 0) {
            images.forEach((item) => {
               formData.append("images", item);
            });
         }
         const data = {
            vacation: values?.vacation,
            milestone: values?.milestone,
            content: values?.content,
            isPublic: values?.isPublic,
         };

         if (actionType === "createPost") {
            formData.append("data", JSON.stringify(data));
            await handleCreatePost(formData);
            await onProcessDone();
         }

         if (actionType === "updatePost") {
            const newData = { ...data, images: values.images };
            formData.append("data", JSON.stringify(newData));
            await handleUpdatePost(formData);
            await onProcessDone();
         }

         setImages([]);
      },

      validationSchema: type === "createPost" ? postValidation("create") : postValidation("update"),
   });

   const { values, errors, touched, setFieldValue, handleChange, handleSubmit } = formik;
   //================================================================
   useEffect(() => {
      if (allVacationHaveUser) {
         const newData = allVacationHaveUser.map((item) => ({ id: item._id, title: item.title, milestones: item.milestones }));
         setSelectVacations(newData);
      }
   }, [allVacationHaveUser]);

   useEffect(() => {
      if (vacation && values.vacation) {
         const newMilestones = vacation.milestones.map((item) => ({ id: item._id, label: item.time + ": " + item.description }));
         setSelectMilestones(newMilestones);
      }
   }, [vacation]);

   useEffect(() => {
      if (selectVacations.length > 0 && values.vacation) {
         const index = selectVacations.findIndex((item) => item?.id === values.vacation);
         setVacationIndex(index);
      }
   }, [selectVacations, values.vacation]);

   useEffect(() => {
      if (selectMilestones.length > 0 && values.milestone) {
         const index = selectMilestones.findIndex((item) => item?.id === values.milestone);
         setMilestoneIndex(index);
      }
   }, [selectMilestones, values.milestone]);

   const handleSelectVacationChange = (e, value) => {
      setFieldValue("vacation", value.id);
      setFieldValue("milestone", "");
      setMilestoneIndex(-1);
      const newMilestones = value.milestones.map((item) => ({ id: item._id, label: item.time + ": " + item.description }));
      setSelectMilestones(newMilestones);
   };

   const handleImageChange = (e) => {
      const files = e.target.files;
      if (files.length > 0) {
         const imagesArray = Array.from(files);
         const urlPath = imagesArray.map((item) => {
            return URL.createObjectURL(item);
         });
         setImages(imagesArray);
         setFieldValue("images", urlPath);
      }
   };
   //=================================================================

   if (loading) {
      return <CircularProgress />;
   }

   return (
      <BoxColumn component="form" onSubmit={handleSubmit} sx={{ gap: "12px", p: "12px", alignItems: "center" }}>
         <CardHeaderCustom
            avatarUrl={post?.author?.avatar || userLogin?.avatar}
            fullName={post?.author?.fullName || userLogin?.fullName}
            value={values.isPublic}
            onChange={handleChange}
         />
         {selectVacations.length > 0 && (
            <Autocomplete
               fullWidth
               disablePortal
               size="small"
               options={selectVacations}
               getOptionLabel={(options) => options?.title}
               onChange={handleSelectVacationChange}
               value={vacationIndex !== -1 ? selectVacations[vacationIndex] : null}
               renderInput={(params) => (
                  <TextField
                     error={touched.vacation && Boolean(errors.vacation)}
                     helperText={touched.vacation && errors.vacation}
                     {...params}
                     label="Chọn kì nghỉ"
                  />
               )}
            />
         )}
         {selectMilestones.length > 0 && (
            <Autocomplete
               disablePortal
               fullWidth
               size="small"
               options={selectMilestones}
               value={milestoneIndex != -1 ? selectMilestones[milestoneIndex] : null}
               onChange={(e, value) => {
                  setFieldValue("milestone", value.id);
               }}
               renderInput={(params) => (
                  <TextField
                     {...params}
                     error={touched.milestone && Boolean(errors.milestone)}
                     helperText={touched.milestone && errors.milestone}
                     label="Chọn cột mốc"
                  />
               )}
            />
         )}
         <TextFieldCustom
            name="content"
            type="text"
            label="Nhập nội dung"
            value={values.content}
            onChange={handleChange}
            error={touched.content && Boolean(errors.content)}
            helperText={touched.content && errors.content}
            multiline
            rows={4}
         />
         <Box width="100%">
            <Box component="label">
               <AddPhotoAlternateIcon titleAccess="Chọn ảnh" sx={{ color: "red", cursor: "pointer", fontSize: "30px" }} />
               <VisuallyHiddenInput name="images" type="file" accept="*/image" multiple onChange={handleImageChange} />
               {touched.content && errors.content && (
                  <FormHelperText error={true} sx={{ pl: "14px" }}>
                     {errors.images}
                  </FormHelperText>
               )}
            </Box>
         </Box>
         <Box
            sx={{
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               width: "100%",
            }}
         >
            <Box
               sx={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  width: "430px",
               }}
            >
               {values.images.length > 0 &&
                  values.images.map((item, idx) => (
                     <Box key={idx} sx={{ width: "100px", height: "100px" }}>
                        <CardMedia sx={{ width: "100%", height: "100%", objectFit: "cover" }} image={item} alt="image" />
                     </Box>
                  ))}
            </Box>
         </Box>
         {type === "createPost" &&
            (createPostLoading === false ? (
               <Button onClick={() => setActionType("createPost")} variant="contained" type="submit" size="medium" sx={{ textTransform: "none" }}>
                  Tạo bài viết
               </Button>
            ) : (
               <LoadingButton loading>Tạo bài viết</LoadingButton>
            ))}

         {type === "updatePost" &&
            (updatePostLoading === false ? (
               <Button onClick={() => setActionType("updatePost")} variant="contained" type="submit" size="medium" sx={{ textTransform: "none" }}>
                  Cập nhật
               </Button>
            ) : (
               <LoadingButton loading>Cập nhật</LoadingButton>
            ))}
      </BoxColumn>
   );
};

CreatePost.propTypes = {
   type: PropTypes.string.isRequired,
   onProcessDone: PropTypes.func.isRequired,
   vacation: PropTypes.object,
   milestoneId: PropTypes.string,
   post: PropTypes.object,
};

export default CreatePost;
