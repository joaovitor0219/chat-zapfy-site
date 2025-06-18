import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConversaUsuarioListarRequest } from '../models/requests/conversa-usuario-listagem.request';
import { ConversaUsuarioResponse } from '../models/responses/conversa-usuario.response';
import { PaginacaoResponse } from '../../shared/models/responses/paginacao.response';
import { Observable } from 'rxjs';
import { ConversaUsuarioRequest } from '../models/requests/conversa-usuario.request';

@Injectable({
  providedIn: 'root'
})
export class ConversasUsuariosService {

  private readonly urlApi = "http://localhost:5128/api/conversas-usuarios";

  constructor(private http: HttpClient) { 

  }

  public listarConversasUsuarios(request: ConversaUsuarioListarRequest): Observable<PaginacaoResponse<ConversaUsuarioResponse>> {
    return this.http.get<PaginacaoResponse<ConversaUsuarioResponse>>(this.urlApi, { params: <any>request });
  }

  recuperarConversaUsuarioPorId(codigo: number): Observable<ConversaUsuarioResponse> {
    return this.http.get<ConversaUsuarioResponse>(this.urlApi + "api/coberturas" + codigo);
  }

  inserir(request: ConversaUsuarioRequest): Observable<ConversaUsuarioResponse> {
    return this.http.post<ConversaUsuarioResponse>(this.urlApi, request);
  }

  excluir(id: number): Observable<void> {
		return this.http.delete<void>(this.urlApi + "/" + id);
	}
}
