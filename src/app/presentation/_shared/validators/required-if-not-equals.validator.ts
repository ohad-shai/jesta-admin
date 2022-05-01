import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Validates that the target-control is required only if the specified check-control is not equal to the specified check-value.
 * @NOTE Use in a FormGroup level.
 * @param targetControlName The control name in the form group to mark as required or not.
 * @param checkControlName The control name in the form group to check the value.
 * @param checkValue The value of the check-control to check.
 * @returns Returns null always. The errors are set to the form controls directly.
 */
export function requiredIfNotEquals(targetControlName: string, checkControlName: string, checkValue: any): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
        const targetControl = ((form as FormGroup).controls[targetControlName] as FormControl);
        const checkControl = ((form as FormGroup).controls[checkControlName] as FormControl);

        // Validates:
        if (checkControl.value !== checkValue) {
            if (!targetControl.value) {
                targetControl.setErrors({ requiredIfNotEquals: true });
            }
        } else {
            targetControl.setErrors(null);
        }

        // Returns null always for the form group validation:
        return null;
    }
}