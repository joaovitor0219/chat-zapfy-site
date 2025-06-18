import { PaginacaoRequest } from "../../../shared/models/requests/paginacao.request";

export class MensagemListarRequest extends PaginacaoRequest{
    public Id?: number;
    public IdConversa?: number;
    public IdUsuario?: number;
    public Conteudo?: string;
    public DataEnvio?: string;

    constructor(params: Partial<MensagemListarRequest>) {
        super(params);

        this.Id = params?.Id || 0;
        this.IdConversa = params?.IdConversa || 0;
        this.IdUsuario = params?.IdUsuario || 0;
        this.Conteudo = params?.Conteudo || "";
        this.DataEnvio = params?.DataEnvio || "";
        

        this.CpOrd = "Id";
        this.TpOrd = "Asc";
    }
}