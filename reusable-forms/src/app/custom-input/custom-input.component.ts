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
  NgControl
} from "@angular/forms";
import { SharedValidators } from "../validation/shared.validators";

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
  @Input() validation: any;
  @Input() pattern: string = null;
  @Input() label: string = null;
  @Input() placeholder: string;
  @Input() fieldName: string;
  @Input() errorMsg: string;

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    const control = this.controlDir.control;
    const validators: ValidatorFn[] = control.validator
      ? [control.validator]
      : [];

    this.validation.forEach(validationObject => {
      if(validationObject.isRequired) {
        validators.push(Validators.required);
        this.errorMsg = validationObject.msg;
      }
      if(validationObject.isEmail) {
        validators.push(Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}"));
        this.errorMsg = validationObject.msg;
      }
      if(validationObject.isPassword) {
        validators.push(SharedValidators.hasStrongPassword);
        this.errorMsg = validationObject.msg;
      }
    })

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
    this.validation.forEach(validationObject => {
      if(validationObject.isRequired) {
        validators.push(Validators.required);
        this.errorMsg = validationObject.msg;
      }
      if(validationObject.isEmail) {
        validators.push(Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}"));
        this.errorMsg = validationObject.msg;
      }
      if(validationObject.isPassword) {
        validators.push(SharedValidators.hasStrongPassword);
        this.errorMsg = validationObject.msg;
      }
    })

    return validators;
  }

  onChange(event) {}
  onTouched() {}
}
