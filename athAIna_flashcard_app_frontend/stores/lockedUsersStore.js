import { defineStore } from "pinia";
import { ref } from "vue";

export const useLockedUsersStore = defineStore("lockedUsers", () => {
  const lockedUsers = ref([]);

  const setLockedUsers = (userId, lockoutEndTime) => {
    lockedUsers.value[userId] = lockoutEndTime;
    localStorage.setItem("lockedUsers", JSON.stringify(lockedUsers.value));
  };

  const removeLockedUser = (userId) => {
    delete lockedUsers.value[userId];
    localStorage.setItem("lockedUsers", JSON.stringify(lockedUsers.value));
  };

  const isUserLocked = (userId) => {
    const lockoutEndTime = lockedUsers.value[userId];
    if (lockoutEndTime) {
      const currentTime = Date.now();
      if (currentTime < lockoutEndTime) {
        return true;
      } else {
        removeLockedUser(userId);
      }
    }
    return false;
  };

  const loadLockedUsers = () => {
    const storedLockedUsers = JSON.parse(localStorage.getItem("lockedUsers"));
    if (storedLockedUsers) {
      lockedUsers.value = storedLockedUsers;
    }
  };

  loadLockedUsers();

  return {
    lockedUsers,
    setLockedUsers,
    removeLockedUser,
    isUserLocked,
  };
}, {
    persist: true
    });
