import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ExerciseService } from 'src/app/service/exercise.service';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import { Exercise } from 'src/app/models/exercise';
import { ChildActivationStart } from '@angular/router';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
})
export class ExerciseComponent implements OnInit{

  constructor(public fb: FormBuilder) {}

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
    console.log(this.pageIndex)
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
    console.log(this.bodyParts)
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
      console.log(this.equipments)
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
    })
  }

  public getExerciseByEquipment(equipment:string){
    this.exerciseService.getExerciseByEquipment(equipment).subscribe(response =>{
      this.filteredExercises = Array.from(new Set([...this.filteredExercises, ...response]));
    })
  }

  public getExerciseByMuscle(muscle:string){
    this.exerciseService.getExerciseByMuscle(muscle).subscribe(response =>{
      this.filteredExercises = Array.from(new Set([...this.filteredExercises, ...response]));
    })
  }
  

  filterBodyParts(bodyPart:string) {
    // Logic to filter images based on selected checkboxes for Bodyparts
    
    if (this.checked[bodyPart] == true){
      this.getExerciseByBodyPart(bodyPart)
    }else{
      this.filteredExercises = this.filteredExercises.filter(element => !element.bodyPart.includes(bodyPart));
    }
  }

  filterEquipments(equipment:string) {
    // Logic to filter images based on selected checkboxes for Bodyparts
    
    if (this.checked[equipment] == true){
      this.getExerciseByEquipment(equipment)
    }else{
      
      this.filteredExercises = this.filteredExercises.filter(element => !element.equipment.includes(equipment));

    }

  }

  filterMuscles(muscle:string) {
    // Logic to filter images based on selected checkboxes for Bodyparts
    
    if (this.checked[muscle] == true){
      this.getExerciseByMuscle(muscle)
    }else{
      
      this.filteredExercises = this.filteredExercises.filter(element => !element.target.includes(muscle));


    }

  }



  

  
  


}