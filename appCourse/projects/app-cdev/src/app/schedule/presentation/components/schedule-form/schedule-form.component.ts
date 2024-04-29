import { NgFor } from '@angular/common';
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

import { CourseApplication } from '../../../../course/application/course.application';
import { CourseEntity } from '../../../../course/application/dtos/course.entity';

@Component({
  selector: 'cdev-schedule-form',
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
    NgFor,
  ],
  templateUrl: './schedule-form.component.html',
  styleUrl: './schedule-form.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ScheduleFormComponent {
  title: string;
  fg: FormGroup;
  courses: CourseEntity[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: any,
    private readonly reference: MatDialogRef<ScheduleFormComponent>,
    private readonly application: CourseApplication
  ) {
    this.title = data ? 'EDIT' : 'CREATE';
    this.loadCourses();
    this.createform();
  }

  loadCourses() {
    this.application.getAll().subscribe((res) => {
      this.courses = res.result.response;
    });
  }

  createform() {
    this.fg = new FormGroup({
      scheduleId: new FormControl(this.data?.scheduleId || null),
      courseId: new FormControl(
        this.data?.courseId || null,
        Validators.required
      ),
      title: new FormControl(this.data?.title || null, Validators.required),
      status: new FormControl(this.data?.status || null, Validators.required),
    });
  }

  save() {
    const values = this.fg.value;

    this.reference.close(values);
  }
}
