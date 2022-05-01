import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { mustHaveLowercase } from "./must-have-lowercase.validator";
import { mustHaveUppercase } from "./must-have-uppercase.validator";

/**
 * Represents validation bundles, that can be re-used.
 */
export class ValidationBundles {

    /**
     * Returns the validation bundle for a basic email field.
     * @returns Returns an array of validators: [email, maxLength(50)].
     */
    static email(): ((control: AbstractControl) => ValidationErrors | null)[] {
        return [Validators.email, Validators.maxLength(50)];
    }

    /**
     * Returns the validation bundle for a basic email field, with a required validator.
     * @returns Returns an array of validators: [required, email, maxLength(50)].
     */
    static emailRequired(): ((control: AbstractControl) => ValidationErrors | null)[] {
        return [Validators.required].concat(this.email());
    }

    /**
     * Returns the validation bundle for a basic password field.
     * @returns Returns an array of validators: [minLength(8), maxLength(50), mustHaveLowercase, mustHaveUppercase].
     */
    static password(): ((control: AbstractControl) => ValidationErrors | null)[] {
        return [Validators.minLength(8), Validators.maxLength(50), mustHaveLowercase, mustHaveUppercase];
    }

    /**
    * Returns the validation bundle for a basic password field, with a required validator.
    * @returns Returns an array of validators: [required, minLength(8), maxLength(50), mustHaveLowercase, mustHaveUppercase].
    */
    static passwordRequired(): ((control: AbstractControl) => ValidationErrors | null)[] {
        return [Validators.required].concat(this.password());
    }

    /**
     * Returns the validation bundle for a decimal only validator.
     * @returns Returns an array of validators: [pattern].
     */
    static numberOnly(): ((control: AbstractControl) => ValidationErrors | null)[] {
        return [Validators.pattern(/^[0-9]*$/)];
    }

    /**
     * Returns the validation bundle for a decimal only validator.
     * @returns Returns an array of validators: [pattern].
     */
    static decimalOnly(): ((control: AbstractControl) => ValidationErrors | null)[] {
        return [Validators.pattern(/^\d*\.?\d*$/)];
    }

}