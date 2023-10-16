"use client";

import React from "react";
import ReactInputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function NewTicket() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await axios.post("http://localhost:4000/api/tickets", data);
      router.push("/pages/success/ticketSent");
    } catch (error) {
      console.error("Erro ao criar o ticket:", error);
    }
  };

  return (
    <div className={styles.containerBody}>
      <div className={styles.container}>
        <h1 className={styles.title}>Ticket - CSCE</h1>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <fieldset className={styles.fieldsetGridWhite}>
            <div className={styles.separatorGrid} />
            <label className={styles.inputContainer}>
              Nome Completo
              <input
                type="text"
                className={styles.textInput}
                {...register("name")}
                placeholder="Nome"
              />
            </label>
            <label className={styles.inputContainer}>
              Documento
              <ReactInputMask
                className={styles.textInput}
                mask="999.999.999-99"
                placeholder="CPF"
                {...register("document")}
              />
            </label>
            <label className={styles.inputContainer}>
              E-mail
              <input
                type="text"
                className={styles.textInput}
                {...register("email")}
                placeholder="E-mail"
              />
            </label>
          </fieldset>

          <div className={styles.topicsInfos}>
            <p>- Detalhar o seu problema pode ajudar na resolução</p>
            <p>- Anexar arquivos pode ajudar na resolução</p>
            <p>- Evite enviar diversos tickets informando o mesmo problema</p>
          </div>

          <fieldset className={styles.fieldsetGrid}>
            <div className={styles.separatorGrid} />

            <label className={styles.inputContainer}>
              Tipo de solicitação
              <select className={styles.textInputForm} {...register("type")}>
                <option value="Outro">Outro</option>
                <option value="Dúvida">Dúvida</option>
                <option value="Problema">Problema</option>
                <option value="Elogio">Elogio</option>
                <option value="Sugestão">Sugestão</option>
                <option value="Reclamação">Reclamação</option>
              </select>
            </label>
            <label className={styles.inputContainer}>
              Título
              <input
                type="text"
                className={styles.textInputForm}
                {...register("title")}
                placeholder="Título do Ticket"
              />
            </label>
            <label className={styles.inputContainer}>
              Instituição
              <select
                className={styles.textInputForm}
                {...register("institution")}
              >
                <option value="Outra">Outra</option>
                <option value="GPinveste">GPinveste</option>
                <option value="hxquantum">hxquantum</option>
                <option value="Onpag">Onpag</option>
                <option value="Payout">Payout</option>
                <option value="Percapital">Percapital</option>
                <option value="Wib">Wib</option>
                <option value="Wibbtech">Wibbtech</option>
                <option value="Vicon">Vicon</option>
                <option value="Triboo">Triboo</option>
                <option value="Banx7">Banx7</option>
                <option value="Matarazzo">Matarazzo</option>
                <option value="Mina">Mina</option>
                <option value="Monet">Monet</option>
                <option value="Anamaco">Anamaco</option>
                <option value="Envbank">Envbank</option>
                <option value="Dank">Dank</option>
                <option value="Itsbank">Itsbank</option>
                <option value="FenixBank">FenixBank</option>
              </select>
            </label>
            <label className={styles.inputContainer}>
              Categoria do Ticket (Devs)
              <select
                className={styles.textInputForm}
                {...register("category")}
              >
                <option value="Outros">Outros</option>
                <option value="EndPoints">EndPoints</option>
                <option value="Response">Response</option>
                <option value="Request">Request</option>
                <option value="API">API</option>
                <option value="Webhook">Webhook</option>
                <option value="NãoSei">Não Sei</option>
              </select>
            </label>
            <label className={styles.inputContainer}>
              Prioridade
              <select
                className={styles.textInputForm}
                {...register("priority")}
              >
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
                <option value="Urgente">Urgente</option>
              </select>
            </label>
            <label className={styles.inputContainer}>
              Descrição
              <textarea
                className={`${styles.textInputForm} ${styles.textareaInput}`}
                {...register("description")}
                placeholder="Descrição detalhada"
              />
            </label>
            <label className={styles.inputContainer}>
              Informações Complementares
              <textarea
                className={`${styles.textInputForm} ${styles.textareaInput}`}
                {...register("complement")}
                placeholder="Codigo de erro, response, request, etc."
              />
            </label>
            <label>
              Anexo
              <input
                type="file"
                {...register("attachment")}
                className={styles.inputAttachment}
              />
            </label>
          </fieldset>

          <button className={styles.button} type="submit">
            Enviar Ticket
          </button>
        </form>
      </div>
    </div>
  );
}
