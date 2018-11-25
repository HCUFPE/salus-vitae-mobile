import { Prontuario } from "./prontuario.model";
import { Atendimento } from "./atendimento.model";
import { Prescricao } from "./prescricao.model";
import { ItemPrescricao } from "./item-prescricao.model";

export interface PreOperacao {
    _id: string;
    status: boolean;
    cdProntuario: number;
    cdAtendimento: number;
    cdPrescricao: number;
    dtPreOpAprazamento: Date;
    horarioInicial: Date;
    intervalo: number;
    cdItem: string;
    cdTpItem: number;
    ordemItem: number;
    quantidade: number;
    nmUsuario: string;
    nmPaciente: string;
    nmMedicamento: string;

    prontuario?: Prontuario;
    atendimento?: Atendimento;
    prescricao?: Prescricao;
    itemPrescricao?: ItemPrescricao;
}
