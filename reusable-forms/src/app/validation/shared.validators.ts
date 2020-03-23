import { ValidationErrors, FormControl, AbstractControl } from "@angular/forms";

export class SharedValidators {
  public static hasStrongPassword(control: FormControl): ValidationErrors | null {
    if (control.value !== "") {
      let hasNumber = /\d/.test(control.value);
      let hasUpper = /[A-Z]/.test(control.value);
      let hasLower = /[a-z]/.test(control.value);
      const valid = hasNumber && hasUpper && hasLower;
      if (!valid) {
        return { strongPassword: true };
      }
    }

    return null;
  }
}
