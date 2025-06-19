import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioListarRequest } from '../models/requests/usuario-listagem.request';
import { PaginacaoResponse } from '../../shared/models/responses/paginacao.response';
import { Observable } from 'rxjs';
import { UsuarioResponse } from '../models/responses/usuario.response';
import { UsuarioRequest } from '../models/requests/usuario.request';
import { UsuarioLoginRequest } from '../models/requests/usuario-login.request';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private readonly urlApi = "http://localhost:5128/api/usuarios";

  constructor(private http: HttpClient) { }

  public listarUsuarios(request: UsuarioListarRequest): Observable<PaginacaoResponse<UsuarioResponse>> {
    return this.http.get<PaginacaoResponse<UsuarioResponse>>(this.urlApi, { params: <any>request });
  }

  recuperarUsuarioPorId(codigo: number): Observable<UsuarioResponse> {
    return this.http.get<UsuarioResponse>(this.urlApi + "/" + codigo);
  }

  inserir(request: UsuarioRequest): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(this.urlApi, request);
  }

  recuperarUsuarioLogin(request: UsuarioLoginRequest): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(
      `${this.urlApi}/autenticacoes-usuarios`,
      request
    );
  }


}
