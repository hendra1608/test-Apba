import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders() {
    const token = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  getUsers() {
    return this.http.get<any[]>(`${this.apiUrl}/users`, this.getAuthHeaders());
  }

  addUser(user: any) {
    return this.http.post(`${this.apiUrl}/users`, user, this.getAuthHeaders());
  }

  updateUser(user: any) {
    console.log(user, 'ini user');
    return this.http.put(
      `${this.apiUrl}/users/${user.id}`,
      user.user,
      this.getAuthHeaders()
    );
  }

  deleteUser(id: string) {
    return this.http.delete(
      `${this.apiUrl}/users/${id}`,
      this.getAuthHeaders()
    );
  }
}
