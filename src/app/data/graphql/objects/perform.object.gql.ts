import { ActivityDaysObjectGQL } from "./activity-days.object.gql";
import { AddressObjectGQL } from "./address.object.gql";
import { PaymentTypeEnumGQL } from "./payment-type.enum.gql";

export interface PerformObjectGQL {
    _id: string;
    activityDays: ActivityDaysObjectGQL;
    activityHoursStart: Date;
    address: AddressObjectGQL;
    addressPreference: AddressObjectGQL;
    categoryId: Array<string>;
    dateCreated: Date;
    dateLastModified: Date;
    minimumPaymentAmount: number;
    performerId: string;
    preferredPaymentMethod: PaymentTypeEnumGQL
}