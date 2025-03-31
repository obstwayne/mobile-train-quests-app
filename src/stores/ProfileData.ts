import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProfileStore = defineStore('profile', () => {
    const exercises = ref([
        { id: 1, name: 'Push-ups (Отжимания)', target: 100, completed: 0, isCompleted: false, lastCompletedDate: null },
        { id: 2, name: 'Squats (Приседания)', target: 100, completed: 0, isCompleted: false, lastCompletedDate: null },
        { id: 3, name: 'Plank (Планка)', target: '10 minutes', completed: 0, isCompleted: false, lastCompletedDate: null },
        { id: 4, name: 'Running (Бег)', target: '10 kilometers', completed: 0, isCompleted: false, lastCompletedDate: null },
        { id: 5, name: 'Pull-ups (Подтягивания)', target: 100, completed: 0, isCompleted: false, lastCompletedDate: null },
    ]);

    const profile = ref({
        name: 'Wayne',
        level: 0,
        experience: 0,
        stats: { strength: 1, endurance: 0, speed: 0 },
    });

    const saveData = () => {
      localStorage.setItem('exercises', JSON.stringify(exercises.value));
      localStorage.setItem('profile', JSON.stringify(profile.value));
      console.log('Saving data:', profile.value);
    };
    
      const loadData = () => {
        const savedData = localStorage.getItem('profile');
        if (savedData) {
          profile.value = JSON.parse(savedData);
        }
        console.log('Loaded data:', profile.value);
        // const savedExercises = localStorage.getItem('exercises');
        // if (savedExercises) exercises.value = JSON.parse(savedExercises);
        // const savedProfile = localStorage.getItem('profile');
        // if (savedProfile) profile.value = JSON.parse(savedProfile);
        // console.log('Loaded data:', profile.value);
      };
    
      return { exercises, profile, saveData, loadData };
});