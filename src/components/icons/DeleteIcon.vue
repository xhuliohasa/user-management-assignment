<template>
  <button class="btn-icon btn-delete" :title="title">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15 3.5H0V6C0.920475 6 1.66667 6.74619 1.66667 7.66667V10.1667C1.66667 12.8333 1.66667 14.1666 2.45483 15.0268C2.5138 15.0911 2.57555 15.1529 2.6399 15.2118C3.50003 16 4.83335 16 7.5 16C10.1666 16 11.5 16 12.3601 15.2118C12.4245 15.1529 12.4862 15.0911 12.5452 15.0268C13.3333 14.1666 13.3333 12.8333 13.3333 10.1667V7.66667C13.3333 6.74619 14.0795 6 15 6V3.5ZM6.41667 7.66667C6.41667 7.11438 5.96895 6.66667 5.41667 6.66667C4.86438 6.66667 4.41667 7.11438 4.41667 7.66667V11.8333C4.41667 12.3856 4.86438 12.8333 5.41667 12.8333C5.96895 12.8333 6.41667 12.3856 6.41667 11.8333V7.66667ZM10.5833 7.66667C10.5833 7.11438 10.1356 6.66667 9.58333 6.66667C9.03105 6.66667 8.58333 7.11438 8.58333 7.66667V11.8333C8.58333 12.3856 9.03105 12.8333 9.58333 12.8333C10.1356 12.8333 10.5833 12.3856 10.5833 11.8333V7.66667Z"
        fill="#CCD2E3"
      />
      <path
        d="M5.89008 1.30883C5.98504 1.22023 6.19428 1.14194 6.48536 1.0861C6.77643 1.03027 7.13307 1 7.49996 1C7.86685 1 8.22349 1.03027 8.51456 1.0861C8.80564 1.14194 9.01488 1.22023 9.10984 1.30883"
        stroke="#CCD2E3"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  </button>
</template>

<script>
export default {
  name: "DeleteIcon",
  props: {
    title: {
      type: String,
      default: "Delete",
    },
  },
};
</script>

<style scoped>
.btn-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

.btn-icon:hover {
  transform: translateY(-2px);
}

.btn-icon:active {
  transform: translateY(0);
}

.btn-delete {
  background-color: transparent;
  color: white;
}

.btn-delete:hover {
  background-color: #d32f2f;
}
</style>
