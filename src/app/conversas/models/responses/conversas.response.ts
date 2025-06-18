export class ConversaResponse {
    public Id?: number;
    public Grupo?: boolean;
    public Nome?: string;
    public DataInclusao?: string;

    constructor(params: Partial<ConversaResponse>) {
        
        this.Id = params.Id;
        this.Grupo = params.Grupo;
        this.Nome = params.Nome;
        this.DataInclusao = params.DataInclusao;
    }
}