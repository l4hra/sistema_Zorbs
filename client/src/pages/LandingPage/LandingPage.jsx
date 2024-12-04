import styles from "../LandingPage/Landing.module.css";
import { FaWhatsapp } from "react-icons/fa";
import Tooltip from "@mui/joy/Tooltip";
import wstorage from "../../../src/assets/wstorage.png";
import acessa from "../../../src/assets/acessa.png";
import zorbs from "../../../src/assets/ZORBS.png";
import waves from "../../../src/assets/waves.svg";
import donaAna from "../../../src/assets/donana.png";

import HttpsIcon from "@mui/icons-material/Https";
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
          <img src={zorbs} alt="" style={{width: '150px'}} />
          <nav>
            <ul>
              <li>
                <a href="#home">Início</a>
              </li>
              <li>
                <a href="#about">Sobre</a>
              </li>
              <li>
                <a href="#vclients">Clientes atendidos</a>
              </li>
              <li>
                <a href="#contact">Contato</a>
              </li>
              <Button
                style={{
                  backgroundColor: "#9FD6D2",
                  color: "#ffff",
                  gap: "5px",
                }}
                href="http://localhost:5173/Login"
              >
                Área do cliente
                <HttpsIcon style={{ width: "15px" }} />
              </Button>
            </ul>
          </nav>
        </header>
      </div>

      <div id="home" className={styles.section}>
        <h1>Bem-vindo à Zorbs!</h1>
        <h4>O sistema ideal pra sua empresa só pode acontecer aqui!</h4>
      </div>

      <container id="clients">
      <div className={styles.card}>
          <div className={styles.imgBox}>
            <img src={donaAna} alt="Dona Ana" />
          </div>
          <div className={styles.content}>
            <h2>Dona Ana</h2>
            <p>
              O projeto veio com o interesse de Dona Ana em mudar a realidade da sua sorveteria self-service.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.imgBox}>
            <img src={acessa} alt="Acessa+" />
          </div>
          <div className={styles.content}>
            <h2>Acessa+</h2>
            <p>
              O projeto veio de uma dor da Prefeitura de Jaraguá do Sul, onde precisavam melhorar sua forma de identificar civis PCD e as condições onde vivem. A Zorbs atuou criando o Acessa+, um sistema capaz de cadastrar pessoas com deficiência e ter um relatório filtrando por região, situação financeira entre outros tópicos importantes para o cliente. 
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.imgBox}>
            <img src={wstorage} alt="WStorage" />
          </div>
          <div className={styles.content}>
            <h2>WStorage</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Temporibus molestias minus porro. Deserunt dolore eligendi
              sapiente hic totam.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.imgBox}>
            <img src={wstorage} alt="LL Suport" />
          </div>
          <div className={styles.content}>
            <h2>LL Suport</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Temporibus molestias minus porro. Deserunt dolore eligendi
              sapiente hic totam.
            </p>
          </div>
        </div>
      </container>

      <div id="about" className={styles.section}>
        <h2>Sobre Nós</h2>
        <p>
          A Zorbs é uma empresa capixaba apaixonada por inovação! Iniciamos
          nossas atividades em 2024 e já contamos com mais de 3 empresas <br />
          atendidas. Nosso proprosito é dar ao seu négocio o software que ele{" "}
          <br />
          precisa, e junto do software entregamos diagramas, documentações e{" "}
          <br />
          suporte aos nossos clientes além de termos o preço mais justo do
          mercado. Vem crescer com a gente!
        </p>
      </div>

      <div id="contact" className={styles.section}>
        <h2>Contato</h2>
        <p>
          Ficou interessado em desenvolver sua ideia com a gente? <br /> A nossa
          equipe pode te responder atraves do nosso email
          empresazorbs@gmail.com
        </p>
      </div>
    </>
  );
}
