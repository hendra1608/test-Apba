import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http
      .post<any>(`${environment.apiUrl}/login`, {
        username: this.username,
        password: this.password,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          alert(res.message);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/users']);
        },
        error: (err) => {
          console.error(err);
          alert('Username atau Password salah!');
        },
      });
  }
}
