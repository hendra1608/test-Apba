import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  showForm: boolean = false;
  editData: any = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (data: any) => {
        this.users = data;
      },
      (error) => {
        console.error('Error loading users', error);
      }
    );
  }

  addUser() {
    this.editData = null; // Pastikan form kosong
    this.showForm = true; // Tampilkan form
  }

  editUser(id: string, user: any) {
    this.editData = { ...user }; // Isi form dengan data user yang dipilih
    this.showForm = true; // Tampilkan form
  }

  onSave(event: any) {
    if (event.id) {
      this.userService.updateUser(event.id, event.user).subscribe(() => {
        this.loadUsers();
        this.showForm = false;
        this.editData = null;
      });
    } else {
      this.userService.addUser(event).subscribe(() => {
        this.loadUsers();
        this.showForm = false;
      });
    }
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }
}
