import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private serverApi = '//' + location.hostname + ':3000';

  constructor(private http: HttpClient) {
    if (location.protocol === 'https:') {
      this.serverApi = '//' + location.hostname + '/api';
    }
  }

  public getDashboard() {
    const URL = `${this.serverApi}/dashboard`;
    return this.http.get(URL).pipe(map((response) => {
      return response;
    }));
  }

  public getBlocks() {
    const URL = `${this.serverApi}/blocks`;
    return this.http.get(URL).pipe(map((response) => {
      return response;
    }));
  }

  public getTx(hash: string) {
    const URL = `${this.serverApi}/tx/${hash}`;
    return this.http.get(URL).pipe(map((response) => {
      return response;
    }));
  }

  public getBalance(hash: string) {
    const URL = `${this.serverApi}/balance/${hash}`;
    return this.http.get(URL).pipe(map((response) => {
      return response;
    }));
  }

  public setAlias(hash: string, name: string) {
    const URL = `${this.serverApi}/alias/${hash}/${name}`;
    return this.http.get(URL).pipe(map((response) => {
      return response;
    }));
  }

  public checkAlias(name: string) {
    const URL = `${this.serverApi}/check/${name}`;
    return this.http.get(URL).pipe(map((response) => {
      return response;
    }));
  }

  public getAliasQueue() {
    const URL = `${this.serverApi}/queue`;
    return this.http.get(URL).pipe(map((response) => {
      return response;
    }));
  }


  public getMiner(hash: string) {
    const URL = `${this.serverApi}/miner/${hash}`;
    return this.http.get(URL).pipe(map((response) => {
      return response;
    }));
  }


}
