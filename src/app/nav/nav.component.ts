import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../classes/auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  authenticated = false;

  constructor(
    private router: Router,
    private http: HttpClient
    ) {}

  ngOnInit(): void {
    Auth.authEmitter.subscribe((authenticated: boolean) => {
      // emitted from home component
      this.authenticated = authenticated;
    });
  }

  logout(): void {
    this.http
      .post('http://localhost:8000/api/logout', {}) // cookie cleared by nest.js api
      .subscribe(() => {
        this.router.navigate(['/login'])
        this.authenticated = false; // update navbar
      });
  }
}
