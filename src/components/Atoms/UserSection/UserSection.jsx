import Container from "../Container/Container";
import "./style.scss";

const UserSection = () => {
  return (
    <div className="userSection">
      <Container>
        <div className="raw">
          <div className="name">
            <p>Привет Азамат!</p>
          </div>
          <div className="filterTime">
            <p className="activeTime">Месяц</p>
            <p>Неделя</p>
            <p>День</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UserSection;
