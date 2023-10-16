"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { dateFormat } from "@/utils/defaultFunctions";

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
  email: string;
  date: string;
}

function Mail({ searchParams }: any) {
  const [demand, setDemand] = useState<Demand | null>(null);
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { id } = searchParams;

  useEffect(() => {
    const fetchData = async (id: number) => {
      try {
        const response = await axios.get(
          `http://localhost:4000/tickets/${id}`
        );
        setDemand(response.data);
      } catch (error) {
        router.push("/error");
      }
    };
    if (id) {
      fetchData(Number(id));
    }
  }, [id, router]);

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/mails/mail/send`,
        data
      );
      router.push(`/demands/details?id=${id}`);
    } catch (error) {
      console.error("Erro ao enviar email", error);
    }
  };

  if (router && !demand) {
    return <p>Loading...</p>;
  }
  if (!demand) {
    return null;
  }

  return (
    <div className={styles.containerBody}>
      <div className={styles.container}>
        <h2 className={styles.title}>Responder cliente - {demand.name}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className={styles.fieldsetGrid}>
            <div className={styles.separatorGrid} />
            <label className={styles.inputContainer}>
              Seu nome
              <input
                type="text"
                className={styles.textInput}
                {...register("devName")}
                placeholder="Nome"
              />
            </label>
            <label className={styles.inputContainer}>
              Assunto
              <input
                type="subject"
                className={styles.textInput}
                {...register("subject")}
                placeholder="Assunto"
              />
            </label>
            <label className={styles.inputContainer}>
              Status
              <select
                className={styles.textInput}
                {...register("status")}
                placeholder="Status"
              >
                <option value="Aberto">Aberto</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Fechado">Fechado</option>
              </select>
            </label>
            <label className={styles.inputContainer}>
              Texto
              <textarea
                className={styles.textareaInput}
                {...register("message")}
                placeholder="Mensagem"
              />
            </label>
            <input
              type="hidden"
              {...register("recipient")}
              value={demand.email}
            />
            <input
              type="hidden"
              {...register("clientName")}
              value={demand.name}
            />
          </fieldset>
          <button className={styles.buttonGreen} type="submit">
            Enviar
          </button>
        </form>
      </div>  
    </div>
  );
}

export default Mail;
