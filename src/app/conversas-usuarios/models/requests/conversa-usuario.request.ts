export class ConversaUsuarioRequest {
    public IdConversa?: number;
    public IdUsuario?: number;

    constructor(params: Partial<ConversaUsuarioRequest>) {

        this.IdConversa = params?.IdConversa || 0;
        this.IdUsuario = params?.IdUsuario || 0;
        
    }
}