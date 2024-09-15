import {
  Box,
  Container,
  Grid2 as Grid,
  Paper,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { FC } from "react";

import spaceBackground from "@/public/home/background.jpg";
import Link from "next/link";
import { SectionsRoutes } from "../enums/routes.enum";
import AuthButton from "../components/auth/auth-button";

const Home: FC = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
      }}
    >
      <Image
        src={spaceBackground}
        alt="Home Page Background"
        fill
      />
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          textAlign: "center",
          zIndex: 1,
          flexDirection: "column",
        }}
      >
        <Grid container spacing={2}>
          <Grid
            size={12}
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="center"
          >
            <Typography variant="h1" gutterBottom>
              The Horus Heresy Chronicles
            </Typography>
            <Typography variant="h2">
              Unveiling the Epic Saga of Warhammer 40,000
            </Typography>
            <AuthButton />
          </Grid>
          <Grid
            size={12}
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="center"
          >
            <Typography variant="body1">
              Explore the dark and treacherous events that shaped the Imperium
              of Man. Delve into the rich lore of the Horus Heresy, where
              brother fought brother in a galaxy-spanning civil war. Discover
              the heroes, the traitors, and the battles that defined one of the
              most iconic narratives in the Warhammer 40,000 universe.
            </Typography>
          </Grid>
          <Grid
            size={12}
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="center"
          >
            <Paper elevation={3}>
              <Grid container spacing={2}>
                {Object.keys(SectionsRoutes).map((routeKey) => (
                  <Grid key={`section-${routeKey}`} size={3}>
                    <Link
                      href={
                        SectionsRoutes[routeKey as keyof typeof SectionsRoutes]
                      }
                    >
                      {routeKey.toLowerCase()}
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
