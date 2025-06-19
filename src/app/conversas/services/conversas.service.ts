import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConversasListarRequest } from '../models/requests/conversas-listagem.request';
import { PaginacaoResponse } from '../../shared/models/responses/paginacao.response';
import { ConversaResponse } from '../models/responses/conversas.response';
import { ConversaRequest } from '../models/requests/conversas.request';
import { ConversaPorUsuarioListarRequest } from '../models/requests/conversas-usuarios.request';

@Injectable({
	providedIn: 'root'
})
export class ConversasService {

	private readonly urlApi = "http://localhost:5128/api/conversas"

	constructor(private http: HttpClient) { }

	public listarConversas(request: ConversasListarRequest): Observable<PaginacaoResponse<ConversaResponse>> {
		return this.http.get<PaginacaoResponse<ConversaResponse>>(this.urlApi, { params: <any>request });
	}

	recuperarConversaPorId(codigo: number): Observable<ConversaResponse> {
		return this.http.get<ConversaResponse>(this.urlApi + codigo);
	}

	inserir(request: ConversaRequest): Observable<ConversaResponse> {
		return this.http.post<ConversaResponse>(this.urlApi, request);
	}

	editar(id: number, patch: any): Observable<ConversaResponse> {
		return this.http.put<ConversaResponse>(
			this.urlApi + "/" + id,
			patch
		);
	}

	excluir(id: number): Observable<void> {
		return this.http.delete<void>(this.urlApi + "/" + id);
	}

	public listarConversasPorUsuario(request: ConversaPorUsuarioListarRequest): Observable<ConversaResponse[]> {
		return this.http.get<ConversaResponse[]>(this.urlApi + "/conversas-usuarios", { params: <any>request });
	}

}
