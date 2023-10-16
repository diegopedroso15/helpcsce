import styles from '../app/pages/demands/styles.module.css';

export function getPriorityClass(priority: string): any {
    switch (priority) {
      case 'Urgente':
        return styles.urgente;
      case 'Alta':
        return styles.alta;
      case 'Média':
        return styles.normal;
      default:
        return styles.baixa;
    }
  }
  
export function dateFormat(dataString : string) : string {
  const data = new Date(dataString);
  const dia = data.getDate().toString().padStart(2, '0');
  const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Adicione 1 porque os meses são indexados a partir de 0
  const ano = data.getFullYear().toString().slice(-2);
  const horas = data.getHours().toString().padStart(2, '0');
  const minutos = data.getMinutes().toString().padStart(2, '0');

  return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
}