import { FormControl } from "@angular/forms";

export function isInvalid(field: FormControl): boolean{
    return field.invalid && (field.touched || field.dirty);
}