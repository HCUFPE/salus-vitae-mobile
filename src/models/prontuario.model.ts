import { Leito } from "./leito.model";

export interface Prontuario {
    prontuario: number;
    nomeDoPaciente: string;
    dataNascimento: string;
    nomeMae: string;
    sexo: string;

    leito?: Leito;
}
