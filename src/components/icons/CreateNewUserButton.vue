<template>
  <button class="btn-primary">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="13"
      viewBox="0 0 12 13"
      fill="none"
      style="margin-right: 5px"
    >
      <rect x="5" y="0.5" width="2" height="12" fill="white" />
      <rect
        x="12"
        y="5.5"
        width="2"
        height="12"
        transform="rotate(90 12 5.5)"
        fill="white"
      />
    </svg>
    Create New User
  </button>
</template>

<script>
export default {
  name: "CreateNewUserButton",
  props: {
    title: {
      type: String,
      default: "Edit",
    },
  },
};
</script>

<style scoped>
.btn-primary {
  background-color: #3c81fc;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-primary:hover {
  background-color: #0b3fba;
}
</style>
