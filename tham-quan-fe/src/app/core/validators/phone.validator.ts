import { AbstractControl, ValidationErrors } from '@angular/forms';

export const phoneNumberValidator: ValidationErrors = (control: AbstractControl) => {
  // Match 10 digit
  const valid = /^\+?(\d.*){10}$/.test(control.value);
  return valid ? null : { invalidPhoneNumber: { valid: false, value: control.value } };
};
