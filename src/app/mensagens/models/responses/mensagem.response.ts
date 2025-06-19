import { ConversaResponse } from "../../../conversas/models/responses/conversas.response";
import { UsuarioResponse } from "../../../usuarios/models/responses/usuario.response";

export class MensagemResponse {

    public Conversa?: ConversaResponse;
    public Usuario?: UsuarioResponse;
    public Conteudo?: string;
    public DataEnvio?:string;

    constructor(params: Partial<MensagemResponse>) {

        this.Conversa = params?.Conversa;
        this.Usuario = params?.Usuario;
        this.Conteudo = params?.Conteudo;
        this.DataEnvio = params?.DataEnvio;
    }
}