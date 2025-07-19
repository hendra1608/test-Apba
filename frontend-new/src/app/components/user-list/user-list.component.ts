import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

declare var bootstrap: any; // Import Bootstrap JS (untuk modal)

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  editMode: boolean = false;
  editData: any = null;
  modal: any;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
    this.modal = new bootstrap.Modal(document.getElementById('userModal'));
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (data) => (this.users = data),
      (error) => console.error('Error loading users', error)
    );
  }

  openAddModal() {
    this.editMode = false;
    this.editData = null;
    this.modal.show();
  }

  openEditModal(user: any) {
    this.editMode = true;
    this.editData = user;
    this.modal.show();
  }

  onSave(user: any) {
    if (this.editMode) {
      this.userService.updateUser(user).subscribe(() => {
        this.loadUsers();
        this.closeModal();
      });
    } else {
      this.userService.addUser(user).subscribe(() => {
        this.loadUsers();
        this.closeModal();
      });
    }
  }

  deleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => this.loadUsers());
    }
  }

  closeModal() {
    this.modal.hide();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
