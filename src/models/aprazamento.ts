import { Paciente } from './paciente';
import { Usuario } from './usuario';
import { Medicamento } from './medicamento';

export interface Aprazamento {
    _id: string;
    paciente: Paciente;
    horario: Date;
    enfermeira: Usuario;
    medicamento: Medicamento;
    isConsumido: boolean;
    intervalo: string;
    isCancelado: string;
    justificativa: string;
}