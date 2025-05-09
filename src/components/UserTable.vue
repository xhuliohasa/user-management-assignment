<template>
  <div class="user-table-container">
    <div v-if="loading" class="loading">Loading users...</div>

    <div v-else-if="users.length === 0" class="no-users">
      No users found. Create a new user to get started.
    </div>

    <div v-else class="table-responsive">
      <table class="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td data-label="Name">{{ user.name }}</td>
            <td data-label="Username">{{ user.username }}</td>
            <td data-label="Email">{{ user.email }}</td>
            <td data-label="Phone">{{ user.phone }}</td>
            <td data-label="Website">{{ user.website }}</td>
            <td data-label="Actions" class="actions">
              <EditIcon @click="$emit('edit-user', user)" />
              <DeleteIcon @click="$emit('delete-user', user.id)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import EditIcon from "./icons/EditIcon.vue";
import DeleteIcon from "./icons/DeleteIcon.vue";

export default {
  name: "UserTable",
  components: {
    EditIcon,
    DeleteIcon,
  },
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
};
</script>

<style scoped>
.user-table-container {
  margin-top: 20px;
}

.loading,
.no-users {
  text-align: center;
  padding: 20px;
  font-size: 1.2rem;
  color: #666;
}

.table-responsive {
  overflow-x: auto;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.user-table th,
.user-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eaeaea;
  color: #4e5964;
}

.user-table th {
  color: #4e5964;
  font-weight: 500;
}

.user-table tbody tr:hover {
  background-color: #f9f9f9;
}

.actions {
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .user-table {
    border: 0;
    box-shadow: none;
  }

  .user-table thead {
    display: none;
  }

  .user-table tr {
    margin-bottom: 10px;
    display: block;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .user-table td {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    text-align: right;
    border-bottom: 1px solid #eaeaea;
  }

  .user-table td:last-child {
    border-bottom: 0;
  }

  .user-table td::before {
    content: attr(data-label);
    font-weight: bold;
    text-align: left;
    color: #333;
  }

  .actions {
    justify-content: flex-end;
  }
}
</style>
