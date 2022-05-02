import { PaymentTypeEnumGQL } from "../objects/payment-type.enum.gql";
import { AddressInputGQL } from "./address.input.gql";

export interface UpdateFavorInputGQL {
    categoryId: string[];
    dateLockedOut: Date;
    dateToExecute: Date;
    dateToFinishExecute: Date;
    dateToPublish: Date;
    description: string;
    destinationAddress: AddressInputGQL;
    numOfPeopleNeeded: number;
    paymentAmount: number;
    paymentMethod: PaymentTypeEnumGQL;
    sourceAddress: AddressInputGQL;
}