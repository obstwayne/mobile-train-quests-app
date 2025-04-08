import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

const baseUrl = 'https://localhost:5433/api';

export const useProfileStore = defineStore('profile', () => {
  //todo could add data types
  // interface User {
  //   id: number;
  //   name: string;
  // }
  // const users = ref<User[]>([]);

  const profile = ref([]);
  const exercises = ref([]);
  const achievements = ref([]);

  //states to check loading and errors
  const loading = ref(false);
  const error = ref(null);

  //todo: this is to get profile data and need same to exercise and achievements
  const fetchProfile = async () => {
    loading.value = true;
    try {
      const response = await axios.get(`${baseUrl}/profile`);
      profile.value = response.data;
    } catch (err: any) {
      error.value = err.message;
      console.error('Error to load profile data: ', err);
    } finally {
      loading.value = false;
    }
  }

  //todo: this is to save profile data and need same to exercise and achievements
  const saveProfile = async (profileData: any) => {
    loading.value = true;
    try {
      const response = await axios.post(`${baseUrl}/profile`, profileData);
      profile.value = response.data;
    } catch (err: any) {
      error.value = err.message;
      console.error('Error to save profile data: ', err);
    } finally {
      loading.value = false;
    }
  }


  const loadData = async () => {
    try {
      const response = await axios.get('api/profile');
      profile.value = response.data;
    } catch (error) { }
  }

  const saveData = async () => {

  }
  // const exercises = ref([
  //     { id: 1, name: 'Push-ups', target: 100, completed: 0, isCompleted: false, lastCompletedDate: '' },
  //     { id: 2, name: 'Squats', target: 100, completed: 0, isCompleted: false, lastCompletedDate: '' },
  //     { id: 3, name: 'Plank', target: '10 minutes', completed: 0, isCompleted: false, lastCompletedDate: '' },
  //     { id: 4, name: 'Running', target: '10 kilometers', completed: 0, isCompleted: false, lastCompletedDate: '' },
  //     { id: 5, name: 'Pull-ups', target: 100, completed: 0, isCompleted: false, lastCompletedDate: '' },
  // ]);

  // const profile = ref({
  //     name: 'Wayne',
  //     level: 0,
  //     experience: 0,
  //     stats: { strength: 1, endurance: 0, speed: 0 },
  // });

  // const achievements = ref([
  //   { id: 0, name: 'Weak man', description: '0', achieved: true, condition: () => profile.value.level >= 1 },
  //   { id: 1, name: 'First exercise', description: '1', achieved: false, condition: () => profile.value.level >= 1 },
  //   { id: 2, name: 'Firstly', description: '2', achieved: true, condition: () => profile.value.level >= 1 },
  //   { id: 3, name: 'Firstly', description: '3', achieved: false, condition: () => profile.value.level >= 1 },

  // ]);

  // const saveData = () => {
  //   localStorage.setItem('exercises', JSON.stringify(exercises.value));
  //   localStorage.setItem('profile', JSON.stringify(profile.value));
  //   localStorage.setItem('achievements', JSON.stringify(achievements.value));
  //   console.log('Saving data:', profile.value);
  // };

  //   const loadData = () => {
  //     try {
  //     const savedData = localStorage.getItem('profile');
  //     if (savedData) profile.value = JSON.parse(savedData);
  //     console.log('Loaded profile:', profile.value);

  //     const savedExercises = localStorage.getItem('exercises');
  //     if (savedExercises) exercises.value = JSON.parse(savedExercises);
  //     console.log('Loaded exercise:', exercises.value);

  //     const savedAchievements = localStorage.getItem('achievements');
  //     if (savedAchievements) achievements.value = JSON.parse(savedAchievements);
  //     console.log('Loaded Achievements:', achievements.value);

  //     } catch (error) {
  //       console.error('Error loading data from localStorage', error);

  //       profile.value = { name: 'Wayne1', level: 0, experience: 0, stats: { strength: 1, endurance: 0, speed: 0 } };
  //     }
  //   };

  //   const checkAchievements = () => {
  //     achievements.value.forEach(achievement => {
  //       if (!achievement.achieved && achievement.condition()) {
  //         achievement.achieved = true;
  //         console.log(`Achievement complete: ${achievement.name}`);
  //       }
  //     });
  //     saveData();
  //   }

  return { exercises, profile, achievements, saveData, loadData, fetchProfile, saveProfile };
});