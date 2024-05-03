import { ConfigProvider, Layout } from "antd";
import Head from "next/head";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";

const MainLayout = ({ layoutProps, showContentOnly = true, children }) => {
  const router = useRouter();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#797EF6",
        },
      }}
    >
      <Layout
        className={
          layoutProps && layoutProps.className ? layoutProps.className : ""
        }
      >
        <Head>
          <link rel="icon" type="image/png" href="/coloredLogo.png" />
          <title>{`FamilyTable ${
            router.asPath === "/" ? "" : router.asPath
          }`}</title>
        </Head>
        {!showContentOnly && <Header />}

        <Layout.Content className="bg-transparent">{children}</Layout.Content>

        {!showContentOnly && <Footer />}
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout;
