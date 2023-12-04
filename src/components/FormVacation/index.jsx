import { useFormik } from "formik";
import PropTypes from "prop-types";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Autocomplete, Avatar, Box, Button, CardHeader, CardMedia, FormHelperText, IconButton, TextField, Typography } from "@mui/material";
import { CardHeaderCustom } from "../index";
import { userAPI, vacationAPI } from "../../apis";
import { useCrudApi, useFetchData } from "../../hooks";
import vacationValidation from "../../validations/vacationValidation";
import { BoxColumn, ButtonRadius, TextFieldCustom, VisuallyHiddenInput } from "../../styles";

const CreateVacationForm = ({ vacation, type, onProcessDone }) => {
   //================================================================
   const [image, setImage] = useState("");
   const [actionType, setActionType] = useState("");
   const [friendIndex, setFriendIndex] = useState([]);
   //================================================================
   const { userLogin } = useSelector((state) => state.auth);
   const { loading: createVacationLoading, fetchData: handleCreateVacation } = useCrudApi(vacationAPI.create);
   const { loading: updateVacationLoading, fetchData: handleUpdateVacation } = useCrudApi(vacationAPI.update);
   const { data: allFriends } = useFetchData(userAPI.getFriends, userLogin._id);
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
         const data = {
            title: values.title,
            description: values.description,
            listUsers: values.listUsers,
            isPublic: values.isPublic,
            startDay: values.startDay,
            endDay: values.endDay,
            milestones: values?.milestones,
         };
         setImage([]);

         if (actionType === "create") {
            formData.append("data", JSON.stringify(data));
            await handleCreateVacation(formData);
            onProcessDone();
         }

         if (actionType === "update") {
            const newData = { ...data, avatarVacation: values.avatarVacation };
            formData.append("data", JSON.stringify(newData));
            await handleUpdateVacation(vacation?._id, formData);
            onProcessDone();
         }
      },

      validationSchema: vacationValidation("create"),
   });
   const { values, errors, touched, setFieldValue, handleChange, handleSubmit } = formik;
   //================================================================
   useEffect(() => {
      if (allFriends && values.listUsers) {
         const indexArr = values.listUsers.map((id) => {
            const index = allFriends?.findIndex((friend) => friend.friend._id === id);
            return index;
         });

         setFriendIndex(indexArr);
      }
   }, [allFriends, values.listUsers]);

   const handleImageChange = async (e) => {
      const file = e.target.files[0];
      const filePath = URL.createObjectURL(file);
      setImage(file);
      setFieldValue("avatarVacation", filePath);
   };
   console.log(123, values.avatarVacation);


   return (
      <BoxColumn component="form" onSubmit={handleSubmit} sx={{ gap: "12px", p: "12px", alignItems: "center" }}>
         <CardHeaderCustom
            avatarUrl={vacation?.author?.avatar || userLogin?.avatar}
            fullName={vacation?.author?.fullName || userLogin?.fullName}
            value={values.isPublic}
            onChange={handleChange}
         />
         <BoxColumn
            sx={{
               p: "12px",
               gap: "12px",
               width: "100%",
               maxHeight: "70vh",
               overflow: "hidden",
               overflowY: "auto",
            }}
         >
            <TextFieldCustom
               id="title"
               name="title"
               label="Tiêu đề"
               value={values.title}
               onChange={handleChange}
               error={touched.title && Boolean(errors.title)}
               helperText={touched.title && errors.title}
            />
            <TextFieldCustom
               multiline
               rows={3}
               id="description"
               name="description"
               label="Mô tả kỳ nghỉ"
               value={values.description}
               onChange={handleChange}
               error={touched.description && Boolean(errors.description)}
               helperText={touched.description && errors.description}
            />
            {allFriends && (
               <Autocomplete
                  onChange={(event, newValue) =>
                     setFieldValue(
                        "listUsers",
                        newValue.map((item) => item.friend._id),
                     )
                  }
                  fullWidth
                  multiple
                  options={allFriends}
                  value={friendIndex.map((index) => allFriends[index])}
                  getOptionSelected={(option, value) => option.friend._id === value.friend._id}
                  getOptionLabel={(option) => option?.friend?.fullName}
                  filterSelectedOptions
                  renderInput={(params) => <TextField {...params} size="small" label="Người tham gia" placeholder="Favorites" />}
                  renderOption={(props, option) => (
                     <CardHeader
                        {...props}
                        sx={{ width: "100%", p: "10px 0" }}
                        avatar={
                           <Avatar
                              sx={{ width: "40px", height: "40px", border: "1px solid", cursor: "pointer" }}
                              src={option.friend.avatar}
                              alt="avatar"
                           />
                        }
                        title={<Typography sx={{ fontSize: "16px", fontWeight: "500", cursor: "pointer" }}>{option.friend.fullName}</Typography>}
                     />
                  )}
               />
            )}
            <Box sx={{ display: "flex", gap: "5px", width: "100%" }}>
               <TextFieldCustom
                  id="startDay"
                  name="startDay"
                  label="Ngày bắt đầu"
                  type="date"
                  value={values.startDay}
                  onChange={handleChange}
                  error={touched.startDay && Boolean(errors.startDay)}
                  helperText={touched.startDay && errors.startDay}
                  InputLabelProps={{ shrink: true }}
               />
               <TextFieldCustom
                  id="endDay"
                  name="endDay"
                  label="Ngày kết thúc"
                  type="date"
                  value={values.endDay}
                  onChange={handleChange}
                  error={touched.endDay && Boolean(errors.endDay)}
                  helperText={touched.endDay && errors.endDay}
                  InputLabelProps={{ shrink: true }}
               />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", width: "100%", alignItems: "flex-end", gap: "10px" }}>
               <Typography variant="body1" sx={{ width: "100%", fontWeight: "500" }}>
                  Cột mốc hành trình:
               </Typography>
               {values.milestones.map((milestone, index) => (
                  <Box key={index} sx={{ display: "flex", alignItems: "flex-start", gap: "5px", width: "100%" }}>
                     <TextFieldCustom
                        id={`milestones[${index}].time`}
                        name={`milestones[${index}].time`}
                        label="Chọn ngày"
                        type="date"
                        value={milestone.time}
                        onChange={handleChange}
                        error={touched.milestones && touched.milestones[index]?.time && Boolean(errors.milestones && errors.milestones[index]?.time)}
                        helperText={touched.milestones && touched.milestones[index]?.time && errors.milestones && errors.milestones[index]?.time}
                        InputLabelProps={{ shrink: true }}
                        customSx={{ maxWidth: "160px" }}
                     />
                     <TextFieldCustom
                        multiline
                        rows={3}
                        id={`milestones[${index}].description`}
                        name={`milestones[${index}].description`}
                        label="Nhập nội dung cột mốc"
                        value={milestone.description}
                        onChange={handleChange}
                        error={
                           touched.milestones &&
                           touched.milestones[index]?.description &&
                           Boolean(errors.milestones && errors.milestones[index]?.description)
                        }
                        helperText={
                           touched.milestones && touched.milestones[index]?.description && errors.milestones && errors.milestones[index]?.description
                        }
                     />
                     {values.milestones.length > 1 && (
                        <ButtonRadius
                           variant="text"
                           size="small"
                           startIcon={<CloseIcon />}
                           onClick={() =>
                              setFieldValue(
                                 "milestones",
                                 values.milestones.filter((_, i) => i !== index),
                              )
                           }
                           sx={{ flexShrink: 0, padding: 0 }}
                        />
                     )}
                  </Box>
               ))}
               <ButtonRadius
                  variant="text"
                  size="large"
                  startIcon={<AddCircleIcon fontSize="large" titleAccess="Thêm cột mốc" />}
                  onClick={() => setFieldValue("milestones", [...values.milestones, { time: "", description: "" }])}
                  sx={{ padding: 0, fontSize: "50px" }}
               />
            </Box>

            <Box width="100%">
               <IconButton>
                  <Box component="label">
                     <AddPhotoAlternateIcon titleAccess="Chọn ảnh" sx={{ color: "red", cursor: "pointer", fontSize: "30px" }} />
                     <VisuallyHiddenInput name="avatarVacation" type="file" accept="*/image" onChange={handleImageChange} />
                  </Box>
               </IconButton>
               {errors.avatarVacation && touched.avatarVacation && (
                  <FormHelperText error={true} sx={{ pl: "14px" }}>
                     {errors.avatarVacation}
                  </FormHelperText>
               )}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
               {values.avatarVacation && (
                  <Box sx={{ width: "100px", height: "100px" }}>
                     <CardMedia sx={{ objectFit: "cover", width: "100%", height: "100%" }} image={values.avatarVacation} alt="image" />
                  </Box>
               )}
            </Box>
         </BoxColumn>
         {type === "createVacation" &&
            (createVacationLoading === false ? (
               <Button onClick={() => setActionType("create")} color="primary" variant="contained" type="submit">
                  Tạo kì nghỉ
               </Button>
            ) : (
               <LoadingButton loading>Tạo kì nghỉ </LoadingButton>
            ))}

         {type === "updateVacation" &&
            (updateVacationLoading === false ? (
               <Button onClick={() => setActionType("update")} color="primary" variant="contained" type="submit">
                  Cập nhật
               </Button>
            ) : (
               <LoadingButton loading>Cập nhật </LoadingButton>
            ))}
      </BoxColumn>
   );
};

CreateVacationForm.propTypes = {
   type: PropTypes.string.isRequired,
   onProcessDone: PropTypes.func.isRequired,
   vacation: PropTypes.object,
};

export default CreateVacationForm;
