import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensagemListarRequest } from '../models/requests/mensagem-listagem.request';
import { MensagemResponse } from '../models/responses/mensagem.response';
import { PaginacaoResponse } from '../../shared/models/responses/paginacao.response';
import { Observable } from 'rxjs';
import { MensagemRequest } from '../models/requests/mensagem-request';

@Injectable({
  providedIn: 'root'
})
export class MensagensService {

  private readonly urlApi = "http://localhost:5128/api/mensagens";

  constructor(private http: HttpClient) { }

  public listarMensagens(request: MensagemListarRequest): Observable<PaginacaoResponse<MensagemResponse>> {
    return this.http.get<PaginacaoResponse<MensagemResponse>>(this.urlApi, { params: <any>request });
  }

  recuperarMensagemPorId(codigo: number): Observable<MensagemResponse> {
    return this.http.get<MensagemResponse>(this.urlApi + codigo);
  }

  inserir(request: MensagemRequest): Observable<MensagemResponse> {
    return this.http.post<MensagemResponse>(this.urlApi, request);
  }

  publicarMensagemAws(request: MensagemRequest): Observable<void> {
    return this.http.post<void>(this.urlApi, request);
  }

}
