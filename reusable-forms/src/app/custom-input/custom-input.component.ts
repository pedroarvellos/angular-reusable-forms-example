import { Component, Input, ElementRef, ViewChild, Self } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl, ValidationErrors, ValidatorFn, Validators, NG_VALIDATORS, NgControl } from "@angular/forms";

export interface Validator {
  validate(c: AbstractControl): ValidationErrors | null;
  registerOnValidatorChange?(fn: () => void): void;
}

@Component({
  selector: "custom-input",
  templateUrl: "./custom-input.component.html",
  styleUrls: ["./custom-input.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CustomInputComponent
    },
    {
      provide: NG_VALIDATORS,
      useExisting: CustomInputComponent,
      multi: true
    }
  ]
})
export class CustomInputComponent implements ControlValueAccessor, Validator {
  disabled;
  @ViewChild("input", { static: false }) input: ElementRef;
  @Input() type = "text";
  @Input() isRequired: boolean = false;
  @Input() pattern: string = null;
  @Input() label: string = null;
  @Input() placeholder: string;
  @Input() errorMsg: string;

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
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
