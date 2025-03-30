<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Daily Quest</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

      <ion-list>
        <ion-item v-for="(exercise, index) in exercises" :key="index">
          <ion-label>{{ exercise.name }} - {{ exercise.target }}</ion-label>
          <ion-button slot="end" @click="toggleDetails(index)">Not finished</ion-button>
          <ion-item v-if="selectedExerciseIndex === index">
            <ion-input type="number" placeholder="Completed reps" v-model="exercise.completed"> </ion-input>
          </ion-item>
          <ion-checkbox slot="end" v-model="exercise.isCompleted"></ion-checkbox>

        </ion-item>
      </ion-list>

      <!--       
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header> -->

      <!-- <ExploreContainer name="Tab 1 page" /> -->
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
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
  IonInput,
  IonCheckbox,
} from '@ionic/vue';
// import ExploreContainer from '@/components/ExploreContainer.vue';

const exercises = ref([
  { name: 'Push-ups (Отжимания)', target: 100, completed: 0, isCompleted: false },
  { name: 'Squats (Приседания)', target: 100, completed: 0, isCompleted: false },
  { name: 'Plank (Планка)', target: '10 minutes', completed: 0, isCompleted: false },
  { name: 'Running (Бег)', target: '10 kilometers', completed: 0, isCompleted: false },
  { name: 'Pull-ups (Подтягивания)', target: 100, completed: 0, isCompleted: false },
]);

const selectedExerciseIndex = ref(null);

const toggleDetails = (index) => {
  selectedExerciseIndex.value = selectedExerciseIndex.value === index ? null : index;
};

</script>
