"use client";

import React from "react";
import styles from "./styles.module.css";
import { useRouter } from 'next/navigation';


function successTicketSent() {
  const router = useRouter();

  return (
    <div className={styles.containerBody}>
      <div className={styles.container}>
        <div className={styles.containerTitle}>
          <h1 className={styles.title}>Ticket enviado</h1>
        </div>
          <div className={styles.successBox}>
            <p className={styles.successText}>
              Seu ticket foi enviado com sucesso, aguarde o retorno do nosso
              suporte.
            </p>
        </div>
        <button className={styles.button} onClick={() => router.push("/pages/newTicket")}>
          Enviar outro ticket
        </button>
      </div>
    </div>
  );
}

export default successTicketSent;
