import styles from "../LandingPage/Landing.module.css";
import { FaWhatsapp } from "react-icons/fa";
import Tooltip from "@mui/joy/Tooltip";
import zorbs from "../../../public/assets/esquilo.png";
import waves from "../../../public/assets/waves.svg";
import { Button } from "@mui/material";

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
        <img src={waves}></img>
        <header className={styles.header}>
          <h1>Zorbs</h1>
          <nav>
            <ul>
              <li>
                <a href="#home">Inicio</a>
              </li>
              <li>
                <a href="#about">Sobre</a>
              </li>
              <li>
                <a href="#contact">Contato</a>
              </li>

              <Button style={{ margin: "0" }}>button</Button>
            </ul>
          </nav>
        </header>

        {/* <div className={styles.container}>
          <img src={tela} alt="" width={700} />
        </div> */}
      </div>
      <container>
        <div class={styles.card}>
          <div class={styles.imgBox}>
            <img src={zorbs} width={85} />
          </div>
          <div class={styles.content}>
            <h2>Plano premium</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus molestias minus porro. Deserunt dolore eligendi
              sapiente hic totam.
            </p>
            <a href="#" class={styles.readMore}>
              Consulte os preços
            </a>
          </div>
        </div>
        <div class={styles.card}>
          <div class={styles.imgBox}>
            <img src={zorbs} width={85} />
          </div>
          <div class={styles.content}>
            <h2>Plano premium</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus molestias minus porro. Deserunt dolore eligendi
              sapiente hic totam.
            </p>
            <a href="#" class={styles.readMore}>
              Consulte os preços
            </a>
          </div>
        </div>
        <div class={styles.card}>
          <div class={styles.imgBox}>
            <img src={zorbs} width={85} />
          </div>
          <div class={styles.content}>
            <h2>Plano premium</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus molestias minus porro. Deserunt dolore eligendi
              sapiente hic totam.
            </p>
            <a href="#" class={styles.readMore}>
              Consulte os preços
            </a>
          </div>
        </div>
      </container>
    </>
  );
}
