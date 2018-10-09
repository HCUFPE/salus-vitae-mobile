import { Usuario } from './usuario';
import { Medicamento } from "./medicamento";

export interface Prescricao {
    _id: string;
    dataPrescricao: Date;
    medicoId: Usuario;
    medicamentos: Medicamento[];
}
