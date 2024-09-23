import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Student } from '../../models/student';
@Component({
  selector: 'app-form-student',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-student.component.html',
  styleUrl: './form-student.component.scss'
})
export class FormStudentComponent {
  studentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      asignatures: [[], Validators.required]
    });
  }

  guardar(dashboard: any) { 
    if (this.studentForm.valid) {
      const newStudent: Student = this.studentForm.value;
      dashboard.addStudent(newStudent); 
      this.studentForm.reset(); 
    }
  }
}
