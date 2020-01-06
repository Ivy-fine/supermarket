<template>
  <div></div>
</template>

<script>
import location from "@/utils/location.js";
export default {
  name: "geolocation",
  created() {
    this.getLocation();
  },
  methods: {
    getLocation() {
      this.$loading.show();
      location
        .geolocation()
        .then(res => {
          this.$store.commit("user/SET_LOCATION", {
            address: res.formattedAddress,
            position: { ...res.position }
          });
          this.$loading.hide();
          const path = this.$route.query.redirect || "/home";
          this.$router.push(path);
        })
        .catch(e => {
          this.$loading.hide();
          this.$router.replace("/address");
        });
    }
  }
};
</script>

<style>
</style>
