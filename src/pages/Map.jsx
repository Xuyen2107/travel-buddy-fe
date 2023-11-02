import GoogleMapReact from "google-map-react";
import {  useMediaQuery,  Box } from "@mui/material";
// import List from "./List";
// import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";

const Map = () => {
  const isMobile = useMediaQuery("min-width: 600px");
  console.log("🚀 ~ file: Map.jsx:8 ~ Map ~ isMobile:", isMobile)

  const coordinates = { lat: 14.0583, lng: 108.2772 };

  return (
    <>
    
      <Box style={{ width: "100%", height: "80vh" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBpj82QKELnAq_SGymBerBe3bVwcnora_g" }}
          defaultCenter={coordinates}
          center={coordinates}
          defaultZoom={6}
          margin={[50, 50, 50, 50]}
          options={"Việt Nam"}
        />
      </Box>
    </>
  );
};

export default Map;
