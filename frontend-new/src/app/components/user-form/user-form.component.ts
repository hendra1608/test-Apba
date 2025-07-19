import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnChanges {
  @Input() editData: any;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  user: any = {
    username: '',
    password: '',
    name: '',
    hakAkses: '',
    kdKlinik: '',
    kdCabang: '',
  };

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    // Reset atau isi form ketika editData berubah
    if (changes['editData']) {
      if (this.editData) {
        // Jika ada editData => isi form dengan data user
        this.user = { ...this.editData };
      } else {
        // Jika editData null => reset form
        this.user = {
          username: '',
          password: '',
          name: '',
          hakAkses: '',
          kdKlinik: '',
          kdCabang: '',
        };
      }
    }
  }

  cancelForm(form: any) {
    form.resetForm(); // reset ngForm
    this.user = {
      username: '',
      password: '',
      name: '',
      hakAkses: '',
      kdKlinik: '',
      kdCabang: '',
    }; // reset data user
    this.cancel.emit();
  }

  onSubmit(form: any) {
    if (this.editData) {
      this.save.emit({ id: this.editData.kduser, user: this.user });
    } else {
      this.save.emit(this.user);
    }
    form.resetForm();
    this.user = {
      username: '',
      password: '',
      name: '',
      hakAkses: '',
      kdKlinik: '',
      kdCabang: '',
    };
  }
}
