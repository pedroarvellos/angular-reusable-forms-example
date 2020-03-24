import { Component, Input, Self, forwardRef } from "@angular/core";
import {
  ControlValueAccessor,
  ValidatorFn,
  Validators,
  NgControl
} from "@angular/forms";
import { SharedValidators } from "../validation/shared.validators";

@Component({
  selector: "custom-input",
  templateUrl: "./custom-input.component.html",
  styleUrls: ["./custom-input.component.css"],
  providers: []
})
export class CustomInputComponent implements ControlValueAccessor {
  private innerValue: any;
  @Input() type = "text";
  @Input() validation: any;
  @Input() pattern: string = null;
  @Input() label: string = null;
  @Input() placeholder: string;
  @Input() fieldName: string;
  @Input() isReadyOnly: boolean = false;
  private _errorMsg: string = '';

  get errorMsg() {
    return this._errorMsg;
  }

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    console.log(this.controlDir)
    const control = this.controlDir.control;
    const validators: ValidatorFn[] = control.validator
      ? [control.validator]
      : [];

    this.validation.forEach(validationObject => {
      if(validationObject.isRequired) {
        validators.push(Validators.required);
      }
      if(validationObject.isEmail) {
        validators.push(Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}"));
      }
      if(validationObject.isPassword) {
        validators.push(SharedValidators.hasStrongPassword);
      }
    })

    control.setValidators(validators);
    control.updateValueAndValidity();
  }

  get value() {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.validate();
      this.innerValue = v;
      this.onChange(v);
    }
  }

  writeValue(v: any): void {
    this.value = v;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isReadyOnly = isDisabled;
  }

  onChange(v) {
  }
  onTouched() {}

  validate(): void {
    const control = this.controlDir.control;
    if(this.controlDir.name === 'email') {
      if(control.errors.required) {
        this._errorMsg = 'Email field required';
      } else if (control.errors.pattern) {
        this._errorMsg = 'Invalid email';
      }
    } else if(this.controlDir.name === 'name') {
      if(control.errors.required) {
        this._errorMsg = 'Name field required';
      }
    }
  }
}
