import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Exercise } from '../models/exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  http = inject(HttpClient);
  API_URL = environment.API_BASE_URL

  constructor() {}

  public getExercises(){
    return this.http.get<Exercise[]>(`${this.API_URL}/exercises/`)
  }

  public getBodyPartsList(){
    return this.http.get<string[]>(`${this.API_URL}/exercises/bodyPartList`)
  }

  public getEquipmentList(){
    return this.http.get<string[]>(`${this.API_URL}/exercises/equipmentList`)
  }

  public getTargetMusclesList(){
    return this.http.get<string[]>(`${this.API_URL}/exercises/targetList`)
  }

  public getExerciseByBodyPart(bodyPart:string){
    return this.http.get<Exercise[]>(`${this.API_URL}/exercises/bodyPart/${bodyPart}`)
  }
}
