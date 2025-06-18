import { PaginacaoRequest } from "../../../shared/models/requests/paginacao.request";

export class UsuarioListarRequest extends PaginacaoRequest{
    public Id?: number;
    public Nome?: string;
    public Email?: string;
    public DataInclusao?: string;

    constructor(params: Partial<UsuarioListarRequest>) {
        super(params);

        this.Id = params?.Id || 0;
        this.Nome = params?.Nome || "";
        this.Email = params?.Email || "";
        this.DataInclusao = params?.DataInclusao || "";
        
        this.CpOrd = "Id";
        this.TpOrd = "Asc";
    }
}