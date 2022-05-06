import { CoordinatesInputGQL } from "./coordinates.input.gql";

export class AddressInputGQL {
    fullAddress!: string;
    location!: CoordinatesInputGQL;
}