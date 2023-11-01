import { Container, CssBaseline, Grid } from "@mui/material";
import List from "./List";
import Map from "./Map";

function MapList() {
   return (
      <>
         <CssBaseline>
            <Container maxWidth="lg">
               <Grid
                  container
                  spacing={3}
                  sx={{
                     width: "100%",
                  }}
               >
                  <Grid item xs={12} md={4}>
                     <List />
                  </Grid>
                  <Grid item xs={12} md={8}>
                     <Map />
                  </Grid>
               </Grid>
            </Container>
         </CssBaseline>
      </>
   );
}

export default MapList;
