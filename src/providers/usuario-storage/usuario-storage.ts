import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Usuario } from '../../models/usuario.model';

@Injectable()
export class UsuarioStorageProvider {

  private key: string = 'usuario';

  constructor(private storage: Storage) {
  }

  async save(usuario: Usuario): Promise<any> {
    usuario.password = undefined;

    return await this.storage.set(this.key, usuario);
  }

  async get(): Promise<Usuario> {
    return await this.storage.get(this.key);
  }

  async getUsername(): Promise<string> {
    let usuario: Usuario = await this.get();

    if (usuario && usuario.username) {
      return usuario.username;
    }

    return '';
  }

  async getAccessToken(): Promise<string> {
    let usuario: Usuario = await this.get();

    if (usuario && usuario.token) {
      return usuario.token;
    }

    return '';
  }

  async clear(): Promise<any> {
    return await this.storage.remove(this.key);
  }

}
