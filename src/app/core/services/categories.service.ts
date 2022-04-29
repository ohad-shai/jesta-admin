import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CreateCategoryGQL } from 'src/app/data/graphql/mutations/create-category.gql';
import { DeleteCategoryGQL } from 'src/app/data/graphql/mutations/delete-category.gql';
import { UpdateCategoryGQL } from 'src/app/data/graphql/mutations/update-category.gql';
import { CategoryObjectGQL } from 'src/app/data/graphql/objects/category.object.gql';
import { GetAllCategoriesGQL } from 'src/app/data/graphql/queries/get-all-categories.gql';
import { GetAllParentCategoriesGQL } from 'src/app/data/graphql/queries/get-all-parent-categories.gql';
import { GetCategoryGQL } from 'src/app/data/graphql/queries/get-category.gql';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private getCategoryGQL: GetCategoryGQL,
    private getAllCategoriesGQL: GetAllCategoriesGQL,
    private getAllParentCategoriesGQL: GetAllParentCategoriesGQL,
    private createCategoryGQL: CreateCategoryGQL,
    private updateCategoryGQL: UpdateCategoryGQL,
    private deleteCategoryGQL: DeleteCategoryGQL,
  ) { }

  getCategoryById(id: string) {
    return this.getCategoryGQL.watch({
      getCategoryId: id
    }).valueChanges.pipe(
      map(result => Object.assign(new CategoryObjectGQL(), result.data.getCategory))
    );
  }

  getCategoryByName(name: string) {
    return this.getCategoryGQL.watch({
      name: name
    }).valueChanges.pipe(
      map(result => Object.assign(new CategoryObjectGQL(), result.data.getCategory))
    );
  }

  getAllCategories() {
    return this.getAllCategoriesGQL.watch().valueChanges.pipe(
      map(result => result.data.getAllCategories.map(x => Object.assign(new CategoryObjectGQL(), x)))
    );
  }

  getAllPrimaryCategories() {
    return this.getAllParentCategoriesGQL.watch().valueChanges.pipe(
      map(result => result.data.getAllParentCategories.map(x => Object.assign(new CategoryObjectGQL(), x)))
    );
  }

  createCategory(name: string, parentCategory: string) {
    return this.createCategoryGQL.mutate({
      name: name,
      parentCategory: parentCategory
    }).pipe(
      map(result => result.data?.createCategory)
    );
  }

  updateCategory(nameToChange: string, changedName: string, newParentCategoryId: string) {
    return this.updateCategoryGQL.mutate({
      nameToChange: nameToChange,
      newParentCategoryId: newParentCategoryId,
      changedName: changedName,
    }).pipe(
      map(result => result.data?.updateCategory)
    );
  }

  deleteCategory(name: string) {
    return this.deleteCategoryGQL.mutate({
      name: name
    }).pipe(
      map(result => result.data?.deleteCategory)
    );
  }

}
