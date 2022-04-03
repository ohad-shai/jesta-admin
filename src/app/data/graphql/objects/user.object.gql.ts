import { AddressObjectGQL } from "./address.object.gql";

export interface UserObjectGQL {
    _id: string;
    address: AddressObjectGQL;
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