import { Prontuario } from './prontuario';
import { Medicamento } from "./medicamento";

export interface Consumo {
    prontuario: Prontuario;
    medicamento: Medicamento;
    horario: Date;
}
