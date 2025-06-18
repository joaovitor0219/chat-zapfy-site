export class ConversaRequest {
    public Grupo?: boolean;
    public Nome?: string;

    constructor(params: Partial<ConversaRequest>) {
        this.Grupo = params?.Grupo;
        this.Nome = params?.Nome;
    }
}