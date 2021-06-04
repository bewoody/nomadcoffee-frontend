import { ApolloProvider, useReactiveVar } from "@apollo/client";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "styled-components";
import { darkModeVar, isLoggedInVar, client } from "./apollo";
import { LoggedInRouter } from "./routers/logged-in-router";
import { LoggedOutRouter } from "./routers/logged-out-router";
import { darkTheme, GlobalStyles, lightTheme } from "./styles/styles";

export const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          {isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />}
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
};
