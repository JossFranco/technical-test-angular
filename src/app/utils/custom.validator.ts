import { AbstractControl, ValidationErrors, AsyncValidatorFn, ValidatorFn } from "@angular/forms";
import { ProductService } from "../services/product.service";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class CustomValidators {
    constructor(private productService: ProductService) { }

    idAlreadyExists(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return this.productService.getProductById(control.value).pipe(
                map(() => ({ idExists: true })),
                catchError(() => of(null))
            );
        };
    }

    dateMinValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) {
                return null;
            }
            const inputDateStr = new Date(control.value).toISOString().split('T')[0];
            const todayStr = new Date().toISOString().split('T')[0];
            return inputDateStr >= todayStr ? null : { dateInvalid: true };
        };
    }
}