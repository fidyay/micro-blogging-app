import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import type { AppProps } from "next/app";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { Database } from "../../database.types";
import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";

const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#393943",
      light: "#474753",
      dark: "#2f3035",
      contrastText: "#a3a3af",
    },
    secondary: {
      main: "#116dfe",
      contrastText: "#e7f6f9",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createPagesBrowserClient<Database>());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <ThemeProvider theme={muiTheme}>
        <CssBaseline>
          <Component {...pageProps} />
        </CssBaseline>
      </ThemeProvider>
    </SessionContextProvider>
  );
}
