import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiProvider {

  apiUrl = 'https://salus-vitae-api.herokuapp.com/';

  constructor(public http: HttpClient) {
  }

  getAprazamentos() {
    console.log(this.apiUrl + '/aprazamentos');
    return this.http.get(this.apiUrl + '/aprazamentos');
  }

}
