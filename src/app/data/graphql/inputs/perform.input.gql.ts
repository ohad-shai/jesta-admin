import { PaymentTypeEnumGQL } from "../objects/payment-type.enum.gql";
import { ActivityDaysInputGQL } from "./activity-days.input.gql";
import { AddressInputGQL } from "./address.input.gql";

export interface PerformInputGQL {
    activityDays: ActivityDaysInputGQL;
    activityHoursStart: Date;
    address: AddressInputGQL;
    addressPreference: AddressInputGQL;
    categoryId: Array<string>;
    dateCreated: Date;
    dateLastModified: Date;
    minimumPaymentAmount: number;
    performerId: string;
    preferredPaymentMethod: PaymentTypeEnumGQL
}