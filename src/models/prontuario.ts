import { Paciente } from './paciente';
import { Prescricao } from './prescricao';

export interface Prontuario {
    _id: string;
    idPaciente: Paciente;
    ala: string;
    dataAdmissao: Date;
    pesoAdmissao: string;
    dataAlta: Date;
    leito: string;
    prescricoes: Prescricao[];
}