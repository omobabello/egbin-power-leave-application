<template>
  <div class="container">
    <div class="card card-primary">
      <div class="card-header">
        <div class="card-title"><h3>Login</h3></div>
      </div>
      <div class="card-body">
        <div
          class="alert alert-danger"
          v-html="msg"
          v-if="msg.length > 0"
        ></div>
        <div class="form-group">
          <input
            type="email"
            class="form-control"
            v-model="staff.StaffId"
            placeholder="Enter Staff ID"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            v-model="staff.Password"
            placeholder="Password"
          />
        </div>
        <div class="form-group">
          <label for="stafflogin">Staff Login</label>
          <input
            type="radio"
            value="staff"
            v-model="staff.type"
            selected="selected"
          />

          <label for="stafflogin">Admin Login</label>
          <input type="radio" value="admin" v-model="staff.type" />
        </div>
      </div>
      <div class="card-footer">
        <button
          :disabled="disableButton"
          type="submit"
          @click="login"
          class="btn btn-primary"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Endpoints from "../../static/Endpoints";
export default {
  name: "Login",
  data() {
    return {
      staff: { type: "staff" },
      msg: "",
      disableButton: false,
    };
  },
  methods: {
    async login() {
      if (!this.staff.StaffId || !this.staff.Password) {
        this.msg = "Fill all fields";
      } else {
        if (this.staff.type == "admin") {
          if (
            this.staff.StaffId === "admin" &&
            this.staff.Password === "password"
          ) {
            sessionStorage.setItem("isLoggedIn", true);
            sessionStorage.setItem("usertype", "admin");
            this.$router.push('/admin/home');
          } else {
            this.msg = "Invalid credentials provided";
          }
        } else if (this.staff.type == "staff") {
          this.disableButton = true;
          try {
            const result = await axios.post(Endpoints.Login, { ...this.staff });
            if (result.data.success) {
              sessionStorage.setItem("usertype", "staff");
              sessionStorage.setItem(
                "staffInfo",
                JSON.stringify(result.data.staff)
              );
              sessionStorage.setItem("isLoggedIn", true);
              this.$router.push('/home');
            } else {
              this.msg = result.data.error;
            }
          } catch (error) {
            this.msg = "Error in connnection";
            console.log(error);
            console.log(error.response);
          }
          this.disableButton = false;
        }
      }
    },
  },
};
</script>