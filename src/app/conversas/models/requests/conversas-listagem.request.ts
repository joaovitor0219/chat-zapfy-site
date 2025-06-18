import { PaginacaoRequest } from "../../../shared/models/requests/paginacao.request";

export class ConversasListarRequest extends PaginacaoRequest{
    public Id?: number;
    public Grupo?: boolean;
    public Nome?: string;
    public DataInclusao?: string;

    constructor(params: Partial<ConversasListarRequest>) {
        super(params);

        this.Id = params?.Id || 0;
        this.Grupo = params?.Grupo || false;
        this.Nome = params?.Nome || "";
        this.DataInclusao = params?.DataInclusao || "";
        

        this.CpOrd = "Id";
        this.TpOrd = "Asc";
    }
}