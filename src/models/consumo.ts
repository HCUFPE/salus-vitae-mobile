import { Aprazamento } from './aprazamento';
import { Prontuario } from './prontuario';

export interface Consumo {
    prontuario: Prontuario;
    aprazamento: Aprazamento;
    horario: Date;
}
