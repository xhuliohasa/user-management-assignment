<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal">
      <div class="modal-header">
        <h2>{{ isEditMode ? "Edit User" : "Create New User" }}</h2>
        <button class="close-btn" @click="$emit('close')">&times;</button>
      </div>

      <div class="modal-body">
        <form @submit.prevent="handleSubmit">
          <div class="form-content">
            <div class="form-column">
              <div class="checkbox-group" />
              <div class="form-group">
                <label for="name">Name</label>
                <input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  required
                  placeholder="Enter full name"
                />
              </div>

              <div class="form-group">
                <label for="username">Username</label>
                <input
                  id="username"
                  v-model="formData.username"
                  type="text"
                  required
                  placeholder="Enter username"
                />
              </div>

              <div class="form-group">
                <label for="email">Email</label>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  required
                  placeholder="Enter email"
                  :class="{ invalid: errors.email }"
                />
                <span v-if="errors.email" class="error-message">{{
                  errors.email
                }}</span>
              </div>

              <div class="form-group">
                <label for="phone">Phone</label>
                <input
                  id="phone"
                  v-model="formData.phone"
                  type="tel"
                  required
                  placeholder="Enter phone number"
                  :class="{ invalid: errors.phone }"
                />
                <span v-if="errors.phone" class="error-message">{{
                  errors.phone
                }}</span>
              </div>

              <div class="form-group">
                <label for="website">Website</label>
                <input
                  id="website"
                  v-model="formData.website"
                  type="text"
                  required
                  placeholder="Enter website"
                  :class="{ invalid: errors.website }"
                />
                <span v-if="errors.website" class="error-message">{{
                  errors.website
                }}</span>
              </div>

              <div class="form-group">
                <label for="company-name">Company Name</label>
                <input
                  id="company-name"
                  v-model="formData.company.name"
                  type="text"
                  placeholder="Enter company name"
                />
              </div>
            </div>

            <div class="form-column">
              <div class="checkbox-group">
                <input
                  id="use-google-places"
                  v-model="useGooglePlaces"
                  type="checkbox"
                />
                <label for="use-google-places">Use Google Places</label>
              </div>

              <div v-if="useGooglePlaces">
                <GooglePlacesForm
                  :value="formData.address"
                  @place-selected="handlePlaceSelected"
                />
              </div>
              <div v-else>
                <AddressForm :value="formData.address" />
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn-save">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import AddressForm from "./AddressForm.vue";
import GooglePlacesForm from "./GooglePlacesForm.vue";
import {
  validateEmail,
  validatePhone,
  validateWebsite,
} from "../utils/validators";

export default {
  name: "UserModal",
  components: {
    AddressForm,
    GooglePlacesForm,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
    isEditMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formData: {
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
      },
      useGooglePlaces: false,
      errors: {
        email: "",
        phone: "",
        website: "",
      },
    };
  },
  created() {
    this.formData = this.user;
  },
  methods: {
    handlePlaceSelected(placeDetails) {
      const { address, city, zipcode, lat, lng } = placeDetails;

      this.formData.address.street = address || "";
      this.formData.address.city = city || "";
      this.formData.address.zipcode = zipcode || "";

      if (lat && lng) {
        this.formData.address.geo.lat = lat;
        this.formData.address.geo.lng = lng;
      }
    },

    validateForm() {
      let isValid = true;
      this.errors = {
        email: "",
        phone: "",
        website: "",
      };

      if (!validateEmail(this.formData.email)) {
        this.errors.email = "Please enter a valid email address";
        isValid = false;
      }

      if (!validatePhone(this.formData.phone)) {
        this.errors.phone = "Please enter a valid phone number";
        isValid = false;
      }

      if (!validateWebsite(this.formData.website)) {
        this.errors.website = "Please enter a valid website URL";
        isValid = false;
      }

      return isValid;
    },

    handleSubmit() {
      if (this.validateForm()) {
        this.$emit("save", this.formData);
      }
    },
  },
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 20px;
  border-bottom: 1px solid #e7eaf3;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.2rem;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.6rem;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #ccd2e3;
  background-color: #f4f7fb;
}

.close-btn:hover {
  color: #333;
}

.modal-body {
  padding: 20px;
}

.form-content {
  display: flex;
  flex-direction: row;
  flex: 1;
  gap: 20px;
}

.form-row {
  display: flex;
  margin-bottom: 15px;
  gap: 20px;
}

.form-group {
  flex: 1;
  margin-bottom: 15px;
}

.checkbox {
  width: 17px;
  height: 17px;
}

.checkbox-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  height: 20px;
  justify-content: flex-end;
}

.checkbox-group label {
  margin-bottom: 0;
  font-weight: normal;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #555;
  font-size: 0.9rem;
}

input[type="text"],
input[type="email"],
input[type="tel"] {
  width: 100%;
  padding: 15px 17px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

input.invalid {
  border-color: #f44336;
}

.error-message {
  color: #f44336;
  font-size: 0.85rem;
  margin-top: 5px;
  display: block;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.form-column {
  flex: 1;
}

.btn-save {
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  background-color: #4285f4;
  color: white;
}

.btn-save:hover {
  background-color: #3367d6;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }

  .modal {
    width: 95%;
    max-height: 95vh;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn-save {
    width: 100%;
  }
}
</style>
