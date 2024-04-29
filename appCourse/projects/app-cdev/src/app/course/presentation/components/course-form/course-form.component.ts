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

@Component({
  selector: 'cdev-course-form',
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
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class CourseFormComponent {
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
      courseId: new FormControl(this.data?.courseId || null),
      title: new FormControl(this.data?.title || null, Validators.required),
      status: new FormControl(this.data?.status || null),
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
