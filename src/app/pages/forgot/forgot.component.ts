import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
})
export class ForgotComponent implements OnInit {
  form: FormGroup;
  cls = '';
  message = '';

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.form = this.formBuilder.group({
      email: '',
    });
  }

  ngOnInit(): void {
  }

  submit(): void {
    this.http
      .post('http://localhost:8000/api/forgot', this.form.getRawValue())
      .subscribe(
        () => { // request successful
          this.cls = 'success';
          this.message = 'Email was sent.';
        },
        () => {
          // request unsuccessful
          this.cls = 'danger';
          this.message = 'Email was not sent.'; // user not found
        }
      );
  }
}
