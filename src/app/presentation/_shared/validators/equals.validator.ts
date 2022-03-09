import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Validates that the source control value is equal to the destination control value.
 * @NOTE Use in a FormGroup level.
 * @param sourceControlName The name of the source control.
 * @param destinationControlName The name of the destination control.
 * @returns Returns null always. The errors are set to the form controls directly.
 * @validationErrors Source Control: "equals"
 */
export function equals(sourceControlName: string, destinationControlName: string): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
        const srcControl = (form as FormGroup).controls[sourceControlName];
        const destControl = (form as FormGroup).controls[destinationControlName];

        // Exits if other validator has already found:
        if (srcControl.errors && srcControl.errors['equals'] === undefined)
            return null;

        // Validates:
        if (srcControl.value !== destControl.value) {
            srcControl.setErrors({ equals: true });
        } else {
            srcControl.setErrors(null);
        }

        // Returns null always for the form group validation:
        return null;
    }
}