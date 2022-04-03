import { CoordinatesObjectGQL } from "./coordinates.object.gql";

export interface AddressObjectGQL {
    fullAddress: string;
    location: CoordinatesObjectGQL;
}