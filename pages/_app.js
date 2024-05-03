import MainLayout from "../components/layout/MainLayout";

import { store, persistor } from "../store/store";
import "../styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SessionProvider } from "next-auth/react";
import ListenContext from "../components/context/ListenContext";
import { Provider as ReduxProvider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./style.css";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [listen, setListen] = useState([]);
  const [sentMessage, setSentMessage] = useState();
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_ID}>
      <SessionProvider session={pageProps.session}>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <MainLayout
              showContentOnly={true}
              layoutProps={{ className: "", title: "" }}
            >
              <ListenContext.Provider
                value={{
                  setListen,
                  listen,
                  sentMessage,
                  setSentMessage,
                }}
              >
                <Component {...pageProps} />
              </ListenContext.Provider>
            </MainLayout>
          </PersistGate>
        </ReduxProvider>
      </SessionProvider>
    </GoogleOAuthProvider>
  );
}
