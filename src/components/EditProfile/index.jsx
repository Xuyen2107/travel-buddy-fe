import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { PaperCenter } from "../../styles/PaperCenter";
import { BoxColumn } from "../../styles/BoxColumn";
import { TextFieldCustom } from "../../styles/TextFieldCustom";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
   const navigate = useNavigate();
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
   const { user } = useSelector((state) => state.auth);

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
         fullName: user.fullName || "",
         userName: user.userName || "",
         email: user.email || "",
         phoneNumber: user.phoneNumber || "",
         age: user.age || "",
         dateOfBirth: user.dateOfBirth || "",
         gender: user.gender || "",
         describe: user.describe || "",
         city: user.city || "",
      },

      onSubmit: async (values) => {
         try {
            console.log(values);
         } catch (error) {
            console.error;
         }
      },
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
                  <BoxColumn component="form" onSubmit={handleSubmit}>
                     <Typography>Chỉnh sửa trang cá nhân</Typography>
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
                           <Select size="small" name="age" value={values.age} label="Tuổi" onChange={handleChange}>
                              {Array.from({ length: 89 }, (_, index) => (
                                 <MenuItem key={index + 12} value={index + 12}>
                                    {index + 12}
                                 </MenuItem>
                              ))}
                           </Select>
                        </FormControl>
                        <FormControl fullWidth>
                           <InputLabel size="small">Giới tính</InputLabel>
                           <Select size="small" name="dateOfBirth" value={values.dateOfBirth} label="Giới tính" onChange={handleChange}>
                              <MenuItem value={1}>Nam</MenuItem>
                              <MenuItem value={2}>Nữ</MenuItem>
                              <MenuItem value={3}>Khác</MenuItem>
                           </Select>
                        </FormControl>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                           <DatePicker
                              // maxDate={new Date()}
                              format="DD/MM/YYYY"
                              value={values.dateOfBirth}
                              onChange={(value) => {
                                 setFieldValue("dateOfBirth", value);
                                 console.log(values);
                              }}
                              sx={{ width: "250px", flexShrink: 0 }}
                              label="Chọn ngày sinh"
                              slotProps={{ textField: { size: "small" } }}
                           />
                        </LocalizationProvider>
                     </Box>

                     <Autocomplete
                        onChange={(e, value) => {
                           console.log(value);
                        }}
                        disablePortal
                        options={city}
                        fullWidth
                        renderInput={(params) => <TextField {...params} size="small" label="Nơi bạn sinh sống" />}
                     />
                     <Button type="submit">Cập nhật</Button>
                  </BoxColumn>
               </PaperCenter>
            </Box>
         </Modal>
         <Modal open={confirmOpen} onClose={handleConfirmClose}>
            <PaperCenter sx={{ width: "300px", p: "20px" }}>
               <Typography variant="h6">Bạn đang tạo bài viết?</Typography>
               <Button onClick={handleConfirm}>Thoát</Button>
               <Button onClick={handleConfirmClose}>Tiếp tục chỉnh sửa</Button>
            </PaperCenter>
         </Modal>
      </Box>
   );
};

export default EditProfile;
