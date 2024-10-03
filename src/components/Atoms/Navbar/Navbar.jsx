import "./style.scss";
import Container from "../Container/Container";
import logo from "../../../assets/images/logo.png";
import user from "../../../assets/images/user.png";
const Navbar = () => {
  return (
    <div className="navbar">
      <Container>
        <div className="raw">
          <div className="logo">
            <img src={logo} alt=" logo" />
          </div>
          <div className="user">
            <img src={user} alt="user" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
