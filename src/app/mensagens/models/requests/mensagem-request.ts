export class MensagemRequest {

    public IdConversa?: number;
    public IdUsuario?: number;
    public Conteudo?: string;

    constructor(params: Partial<MensagemRequest>) {

        this.IdConversa = params?.IdConversa;
        this.IdUsuario = params?.IdUsuario;
        this.Conteudo = params?.Conteudo;
    }
}