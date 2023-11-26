import { Avatar, Box, CardActions, CardHeader, CardMedia, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ShareIcon from "@mui/icons-material/Share";
import PropTypes from "prop-types";
import PreviewIcon from "@mui/icons-material/Preview";
import { BoxColumn, BoxFlexBetween, ButtonRadius, TypographyWrap } from "../styles";
import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import useVacation from "../hooks/useVacation";
import { CreateVacationForm, OpenModal } from "../components";
import CreatePost from "../components/CreatePost";
import usePost from "../hooks/usePost";
import Post from "../components/ScreenPost/index1";
import Navbar from "../components/Navbar";

const VacationDetail = () => {
   const { userLogin } = useSelector((state) => state.auth);
   const { vacationId } = useParams();
   const navigate = useNavigate();
   const { dataVacation, dataLike, setVacation, fetchDataVacation, handleLikeVacation } = useVacation();
   //================================================================
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);
   const handleClick = (event) => setAnchorEl(event.currentTarget);
   const handleClose = () => setAnchorEl(null);
   //=================================================================
   const [type, setType] = useState("");
   const [milestone, setMilestone] = useState(null);
   const [openModal, setOpenModal] = useState(false);
   const [confirmOpenModal, setConfirmOpenModal] = useState(false);
   const handleOpen = () => {
      setOpenModal(true);
   };
   const handleConfirmOpen = () => setConfirmOpenModal(true);
   const handleConfirmClose = () => setConfirmOpenModal(false);
   const handleCloseAllModal = () => {
      setConfirmOpenModal(false);
      setOpenModal(false);
   };
   //=====================================================================
   const { selectVacations, selectMilestones, handleSelectVacationChange, dataPostMilestone, fetchDataPostMilestone } = usePost("", dataVacation);
   const isLiked = dataVacation?.likes?.includes(userLogin?._id);
   const isUserLogin = userLogin?._id === dataVacation?.author?._id;
   const [reload, setReload] = useState(null);

   const onReloadVacation = () => {
      setReload(true);
   };

   useEffect(() => {
      if (vacationId) {
         fetchDataVacation(vacationId);
      }
   }, [vacationId, reload]);

   useEffect(() => {
      if (dataLike) {
         setVacation(dataLike);
      }
   }, [dataLike]);

   useEffect(() => {
      if (milestone) {
         fetchDataPostMilestone(milestone?._id);
      }
   }, [milestone]);

   useEffect(() => {
      fetchDataPostMilestone(milestone?._id);
   }, [reload]);

   return (
      <Box>
         <Navbar />
         <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <Box sx={{ flex: 1, display: "flex", justifyContent: "center", position: "sticky", top: 64 }}>
               <BoxColumn
                  sx={{
                     backgroundColor: "background.paper",
                     boxShadow: 4,
                     width: "600px",
                     borderRadius: "10px",
                     gap: "10px",
                     p: "10px",
                  }}
               >
                  <CardHeader
                     sx={{ width: "100%", p: 0 }}
                     avatar={
                        <Avatar
                           onClick={() => {
                              navigate(`/profile/${dataVacation?.author?._id}`);
                           }}
                           sx={{ width: "50px", height: "50px", border: "1px solid", cursor: "pointer" }}
                           src={dataVacation?.author?.avatar}
                           alt="avatar"
                        />
                     }
                     action={
                        isUserLogin && (
                           <>
                              <IconButton onClick={handleClick}>
                                 <MoreVertIcon />
                              </IconButton>
                              <Menu anchorEl={anchorEl} open={open} onClose={handleClose} sx={{ p: 0 }}>
                                 <MenuItem
                                    onClick={() => {
                                       handleClose();
                                       handleOpen();
                                       setType("updateVacation");
                                    }}
                                 >
                                    Chỉnh sửa bài viết
                                 </MenuItem>
                                 <MenuItem
                                    onClick={() => {
                                       handleClose();
                                       // handleRemoveVacation();
                                    }}
                                 >
                                    Xóa bài viết
                                 </MenuItem>
                              </Menu>
                           </>
                        )
                     }
                     title={
                        <Typography
                           onClick={() => {
                              navigate(`/profile/${dataVacation?.author?._id}`);
                           }}
                           variant="h6"
                           sx={{ cursor: "pointer", width: "max-content" }}
                        >
                           {dataVacation?.author?.fullName}
                        </Typography>
                     }
                     subheader="September 14, 2016"
                  />
                  <Box sx={{ display: "flex", width: "100%", gap: "10px", alignItems: "flex-start" }}>
                     <CardMedia
                        component="img"
                        image={dataVacation?.avatarVacation}
                        alt="Ảnh"
                        sx={{
                           height: "200px",
                           width: "200px",
                           objectFit: "cover",
                        }}
                     />

                     <Box sx={{ width: "100%" }}>
                        <BoxFlexBetween gap={1}>
                           <Typography variant="body1" fontWeight={500}>
                              Kì nghỉ:
                           </Typography>
                           <TypographyWrap variant="body1"> {dataVacation?.title}</TypographyWrap>
                        </BoxFlexBetween>
                        <BoxFlexBetween gap={1}>
                           <Typography variant="body1" fontWeight={500}>
                              Mô tả:
                           </Typography>
                           <Typography variant="body1" sx={{ flexWrap: "wrap" }}>
                              {dataVacation?.description}
                           </Typography>
                        </BoxFlexBetween>
                        <BoxFlexBetween gap={1}>
                           <Typography variant="body1" fontWeight={500}>
                              Thời gian:
                           </Typography>
                           <Typography variant="body1">
                              {dataVacation?.startDay}
                              {" - "}
                              {dataVacation?.endDay}
                           </Typography>
                        </BoxFlexBetween>

                        <BoxFlexBetween sx={{ alignItems: "flex-start", gap: 1 }}>
                           <Typography variant="body1" sx={{ fontWeight: 500, flexShrink: 0 }}>
                              Lịch trình:
                           </Typography>
                           <BoxColumn>
                              {dataVacation?.milestones?.map((item) => (
                                 <BoxFlexBetween key={item._id} gap={1}>
                                    <TypographyWrap variant="body1">
                                       {item?.time}
                                       {": "}
                                       {item?.description}{" "}
                                    </TypographyWrap>
                                    <ButtonRadius
                                       onClick={() => {
                                          handleOpen();
                                          setMilestone(item);
                                          setType("createPost");
                                       }}
                                       startIcon={<PostAddIcon />}
                                       sx={{ p: 0 }}
                                    />
                                    <ButtonRadius
                                       onClick={() => {
                                          setMilestone(item);
                                       }}
                                       sx={{ p: 0 }}
                                    >
                                       <PreviewIcon fontSize="20px" />
                                    </ButtonRadius>
                                 </BoxFlexBetween>
                              ))}
                           </BoxColumn>
                        </BoxFlexBetween>
                        <BoxFlexBetween gap={1}>
                           <Typography variant="body1" fontWeight={500}>
                              Số lượng người tham gia:
                           </Typography>
                           <Typography>{dataVacation?.listUsers?.length}</Typography>
                        </BoxFlexBetween>
                     </Box>
                  </Box>
                  <CardActions
                     sx={{
                        width: "100%",
                        justifyContent: "space-between",
                        pt: "0",
                        pb: "0",
                     }}
                  >
                     <BoxFlexBetween gap="0.3rem">
                        <IconButton onClick={() => handleLikeVacation(dataVacation?._id)}>
                           {isLiked ? <FavoriteOutlined sx={{ color: "red" }} /> : <FavoriteBorderOutlined />}
                        </IconButton>
                        {dataVacation?.likes.length > 0 && <Typography>{dataVacation?.likes?.length}</Typography>}
                     </BoxFlexBetween>
                     <BoxFlexBetween gap="0.3rem">
                        <IconButton>
                           <ChatBubbleOutlineOutlined />
                        </IconButton>
                        {/* {commentNumber > 0 && <Typography>{commentNumber}</Typography>} */}
                     </BoxFlexBetween>
                     <IconButton aria-label="share">
                        <ShareIcon />
                     </IconButton>
                  </CardActions>
               </BoxColumn>
            </Box>
            {milestone && (
               <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                  <BoxColumn sx={{ gap: "20px", alignItems: "flex-start", width: "500px" }}>
                     <Typography variant="h6">
                        {milestone?.time}
                        {": "}
                        {milestone?.description}
                     </Typography>
                     {dataPostMilestone ? (
                        dataPostMilestone.map((item, idx) => <Post key={idx} post={item} />)
                     ) : (
                        <Typography>Chưa có bài viết nào</Typography>
                     )}
                  </BoxColumn>
               </Box>
            )}
         </Box>
         <OpenModal
            type={type}
            openModal={openModal}
            confirmOpenModal={confirmOpenModal}
            handleConfirmOpen={handleConfirmOpen}
            handleConfirmClose={handleConfirmClose}
            handleCloseAllModal={handleCloseAllModal}
         >
            {type === "createVacation" || type === "updateVacation" ? (
               <CreateVacationForm
                  type={type}
                  onProcessDone={() => {
                     handleCloseAllModal();
                     onReloadVacation();
                  }}
                  vacation={dataVacation}
               />
            ) : (
               <CreatePost
                  milestone={milestone?._id}
                  vacation={dataVacation}
                  type={type}
                  selectMilestones={selectMilestones}
                  selectVacations={selectVacations}
                  handleSelectVacationChange={handleSelectVacationChange}
                  onProcessDone={() => {
                     handleCloseAllModal();
                     onReloadVacation();
                  }}
               />
            )}
         </OpenModal>
      </Box>
   );
};

export default VacationDetail;
