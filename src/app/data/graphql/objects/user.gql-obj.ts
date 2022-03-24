import { AddressGQLObject } from "./address.gql-obj";

export interface UserGQLObject {
    _id: string;
    address: AddressGQLObject;
    birthday: Date;
    created_date: string;
    dateEmailVerified: string;
    datePasswordModified: Date;
    email: string;
    firstName: string;
    imagePath: string;
    lastName: string;
    phone: string;
    role: string;
}