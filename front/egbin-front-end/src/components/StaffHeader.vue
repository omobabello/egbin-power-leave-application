<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark text-light">
    <router-link class="navbar-brand" to="/home">Egbin Power</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/leaves"
            >Leave Form</router-link
          >
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            My Requests
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <router-link
              class="dropdown-item"
              to="approvedrequests"
              >Approved</router-link
            >
            <router-link
              class="dropdown-item"
              to="rejectedrequests"
              >Rejected</router-link
            >
          </div>
        </li>
        <li v-if="user.IsLineManager" class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Staff Requests
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <router-link
              class="dropdown-item"
              to="pendingstaffrequests"
              >Pending</router-link
            >
            <router-link
              class="dropdown-item"
              to="approvedstaffrequests"
              >Approved</router-link
            >
            <router-link
              class="dropdown-item"
              to="rejectedstaffrequests"
              >Rejected</router-link
            >
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="logout">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      user: JSON.parse(sessionStorage.getItem("staffInfo")),
    };
  },
  methods: {
    logout() {
      sessionStorage.removeItem("usertype");
      sessionStorage.removeItem("staffInfo");
      sessionStorage.removeItem("isLoggedIn");
      this.$router.push("/Login");
    },
  },
};
</script>