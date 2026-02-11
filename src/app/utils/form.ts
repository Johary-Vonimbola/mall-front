import { FormControl } from "@angular/forms";

export function isInvalid(field: FormControl): boolean{
    return field.invalid && (field.touched || field.dirty);
}


export function toFormData(formValue: any): FormData{
    const f = new FormData;
    for(let key in formValue){
        f.append(key, formValue[key]);
    }
    return f;
}