import { Aprazamento } from './aprazamento';
import { Prontuario } from './prontuario';
import { Usuario } from './usuario';

export interface Consumo {
    prontuario: Prontuario;
    aprazamento: Aprazamento;
    horario: Date;
    usuario: Usuario;
    device_uuid: string;
    device_serial: string;
    device_manufacturer: string;
    device_model: string;
    device_platform: string;
    device_version: string;
}
