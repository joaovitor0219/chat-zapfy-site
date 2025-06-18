import { ConversaResponse } from "../../../conversas/models/responses/conversas.response";
import { UsuarioResponse } from "../../../usuarios/models/responses/usuario.response";

export class ConversaUsuarioResponse {
    public Id?: number;
    public Usuario?: UsuarioResponse;
    public Conversa?: ConversaResponse;
    public DataInclusao?: string;

    constructor(params: Partial<ConversaUsuarioResponse>) {
        
        this.Id = params.Id;
        this.Usuario = params.Usuario;
        this.Conversa = params.Conversa;
        this.DataInclusao = params.DataInclusao;
    }
}