import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CourseFormComponent } from '../../../../course/presentation/components/course-form/course-form.component';

@Component({
  selector: 'cdev-user-form',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class UserFormComponent {
  title: string;
  fg: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: any,
    private readonly reference: MatDialogRef<CourseFormComponent>
  ) {
    this.title = data ? 'EDIT' : 'CREATE';
    this.createform();
  }

  createform() {
    this.fg = new FormGroup({
      userId: new FormControl(this.data?.userId || null),
      name: new FormControl(this.data?.name || null, Validators.required),
      lastname: new FormControl(
        this.data?.lastname || null,
        Validators.required
      ),
      email: new FormControl(this.data?.email || null, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(this.data?.password || null),
      roles: new FormControl(),
    });

    if (!this.data) {
      this.fg.get('status').disable();
    }
  }

  save() {
    const values = this.fg.value;

    this.reference.close(values);
  }
}
