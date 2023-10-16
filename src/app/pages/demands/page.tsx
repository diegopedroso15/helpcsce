"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { getPriorityClass } from "@/utils/defaultFunctions";

interface Demand {
  id: number;
  name: string;
  document: string;
  title: string;
  description: string;
  type: string;
  institution: string;
  category: string;
  priority: string;
  complement: string;
}

function DemandsList() {
  const [demands, setDemands] = useState<Demand[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/tickets`);
        setDemands(response.data);
      } catch (error) {
        router.push("/error");
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/tickets/${id}`
      );
      const newDemands = demands.filter((chamado) => chamado.id !== id);
      setDemands(newDemands);
    } catch (error) {
      router.push("/error");
    }
  };

  return (
    <div className={styles.containerBody}>
      <div className={styles.container}>
        <h2 className={styles.title}>Demandas</h2>
        <ul className={styles.list}>
          {demands.map((chamado) => (
            <div className={styles.listBox}>
              <li
                className={`${styles.fieldsetGrid} ${getPriorityClass(
                  chamado.priority
                )}`}
                key={chamado.id}
              >
                <div className={styles.listWrapper}>
                  <div className={styles.listLeftSide}>
                    <h3 className={styles.itemTitle}>{chamado.title}</h3>
                    <h5 className={styles.itemIndex}>Descrição:</h5>
                    <p className={styles.itemDescription}>
                      {chamado.description}
                    </p>
                  </div>
                  <div className={styles.listRightSide}>
                    <h5 className={styles.itemIndex}>Tipo:</h5>
                    <p className={styles.itemDescription}>{chamado.type}</p>
                    <h5 className={styles.itemIndex}>Instituição:</h5>
                    <p className={styles.itemDescription}>
                      {chamado.institution}
                    </p>
                    <h5 className={styles.itemIndex}>Prioridade:</h5>
                    <p className={styles.itemDescription}>{chamado.priority}</p>
                  </div>
                </div>
              </li>
              <div className={styles.buttonsColumn}>
                <button
                  className={styles.buttonYellow}
                  onClick={() =>
                    router.push(`/pages/demands/mail?id=${chamado.id}`)
                  }
                >
                  Responder
                </button>
                <button
                  className={styles.buttonRed}
                  onClick={() =>
                    router.push(`/pages/demands/details?id=${chamado.id}`)
                  }
                >
                  Detalhes
                </button>
                <button
                  className={styles.buttonGreen}
                  onClick={() => handleDelete(chamado.id)}
                >
                  Finalizar
                </button>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DemandsList;
