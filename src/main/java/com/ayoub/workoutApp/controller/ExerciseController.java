package com.ayoub.workoutApp.controller;


import ch.qos.logback.core.encoder.EchoEncoder;
import com.ayoub.workoutApp.model.Exercise;
import com.ayoub.workoutApp.service.ExerciseService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("exercises")
@AllArgsConstructor
public class ExerciseController {

    private final ExerciseService exerciseService;



    @GetMapping("/")
    public List<Exercise> getRandomExercises(@RequestParam(defaultValue = "0") int page,
                                             @RequestParam(defaultValue = "10") int size){

        PageRequest pageRequest = PageRequest.of(page, size);
        return this.exerciseService.getRandomExercises(pageRequest);

    }

    @GetMapping("/bodyPartList")
    public List<String> getBodyPartList(){

        return this.exerciseService.getBodyPartList();

    }

    @GetMapping("/equipmentList")
    public List<String> getEquipmentList(){

        return this.exerciseService.getEquipmentList();

    }

    @GetMapping("/targetList")
    public List<String> targetList(){

        return this.exerciseService.getTargetList();

    }

    @GetMapping(path = "/bodyPart/{bodyPart}")
    public List<Exercise> getExercisesByBodyPart(@RequestParam(defaultValue = "0") int page,
                                               @RequestParam(defaultValue = "10") int size,
                                               @PathVariable String bodyPart){

        PageRequest pageRequest = PageRequest.of(page, size);
        return this.exerciseService.getExerciseByBodyPart(bodyPart, pageRequest);

    }

    @GetMapping(path = "/target/{target}")
    public List<Exercise> getExercisesByTarget(@RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "10") int size,
                                                 @PathVariable String target){

        PageRequest pageRequest = PageRequest.of(page, size);
        return this.exerciseService.getExerciseByTarget(target, pageRequest);

    }

    @GetMapping(path = "/equipment/{equipment}")
    public List<Exercise> getExercisesByEquipment(@RequestParam(defaultValue = "0") int page,
                                               @RequestParam(defaultValue = "10") int size,
                                               @PathVariable String equipment){

        PageRequest pageRequest = PageRequest.of(page, size);
        return this.exerciseService.getExerciseByEquipment(equipment, pageRequest);

    }

}
