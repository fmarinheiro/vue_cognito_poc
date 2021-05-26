<template>
  <div class="container">
    <div v-if="User">
      <p>Hi {{ User }}</p>
    </div>
    <div class="posts" v-if="ApiResponse">
        <p>{{ ApiResponse.body }}</p>
    </div>
    <div v-else>Could not make GET Request</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Posts",
  components: {},
  created: function() {
    // a function to call getposts action
    this.$store.dispatch('GetApiResponse')
  },
  computed: {
    ...mapGetters({ ApiResponse: "StateApiResponse", User: "StateUser" }),
  },
};

</script>
<style scoped>
* {
  box-sizing: border-box;
}
label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}
button[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  cursor: pointer;
  border-radius: 30px;
  margin: 10px;
}
button[type="submit"]:hover {
  background-color: #45a049;
}
input {
  width: 60%;
  margin: 15px;
  border: 0;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  padding: 10px;
  border-radius: 30px;
}
textarea {
  width: 75%;
  resize: vertical;
  padding: 15px;
  border-radius: 15px;
  border: 0;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  height: 150px;
  margin: 15px;
}
ul {
  list-style: none;
}
#post-div {
  border: 3px solid #000;
  width: 500px;
  margin: auto;
  margin-bottom: 5px;
}
</style>