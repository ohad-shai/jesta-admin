import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Validates that the source control value is not equal to the destination control value.
 * @NOTE Use in a FormGroup level.
 * @param sourceControlName The name of the source control.
 * @param destinationControlName The name of the destination control.
 * @returns Returns null always. The errors are set to the form controls directly.
 * @validationErrors Source Control: "notEquals"
 */
export function notEquals(sourceControlName: string, destinationControlName: string): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
        const srcControl = (form as FormGroup).controls[sourceControlName];
        const destControl = (form as FormGroup).controls[destinationControlName];

        // Exits if other validator has already found:
        if (srcControl.errors && srcControl.errors['notEquals'] === undefined)
            return null;

        // Validates:
        if (srcControl.value === destControl.value) {
            srcControl.setErrors({ notEquals: true });
        } else {
            srcControl.setErrors(null);
        }

        // Returns null always for the form group validation:
        return null;
    }
}