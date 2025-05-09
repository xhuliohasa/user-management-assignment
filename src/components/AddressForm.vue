<template>
  <div class="address-form">
    <div class="form-group">
      <label for="street">Address</label>
      <input
        id="street"
        v-model="localAddress.street"
        type="text"
        placeholder="Enter Address"
        @input="updateValue"
      />
    </div>

    <div class="form-group">
      <label for="city">City</label>
      <input
        id="city"
        v-model="localAddress.city"
        type="text"
        placeholder="Enter City"
        @input="updateValue"
      />
    </div>

    <div class="form-group">
      <label for="zipcode">Zip Code</label>
      <input
        id="zipcode"
        v-model="localAddress.zipcode"
        type="text"
        placeholder="Enter Zip Code"
        @input="updateValue"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "AddressForm",
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localAddress: {
        street: "",
        city: "",
        zipcode: "",
        geo: {
          lat: "",
          lng: "",
        },
      },
    };
  },
  created() {
    this.localAddress = { ...this.value };

    if (!this.localAddress.geo) {
      this.localAddress.geo = { lat: "", lng: "" };
    }
  },
  watch: {
    value: {
      handler(newValue) {
        this.localAddress = { ...newValue };

        if (!this.localAddress.geo) {
          this.localAddress.geo = { lat: "", lng: "" };
        }
      },
      deep: true,
    },
  },
  methods: {
    updateValue() {
      this.$emit("input", { ...this.localAddress });
    },
  },
};
</script>

<style scoped>
.address-form {
  flex: 1;
}

h3 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1.2rem;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #555;
  font-size: 0.9rem;
}

input[type="text"] {
  width: 100%;
  padding: 15px 17px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .address-form {
    padding: 10px;
  }
}
</style>
