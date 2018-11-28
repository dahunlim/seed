import {Component, OnInit} from "@angular/core";
import {ErrorStateMatcher} from "@angular/material";
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: "app-temp-element",
  templateUrl: "./temp-element.component.html",
  styleUrls: ["./temp-element.component.scss"],
})
export class TempElementComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor() {

  }

  ngOnInit() {

  }
}
