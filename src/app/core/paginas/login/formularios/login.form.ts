import { Validators } from "@angular/forms";

export const LOGIN_FORM_CONFIG = {
    Nome:['', Validators.required],
    Senha:['',Validators.required]
}