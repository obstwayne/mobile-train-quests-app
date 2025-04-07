import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProfileStore = defineStore('profile', () => {
    const exercises = ref([
        { id: 1, name: 'Push-ups', target: 100, completed: 0, isCompleted: false, lastCompletedDate: '' },
        { id: 2, name: 'Squats', target: 100, completed: 0, isCompleted: false, lastCompletedDate: '' },
        { id: 3, name: 'Plank', target: '10 minutes', completed: 0, isCompleted: false, lastCompletedDate: '' },
        { id: 4, name: 'Running', target: '10 kilometers', completed: 0, isCompleted: false, lastCompletedDate: '' },
        { id: 5, name: 'Pull-ups', target: 100, completed: 0, isCompleted: false, lastCompletedDate: '' },
    ]);

    const profile = ref({
        name: 'Wayne',
        level: 0,
        experience: 0,
        stats: { strength: 1, endurance: 0, speed: 0 },
    });

    const achievements = ref([
      { id: 0, name: 'Weak man', description: '0', achieved: false, condition: () => profile.value.level >= 1 },
      { id: 1, name: 'First exercise complete', description: '1', achieved: false, condition: () => profile.value.level >= 1 },
      { id: 2, name: 'Firstly', description: '2', achieved: false, condition: () => profile.value.level >= 1 },
      { id: 3, name: 'Firstly', description: '3', achieved: false, condition: () => profile.value.level >= 1 },
    
    ]);

    const saveData = () => {
      localStorage.setItem('exercises', JSON.stringify(exercises.value));
      localStorage.setItem('profile', JSON.stringify(profile.value));
      localStorage.setItem('achievements', JSON.stringify(achievements.value));
      console.log('Saving data:', profile.value);
    };
    
      const loadData = () => {
        try {
        const savedData = localStorage.getItem('profile');
        if (savedData) profile.value = JSON.parse(savedData);
        console.log('Loaded profile:', profile.value);

        const savedExercises = localStorage.getItem('exercises');
        if (savedExercises) exercises.value = JSON.parse(savedExercises);
        console.log('Loaded exercise:', exercises.value);

        const savedAchievements = localStorage.getItem('achievements');
        if (savedAchievements) achievements.value = JSON.parse(savedAchievements);
        console.log('Loaded Achievements:', achievements.value);

        } catch (error) {
          console.error('Error loading data from localStorage', error);

          profile.value = { name: 'Wayne1', level: 0, experience: 0, stats: { strength: 1, endurance: 0, speed: 0 } };
        }
      };

      const checkAchievements = () => {
        achievements.value.forEach(achievement => {
          if (!achievement.achieved && achievement.condition()) {
            achievement.achieved = true;
            console.log(`Достижение разблокировано: ${achievement.name}`);
          }
        });
        saveData();
      }
    
      return { exercises, profile, achievements, saveData, loadData, checkAchievements };
});