import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flat } from './flat';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlatService {

  private apiServerUrl = 'http://localhost:8080'

  constructor(private http: HttpClient) {}

  public getFlats(): Observable<Flat[]> {
    return this.http.get<Flat[]>(`${this.apiServerUrl}/flat/all`);
  }

  public addFlat(flat: Flat): Observable<Flat> {
    return this.http.post<Flat>(`${this.apiServerUrl}/flat/add`,flat);
  }

  public getFlatsByUser(): Observable<Flat[]> {
    return this.http.get<Flat[]>(`${this.apiServerUrl}/flat/user`);
  }

  public deleteFlat(flatId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/flat/delete/${flatId}`);
  }

  public getFlatById(flatId: number): Observable<Flat> {
    return this.http.get<Flat>(`${this.apiServerUrl}/flat/find/${flatId}`);
  }

  public updateIsPaid(flatId: number, isPaid: boolean): Observable<void> {
    return this.http.patch<void>(`${this.apiServerUrl}/flat/${flatId}/dues`,{isPaid: isPaid})
  }

  public getUnpaidFlats(): Observable<Flat[]> {
    return this.http.get<Flat[]>(`${this.apiServerUrl}/flat/unpaid`);
  }

  public getPaidFlats(): Observable<Flat[]> {
    return this.http.get<Flat[]>(`${this.apiServerUrl}/flat/paid`); 
  }
}
