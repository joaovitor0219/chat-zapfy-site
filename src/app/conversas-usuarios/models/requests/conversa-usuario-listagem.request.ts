import { PaginacaoRequest } from "../../../shared/models/requests/paginacao.request";

export class ConversaUsuarioListarRequest extends PaginacaoRequest{
    public Id?: number;
    public IdConversa?: number;
    public IdUsuario?: number;
    public DataInclusao?: string;

    constructor(params: Partial<ConversaUsuarioListarRequest>) {
        super(params);

        this.Id = params?.Id || 0;
        this.IdConversa = params?.IdConversa || 0;
        this.IdUsuario = params?.IdUsuario || 0;
        this.DataInclusao = params?.DataInclusao || "";
        

        this.CpOrd = "Id";
        this.TpOrd = "Asc";
    }
}