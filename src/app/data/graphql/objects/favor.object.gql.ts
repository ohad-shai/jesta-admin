import { AddressObjectGQL } from "./address.object.gql";

export class FavorObjectGQL {
    _id?: string;
    categoryId?: string[];
    dateCreated?: Date;
    dateLastModified?: Date;
    dateLockedOut?: Date;
    dateToExecute?: Date;
    dateToFinishExecute?: Date;
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
    status?: string;

    getCategoriesTitle() {
        return "ניקיון בית";
    }

}