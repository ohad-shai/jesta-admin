import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { FavorInputGQL } from 'src/app/data/graphql/inputs/favor.input.gql';
import { UpdateFavorInputGQL } from 'src/app/data/graphql/inputs/update-favor.input.gql';
import { CreateFavorGQL } from 'src/app/data/graphql/mutations/create-favor.gql';
import { DeleteFavorGQL } from 'src/app/data/graphql/mutations/delete-favor.gql';
import { UpdateFavorGQL } from 'src/app/data/graphql/mutations/update-favor.gql';
import { FavorObjectGQL } from 'src/app/data/graphql/objects/favor.object.gql';
import { GetAllFavorsGQL } from 'src/app/data/graphql/queries/get-all-favors.gql';
import { GetFavorGQL } from 'src/app/data/graphql/queries/get-favor.gql';

@Injectable({
  providedIn: 'root'
})
export class FavorsService {

  constructor(
    private getFavorGQL: GetFavorGQL,
    private getAllFavorsGQL: GetAllFavorsGQL,
    private createFavorGQL: CreateFavorGQL,
    private updateFavorGQL: UpdateFavorGQL,
    private deleteFavorGQL: DeleteFavorGQL,
  ) { }

  getFavorById(id: string) {
    return this.getFavorGQL.watch({
      favorId: id
    }).valueChanges.pipe(
      map(result => Object.assign(new FavorObjectGQL(), result.data.getFavor))
    );
  }

  getAllFavors() {
    return this.getAllFavorsGQL.watch().valueChanges.pipe(
      map(result => result.data.getAllFavors.map(x => Object.assign(new FavorObjectGQL(), x)))
    );
  }

  createFavor(favor: FavorInputGQL) {
    return this.createFavorGQL.mutate({
      favor: favor
    }).pipe(
      map(result => result.data?.createFavor)
    );
  }

  updateFavor(id: string, updatedFavor: UpdateFavorInputGQL) {
    return this.updateFavorGQL.mutate({
      favorId: id,
      updatedFavor: updatedFavor,
    }).pipe(
      map(result => result.data?.updateFavor)
    );
  }

  deleteFavor(id: string) {
    return this.deleteFavorGQL.mutate({
      favorId: id
    }).pipe(
      map(result => result.data?.deleteFavor)
    );
  }

}
