import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarUtil } from '../../_shared/utilities/snack-bar.util';
import { MultiComponent } from '../../_shared/objects/multi-component';
import { ComponentMode } from '../../_shared/objects/component-mode';
import { ValidationBundles } from '../../_shared/validators/validation-bundles';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorId } from 'src/app/data/utilities/error-id';
import { FavorsService } from 'src/app/core/services/favors.service';
import { PopulatedFavorObjectGQL } from 'src/app/data/graphql/objects/populated-favor.object.gql';
import { FavorInputGQL } from 'src/app/data/graphql/inputs/favor.input.gql';
import { UpdateFavorInputGQL } from 'src/app/data/graphql/inputs/update-favor.input.gql';
import { PaymentTypeEnumGQL } from "src/app/data/graphql/objects/payment-type.enum.gql";
import { CategoriesService } from 'src/app/core/services/categories.service';
import { CategoryObjectGQL } from 'src/app/data/graphql/objects/category.object.gql';
import { requiredIfNotEquals } from '../../_shared/validators/required-if-not-equals.validator';
import { AddressInputGQL } from 'src/app/data/graphql/inputs/address.input.gql';
import { CoordinatesInputGQL } from 'src/app/data/graphql/inputs/coordinates.input.gql';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-favor',
  templateUrl: './favor.component.html'
})
export class FavorComponent extends MultiComponent implements OnInit {

  initialLoading: boolean = false;
  favor: PopulatedFavorObjectGQL = new PopulatedFavorObjectGQL();
  form!: FormGroup;
  formLoading: boolean = false;
  primaryCategories: CategoryObjectGQL[] = [];
  paymentMethods = [
    { id: PaymentTypeEnumGQL.FREE, name: "חינם" },
    { id: PaymentTypeEnumGQL.CASH, name: "מזומן" },
    { id: PaymentTypeEnumGQL.PAYPAL, name: "PayPal" },
  ];

  constructor(
    private title: Title,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: SnackBarUtil,
    private favorsService: FavorsService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
  ) { super(); }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.mode = <ComponentMode>data["mode"];
      if (this.mode == undefined) throw new Error("The route does not include the \"mode\" data property.");

      this.form = new FormGroup({
        category: new FormControl('', [Validators.required]),
        numOfPeopleNeeded: new FormControl('', [Validators.required, Validators.min(1), Validators.max(10)].concat(ValidationBundles.numberOnly())),
        description: new FormControl('', [Validators.maxLength(300)]),
        dateToStart: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        dateToEnd: new FormControl('', [Validators.maxLength(50)]),
        // TODO: hours ?
        sourceAddress: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        sourceAddressLat: new FormControl('', [Validators.required, Validators.maxLength(30)].concat(ValidationBundles.decimalOnly())),
        sourceAddressLang: new FormControl('', [Validators.required, Validators.maxLength(30)].concat(ValidationBundles.decimalOnly())),
        destinationAddress: new FormControl('', [Validators.maxLength(50)]),
        destinationAddressLat: new FormControl('', [Validators.maxLength(30)].concat(ValidationBundles.decimalOnly())),
        destinationAddressLang: new FormControl('', [Validators.maxLength(30)].concat(ValidationBundles.decimalOnly())),
        paymentMethod: new FormControl(PaymentTypeEnumGQL.FREE, [Validators.required]),
        paymentAmount: new FormControl('', [Validators.min(10), Validators.max(10000)].concat(ValidationBundles.numberOnly())),
      }, { validators: [requiredIfNotEquals('paymentAmount', 'paymentMethod', PaymentTypeEnumGQL.FREE)] });

      this.categoriesService.getAllPrimaryCategories().subscribe({
        next: (data) => {
          this.primaryCategories = data;
        },
        error: (error) => {
          this.snackBar.show("אירעה שגיאה, אנא נסה שוב");
        }
      });

      if (!this.isCreateMode()) {
        this.route.params.subscribe(params => {
          // Gets the favor from the server:
          this.initialLoading = true;
          this.favorsService.getFavorById(params["id"]).subscribe({
            next: (data) => {
              this.favor = data;
              this.form.controls["category"].setValue(this.favor.categoryId![0]._id);
              this.form.controls["numOfPeopleNeeded"].setValue(this.favor.numOfPeopleNeeded);
              this.form.controls["description"].setValue(this.favor.description);
              this.form.controls["dateToStart"].setValue(this.favor.dateToExecute);
              this.form.controls["dateToEnd"].setValue(this.favor.dateToFinishExecute);
              this.form.controls["sourceAddress"].setValue(this.favor.sourceAddress?.fullAddress);
              this.form.controls["sourceAddressLat"].setValue(this.favor.sourceAddress?.location.coordinates[0]);
              this.form.controls["sourceAddressLang"].setValue(this.favor.sourceAddress?.location.coordinates[1]);
              this.form.controls["destinationAddress"].setValue(this.favor.destinationAddress?.fullAddress);
              this.form.controls["destinationAddressLat"].setValue(this.favor.destinationAddress?.location.coordinates[0]);
              this.form.controls["destinationAddressLang"].setValue(this.favor.destinationAddress?.location.coordinates[1]);
              this.form.controls["paymentAmount"].setValue(this.favor.paymentAmount);
              this.form.controls["paymentMethod"].setValue(this.favor.paymentMethod);
              this.title.setTitle('ג\'סטה | ניהול | ' + this.favor.getCategoriesTitle());
              this.initialLoading = false;
            },
            error: (error) => {
              this.snackBar.show("אירעה שגיאה, אנא נסה שוב");
              this.initialLoading = false;
            }
          });
        });
      }
    });
  }

  onSourceAddressChange(address: any) {
    this.form.controls['sourceAddress'].setValue(address.formatted_address);
    this.form.controls['sourceAddressLat'].setValue(address.geometry.location.lat());
    this.form.controls['sourceAddressLang'].setValue(address.geometry.location.lng());
  }

  onDestinationAddressChange(address: any) {
    this.form.controls['destinationAddress'].setValue(address.formatted_address);
    this.form.controls['destinationAddressLat'].setValue(address.geometry.location.lat());
    this.form.controls['destinationAddressLang'].setValue(address.geometry.location.lng());
  }

  performCreate() {
    if (this.form.invalid || this.formLoading) return;

    this.formLoading = true;

    let favor = <FavorInputGQL>{
      categoryId: [this.form.controls['category'].value],
      numOfPeopleNeeded: this.form.controls['numOfPeopleNeeded'].value,
      description: (this.form.controls['description'].value ? this.form.controls['description'].value : null),
      dateToExecute: this.form.controls['dateToStart'].value,
      dateToFinishExecute: (this.form.controls['dateToEnd'].value ? this.form.controls['dateToEnd'].value : null),
      sourceAddress: <AddressInputGQL>{
        fullAddress: this.form.controls['sourceAddress'].value,
        location: <CoordinatesInputGQL>{
          coordinates: [
            this.form.controls['sourceAddressLat'].value,
            this.form.controls['sourceAddressLang'].value
          ]
        }
      },
      destinationAddress: (this.form.controls['destinationAddress'].value ? <AddressInputGQL>{
        fullAddress: this.form.controls['destinationAddress'].value,
        location: <CoordinatesInputGQL>{
          coordinates: [
            this.form.controls['destinationAddressLat'].value,
            this.form.controls['destinationAddressLang'].value
          ]
        }
      } : null),
      paymentAmount: (this.form.controls['paymentAmount'].value ? this.form.controls['paymentAmount'].value : null),
      paymentMethod: this.form.controls['paymentMethod'].value,
      ownerId: this.authService.getCurrentUser()!.id,
    };
    this.favorsService.createFavor(favor).subscribe({
      next: () => {
        this.router.navigate(['/favors']);
        this.snackBar.show("הג\'סטה נוספה בהצלחה");
        this.formLoading = false;
      },
      error: (error) => {
        this.snackBar.show("אירעה שגיאה, אנא נסה שוב");
        this.formLoading = false;
      }
    });
  }

  performUpdate() {
    if (this.form.invalid || this.formLoading) return;

    this.formLoading = true;
    this.favorsService.updateFavor(this.favor._id!, <UpdateFavorInputGQL>{
      // id: this.favor.id,
      // firstName: this.form.controls['firstName'].value,
      // lastName: this.form.controls['lastName'].value,
      // email: this.form.controls['email'].value.toLowerCase(),
      // password: (this.form.controls['password'].value ? this.form.controls['password'].value : undefined),
    }).subscribe({
      next: (result) => {
        this.router.navigate(['/favors/' + this.favor._id!]);
        this.snackBar.show("הג\'סטה עודכנה בהצלחה");
        this.formLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.show("אירעה שגיאה, אנא נסה שוב");
        this.formLoading = false;
      }
    });
  }

  performDelete() {
    if (this.formLoading) return;

    this.formLoading = true;
    this.favorsService.deleteFavor(this.favor._id!).subscribe({
      next: () => {
        this.router.navigate(['/favors']);
        this.snackBar.show("הג\'סטה נמחקה בהצלחה");
        this.formLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        if (error.message.includes(ErrorId.NotExists)) {
          this.router.navigate(['/favors']);
          this.snackBar.show("הג\'סטה נמחקה בהצלחה");
        } else {
          this.snackBar.show("אירעה שגיאה, אנא נסה שוב");
        }
        this.formLoading = false;
      }
    });
  }

}
