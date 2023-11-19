import { Autocomplete, Box, Button, TextField, TextareaAutosize, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { postAPI, vacationAPI } from "../../services/api";
import { useSelector } from "react-redux";
import PostTop from "../PostTop";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { VisuallyHiddenInput } from "../../styles/VisuallyHiddenInput";
import { useFormik } from "formik";
import postValidation from "../../validations/postValidation";
import { BoxColumn } from "../../styles/BoxColumn";

const CreatePost = () => {
   const [vacations, setVacations] = useState([]);
   const [selectVacations, setSelectVacations] = useState([]);
   const [selectMilestones, setSelectMilestones] = useState([]);
   const [images, setImages] = useState([]);
   const { user } = useSelector((state) => state.auth);

   const formik = useFormik({
      initialValues: {
         vacation: "",
         milestone: "",
         content: "",
         isPublic: 1,
         images: "",
      },

      onSubmit: async (values) => {
         try {
            const formData = new FormData();
            const data = {
               vacation: values.vacation,
               milestone: values.milestone,
               content: values.content,
               isPublic: values.isPublic,
            };
            formData.append("data", JSON.stringify(data));
            images.forEach((item) => {
               formData.append("images", item);
            });
            await postAPI.create(formData);
         } catch (error) {
            console.error(error.response.data);
         }
      },

      validationSchema: postValidation("create"),
   });

   const { handleSubmit, handleChange, errors, values, setFieldValue, setFieldError } = formik;
   console.log(values);

   const fetchDataVacationsUser = async () => {
      try {
         const response = await vacationAPI.getAllByUser();

         if (response.data) {
            setVacations(response.data);
         }
      } catch (error) {
         console.error(error);
      }
   };

   const handleSelectChange = (e, value) => {
      setFieldValue("vacation", value.label);
      setFieldValue("milestone", "");
      setFieldError("vacation", "");
      const vacation = vacations.find((x) => x._id === value.id);

      if (vacation) {
         const newMilestones = vacation?.milestones.map((item) => {
            return { label: item.time + ": " + item.description, id: item._id };
         });

         setSelectMilestones(newMilestones);
      }
   };

   const handleImageChange = (e) => {
      const files = e.target.files;

      if (files.length > 0) {
         const imagesArray = Array.from(files);
         setImages(imagesArray);
         setFieldValue("images", imagesArray);
      }
   };

   useEffect(() => {
      fetchDataVacationsUser();
   }, []);

   useEffect(() => {
      if (vacations.length > 0) {
         const newVacation = vacations.map((item) => {
            return {
               label: item.title,
               id: item._id,
            };
         });

         setSelectVacations(newVacation);
      }
   }, [vacations]);

   return (
      <BoxColumn component="form" onSubmit={handleSubmit}>
         <PostTop avatarUrl={user?.avatar} name={user?.fullName} select onChange={handleChange} value={values.isPublic} />
         <Autocomplete
            fullWidth
            disablePortal
            size="small"
            options={selectVacations}
            onChange={handleSelectChange}
            value={values.vacation}
            renderInput={(params) => <TextField error={errors.vacation} helperText={errors.vacation} {...params} label="Chọn kì nghỉ" />}
         />
         {selectMilestones.length > 0 && (
            <Autocomplete
               disablePortal
               fullWidth
               size="small"
               options={selectMilestones}
               value={values.milestone}
               onChange={(e, value) => {
                  setFieldValue("milestone", value.label);
                  setFieldError("milestone", "");
               }}
               renderInput={(params) => <TextField {...params} error={errors.milestone} helperText={errors.milestone} label="Chọn cột mốc" />}
            />
         )}
         <TextField
            name="content"
            type="text"
            label="Nhập nội dung"
            value={values.content}
            onChange={handleChange}
            error={errors.content}
            helperText={errors.content}
            multiline
            rows={4}
            variant="filled"
            fullWidth
         />
         <Box width="100%">
            <Box component="label">
               <AddPhotoAlternateIcon titleAccess="Chọn ảnh" sx={{ color: "red", cursor: "pointer", fontSize: "30px" }} />
               <VisuallyHiddenInput name="images" type="file" accept="*/image" multiple onChange={handleImageChange} />
               {errors.images && (
                  <Typography
                     component="p"
                     sx={{
                        fontSize: "0.75rem",
                        color: "red",
                        m: "0 14px",
                     }}
                  >
                     {errors.images}
                  </Typography>
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
               {images.length > 0 &&
                  images.map((item, idx) => (
                     <Box
                        key={idx}
                        sx={{
                           width: "100px",
                           height: "100px",
                        }}
                     >
                        <img
                           width="100%"
                           height="100%"
                           style={{
                              objectFit: "cover",
                           }}
                           src={URL.createObjectURL(item)}
                           alt="image"
                        />
                     </Box>
                  ))}
            </Box>
         </Box>
         <Button
            variant="contained"
            type="submit"
            size="medium"
            sx={{
               textTransform: "none",
            }}
         >
            Tạo bài viết
         </Button>
      </BoxColumn>
   );
};

export default CreatePost;
