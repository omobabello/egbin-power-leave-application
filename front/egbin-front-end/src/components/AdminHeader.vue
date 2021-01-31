<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark text-light">
    <router-link class="navbar-brand" to="/admin/home">Egbin Power</router-link>
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
          <router-link class="nav-link" to="/admin/staffs">Staffs</router-link>
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
           Requests
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <router-link class="dropdown-item" to="/admin/leaverequests">Pending</router-link>
            <router-link class="dropdown-item" to="/admin/leaverequests?type=approved">Approved</router-link> 
            <router-link class="dropdown-item" to="/admin/leaverequests?type=rejected">Rejected</router-link> 
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
  methods: {
    logout(){
      sessionStorage.removeItem('usertype'); 
      sessionStorage.removeItem('isLoggedIn'); 
      this.$router.push('/Login');
    }
  }
}
</script>