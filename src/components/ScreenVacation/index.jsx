import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, CardActions, CardHeader, CardMedia, CircularProgress, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { ChatBubble, FavoriteBorder, Favorite, Group, Lock, MoreVert, PostAdd, Public, Share } from "@mui/icons-material";
import TimeAgo from "../TimeAgo";
import { useCrudApi } from "../../hooks";
import { commentAPI, vacationAPI } from "../../apis";
import { likeStart, removeStart } from "../../redux/vacationSlice";
import { BoxColumn, BoxFlexBetween, ButtonRadius, TypographyWrap } from "../../styles";

const isPublic = {
   1: <Public sx={{ fontSize: "16px" }} />,
   2: <Group sx={{ fontSize: "16px" }} />,
   3: <Lock sx={{ fontSize: "16px" }} />,
};

const ScreenVacation = ({ vacation, handleUpdateVacation, handleCreatePost }) => {
   const [anchorEl, setAnchorEl] = useState(null);
   //================================================================
   const open = Boolean(anchorEl);
   const dispatch = useDispatch();
   const { userLogin } = useSelector((state) => state.auth);
   const { data: dataLike, fetchData: handleLike } = useCrudApi(vacationAPI.like);
   const { data: dataRemove, loading: loadingRemove, fetchData: handleRemove } = useCrudApi(vacationAPI.remove);
   const { data: commentNumber, fetchData: fetchDataNumber } = useCrudApi(commentAPI.getNumberComments);
   //================================================================
   useEffect(() => {
      if (dataLike) {
         dispatch(likeStart(dataLike));
      }
   }, [dataLike]);

   useEffect(() => {
      if (dataRemove) {
         dispatch(removeStart(dataRemove));
      }
   }, [dataRemove]);

   useEffect(() => {
      if (vacation) {
         fetchDataNumber(vacation._id);
      }
   }, [vacation]);

   const handleClose = () => setAnchorEl(null);
   const handleClick = (event) => setAnchorEl(event.currentTarget);
   //================================================================
   const isLiked = vacation?.likes?.includes(userLogin?._id);
   const isUserLogin = userLogin?._id === vacation?.author?._id;

   return (
      <BoxColumn sx={{ bgcolor: "background.paper", boxShadow: 4, width: "100%", borderRadius: "10px", gap: "10px", p: "10px" }}>
         <CardHeader
            sx={{ width: "100%", p: 0 }}
            avatar={
               <Avatar
                  component={Link}
                  to={`/profile/${vacation?.author?._id}`}
                  sx={{ width: "40px", height: "40px", border: "1px solid" }}
                  src={vacation?.author?.avatar}
                  alt="avatar"
               />
            }
            action={
               isUserLogin && (
                  <>
                     <IconButton onClick={handleClick}>
                        <MoreVert />
                     </IconButton>
                     <Menu anchorEl={anchorEl} open={open} onClose={handleClose} sx={{ p: 0 }}>
                        <MenuItem
                           onClick={() => {
                              handleClose();
                              handleUpdateVacation();
                           }}
                        >
                           Chỉnh sửa bài viết
                        </MenuItem>
                        {loadingRemove ? (
                           <MenuItem>
                              <CircularProgress size="20px" />
                           </MenuItem>
                        ) : (
                           <MenuItem
                              onClick={async () => {
                                 await handleRemove(vacation._id);
                                 handleClose();
                              }}
                           >
                              Xóa bài viết
                           </MenuItem>
                        )}
                     </Menu>
                  </>
               )
            }
            title={
               <Typography component={Link} to={`/profile/${vacation?.author?._id}`} variant="body1" sx={{ fontWeight: 500, color: "text.primary" }}>
                  {vacation?.author?.fullName}
               </Typography>
            }
            subheader={
               <Typography variant="caption" sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <TimeAgo date={vacation?.createdAt} />
                  {isPublic[vacation.isPublic]}
               </Typography>
            }
         />
         <Box
            sx={{
               display: "flex",
               width: "100%",
               gap: "10px",
               flexDirection: { xs: "column", md: "row" },
               alignItems: { md: "flex-start" },
            }}
         >
            <CardMedia
               component="img"
               image={vacation?.avatarVacation}
               alt="image"
               sx={{
                  height: { md: "200px" },
                  width: { xs: "100%", md: "200px" },
                  aspectRatio: { xs: "16/8", md: "unset" },
                  objectFit: "cover",
               }}
            />
            <Box sx={{ width: "100%" }}>
               <BoxFlexBetween gap={1} sx={{ alignItems: "flex-start" }}>
                  <Typography whiteSpace="nowrap" variant="body1" fontWeight={500}>
                     Kì nghỉ:
                  </Typography>
                  <TypographyWrap variant="body1"> {vacation?.title}</TypographyWrap>
               </BoxFlexBetween>
               <BoxFlexBetween gap={1} sx={{ alignItems: "flex-start" }}>
                  <Typography whiteSpace="nowrap" variant="body1" fontWeight={500}>
                     Mô tả:
                  </Typography>
                  <Typography variant="body1" sx={{ flexWrap: "wrap" }}>
                     {vacation?.description}
                  </Typography>
               </BoxFlexBetween>
               <BoxFlexBetween gap={1} sx={{ alignItems: "flex-start" }}>
                  <Typography whiteSpace="nowrap" variant="body1" fontWeight={500}>
                     Thời gian:
                  </Typography>
                  <Typography variant="body1">
                     {vacation?.startDay}
                     {" - "}
                     {vacation?.endDay}
                  </Typography>
               </BoxFlexBetween>
               <BoxFlexBetween sx={{ alignItems: "flex-start", gap: 1 }}>
                  <Typography whiteSpace="nowrap" variant="body1" sx={{ fontWeight: 500, flexShrink: 0 }}>
                     Lịch trình:
                  </Typography>
                  <BoxColumn>
                     {vacation?.milestones?.slice(0, 2).map((item) => (
                        <BoxFlexBetween key={item._id} gap={1}>
                           <TypographyWrap variant="body1">
                              {item?.time}
                              {": "}
                              {item?.description}{" "}
                           </TypographyWrap>
                           <ButtonRadius key={item._id} onClick={() => handleCreatePost(item._id)} startIcon={<PostAdd />} sx={{ p: 0 }} />
                        </BoxFlexBetween>
                     ))}
                     {vacation?.milestones?.length > 2 && <Typography>...</Typography>}
                  </BoxColumn>
               </BoxFlexBetween>
               <BoxFlexBetween gap={1}>
                  <Typography whiteSpace="nowrap" variant="body1" fontWeight={500}>
                     Số lượng người tham gia:
                  </Typography>
                  <Typography>{vacation?.listUsers?.length}</Typography>
               </BoxFlexBetween>
               <Typography component={Link} variant="body1" to={`/vacation/${vacation?._id}`} sx={{ color: "blue" }}>
                  Xem chi tiết...
               </Typography>
            </Box>
         </Box>
         <CardActions sx={{ width: "100%", justifyContent: "space-between", pt: "0", pb: "0" }}>
            <BoxFlexBetween gap="0.3rem">
               <IconButton onClick={() => handleLike(vacation?._id)}>{isLiked ? <Favorite sx={{ color: "red" }} /> : <FavoriteBorder />}</IconButton>
               {vacation?.likes.length > 0 && <Typography>{vacation?.likes?.length}</Typography>}
            </BoxFlexBetween>
            <BoxFlexBetween gap="0.3rem" color="text.primary" component={Link} to={`/vacation/${vacation?._id}`}>
               <IconButton>
                  <ChatBubble />
               </IconButton>
               {commentNumber > 0 && <Typography>{commentNumber}</Typography>}
            </BoxFlexBetween>
            <IconButton aria-label="share">
               <Share />
            </IconButton>
         </CardActions>
      </BoxColumn>
   );
};

ScreenVacation.propTypes = {
   vacation: PropTypes.object,
   handleCreatePost: PropTypes.func,
   handleLikeVacation: PropTypes.func,
   handleUpdateVacation: PropTypes.func,
   handleRemoveVacation: PropTypes.func,
};

export default ScreenVacation;
