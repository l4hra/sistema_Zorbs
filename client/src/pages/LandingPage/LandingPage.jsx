import styles from "../LandingPage/Landing.module.css";
import { FaWhatsapp } from "react-icons/fa";
import Tooltip from "@mui/joy/Tooltip";
import tela from "./tela.png"; // Se estiver no mesmo diretório

export default function LandingPage() {
  const handleClick = () => {
    window.open("https://wa.me/5511999999999", "_blank");
  };

  return (
    <>
      <Tooltip
        color="success"
        placement="top-start"
        size="lg"
        variant="soft"
        title="Fale com a Zorbs!"
      >
        <div className={styles.floatingButton} onClick={handleClick}>
          <FaWhatsapp size={30} />
        </div>
      </Tooltip>

      <div className={styles.background}>
        <header className={styles.header}>
          <h1>Zorbs</h1>
          <nav>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>

              <li>button</li>
            </ul>
          </nav>
        </header>

        <div className={styles.container}>
          <img src={tela} alt="" width={700} />
        </div>

        <div className={styles.container2}>
          <h3>Planos</h3>
          <div className={styles.card}>
            <p>Plano basic</p>
            <p>R$300,00</p>
          </div>
          <div className={styles.card}>
            <p>Plano basic</p>
            <p>R$300,00</p>
          </div>
          <div className={styles.card}>
            <p>Plano basic</p>
            <p>R$300,00</p>
          </div>
        </div>
      </div>
    </>
  );
}
