import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/authSlice";
import useAxios from "./useAxios";
import { userAPI } from "../apis/userAPI";

const useUser = (userId) => {
   const dispatch = useDispatch();
   const { data: userProfile, loading: profileLoading, error: profileError, fetchData: fetchProfileData } = useAxios(userAPI.getSingle, userId);
   const { data: friend, loading: friendLoading, error: friendError, fetchData: fetchFriendData } = useAxios(userAPI.getSingleFriend, userId);
   const { data: friends, loading: friendsLoading, error: friendsError, fetchData: fetchFriendsData } = useAxios(userAPI.getFriends, userId);
   const { data: uploadData, loading: uploadLoading, error: uploadError, fetchData: handleUploadAvatar } = useAxios(userAPI.uploadAvatar);
   const [file, setFile] = useState(null);

   useEffect(() => {
      if (userId) {
         fetchFriendData();
         fetchProfileData();
         fetchFriendsData();
      }
   }, [userId]);

   useEffect(() => {
      if (uploadData) {
         dispatch(updateUser(uploadData));
      }
   }, [uploadData]);

   useEffect(() => {
      if (file) {
         const uploadAvatar = async () => {
            const formData = new FormData();
            formData.append("avatar", file);
            await handleUploadAvatar(formData);
            await fetchProfileData();
         };
         uploadAvatar();
      }
   }, [file]);

   const handleChangeImage = (e) => {
      setFile(e.target.files[0]);
   };

   const handleUpdateUser = async (value) => {
      const response = await userAPI.update(value);
      dispatch(updateUser(response.data));
      await fetchProfileData();
   };

   const handleRemoveFriend = async () => {
      try {
         await userAPI.removeFriend(userId);
         await fetchFriendData();
      } catch (error) {
         console.error(error);
      }
   };

   const handleSendFriend = async () => {
      try {
         await userAPI.sendFriend(userId);
         await fetchFriendData();
      } catch (error) {
         console.error(error);
      }
   };

   const handleAcceptFriend = async () => {
      try {
         await userAPI.acceptFriend(userId);
         await fetchFriendData();
      } catch (error) {
         console.error(error);
      }
   };

   return {
      userProfile,
      friend,
      friends,
      profileLoading,
      friendLoading,
      friendsLoading,
      profileError,
      friendError,
      friendsError,
      handleChangeImage,
      handleUpdateUser,
      handleSendFriend,
      handleAcceptFriend,
      handleRemoveFriend,
   };
};

export default useUser;
