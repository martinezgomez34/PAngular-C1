import { Component, inject, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormStudentComponent } from '../form/form-student/form-student.component';
import { Student } from '../models/student';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog/dialog.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    FormStudentComponent,
    DialogComponent
  ]
})
export class DashboardComponent implements OnInit{
  constructor(private dialog: MatDialog) {}
  
  studentsArray: Student[] = [
    {
      id: 0,
      name:'Fernando',
      asignatures: ['Calculo']
    },
    {
      id: 1,
      name:'Yuca',
      asignatures: ['Ingles','POO','Calculo']
    },
    {
      id: 2,
      name:'Luis',
      asignatures: ['Calculo']
    },
    {
      id: 3,
      name:'Cato',
      asignatures: ['Algoritmos','POO','Calculo']
    },
    {
      id: 4,
      name:'Eduardo',
      asignatures: ['Web','POO','Calculo']
    }
  ]

  ngOnInit(): void{
    console.log(this.studentsArray)
  }


  showName(name: string){
    alert(name)
  }

  deletedStudent(id: number): void {
    const dialogRef = this.dialog.open(DialogComponent);
    var newListStudent: Student[] = this.studentsArray
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Elemento eliminado');
        this.studentsArray = newListStudent.filter(student => student.id != id);
      } else {
        console.log('Eliminación cancelada');
      }
    });
  }

  addStudent(student: Student) {
    this.studentsArray.push(student);
  }


  
  private breakpointObserver = inject(BreakpointObserver);

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );
}
