import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ExerciseService } from 'src/app/service/exercise.service';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import { Exercise } from 'src/app/models/exercise';
import { MatDialog } from '@angular/material/dialog';
import { ExerciseDetailComponent } from './exercise-detail/exercise-detail.component';


@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
})
export class ExerciseComponent implements OnInit{

  constructor(public fb: FormBuilder, public dialog: MatDialog) {}

  exerciseService:ExerciseService = inject(ExerciseService)


  bodyParts:string[] = [];
  muscles:string[] = [];
  equipments:string[] = []
  exercises:Exercise[] = []
  selectedBodyPart = '';
  selectedMuscle = '';
  isSubmitted = false;
  filteredExercises:Exercise[] =[]
  checked:{[part:string]: boolean}= {}
  equipmentFilter:string[] = []
  muscleFilter:string[] = []
  bodyPartsFilter:string[] = []



  length = 100;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  listIndices:number[] = [0,1,2,3,4,5,6,7,8,9]

  pageEvent: PageEvent = new PageEvent();

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    if (this.pageSize != e.pageSize){
      this.pageSize = e.pageSize;
      this.listIndices = [...Array(this.pageSize).keys()]
    }
    
    this.pageIndex = e.pageIndex;
    
  }


  

  filterForm = this.fb.group({
    equipments: [''],
    bodyParts: [''],
    muscles: ['']
  });

  ngOnInit(): void {
    this.getExercises()
    this.getBodyParts()
    this.getEquipmentList()
    this.getMusclesList()
  }


  public getExercises(){
    this.exerciseService.getExercises().subscribe(response=> {
      this.exercises = response
    })
  }
  
  public getBodyParts(){
    this.exerciseService.getBodyPartsList().subscribe(response => {
      this.bodyParts = response

    })

    this.bodyParts.forEach(element => {
      this.checked[element] = false
    });

    
  }

  public getEquipmentList(){
    this.exerciseService.getEquipmentList().subscribe(response => {
      this.equipments = response
    })

    this.equipments.forEach(element => {
      this.checked[element] = false
    });

    
  }

  public getMusclesList(){
    this.exerciseService.getTargetMusclesList().subscribe(response => {
      this.muscles = response
      console.log(this.muscles)
    })

    this.muscles.forEach(element => {
      this.checked[element] = false
    });

  }

  public getExerciseByBodyPart(bodyPart:string){
    this.exerciseService.getExerciseByBodyPart(bodyPart).subscribe(response =>{
      this.filteredExercises = Array.from(new Set([...this.filteredExercises, ...response]));
      this.filterExercises()
    })
  }

  public getExerciseByEquipment(equipment:string){
    this.exerciseService.getExerciseByEquipment(equipment).subscribe(response =>{
      this.filteredExercises = Array.from(new Set([...this.filteredExercises, ...response]));
      this.filterExercises()
    })
  }

  public getExerciseByMuscle(muscle:string){
    this.exerciseService.getExerciseByMuscle(muscle).subscribe(response =>{
      this.filteredExercises = Array.from(new Set([...this.filteredExercises, ...response]));
      this.filterExercises()
    })

    
  }
  
  // Because we only call an api to get the list of exercices, and we can't store it in a database,
  // We have to filter manually. We cannot use SQL request.


  filterBodyParts(bodyPart:string) {
    // Logic to filter images based on selected checkboxes for Bodyparts
    
    if (this.checked[bodyPart]){
      this.bodyPartsFilter.push(bodyPart)
      this.getExerciseByBodyPart(bodyPart)
      
    }else{
      this.bodyPartsFilter = this.bodyPartsFilter.filter(bp => bp != bodyPart)
      this.filterExercises()
    }


  }

  filterEquipments(equipment:string) {
    // Logic to filter images based on selected checkboxes for Bodyparts
    
    if (this.checked[equipment]){
      this.equipmentFilter.push(equipment)
      this.getExerciseByEquipment(equipment)
      
    }else{
      this.equipmentFilter = this.equipmentFilter.filter(eq => eq != equipment)
      this.filterExercises()
    }


  }

  filterMuscles(muscle:string) {
    // Logic to filter images based on selected checkboxes for Bodyparts
    
    if (this.checked[muscle]){
      this.muscleFilter.push(muscle)
      this.getExerciseByMuscle(muscle) 
  
    }else{
      this.muscleFilter = this.muscleFilter.filter(m => m != muscle);
      this.filterExercises()
    }

    

  }
  public filterExercises() {

    this.filteredExercises =  this.filteredExercises.filter(exercise => {

        // Check if the exercise matches at least one equipment, body part, and targeted muscle
        const matchesEquipment = this.equipmentFilter.length === 0 || this.equipmentFilter.includes(exercise.equipment);
        const matchesBodyPart = this.bodyPartsFilter.length === 0 || this.bodyPartsFilter.includes(exercise.bodyPart);
        const matchesTargetedMuscles = this.muscleFilter.length === 0 || this.muscleFilter.includes(exercise.target);

        // Return true if the exercise matches at least one of each criteria
        return matchesEquipment && matchesBodyPart && matchesTargetedMuscles;
    });

  }


  


  openDialog(ex:Exercise) {
    console.log("CLICKED")
    this.dialog.open(ExerciseDetailComponent, {
      data: ex
    });
  }


  

  
  


}
