import { ItemPrescricao } from './item-prescricao.model';

export interface Prescricao {
    prescricao: number;
    dataPrescricao: string;
    tipoPrescricao: string;
    statusPrescricao: string;
    codigoProfissional: number;
    profissional: string;
    observacao?: string;
    Itens: ItemPrescricao[];
}
