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
            <img :src="profile.avatar || 'default-avatar.png'" 
            alt="User avatar">
          </ion-avatar>

          <ion-list>
            <ion-item>
              <ion-label>Name:</ion-label>
              <ion-text>{{ profile.name }}</ion-text>
            </ion-item>
            <ion-item>
              <ion-label>Level:</ion-label>
              <ion-text>{{ profile.level }}</ion-text>
            </ion-item>
            <ion-item>
              <ion-label>Experience:</ion-label>
              <ion-progress-bar 
                :value="profile.experience / 100"></ion-progress-bar>
            </ion-item>
            <ion-item v-if="selectedAchievement">
              <ion-label>Grade:</ion-label>
              <ion-select v-model="selectedAchievementId" 
                placeholder="Select an achievement" 
                interface="action-sheet"
                slot="end">
                <ion-select-option v-for="achievement in store.achievements" 
                  :key="achievement.id"
                  :value="achievement.id">
                  {{ achievement.name }}
                </ion-select-option>
              </ion-select>
            </ion-item>

            <ion-card-header>
              <ion-card-title>Your stats</ion-card-title>
            </ion-card-header>
            <ion-item>
              <ion-label>Strength: {{ profile.stats.strength }}</ion-label>
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
import { ref, onMounted } from 'vue';
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
  IonAvatar,
  IonSelect,
  IonSelectOption,
} from '@ionic/vue';
import { useProfileStore } from '@/stores/ProfileData';

const store = useProfileStore();
const { profile, loadData} = store;

const selectedAchievement = ref(null);
const selectedAchievementId = ref(null);

onMounted(() => {
  loadData();
  if (store.achievements && store.achievements.length > 0) {
    selectedAchievement.value = store.achievements[0];
    selectedAchievementId.value = store.achievements[0].id;
  } else {
    selectedAchievement.value = { id: 0, name: 'Nothing yet', description: '' };
  }
  console.log('Profile mounted, experience:', profile.experience);
});

// performActions(() => {
//   //something to save
//   saveData();
// });

</script>

<style scoped>
ion-avatar {
  display: flex;
  justify-content: center;
}

ion-modal {
  --border-radius: 10px;
  --box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
}
</style>