<template>
  <div class="google-places-form">
    <div class="form-group">
      <label for="google-address">Address</label>
      <div class="autocomplete-container">
        <input
          id="google-address"
          ref="googleAddressInput"
          v-model="streetAddress"
          type="text"
          placeholder="Enter Address"
          @input="handleAddressInput"
        />
        <div
          v-if="showPredictions && predictions.length > 0"
          class="predictions-list"
        >
          <div
            v-for="(prediction, index) in predictions"
            :key="index"
            class="prediction-item"
            @click="handlePlaceSelect(prediction.place_id)"
          >
            {{ prediction.description }}
          </div>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label for="g-city">City</label>
      <input
        id="g-city"
        v-model="localAddress.city"
        type="text"
        placeholder="Enter City"
        readonly
      />
    </div>

    <div class="form-group">
      <label for="g-zipcode">Zip Code</label>
      <input
        id="g-zipcode"
        v-model="localAddress.zipcode"
        type="text"
        placeholder="Enter Zip Code"
        readonly
      />
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="latitude">Latitude</label>
        <input
          id="latitude"
          v-model="localAddress.geo.lat"
          type="text"
          placeholder="Latitude"
          readonly
        />
      </div>

      <div class="form-group">
        <label for="longitude">Longitude</label>
        <input
          id="longitude"
          v-model="localAddress.geo.lng"
          type="text"
          placeholder="Longitude"
          readonly
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  getPlacePredictions,
  getPlaceDetails,
} from "../services/googlePlacesService";

export default {
  name: "GooglePlacesForm",
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
      streetAddress: "",
      autocompleteTimeout: null,
      predictions: [],
      showPredictions: false,
    };
  },
  created() {
    this.localAddress = { ...this.value };
    this.streetAddress = this.localAddress.street || "";

    if (!this.localAddress.geo) {
      this.localAddress.geo = { lat: "", lng: "" };
    }
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  watch: {
    value: {
      handler(newValue) {
        this.localAddress = { ...newValue };
        this.streetAddress = this.localAddress.street || "";

        if (!this.localAddress.geo) {
          this.localAddress.geo = { lat: "", lng: "" };
        }
      },
      deep: true,
    },
  },
  methods: {
    handleAddressInput() {
      clearTimeout(this.autocompleteTimeout);

      if (this.streetAddress.length > 2) {
        this.autocompleteTimeout = setTimeout(async () => {
          try {
            this.predictions = await getPlacePredictions(this.streetAddress);
            this.showPredictions = true;
          } catch (error) {
            console.error("Error fetching predictions:", error);
            this.predictions = [];
          }
        }, 300);
      } else {
        this.predictions = [];
        this.showPredictions = false;
      }

      this.localAddress.street = this.streetAddress;
      this.updateValue();
    },

    async handlePlaceSelect(placeId) {
      try {
        const placeDetails = await getPlaceDetails(placeId);

        this.streetAddress = placeDetails.street || "";
        this.localAddress.street = placeDetails.street || "";
        this.localAddress.city = placeDetails.city || "";
        this.localAddress.zipcode = placeDetails.zipcode || "";

        if (placeDetails.lat && placeDetails.lng) {
          this.localAddress.geo.lat = placeDetails.lat;
          this.localAddress.geo.lng = placeDetails.lng;
        }

        this.showPredictions = false;
        this.predictions = [];

        this.$emit("place-selected", placeDetails);

        this.updateValue();
      } catch (error) {
        console.error("Error fetching place details:", error);
      }
    },

    handleClickOutside(event) {
      const autocompleteContainer = this.$el.querySelector(
        ".autocomplete-container"
      );
      if (
        autocompleteContainer &&
        !autocompleteContainer.contains(event.target)
      ) {
        this.showPredictions = false;
      }
    },

    updateValue() {
      this.$emit("input", { ...this.localAddress });
    },
  },
};
</script>

<style scoped>
.google-places-form {
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
  position: relative;
}

.form-row {
  display: flex;
  gap: 15px;
}

.form-row .form-group {
  flex: 1;
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

.autocomplete-container {
  position: relative;
}

.predictions-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-top: none;
  border-radius: 0 0 4px 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.prediction-item {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

.prediction-item:last-child {
  border-bottom: none;
}

.prediction-item:hover {
  background-color: #f5f5f5;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 10px;
  }

  .google-places-form {
    padding: 10px;
  }
}
</style>
