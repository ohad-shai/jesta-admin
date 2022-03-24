import { CoordinatesGQLObject } from "./coordinates.gql-obj";

export interface AddressGQLObject {
    city: string;
    country: string;
    houseNumber: number;
    location: CoordinatesGQLObject;
    street: string;
}