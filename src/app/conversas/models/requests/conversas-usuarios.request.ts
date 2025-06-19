export class ConversaPorUsuarioListarRequest {
    public IdUsuario?: number;

    constructor(params: Partial<ConversaPorUsuarioListarRequest>) {
        this.IdUsuario = params?.IdUsuario;
    }
}