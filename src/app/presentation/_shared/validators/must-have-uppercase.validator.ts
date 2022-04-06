import { AbstractControl, FormControl, ValidationErrors } from "@angular/forms";

/**
 * Validates that the control value has at least one uppercase letter.
* @NOTE Use in a FormControl level.
 * @param control The control to check.
 */
export function mustHaveUppercase(control: AbstractControl): ValidationErrors | null {
    // Making this optional:
    if (!control.value)
        return null;

    let regex = /[A-Z]/g
    if (!regex.test(control.value)) {
        return { mustHaveUppercase: true }
    } else {
        return null;
    }
}