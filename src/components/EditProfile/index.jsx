import axios from "axios";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { userAPI } from "../../apis";
import { useCrudApi } from "../../hooks";
import { TextFieldCustom } from "../../styles";
import { updateUser } from "../../redux/authSlice";
import userValidation from "../../validations/userValidation";

const EditProfileForm = ({ onProcessDone }) => {
   const [city, setCity] = useState([]);
   const dispatch = useDispatch();
   const { userLogin } = useSelector((state) => state.auth);
   const { data, loading, fetchData } = useCrudApi(userAPI.update);

   useEffect(() => {
      const logCity = async () => {
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

      logCity();
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
         await fetchData(values);
      },

      validationSchema: userValidation("updateUser"),
   });

   const { handleSubmit, handleChange, errors, values, setFieldValue } = formik;

   useEffect(() => {
      if (data) {
         dispatch(updateUser(data));
         onProcessDone();
      }
   }, [data]);

   return (
      <Box padding="20px">
         <Grid component="form" onSubmit={handleSubmit} container spacing={2}>
            <Grid xs={12}>
               <TextFieldCustom
                  type="text"
                  name="fullName"
                  value={values.fullName}
                  onChange={handleChange}
                  error={errors.fullName}
                  helperText={errors.fullName}
                  label="Họ và Tên"
               />
            </Grid>
            <Grid xs={12}>
               <TextFieldCustom
                  type="text"
                  name="userName"
                  value={values.userName}
                  onChange={handleChange}
                  error={errors.userName}
                  helperText={errors.userName}
                  label="Tên đăng nhập"
               />
            </Grid>
            <Grid xs={12}>
               <TextFieldCustom
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  error={errors.email}
                  helperText={errors.email}
                  label="Email"
               />
            </Grid>
            <Grid xs={12}>
               <TextFieldCustom
                  name="phoneNumber"
                  type="tel"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  error={errors.phoneNumber}
                  helperText={errors.phoneNumber}
                  label="Số điện thoại"
               />
            </Grid>
            <Grid xs={12}>
               <TextFieldCustom
                  name="describe"
                  type="text"
                  label="Nhập mô tả bản thân"
                  value={values.describe}
                  onChange={handleChange}
                  error={errors.describe}
                  helperText={errors.describe}
                  multiline
                  maxRows={3}
               />
            </Grid>
            <Grid xs={12} sm={4}>
               <FormControl fullWidth>
                  <InputLabel size="small">Giới tính</InputLabel>
                  <Select size="small" name="gender" error={errors.gender} value={values.gender} label="Giới tính" onChange={handleChange}>
                     <MenuItem value={1}>Nam</MenuItem>
                     <MenuItem value={2}>Nữ</MenuItem>
                     <MenuItem value={3}>Khác</MenuItem>
                  </Select>
                  <FormHelperText error={true}>{errors.gender}</FormHelperText>
               </FormControl>
            </Grid>
            <Grid xs={12} sm={4}>
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
            </Grid>
            <Grid xs={12} sm={4}>
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
            </Grid>
            <Grid xs={12}>
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
            </Grid>
            <Grid xs={12}>
               {loading === true ? (
                  <LoadingButton fullWidth variant="contained" loading>
                     Cập nhật
                  </LoadingButton>
               ) : (
                  <Button fullWidth type="submit" variant="contained">
                     Cập nhật
                  </Button>
               )}
            </Grid>
         </Grid>
      </Box>
   );
};

export default EditProfileForm;
