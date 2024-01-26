package com.ayoub.workoutApp.service;

import com.ayoub.workoutApp.model.Exercise;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface ExerciseService {

    Exercise getExerciseById(String id);
    List<Exercise> getExerciseByBodyPart(String bodyPart, PageRequest pageRequest);
    List<Exercise> getExerciseByTarget(String target, PageRequest pageRequest);

    List<Exercise> getExerciseByEquipment(String equipment, PageRequest pageRequest);
    List<Exercise> getRandomExercises(PageRequest pageRequest);

    List<String> getBodyPartList();
    List<String> getTargetList();
    List<String> getEquipmentList();

}
