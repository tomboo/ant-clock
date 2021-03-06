// components/Layout.js
import Head from "next/head";

import Header from "./Header";
import NavBar from "./NavBar";

import "./Layout.scss";
import "./index.scss";

import navButtons from "../config/buttons";

const Layout = props => {
  const appTitle = `> CLOCK`;

  return (
    <div className="Layout">
      <Head>
        <title>CLOCK</title>
      </Head>

      <Header appTitle={appTitle} />
      <div className="Content">{props.children}</div>
      <NavBar navButtons={navButtons} />
    </div>
  );
};

export default Layout;