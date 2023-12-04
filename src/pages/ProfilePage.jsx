import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BoxColumn } from "../styles/index";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import { userAPI } from "../apis";
import { useCrudApi, useFetchData } from "../hooks";
import { Navbar, ProfileTop, ListFriend, InfoUser } from "../components";
import PropTypes from "prop-types";

const ProfilePage = ({ children }) => {
   const { userId } = useParams();
   const { userLogin } = useSelector((state) => state.auth);
   const { data: dataFriends, loading: loadingFriends, error: errFriends, fetchData: fetchDataFriends } = useFetchData(userAPI.getFriends, userId);
   const {
      data: dataProfile,
      loading: loadingProfile,
      error: errProfile,
      setData: setDataProfile,
      fetchData: fetchDataProfile,
   } = useCrudApi(userAPI.getSingle);
   //================================================================

   useEffect(() => {
      if (userId === userLogin._id) {
         setDataProfile(userLogin);
      } else {
         fetchDataProfile(userId);
      }
      fetchDataFriends(userId);
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
         <ProfileTop userProfile={dataProfile} />
         <Box>
            <Box
               sx={{
                  width: "60rem",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "30px",
                  margin: " 20px auto 0 auto",
               }}
            >
               <BoxColumn gap={4}>
                  <InfoUser userProfile={dataProfile} />
                  <ListFriend friends={dataFriends} />
               </BoxColumn>
            </Box>
            <Box fontSize="500px">{children}</Box>
         </Box>
      </Box>
   );
};

ProfilePage.propTypes = {
   children: PropTypes.node,
};

export default ProfilePage;
