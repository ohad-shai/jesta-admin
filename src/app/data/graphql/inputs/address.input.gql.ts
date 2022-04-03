import { CoordinatesInputGQL } from "./coordinates.input.gql";

export interface AddressInputGQL {
    fullAddress: string;
    location: CoordinatesInputGQL;
}