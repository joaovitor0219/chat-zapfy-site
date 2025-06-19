
export class UsuarioLoginRequest{
    public Nome?: string;
    public Senha?:string;

    constructor(params: Partial<UsuarioLoginRequest>) {

        this.Nome = params?.Nome || "";
        this.Senha = params?.Senha || "";
    }
}