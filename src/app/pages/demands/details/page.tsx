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
  date: string;
}

interface Comment {
  name: string;
  comment: string;
  data: string;
  ticketId: number;
}

function Details({ searchParams }: any) {
  const [demand, setDemand] = useState<Demand | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { id } = searchParams;

  useEffect(() => {
    const fetchData = async (id: number) => {
      try {
        const response = await axios.get(
          `http://localhost:4000/tickets/${id}`
        );
        const comments = await axios.get(
          `http://localhost:4000/comments/comments/${id}`
        );
        setDemand(response.data);
        setComments(comments.data);
      } catch (error) {
        router.push("/error");
      }
    };
    if (id) {
      fetchData(Number(id));
    }
  }, [id, router]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/tickets/${id}`);
      router.push("/pages/demands");
    } catch (error) {
      router.push("/error");
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/comments/comments/${id}`,
        data
      );
      const newComment = response.data;
      setComments([...comments, newComment]);
    } catch (error) {
      console.error("Erro ao criar o ticket:", error);
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
        <h2 className={styles.title}>Detalhes - {demand.id}</h2>
        <div>
          <h3>{demand.title}</h3>
          <p>Nome: {demand.name}</p>
          <p>Documento: {demand.document}</p>
          <p>Descrição: {demand.description}</p>
          <p>Tipo: {demand.type}</p>
          <p>Instituição: {demand.institution}</p>
          <p>Categoria: {demand.category}</p>
          <p>Prioridade: {demand.priority}</p>
          <p>Complemento: {demand.complement}</p>
          <p>Solicitado em: {dateFormat(demand.date)}</p>
          <button className={styles.buttonRed} onClick={() => handleDelete(demand.id)}>Delete</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className={styles.fieldsetGrid}>
            <div className={styles.separatorGrid} />
            <label className={styles.inputContainer}>
              Seu nome
              <input
                type="text"
                className={styles.textInput}
                {...register("name")}
                placeholder="Nome"
              />
            </label>
            <label className={styles.inputContainer}>
              Comentário
              <textarea
                className={styles.textInput}
                {...register("comment")}
                placeholder="Comentários"
              />
            </label>
          </fieldset>
          <button className={styles.buttonYellow} type="submit">
            Comentar
          </button>
        </form>

        <div className={styles.commentContainer}>
          {comments.map((comment) => (
            <div className={styles.commentBox}>
              <p className={styles.commentName}>{comment.name}</p>
              <p className={styles.comment}>{comment.comment}</p>
              <p className={styles.commentDate}>{dateFormat(comment.data)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Details;
