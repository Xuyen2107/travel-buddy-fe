import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BoxColumn } from "../styles/index";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import { chatAPI, userAPI, vacationAPI } from "../apis";
import { useCrudApi, useFetchData } from "../hooks";
import { Navbar, ProfileTop, ListFriend, InfoUser, ScreenVacation } from "../components";
import PropTypes from "prop-types";

const ProfilePage = ({ children }) => {
   const { userId } = useParams();
   const navigate = useNavigate();
   const { userLogin } = useSelector((state) => state.auth);
   const { data: dataFriends, loading: loadingFriends, error: errFriends, fetchData: fetchDataFriends } = useFetchData(userAPI.getFriends, userId);
   const {
      data: dataProfile,
      loading: loadingProfile,
      error: errProfile,
      setData: setDataProfile,
      fetchData: fetchDataProfile,
   } = useCrudApi(userAPI.getSingle);

   const { data, loading, fetchData } = useCrudApi(vacationAPI.getAllByUser);
   //================================================================

   const { data: dataCreate, loading: loadingCreate, fetchData: fetchDataCreate } = useCrudApi(chatAPI.createChat);

   const { data: dataChatSingle, loading: loadingChatSingle, fetchData: fetchDataChatSingle } = useCrudApi(chatAPI.findByChat);

   useEffect(() => {
      if (userId === userLogin._id) {
         setDataProfile(userLogin);
      } else {
         fetchDataProfile(userId);
      }

      if (userId) {
         fetchDataFriends(userId);
         fetchDataCreate(userId);
         fetchDataChatSingle(userId);
         fetchData(userId);
      }
   }, [userId, userLogin]);

   //================================================================

   if (loadingFriends || loadingProfile) {
      return (
         <>
            <Navbar />
            <Box
               sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
               }}
            >
               <CircularProgress />
            </Box>
         </>
      );
   }

   if (errFriends || errProfile) {
      <Box>
         <Navbar />
         <Typography variant="h1">Có lỗi xảy ra</Typography>
      </Box>;
   }

   return (
      <Box>
         <Navbar />
         <ProfileTop userProfile={dataProfile} handleChat={() => navigate(`/message/${dataChatSingle?._id}`)} userId={userId} />
         <Box>
            <Box
               sx={{
                  flexDirection: { xs: "column", md: "row" },
                  width: { xs: "100%", md: "60rem" },
                  display: "flex",
                  gap: "30px",
                  margin: " 20px auto 0 auto",
               }}
            >
               <BoxColumn gap={4} sx={{ alignItems: "center" }}>
                  <Box sx={{ width: { xs: "90%", md: "300px" } }}>
                     <InfoUser userProfile={dataProfile} />
                  </Box>
                  <Box sx={{ width: { xs: "90%", md: "300px" } }}>
                     <ListFriend friends={dataFriends} />
                  </Box>
               </BoxColumn>
               <BoxColumn gap="20px" alignItems="center">
                  {data &&
                     data.map((item) => (
                        <Box key={item?._id} sx={{ width: { xs: "90%", md: "100%" } }}>
                           <ScreenVacation key={item._id} vacation={item} />
                        </Box>
                     ))}
               </BoxColumn>
            </Box>
         </Box>
      </Box>
   );
};

ProfilePage.propTypes = {
   children: PropTypes.node,
};

export default ProfilePage;
