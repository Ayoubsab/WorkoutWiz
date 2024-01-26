import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutComponent } from './workout.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { AccountComponent } from 'src/app/components/account/account.component';
import { ExerciseComponent } from 'src/app/components/exercise/exercise.component';

const routes: Routes = [
  { path: '',
    component: HomeComponent 
  },

  {
    path: 'profile',
    component:AccountComponent

  },

  {
    path:"exercises",
    component:ExerciseComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkoutRoutingModule { }
