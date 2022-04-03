/**
 * Represents a manager model.
 */
export class ManagerModel {
    id!: string;
    firstName!: string;
    lastName!: string;

    constructor(id: string, firstName: string, lastName: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getFullName() {
        return (this.firstName + ' ' + this.lastName);
    }

}