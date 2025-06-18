
export class UsuarioRequest{
    public Nome?: string;
    public Email?: string;
    public Senha?:string;

    constructor(params: Partial<UsuarioRequest>) {

        this.Nome = params?.Nome || "";
        this.Email = params?.Email || "";
        this.Senha = params?.Senha || "";
    }
}