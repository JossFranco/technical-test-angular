
import { CustomValidators } from './custom.validator';
import { AbstractControl } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('CustomValidators', () => {
    let productService: { getProductById: jest.Mock };
    let validators: CustomValidators;
    let control: AbstractControl;

    beforeEach(() => {
        productService = {
            getProductById: jest.fn()
        };
        validators = new CustomValidators(productService as any);
    });

    it('should return { idExists: true } if product exists', (done) => {
        productService.getProductById.mockReturnValueOnce(of({ id: '123' }));
        const control = { value: '123' } as AbstractControl;
        const obs = validators.idAlreadyExists()(control);
        if ('subscribe' in obs) {
            (obs as any).subscribe((result: any) => {
                expect(result).toEqual({ idExists: true });
                done();
            });
        } else {
            done('No Observable returned');
        }
    });

    it('should return null if product does not exist', (done) => {
        productService.getProductById.mockReturnValueOnce(throwError(() => new Error('Not found')));
        const control = { value: '999' } as AbstractControl;
        const obs = validators.idAlreadyExists()(control);
        if ('subscribe' in obs) {
            (obs as any).subscribe((result: any) => {
                expect(result).toBeNull();
                done();
            });
        } else {
            done('No Observable returned');
        }
    });
    
    it('should return null if control value is falsy', () => {
        control = { value: null } as AbstractControl;
        expect(validators.dateMinValidator()(control)).toBeNull();
    });

    it('should return null if date is today', () => {
        const today = new Date().toISOString().split('T')[0];
        control = { value: today } as AbstractControl;
        expect(validators.dateMinValidator()(control)).toBeNull();
    });

    it('should return null if date is in the future', () => {
        const future = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        control = { value: future } as AbstractControl;
        expect(validators.dateMinValidator()(control)).toBeNull();
    });

    it('should return { dateInvalid: true } if date is in the past', () => {
        const past = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        control = { value: past } as AbstractControl;
        expect(validators.dateMinValidator()(control)).toEqual({ dateInvalid: true });
    });
});