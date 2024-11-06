import "./style.scss";
import UserSection from "../../Atoms/UserSection/UserSection";
import Icons from "../../../Icons/Icons";
import Container from "../../Atoms/Container/Container";
import History from "../../Atoms/History/History";
import Chart from "../../Atoms/Chart/Chart";
import MyBarChart from "../../Atoms/MyBarChart/MyBarChart";
import Marque from "../../Atoms/Marque/Marque";
import Balance from "../../Balance";
import Income from "../../Income";
import Spending from "../../Spending";
import { useEffect, useState } from "react";
import { useHttps } from "../../../hooks/useHttps";
const Header = () => {
  const { getData, error, request, loading } = useHttps();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth); // Kenglikni yangilang
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenWidth]);

  let changeWidth = (screenWidth - 1216) / 2;
  let resultWidth = screenWidth - changeWidth;

  return (
    <div className="header">
      <Container>
        <div className="userSectionBox">
          <UserSection />
        </div>
        <div className="fasterCardBox">
          <Balance />
          <Income />
          <Spending />
        </div>
      </Container>
      <Container
        changeWidth={changeWidth}
        width={resultWidth}
        scroll_container={"scroll_container"}
      >
        <div className="marquee_box">
          <Marque />
        </div>
      </Container>
      <Container>
        <div className="header_main">
          <div className="circle_chart">
            <h2 className="chart_title">Расходы по категориям</h2>
            <div className="chart">
              <Chart />
            </div>
          </div>
          <div className="history_box">
            <History />
          </div>
        </div>
        <div className="bottom_chart">
          <MyBarChart />
        </div>
      </Container>
    </div>
  );
};

export default Header;
