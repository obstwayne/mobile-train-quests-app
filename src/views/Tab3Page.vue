<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>User Profile</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-card>
        
        <ion-card-content class="ion-padding">
          <ion-avatar class="ion-margin-bottom">
            <img src="" alt="User avatar">
          </ion-avatar>

          <ion-list>
            <ion-item>
              <ion-label>Name</ion-label>
              <ion-text>{{ profile.name }}</ion-text>
            </ion-item>
            <ion-item>
              <ion-label>Level</ion-label>
              <ion-text>{{ profile.level }}</ion-text>
            </ion-item>
            <ion-item>
              <ion-label>Experience</ion-label>
              <ion-progress-bar :value="profile.experience / 100"></ion-progress-bar>
            </ion-item>

            <ion-card-header>
          <ion-card-title>Your stats</ion-card-title>
        </ion-card-header>

            <!-- Extension Fields -->
            <ion-item>
              <ion-label>Strenght: {{ profile.stats.strength }}</ion-label>
            </ion-item>
            <ion-item>
              <ion-label>Endurance: {{ profile.stats.endurance }}</ion-label>
            </ion-item>
            <ion-item>
              <ion-label>Speed: {{ profile.stats.speed }}</ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { watch, onMounted } from 'vue';
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
  IonLabel,
  IonText,
  IonProgressBar,
  IonAvatar
} from '@ionic/vue';
import { useProfileStore } from '@/stores/ProfileData';

const store = useProfileStore();
const { profile, loadData } = store;

onMounted(() => {
  loadData();
  console.log('Tab3 mounted, experience:', profile.experience);
});

watch(() => profile.experience, (newValue) => {
  console.log('Experience changed in Tab3:', newValue);
});

</script>

<style scoped>
ion-avatar {
  display: flex;
  justify-content: center;
}
</style>