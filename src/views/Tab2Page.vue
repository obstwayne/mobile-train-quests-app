<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Some Tab</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-card>
        <ion-card-content class="ion-padding">
          <ion-list>

            <ion-card-header>
              <ion-card-title>Days in exercise</ion-card-title>
            </ion-card-header>
            
            <ion-item v-for="achievement in achievements" :key="achievement.id">
              <ion-label>
                <h2>{{ achievement.name }}</h2>
                <p>{{ achievement.description }}</p>
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
      
    </ion-content>
  </ion-page>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonList, IonItem, IonLabel, IonCardHeader, IonCardTitle } from '@ionic/vue';
import { useProfileStore } from '@/stores/ProfileData';

const store = useProfileStore();

const { achievements,loadData, checkAchievements } = store;
// const achievements = computed(() => useProfileStore.achievements);


onMounted(() => {
  loadData();
  // checkAchievements();
})
</script>
