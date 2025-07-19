import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  @Input() editData: any;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  user: any = {
    username: '',
    password: '',
    nama: '',
    hakAkses: '',
    kdKlinik: '',
    kdCabang: '',
  };
  constructor() {}

  ngOnInit(): void {
    if (this.editData) {
      this.user = { ...this.editData };
    }
  }

  cancelForm() {
    this.cancel.emit(); // trigger event ke parent
  }

  onSubmit() {
    if (this.editData) {
      this.save.emit({ id: this.editData.id, user: this.user });
    } else {
      this.save.emit(this.user);
    }
  }
}
