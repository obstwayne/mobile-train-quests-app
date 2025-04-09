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
              <ion-button>
                <ion-icon :icon="checkmarkOutline" slot="icon-only"></ion-icon>
              </ion-button>
              <!-- for double exercise reps

              <ion-button @click="moreExercises">
              </ion-button>
                <ion-icon :icon="checkmarkDoneOutline" slot="end"></ion-icon>
            -->
            </template>
          </ion-item>
          <ion-item v-if="selectedExerciseIndex === index && canCompleteExercise(exercise)">
            <ion-range aria-label="Custom range" :min="0" :max="100" :value="exercise.completed" :pin="true"
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
import { checkmarkOutline } from 'ionicons/icons';
//TODO добавить импорт checkmarkDoneOutline from icons
//use store
const store = useProfileStore();
const { loadData } = store;

const { exercises, profile, saveData } = store;

const selectedExerciseIndex = ref();
const isModalOpen = ref(false);
const selectedMode = ref('mode1');

// set completed reps
const toggleDetails = (index: number) => {
  if (selectedExerciseIndex.value === index) {
    if (exercises[index].completed === 100) {
      console.log('resp completed with 100 and Ok clicked');
      exercises[index].isCompleted = true;
      completeExercise(index);
    }
    selectedExerciseIndex.value = null;
  } else {
    selectedExerciseIndex.value = index;
  }
  // selectedExerciseIndex.value = selectedExerciseIndex.value === index ? null : index;
};

const updateCompleted = (index: number, event: CustomEvent) => {
  exercises[index].completed = event.detail.value;
};

//  limit today complete
const canCompleteExercise = (exercise: any) => {
  const today = new Date().toISOString().split('T')[0];
  return !exercise.isCompleted || exercise.lastCompletedDate !== today;
};

// end exercises
const completeExercise = (index: number) => {
  console.log('want to complete exercise');
  const exercise = exercises[index];
  console.log(exercise);
  if (exercise && exercise.isCompleted) {
    exercise.lastCompletedDate = new Date().toISOString().split('T')[0];
    profile.experience += 75;
    console.log('Experience updated:', profile.experience);
    increaseStats(index);
    // toggleDetails(index);
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
  console.log('start to check if could lvl up');
  if (profile.experience >= 100) {
    console.log('should lvl up');
    profile.level += 1;
    profile.experience -= 100;
  } else {
    console.log('lvl checked and not complete');
  }
}

// increase stats
const increaseStats = (index: number) => {
  console.log('starting increase stats');
  const exercise = exercises[index];
  // exercises.forEach((exercise) => {
    if (exercise.isCompleted) {
      if (exercise.name.includes('Push-ups') || exercise.name.includes('Pull-ups')) {
        profile.stats.strength += 1;
      } else if (exercise.name.includes('Plank') || exercise.name.includes('Squats')) {
        profile.stats.endurance += 1;
      } else if (exercise.name.includes('Running')) {
        profile.stats.speed += 1;
      }
    } else {
      console.log('exercise is not completed');
    }
  // });
};

// const moreExercises = () => {

// };


onMounted(() => {
  loadData();
  console.log('Tab3 mounted, experience:', profile.experience);
});

</script>

<style scoped>
ion-modal {
  --height: 400px;
  /* --background: #ffffff; */
  /* Явно задаем белый фон */
  --border-radius: 10px;
  /* Скругленные углы */
  --box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
  /* Тень для видимости */
}

ion-content {
  /* --background: #ffffff; */
  /* Фон контента модального окна */
}

ion-list {
  margin: 0;
}

ion-item {
  --background: transparent;
}
</style>