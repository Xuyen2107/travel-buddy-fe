import { Autocomplete, Box, Button, FormHelperText, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { VisuallyHiddenInput } from "../../styles/index";
import BoxColumn from "../../styles/BoxColumn";
import usePost from "../../hooks/usePost";
import CardHeaderCustom from "../CardHeaderCustom";
import { LoadingButton } from "@mui/lab";

const CreatePost = ({ post, vacation, milestone, type, closeModal, onProcessDone }) => {
   const { userLogin } = useSelector((state) => state.auth);
   const {
      formik,
      selectMilestones,
      selectVacations,
      loadingCreatePost,
      loadingUpdatePost,
      setActionType,
      handleImageChange,
      handleSelectVacationChange,
   } = usePost(post, vacation, milestone, onProcessDone);
   const { values, errors, touched, setFieldValue, handleChange, handleSubmit } = formik;

   const vacationIndex = selectVacations?.findIndex((item) => item?.id === values?.vacation);
   const milestoneIndex = selectMilestones?.findIndex((item) => item?.id === values?.milestone);

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
               value={selectVacations != -1 ? selectVacations[vacationIndex] : null}
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
         <TextField
            name="content"
            type="text"
            label="Nhập nội dung"
            value={values.content}
            onChange={handleChange}
            error={touched.content && Boolean(errors.content)}
            helperText={touched.content && errors.content}
            multiline
            rows={4}
            variant="filled"
            fullWidth
         />
         <Box width="100%">
            <Box component="label">
               <AddPhotoAlternateIcon titleAccess="Chọn ảnh" sx={{ color: "red", cursor: "pointer", fontSize: "30px" }} />
               <VisuallyHiddenInput name="images" type="file" accept="*/image" multiple onChange={handleImageChange} />
               {touched.images && Boolean(errors.images) && (
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
               {values?.images?.length > 0 &&
                  values?.images?.map((item, idx) => (
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
                           src={item}
                           alt="image"
                        />
                     </Box>
                  ))}
            </Box>
         </Box>
         {type === "createPost" &&
            (loadingCreatePost === false ? (
               <Button
                  onClick={() => {
                     setActionType("create");
                     closeModal();
                  }}
                  variant="contained"
                  type="submit"
                  size="medium"
                  sx={{ textTransform: "none" }}
               >
                  Tạo bài viết
               </Button>
            ) : (
               <LoadingButton loading>Tạo bài viết</LoadingButton>
            ))}

         {type === "updatePost" &&
            (loadingUpdatePost === false ? (
               <Button
                  onClick={() => {
                     setActionType("update");
                     closeModal();
                  }}
                  variant="contained"
                  type="submit"
                  size="medium"
                  sx={{ textTransform: "none" }}
               >
                  Cập nhật
               </Button>
            ) : (
               <LoadingButton loading>Cập nhật</LoadingButton>
            ))}
      </BoxColumn>
   );
};

CreatePost.propTypes = {
   post: PropTypes.object,
   create: PropTypes.bool,
   update: PropTypes.bool,
   closeModal: PropTypes.func,
   vacation: PropTypes.object,
};

export default CreatePost;
