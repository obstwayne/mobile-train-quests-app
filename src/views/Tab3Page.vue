<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>User Profile</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
    <ion-card>
      <ion-card-header>
        <ion-card-title>Your stats</ion-card-title>
      </ion-card-header>
      <ion-card-content class="ion-padding">
        <ion-card-avatar class="ion-margin-bottom">
          <img src="" alt="User avatar">
        </ion-card-avatar>

        <ion-list>
          <ion-item>
            <ion-label>Name</ion-label>
            <ion-text>{{ name }}</ion-text>
          </ion-item>
          <ion-item>
            <ion-label>Level</ion-label>
            <ion-text>{{ level }}</ion-text>
          </ion-item>


          <!-- Extension Fields -->
          <ion-item>
            <ion-label>Strenght: {{ stats.strength }}</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Endurance: {{ stats.endurance }}</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Speed: {{ stats.speed }}</ion-label>
          </ion-item>
        </ion-list>
      </ion-card-content>
    </ion-card>
  </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/vue';
const name = ref('wayne');
const level = ref('0');

const stats = ref({
  strength: 0,
  endurance: 0,
  speed: 0
});

// Загрузка данных при монтировании
// onMounted(() => {
//   const savedStats = localStorage.getItem('fitnessStats');
//   if (savedStats) {
//     stats.value = JSON.parse(savedStats);
//   }
// });

// Сохранение данных при изменении
// const increaseStat = (stat) => {
//   stats.value[stat] += 1;
//   localStorage.setItem('fitnessStats', JSON.stringify(stats.value));
// };
</script>

<style scoped>
ion-avatar {
  display: flex;
  justify-content: center;
}
</style>