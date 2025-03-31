<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Daily Quest</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="openModal">Change Mode</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

      <ion-list :inset="true">
        <template v-for="(exercise, index) in exercises" :key="index">
          <ion-item>
            <ion-label>{{ exercise.name }} - {{ exercise.target }}</ion-label>
            <template v-if="canCompleteExercise(exercise)">
              <ion-button slot="end" @click="toggleDetails(index)">Not finished</ion-button>
              <ion-checkbox slot="end" v-model="exercise.isCompleted"
                @ionChange="completeExercise(index)"></ion-checkbox>
            </template>
            <template v-else>
              <ion-icon name="checkmark" slot="end"></ion-icon>
            </template>
          </ion-item>
          <ion-item v-if="selectedExerciseIndex === index && canCompleteExercise(exercise)">
            <ion-range aria-label="Custom range" :min="0" :max="99" :value="exercise.completed" :pin="true"
              @ionChange="updateCompleted(index, $event)"></ion-range>
            <ion-button @click="toggleDetails(index)">OK</ion-button>
          </ion-item>
        </template>
      </ion-list>
      <ion-modal :is-open="isModalOpen" @didDismiss="closeModal" :initial-breakpoint="0.5" :breakpoints="[0, 0.5, 1]">
        <ion-content class="ion-padding">
          <ion-list>
            <ion-radio-group v-model="selectedMode">
              <ion-item>
                <ion-label>Hand mode</ion-label>
                <ion-radio slot="start" value="mode1"></ion-radio>
              </ion-item>
              <ion-item>
                <ion-label>Watch mode</ion-label>
                <ion-radio slot="start" value="mode2"></ion-radio>
              </ion-item>
            </ion-radio-group>
          </ion-list>
          <ion-button expand="block" @click="applyMode">Done</ion-button>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonCheckbox,
  IonIcon, IonModal,
  IonRange,
  IonRadio,
  IonRadioGroup,
  IonButtons
} from '@ionic/vue';
import { useProfileStore } from '@/stores/ProfileData';

//use store
const store = useProfileStore();
const { exercises, profile, saveData } = store;

const selectedExerciseIndex = ref(null);
const isModalOpen = ref(false);
const selectedMode = ref('mode1');

// set completed reps
const toggleDetails = (index) => {
  selectedExerciseIndex.value = selectedExerciseIndex.value === index ? null : index;
};

const updateCompleted = (index: number, event: CustomEvent) => {
  exercises[index].completed = event.detail.value;
};

//  limit today complete
const canCompleteExercise = (exercise) => {
  const today = new Date().toISOString().split('T')[0];
  return !exercise.isCompleted || exercise.lastCompletedDate !== today;
};

// end exercises
const completeExercise = (index: number) => {
  const exercise = exercises[index];
  console.log(exercise);
  if (exercise && exercise.isCompleted) {
    // exercise.lastCompletedDate = new Date().toISOString().split('T')[0];
    profile.experience += 5; // Experience
    console.log('Experience updated:', profile.experience);
    toggleDetails(index);
    saveData();
    checkLevelUp(); // Is level up??
  } else {
    console.error('Exercise at index', index, 'is undefined or has no isCompleted property');
  }
};

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const applyMode = () => {
  console.log('Selected mode:', selectedMode.value);
  isModalOpen.value = false;
};

// is levelled up
const checkLevelUp = () => {
  if (profile.experience >= 100) {
    profile.level += 1;
    profile.experience -= 100;
    increaseStats();
  }
}

// increase stats
const increaseStats = () => {
  exercises.forEach((exercise) => {
    if (exercise.isCompleted) {
      if (exercise.name.includes('Push-ups') || exercise.name.includes('Pull-ups')) {
        profile.stats.strength += 1;
      } else if (exercise.name.includes('Plank') || exercise.name.includes('Squats')) {
        profile.stats.endurance += 1;
      } else if (exercise.name.includes('Running')) {
        profile.stats.speed += 1;
      }
    }
  });
};


onMounted(store.loadData);
</script>

<style scoped>
ion-modal {
  --height: 400px;
  --background: #ffffff;
  /* Явно задаем белый фон */
  --border-radius: 10px;
  /* Скругленные углы */
  --box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
  /* Тень для видимости */
}

ion-content {
  --background: #ffffff;
  /* Фон контента модального окна */
}

ion-list {
  margin: 0;
}

ion-item {
  --background: transparent;
}
</style>