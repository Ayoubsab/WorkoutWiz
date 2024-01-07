import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ExerciseService } from 'src/app/service/exercise.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit{

  constructor(public fb: FormBuilder) {}

  exerciseService:ExerciseService = inject(ExerciseService)


  bodyParts:string[] = [];
  muscles:string[] = [];
  equipments:string[] = []
  selectedBodyPart = '';
  selectedMuscle = '';
  isSubmitted = false;


  

  filterForm = this.fb.group({
    equipments: [''],
    bodyParts: [''],
    muscles: ['']
  });

  ngOnInit(): void {
    this.getBodyParts()
    this.getEquipmentList()
    this.getMusclesList()
  }

  
  public getBodyParts(){
    this.exerciseService.getBodyPartsList().subscribe(response => {
      this.bodyParts = response
      console.log(this.bodyParts)
    })

    
  }

  public getEquipmentList(){
    this.exerciseService.getEquipmentList().subscribe(response => {
      this.equipments = response
      console.log(this.equipments)
    })

    
  }

  public getMusclesList(){
    this.exerciseService.getTargetMusclesList().subscribe(response => {
      this.muscles = response
      console.log(this.muscles)
    })

    
  }


  applyFilters() {
      console.log('Applying filters for body part:', this.selectedBodyPart, 'and muscle:', this.selectedMuscle);
  }

  

  onSubmit(): void {
    console.log(this.filterForm);
    this.isSubmitted = true;
    if (!this.filterForm.valid) {
      false;
    } else {
      console.log(JSON.stringify(this.filterForm.value));
    }
  }


}
