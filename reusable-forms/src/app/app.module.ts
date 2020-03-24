import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import { CustomInputValidationComponent } from './custom-input/validation/custom-input-validation.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomInputComponent,
    CustomInputValidationComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
