import { AbstractControl, ValidationErrors } from "@angular/forms";

/**
 * Validates that the control value has at least one lowercase letter.
* @NOTE Use in a FormControl level.
 * @param control The control to check.
 */
export function mustHaveLowercase(control: AbstractControl): ValidationErrors | null {
    // Making this optional:
    if (!control.value)
        return null;

    let regex = /[a-z]/g
    if (!regex.test(control.value)) {
        return { mustHaveLowercase: true };
    } else {
        return null;
    }
}
