export class MensagemResponse {

    public IdConversa?: number;
    public IdUsuario?: number;
    public Conteudo?: string;
    public DataEnvio?:string;

    constructor(params: Partial<MensagemResponse>) {

        this.IdConversa = params?.IdConversa;
        this.IdUsuario = params?.IdUsuario;
        this.Conteudo = params?.Conteudo;
        this.DataEnvio = params?.DataEnvio;
    }
}