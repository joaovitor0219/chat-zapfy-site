export class UsuarioResponse {
    public Id?: number;
    public Nome?: string;
    public Email?: string;
    public DataInclusao?: string;
    public Senha?: string;

    constructor(params: Partial<UsuarioResponse>) {

        this.Id = params?.Id || 0;
        this.Nome = params?.Nome || "";
        this.Email = params?.Email || "";
        this.Senha = params?.Senha || "";
        this.DataInclusao = params?.DataInclusao || "";
        
    }
}