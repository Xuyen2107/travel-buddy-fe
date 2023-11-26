import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { PaperCenter, TextFieldCustom } from "../../styles/index";
import { BoxColumn } from "../../styles/index";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { Autocomplete, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import userValidation from "../../validations/userValidation";
import { AskModal } from "../../components";

const EditProfile = ({ handleUpdateUser }) => {
   const [open, setOpen] = useState(false);
   const [confirmOpen, setConfirmOpen] = useState(false);
   const [city, setCity] = useState([]);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setConfirmOpen(true);
   const handleConfirmClose = () => setConfirmOpen(close);
   const handleConfirm = () => {
      setOpen(false);
      setConfirmOpen(false);
   };
   const { userLogin } = useSelector((state) => state.auth);
   useEffect(() => {
      const logMovies = async () => {
         try {
            const response = await axios.get("https://provinces.open-api.vn/api/p/");
            const data = response.data;
            if (data) {
               const allCity = data?.map((item) => {
                  return { label: item.name, code: item.code };
               });
               setCity(allCity);
            }
         } catch (error) {
            console.error(error).response.data;
         }
      };

      logMovies();
   }, []);

   const formik = useFormik({
      initialValues: {
         fullName: userLogin?.fullName || "",
         userName: userLogin?.userName || "",
         email: userLogin?.email || "",
         phoneNumber: userLogin?.phoneNumber || "",
         age: userLogin?.age || "",
         dateOfBirth: userLogin?.dateOfBirth || "",
         gender: userLogin?.gender || "",
         describe: userLogin?.describe || "",
         city: userLogin?.city || "",
      },

      onSubmit: async (values) => {
         await handleUpdateUser(values);
         handleConfirm();
      },

      validationSchema: userValidation("updateUser"),
   });

   const { handleSubmit, handleChange, errors, values, setFieldValue } = formik;

   return (
      <Box>
         <Button
            variant="contained"
            startIcon={<EditIcon />}
            sx={{
               textTransform: "inherit",
            }}
            onClick={handleOpen}
         >
            Chỉnh sửa trang cá nhân
         </Button>
         <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box
               sx={{
                  maxHeight: "100vh",
                  overflow: "hidden",
                  overflowY: "auto",
                  width: "100%",
               }}
            >
               <PaperCenter
                  sx={{
                     p: "10px",
                     width: "500px",
                  }}
               >
                  <BoxColumn component="form" onSubmit={handleSubmit} sx={{ gap: "12px", alignItems: "center" }}>
                     <Typography variant="h6">Chỉnh sửa trang cá nhân</Typography>
                     <TextFieldCustom
                        type="text"
                        name="fullName"
                        value={values.fullName}
                        onChange={handleChange}
                        error={errors.fullName}
                        helperText={errors.fullName}
                        label="Họ và Tên"
                     />
                     <TextFieldCustom
                        type="text"
                        name="userName"
                        value={values.userName}
                        onChange={handleChange}
                        error={errors.userName}
                        helperText={errors.userName}
                        label="Tên đăng nhập"
                     />
                     <TextFieldCustom
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        error={errors.email}
                        helperText={errors.email}
                        label="Email"
                     />
                     <TextFieldCustom
                        name="phoneNumber"
                        type="tel"
                        value={values.phoneNumber}
                        onChange={handleChange}
                        error={errors.phoneNumber}
                        helperText={errors.phoneNumber}
                        label="Số điện thoại"
                     />
                     <TextFieldCustom
                        name="describe"
                        type="text"
                        label="Nhập mô tả bản thân"
                        value={values.describe}
                        onChange={handleChange}
                        error={errors.describe}
                        helperText={errors.describe}
                        multiline
                        rows={3}
                     />
                     <Box
                        sx={{
                           display: "flex",
                           gap: "10px",
                           justifyContent: "space-between",
                           width: "100%",
                        }}
                     >
                        <FormControl fullWidth>
                           <InputLabel size="small">Tuổi</InputLabel>
                           <Select size="small" name="age" error={errors.age} value={values.age} label="Tuổi" onChange={handleChange}>
                              {Array.from({ length: 89 }, (_, index) => (
                                 <MenuItem key={index + 12} value={index + 12}>
                                    {index + 12}
                                 </MenuItem>
                              ))}
                           </Select>
                           <FormHelperText error={true}>{errors.age}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth>
                           <InputLabel size="small">Giới tính</InputLabel>
                           <Select size="small" name="gender" error={errors.gender} value={values.gender} label="Giới tính" onChange={handleChange}>
                              <MenuItem value={1}>Nam</MenuItem>
                              <MenuItem value={2}>Nữ</MenuItem>
                              <MenuItem value={3}>Khác</MenuItem>
                           </Select>
                           <FormHelperText error={true}>{errors.gender}</FormHelperText>
                        </FormControl>

                        <TextFieldCustom
                           name="dateOfBirth"
                           type="date"
                           value={values.dateOfBirth}
                           onChange={handleChange}
                           error={errors.dateOfBirth}
                           helperText={errors.dateOfBirth}
                           label="Ngày sinh"
                           sx={{ input: { cursor: "pointer" } }}
                           InputLabelProps={{
                              shrink: true,
                           }}
                           InputProps={{
                              inputProps: {
                                 min: "1/1/2023",
                              },
                           }}
                        />
                     </Box>

                     <Autocomplete
                        value={values.city?.label}
                        onChange={(e, value) => {
                           setFieldValue("city", value);
                        }}
                        disablePortal
                        options={city}
                        fullWidth
                        renderInput={(params) => (
                           <TextField {...params} error={errors.city} helperText={errors.city} size="small" label="Nơi bạn sinh sống" />
                        )}
                     />
                     <Button type="submit" variant="contained">
                        Cập nhật
                     </Button>
                  </BoxColumn>
               </PaperCenter>
            </Box>
         </Modal>
         <AskModal
            open={confirmOpen}
            onClose={handleConfirmClose}
            onClickCloseAll={handleConfirm}
            title="Bạn đang chỉnh sửa trang cá nhân?"
            continueTitle="Tiếp tục chỉnh sửa"
         />
      </Box>
   );
};

export default EditProfile;
