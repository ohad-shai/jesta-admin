import { ValidatorFn, Validators } from "@angular/forms";

/**
 * Represents validation bundles, that can be re-used.
 */
export class ValidationBundles {

    /**
     * Returns the validation bundle for a basic email field.
     * @returns Returns an array of validators: [required, email, maxLength(50)].
     */
    static email(): Array<ValidatorFn> {
        return [Validators.required, Validators.email, Validators.maxLength(50)];
    }

    /**
     * Returns the validation bundle for a basic password field.
     * @returns Returns an array of validators: [required, minLength(6), maxLength(50)].
     */
    static password(): Array<ValidatorFn> {
        return [Validators.required, Validators.minLength(6), Validators.maxLength(50)];
    }

}