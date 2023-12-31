import { Link } from "react-router-dom";
import img from "../../img/1.png";
import NavbarMenu from "./NavbarMenu/NavbarMenu";
import NavbarAuth from "./NavbarAuth/NavbarAuth";
import NavbarUser from "./NavbarUser/NavbarUser";

import useAuth from "./../../shared/hooks/useAuth";

import styles from "./navbar.module.css";

const Navbar = () => {
  const isLogin = useAuth();

  return (
    <div className={styles.wrapper}>
      {/* <Link className={styles.logo} to="/">
        Logo
      </Link> */}
      <Link className={styles.logo} to="/">
        <img src={img} style={{ width: 100 }} />
      </Link>
      {isLogin && <NavbarMenu />}
      {isLogin ? <NavbarUser /> : <NavbarAuth />}
    </div>
  );
};

export default Navbar;
