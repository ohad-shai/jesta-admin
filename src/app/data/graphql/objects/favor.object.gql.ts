import { AddressObjectGQL } from "./address.object.gql";

export interface FavorObjectGQL {
    _id: string;
    categoryId: Array<string>;
    dateCreated: Date;
    dateLastModified: Date;
    dateLockedOut: Date;
    dateToPublish: Date;
    dateToUnpublished: Date;
    description: string;
    destinationAddress: AddressObjectGQL;
    imagesPath: Array<string>;
    numOfPeopleNeeded: number;
    ownerId: string;
    paymentAmount: number;
    paymentMethod: string;
    sourceAddress: AddressObjectGQL;
}