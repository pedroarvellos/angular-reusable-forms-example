import { OnInit, Component, Input } from "@angular/core";
import { NgControl } from "@angular/forms";

@Component({
  selector: "custom-input-validation",
  templateUrl: "./custom-input-validation.component.html",
  styleUrls: [],
  providers: []
})
export class CustomInputValidationComponent implements OnInit {
  @Input() inputComponent: NgControl;
  @Input() label: string;
  errorMsg: string;

  ngOnInit(): void {
    console.log(this.inputComponent);
  }
}
