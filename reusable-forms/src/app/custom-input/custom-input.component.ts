import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  Self,
  OnInit
} from "@angular/core";
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
  NG_VALIDATORS,
  NgControl
} from "@angular/forms";
import { SharedValidators } from '../validation/shared.validators';

export interface Validator {
  validate(c: AbstractControl): ValidationErrors | null;
  registerOnValidatorChange?(fn: () => void): void;
}

@Component({
  selector: "custom-input",
  templateUrl: "./custom-input.component.html",
  styleUrls: ["./custom-input.component.css"],
  providers: []
})
export class CustomInputComponent
  implements ControlValueAccessor, Validator, OnInit {
  disabled;
  @ViewChild("input", { static: false }) input: ElementRef;
  @Input() type = "text";
  @Input() isRequired: boolean = false;
  @Input() isPassword: boolean = false;
  @Input() pattern: string = null;
  @Input() label: string = null;
  @Input() placeholder: string;
  @Input() errorMsg: string;

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    const control = this.controlDir.control;
    const validators: ValidatorFn[] = control.validator
      ? [control.validator]
      : [];
    if (this.isRequired) {
      validators.push(Validators.required);
    }
    if (this.isPassword) {
      validators.push(SharedValidators.hasStrongPassword)
    }
    if (this.pattern) {
      validators.push(Validators.pattern(this.pattern));
    }

    control.setValidators(validators);
    control.updateValueAndValidity();
  }

  writeValue(obj: any): void {
    this.input.nativeElement.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(c: AbstractControl): ValidationErrors {
    const validators: ValidatorFn[] = [];
    if (this.isRequired) {
      validators.push(Validators.required);
    }
    if (this.pattern) {
      validators.push(Validators.pattern(this.pattern));
    }

    return validators;
  }

  onChange(event) {}
  onTouched() {}
}
