import "./style.scss";
import UserSection from "../../Atoms/UserSection/UserSection";
import FasterCard from "../../Atoms/FasterCard/FasterCard";
import Icons from "../../../Icons/Icons";
import Container from "../../Atoms/Container/Container";
const Header = () => {
  return (
    <div className="header">
      <Container>
        <div className="userSectionBox">
          <UserSection />
        </div>
        <div className="fasterCardBox">
          <FasterCard
            title={"Баланс"}
            price={"2.000.000 сум"}
            type={"balans"}
          />
          <FasterCard
            title={"Доход"}
            price={"8.499.000 сум"}
            icon={<Icons.arrow_top />}
            procent={"27%"}
            type={"daxod"}
          />
          <FasterCard
            title={"Расход"}
            price={"6.499.000 сум"}
            icon={<Icons.arrow_bottom />}
            procent={"-15%"}
            type={"rasxod"}
          />
        </div>
      </Container>
    </div>
  );
};

export default Header;
