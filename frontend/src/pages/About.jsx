import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
  Grid,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Psychology as MindIcon,
  Favorite as HeartIcon,
  Groups as CommunityIcon,
  Verified as VerifiedIcon,
} from "@mui/icons-material";
import { NavSection } from "../Components/NavSection";
import "../styles/about.css";

const AboutPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const features = [
    {
      icon: <MindIcon fontSize="large" />,
      title: "AI-Powered Support",
      description:
        "Our advanced AI helps you understand your mental state and provides personalized recommendations.",
    },
    {
      icon: <HeartIcon fontSize="large" />,
      title: "Compassionate Care",
      description:
        "Designed with empathy at its core to provide gentle, understanding support when you need it most.",
    },
    {
      icon: <CommunityIcon fontSize="large" />,
      title: "Mental Health Tracking",
      description:
        "Monitor your well-being with our daily assessments. Track your emotions and gain insights into your mental health journey.",
    },
    {
      icon: <VerifiedIcon fontSize="large" />,
      title: "Professional Guidance",
      description:
        "All content is vetted by licensed mental health professionals to ensure quality and safety.",
    },
  ];

  return (
    <div id="dashboard-conatainer">
      <NavSection />
      <Box
        sx={{
          display: "flex",
          maxHeight: "100vh",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="main"
          sx={{
            bgcolor: "#ffffff",
            p: isMobile ? 2 : 4,
            overflow: "scroll",
            maxHeight: "100vh",
          }}
        >
          <Container maxWidth="lg" sx={{ pt: 2 }}>
            {/* Hero Section */}
            <Card
              sx={{
                mb: 4,
                borderRadius: "24px",
                boxShadow: 3,
                bgcolor: "#A1EEBD",
                color: "#333",
              }}
            >
              <CardContent sx={{ p: isMobile ? 3 : 6 }}>
                <Typography
                  variant={isMobile ? "h4" : "h3"}
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: "normal",
                    mb: 3,
                  }}
                >
                  About Mind Matrix
                </Typography>
                <Typography variant="h6" sx={{ mb: 3 }}>
                  "When I look at the world, I'm pessimistic, but when I look at
                  people I am optimistic."
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
                  Mind Matrix was born from a simple idea: mental health support
                  should be accessible, compassionate, and personalized. We
                  combine technology with human understanding to create a safe
                  space for your mental wellbeing journey.
                </Typography>
              </CardContent>
            </Card>

            {/* Mission Section */}
            <Card
              sx={{
                mb: 4,
                borderRadius: "24px",
                boxShadow: 3,
              }}
            >
              <CardContent sx={{ p: isMobile ? 3 : 4 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: "bold", mb: 3 }}
                >
                  Our Mission
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, fontSize: "1.1rem" }}>
                  To democratize mental health support by providing free,
                  accessible tools that help people understand and improve their
                  emotional wellbeing. We believe everyone deserves
                  compassionate care regardless of their circumstances.
                </Typography>
                <Divider sx={{ my: 3 }} />
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  The Numbers
                </Typography>
                <Grid container spacing={3} sx={{ mt: 2 }}>
                  <Grid item xs={6} sm={3}>
                    <Box textAlign="center">
                      <Typography
                        variant="h4"
                        sx={{ color: "#A1EEBD", fontWeight: "bold" }}
                      >
                        100+
                      </Typography>
                      <Typography variant="body2">Users</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box textAlign="center">
                      <Typography
                        variant="h4"
                        sx={{ color: "#A1EEBD", fontWeight: "bold" }}
                      >
                        10+
                      </Typography>
                      <Typography variant="body2">
                        Professionals(Dummy)
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box textAlign="center">
                      <Typography
                        variant="h4"
                        sx={{ color: "#A1EEBD", fontWeight: "bold" }}
                      >
                        10+
                      </Typography>
                      <Typography variant="body2">Meditations</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box textAlign="center">
                      <Typography
                        variant="h4"
                        sx={{ color: "#A1EEBD", fontWeight: "bold" }}
                      >
                        24/7
                      </Typography>
                      <Typography variant="body2">Support</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Features Section */}
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: "bold",
                mb: 3,
                textAlign: "center",
              }}
            >
              Why Choose Mind Matrix
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: "24px",
                      boxShadow: 3,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <CardContent
                      sx={{
                        p: 3,
                        textAlign: "center",
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "#A1EEBD",
                          color: "#333",
                          width: 60,
                          height: 60,
                          mb: 2,
                        }}
                      >
                        {feature.icon}
                      </Avatar>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: "bold" }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography variant="body2">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
    </div>
  );
};

export default AboutPage;
