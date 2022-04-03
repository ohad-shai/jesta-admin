import { PaymentTypeEnumGQL } from "../objects/payment-type.enum.gql";
import { AddressInputGQL } from "./address.input.gql";

export interface UpdateFavorInputGQL {
    categoryId: Array<string>;
    dateLockedOut: Date;
    dateToPublish: Date;
    dateToUnpublished: Date;
    description: string;
    destinationAddress: AddressInputGQL;
    numOfPeopleNeeded: number;
    ownerId: string;
    paymentAmount: number;
    paymentMethod: PaymentTypeEnumGQL;
    sourceAddress: AddressInputGQL;
}