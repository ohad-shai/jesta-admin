import { AddressObjectGQL } from "./address.object.gql";

export class FavorObjectGQL {
    _id?: string;
    categoryId?: string[];
    dateCreated?: Date;
    dateLastModified?: Date;
    dateLockedOut?: Date;
    dateToPublish?: Date;
    dateToUnpublished?: Date;
    description?: string;
    destinationAddress?: AddressObjectGQL;
    imagesPath?: string[];
    numOfPeopleNeeded?: number;
    ownerId?: string;
    paymentAmount?: number;
    paymentMethod?: string;
    sourceAddress?: AddressObjectGQL;

    getCategoriesTitle() {
        return "ניקיון בית";
    }

}