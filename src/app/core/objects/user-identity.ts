/**
 * Represents a user identity.
 */
export class UserIdentity {
    id!: string
    firstName!: string;
    lastName!: string;
    email!: string;

    getFullName() {
        return (this.firstName + ' ' + this.lastName)
    }

}