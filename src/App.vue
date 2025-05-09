<template>
  <div class="app-container">
    <header>
      <h1>User Management</h1>
      <CreateNewUserButton @click="openCreateModal" />
    </header>

    <UserTable
      :users="users"
      @edit-user="openEditModal"
      @delete-user="deleteUser"
    />

    <UserModal
      v-if="showModal"
      :user="currentUser"
      :isEditMode="isEditMode"
      @close="closeModal"
      @save="saveUser"
    />
  </div>
</template>

<script>
import UserTable from "./components/UserTable.vue";
import UserModal from "./components/UserModal.vue";
import CreateNewUserButton from "./components/icons/CreateNewUserButton.vue";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./services/userService";

export default {
  name: "App",
  components: {
    UserTable,
    UserModal,
    CreateNewUserButton,
  },
  data() {
    return {
      users: [],
      showModal: false,
      currentUser: null,
      isEditMode: false,
    };
  },
  created() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        this.users = await fetchUsers();
      } catch {
        alert("Failed to load users. Please try again later.");
      }
    },

    openCreateModal() {
      this.currentUser = {
        name: "",
        username: "",
        email: "",
        phone: "",
        website: "",
        address: {
          street: "",
          suite: "",
          city: "",
          zipcode: "",
          geo: {
            lat: "",
            lng: "",
          },
        },
        company: {
          name: "",
          catchPhrase: "",
          bs: "",
        },
      };
      this.isEditMode = false;
      this.showModal = true;
    },

    openEditModal(user) {
      this.currentUser = user;
      this.isEditMode = true;
      this.showModal = true;
    },

    async saveUser(userData) {
      try {
        if (this.isEditMode) {
          await updateUser(userData);
          const index = this.users.findIndex((u) => u.id === userData.id);
          if (index !== -1) {
            this.users[index] = userData;
            this.users = [...this.users];
          }
        } else {
          const newUser = await createUser(userData);
          this.users.push(newUser);
        }
        this.closeModal();
      } catch (error) {
        console.error("Error saving user:", error);
        alert("Failed to save user. Please try again later.");
      }
    },

    async deleteUser(userId) {
      if (confirm("Are you sure you want to delete this user?")) {
        try {
          await deleteUser(userId);
          this.users = this.users.filter((user) => user.id !== userId);
        } catch (error) {
          console.error("Error deleting user:", error);
          alert("Failed to delete user. Please try again later.");
        }
      }
    },

    closeModal() {
      this.showModal = false;
      this.currentUser = null;
    },
  },
};
</script>

<style>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Arial", sans-serif;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eaeaea;
}

h1 {
  margin: 0;
  color: #333;
}

@media (max-width: 768px) {
  header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  h1 {
    font-size: 1.5rem;
  }
}
</style>
