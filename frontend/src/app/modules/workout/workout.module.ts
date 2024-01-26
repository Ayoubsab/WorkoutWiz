import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccountComponent } from 'src/app/components/account/account.component';
import { ExerciseComponent } from 'src/app/components/exercise/exercise.component';
import { WorkoutRoutingModule } from './workout-routing.module';
import { WorkoutComponent } from './workout.component';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    WorkoutComponent,
    AccountComponent,
    ExerciseComponent
  ],
  imports: [

    CommonModule,
    WorkoutRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatPaginatorModule

    ]
})
export class WorkoutModule { }