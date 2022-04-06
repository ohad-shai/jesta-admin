/**
 * Represents a user model.
 */
export class UserModel {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;

    constructor();
    constructor(id: string, firstName: string, lastName: string);
    constructor(id: string, firstName: string, lastName: string, email: string);
    constructor(id?: string, firstName?: string, lastName?: string, email?: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    getFullName() {
        if (this.firstName && this.lastName)
            return (this.firstName + ' ' + this.lastName);
        else
            return undefined;
    }

}