import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Layout/Header/Header";
import HomePage from "./pages/HomePage";
import InstructionsPage from "./pages/InstructionsPage";
import MeetingsPage from "./pages/MeetingsPage";
import MeetingTemplate from "./components/UI/MeetingTemplate/MeetingTemplate";
import Auth from "./pages/Auth";
import Account from "./pages/Account";

import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
  Box,
} from "@mui/material";

import supabase from "./supabaseClient";

let theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#00203F",
    },
    secondary: {
      main: "#85DDB5",
    },
    text: {
      primary: "#00203F",
    },
    info: {
      main: "#2E5994",
    },
  },
  typography: {
    fontFamily: "Montserrat",
  },
});

const styles = {
  container: {
    width: { xs: "80%", sm: "70%" },
    maxWidth: "1300px",
    margin: "2.5rem auto",
  },
};

theme = responsiveFontSizes(theme);

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Box sx={styles.container}>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/" element={<InstructionsPage />} />
              <Route path="/meetings" element={<MeetingsPage />} />
              <Route path="/meetings/:id" element={<MeetingTemplate />} />
              <Route
                path="/login"
                element={
                  <div
                    className="container"
                    style={{ padding: "50px 0 100px 0" }}
                  >
                    {!session ? (
                      <Auth />
                    ) : (
                      <Account key={session.user.id} session={session} />
                    )}
                  </div>
                }
              />
            </Routes>
          </main>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
