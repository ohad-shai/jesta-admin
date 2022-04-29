import { AddressObjectGQL } from "./address.object.gql";
import { CategoryObjectGQL } from "./category.object.gql";
import { UserObjectGQL } from "./user.object.gql";

export class PopulatedFavorObjectGQL {
    _id?: string;
    categoryId?: CategoryObjectGQL[];
    dateCreated?: Date;
    dateLastModified?: Date;
    dateLockedOut?: Date;
    dateToPublish?: Date;
    dateToUnpublished?: Date;
    description?: string;
    destinationAddress?: AddressObjectGQL;
    imagesPath?: Array<string>;
    numOfPeopleNeeded?: number;
    ownerId?: UserObjectGQL;
    paymentAmount?: number;
    paymentMethod?: string;
    sourceAddress?: AddressObjectGQL;

    getCategoriesTitle() {
        return "ניקיון בית";
    }

}