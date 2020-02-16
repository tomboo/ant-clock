// components/Header.js
import Link from "next/link";

import "./Header.scss";

const Header = props => (
  <Link href="/clock">
    <div className="Header">{props.appTitle}</div>
  </Link>
);

export default Header;