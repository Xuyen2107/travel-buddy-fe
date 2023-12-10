import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import SendIcon from "@mui/icons-material/Send";
import UploadButton from "../UploadButton";
import TabDefault from "../Tab";
import PropTypes from "prop-types";
import { BoxFlexBetween } from "../../styles";
import { useCrudApi } from "../../hooks";
import { userAPI } from "../../apis";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import OpenModal from "../OpenModal";
import EditProfileForm from "../EditProfile/index";
import EditIcon from "@mui/icons-material/Edit";

const ProfileTop = ({ userProfile }) => {
   const [openModal, setOpenModal] = useState(false);
   const [confirmOpen, setConfirmOpen] = useState(false);
   const handleOpen = () => setOpenModal(true);
   const handleClose = () => setConfirmOpen(true);
   const handleConfirmClose = () => setConfirmOpen(close);
   const handleCloseAll = () => {
      setOpenModal(false);
      setConfirmOpen(false);
   };
   const { userLogin } = useSelector((state) => state.auth);
   const isNonMobileScreens = useMediaQuery("(min-width: 900px)");
   const { data: dataFriend, fetchData: fetchDataFriend } = useCrudApi(userAPI.getSingleFriend);
   const { data: dataSend, loading: loadingSend, fetchData: fetchDataSend } = useCrudApi(userAPI.sendFriend);
   const { data: dataAccept, loading: loadingAccept, fetchData: fetchDataAccept } = useCrudApi(userAPI.acceptFriend);
   const { data: dataRemove, loading: loadingRemove, fetchData: fetchDataRemove } = useCrudApi(userAPI.removeFriend);
   const isLoggedInUser = userProfile?._id === userLogin?._id;
   const sender = userLogin?._id === dataFriend?.sender;
   console.log(userLogin._id);
   console.log(userProfile._id);

   useEffect(() => {
      if (userProfile._id !== userLogin._id) {
         fetchDataFriend(userProfile._id);
         console.log(1);
      }
   }, [userLogin._id, userProfile._id]);

   useEffect(() => {
      if (dataSend || dataAccept || dataRemove) {
         fetchDataFriend(userProfile._id);
      }
   }, [dataAccept, dataRemove, dataSend]);

   return (
      <>
         {userProfile && (
            <Box bgcolor="background.paper">
               <Box
                  maxWidth="60rem"
                  height={isNonMobileScreens ? "30rem" : "35rem"}
                  margin="auto"
                  sx={{
                     display: "grid",
                     gridTemplateColumns: isNonMobileScreens ? "170px 1fr" : "1fr",
                     gridTemplateRows: isNonMobileScreens ? "55% 35% 10%" : "40% 25% 25% 10%",
                     gridTemplateAreas: isNonMobileScreens ? `"cover cover" "picture info" "bottom bottom"` : `"cover" "picture" "info" "bottom"`,
                  }}
               >
                  <Box sx={{ gridArea: "cover", position: "relative" }}>
                     <img
                        width="100%"
                        height="110%"
                        style={{ objectFit: "cover", borderRadius: "0 0 10px 10px" }}
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Golden_tabby_and_white_kitten_n01.jpg/1200px-Golden_tabby_and_white_kitten_n01.jpg"
                        alt="background"
                     />
                     {isLoggedInUser && <UploadButton isCoverProfileBtn />}
                  </Box>
                  <Box
                     sx={{
                        gridArea: "picture",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        width: isNonMobileScreens ? "150px" : "150px",
                        height: isNonMobileScreens ? "150px" : "150px",
                        justifySelf: "center",
                     }}
                  >
                     <Box width="100%" height="100%">
                        <img
                           style={{ objectFit: "cover", borderRadius: "50%", boxShadow: "0px 0px 5px" }}
                           width="100%"
                           height="100%"
                           border="2px solid"
                           src={userProfile?.avatar}
                           alt="avatar"
                        />
                     </Box>
                     {isLoggedInUser && <UploadButton isIconButton />}
                  </Box>
                  <Box
                     sx={{
                        gridArea: "info",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: isNonMobileScreens ? "flex-start" : "center",
                        flexDirection: "column",
                        paddingLeft: isNonMobileScreens ? "1rem" : "0",
                        paddingTop: isNonMobileScreens ? "2rem" : "0",
                     }}
                  >
                     <Typography
                        whiteSpace="nowrap"
                        variant="h2"
                        fontWeight="bold"
                        mb="1rem"
                        sx={{ fontSize: isNonMobileScreens ? "2rem" : "1.8rem" }}
                     >
                        {userProfile?.fullName}
                     </Typography>
                     {isLoggedInUser ? (
                        <Button variant="contained" startIcon={<EditIcon />} sx={{ textTransform: "none" }} onClick={handleOpen}>
                           Chỉnh sửa trang cá nhân
                        </Button>
                     ) : (
                        <>
                           {dataFriend === null ? (
                              loadingSend === true ? (
                                 <LoadingButton variant="contained" loading>
                                    Kết bạn
                                 </LoadingButton>
                              ) : (
                                 <Button
                                    variant="contained"
                                    startIcon={<PersonAddAlt1Icon />}
                                    sx={{ textTransform: "inherit" }}
                                    onClick={() => fetchDataSend(userProfile._id)}
                                 >
                                    Kết bạn
                                 </Button>
                              )
                           ) : (
                              <BoxFlexBetween gap="1rem">
                                 {dataFriend?.status === 2 ? (
                                    <>
                                       {loadingRemove === true ? (
                                          <LoadingButton variant="contained" loading>
                                             Hủy kết bạn
                                          </LoadingButton>
                                       ) : (
                                          <Button
                                             variant="contained"
                                             startIcon={<PersonRemoveIcon />}
                                             sx={{ textTransform: "inherit" }}
                                             onClick={() => fetchDataRemove(userProfile._id)}
                                          >
                                             Hủy kết bạn
                                          </Button>
                                       )}
                                       <Button variant="outlined" endIcon={<SendIcon />} sx={{ textTransform: "inherit" }}>
                                          Gửi tin nhắn
                                       </Button>
                                    </>
                                 ) : (
                                    <>
                                       {sender === true ? (
                                          loadingRemove === true ? (
                                             <LoadingButton variant="contained" loading>
                                                Xóa lời mời
                                             </LoadingButton>
                                          ) : (
                                             <Button
                                                variant="contained"
                                                startIcon={<PersonRemoveIcon />}
                                                sx={{ textTransform: "inherit" }}
                                                onClick={() => fetchDataRemove(userProfile._id)}
                                             >
                                                Xóa lời mời
                                             </Button>
                                          )
                                       ) : (
                                          <>
                                             {loadingAccept === true ? (
                                                <LoadingButton variant="contained" loading>
                                                   Chấp nhận lời mời
                                                </LoadingButton>
                                             ) : (
                                                <Button
                                                   variant="contained"
                                                   startIcon={<PersonAddAlt1Icon />}
                                                   sx={{ textTransform: "inherit" }}
                                                   onClick={() => {
                                                      fetchDataAccept(userProfile._id);
                                                   }}
                                                >
                                                   Chấp nhận lời mời
                                                </Button>
                                             )}
                                             {loadingRemove === true ? (
                                                <LoadingButton variant="outlined" loading>
                                                   Xóa lời mời
                                                </LoadingButton>
                                             ) : (
                                                <Button
                                                   variant="outlined"
                                                   startIcon={<PersonRemoveIcon />}
                                                   sx={{ textTransform: "inherit" }}
                                                   onClick={() => fetchDataRemove(userProfile._id)}
                                                >
                                                   Xóa lời mời
                                                </Button>
                                             )}
                                          </>
                                       )}
                                    </>
                                 )}
                              </BoxFlexBetween>
                           )}
                        </>
                     )}
                  </Box>
                  <TabDefault userId={userProfile?._id} />
               </Box>
            </Box>
         )}
         <OpenModal
            type="updateUser"
            openModal={openModal}
            confirmOpenModal={confirmOpen}
            handleCloseAllModal={handleCloseAll}
            handleConfirmClose={handleConfirmClose}
            handleConfirmOpen={handleClose}
         >
            <EditProfileForm onProcessDone={handleCloseAll} />
         </OpenModal>
      </>
   );
};

ProfileTop.propTypes = {
   userProfile: PropTypes.object.isRequired,
};

export default ProfileTop;
