<template>
  <div class="container">
    <Header />
    <div class="card">
      <div class="card-header">New Staff</div>
      <div class="card-body">
        <div
          class="alert alert-danger"
          v-if="msg.length > 0"
          v-html="msg"
        ></div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <input
                v-model="staff.FirstName"
                type="text"
                class="form-control"
                placeholder="First Name"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <input
                v-model="staff.LastName"
                type="text"
                class="form-control"
                placeholder="Last Name"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <input
                v-model="staff.Password"
                type="password"
                class="form-control"
                placeholder="Password"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <input
                v-model="staff.Passconf"
                type="password"
                class="form-control"
                placeholder="Confirm Password"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <div class="form-group form-check-inline">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="staff.IsLineManager"
                value="true"
              />
              <label class="form-check-label">Is a manager</label>
            </div>
          </div>
          <div class="col-md-9" v-if="linemanagers.length > 0">
            Select Line Manager
            <div class="form-group">
              <select class="form-control" v-model="staff.LineManager">
                <option
                  v-for="man in linemanagers"
                  :key="man.ID"
                  :value="man.ID"
                >
                  {{ man.FirstName }} {{ man.LastName }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <router-link to="/admin/home" class="btn btn-secondary"
          >Cancel <i class="fa fa-times"></i
        ></router-link>
        <button
          :disabled="disableButton"
          @click="createStaff()"
          class="btn btn-primary"
        >
          Save <i class="fa fa-save"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import Endpoints from "../../static/Endpoints";
import Header from "./AdminHeader";
import axios from "axios";
import swal from "sweetalert";
export default {
  name: "NewStaff",
  components: {
    Header,
  },
  data() {
    return {
      staff: {},
      linemanagers: [],
      disableButton: false,
      msg: "",
    };
  },
  created() {
    if (
      !!sessionStorage.getItem("usertype") &&
      sessionStorage.getItem("usertype") == "admin"
    ) {
      this.getLineManagers();
    } else {
      this.$router.push("/Login");
    }
  },
  methods: {
    async getLineManagers() {
      const result = await axios.get(Endpoints.LineManagers);
      this.linemanagers = result.data.staffs;
    },
    async createStaff() {
      if (this.validate()) {
        this.staff.IsLineManager = !!this.staff.IsLineManager ? 1 : 0;
        delete this.staff.Passconf;
        this.disableButton = true;
        try {
          const result = await axios.post(Endpoints.Staffs, { ...this.staff });
          console.log(result);
          if (result.data.success) {
            this.$router.push("/admin/home");
            swal("New Staff Added");
          }
        } catch (error) {
          swal("Error Saving Data");
          console.log(error);
        }
        this.disableButton = false;
        console.log(this.staff);
      }
    },
    validate() {
      let kase = true;
      let msg = "";

      if (
        !this.staff.FirstName ||
        !/^[a-zA-Z]+(?:-[a-zA-Z]+)*$/.test(this.staff.FirstName)
      ) {
        msg += "Enter a valid First Name <br>";
        kase &= false;
      }

      if (
        !this.staff.LastName ||
        !/^[a-zA-Z]+(?:-[a-zA-Z]+)*$/.test(this.staff.LastName)
      ) {
        msg += "Enter a valid Last Name <br/>";
        kase &= false;
      }

      if (!this.staff.Password || this.staff.Password.length < 5) {
        msg += "Enter Password with minimum length of 5 <br>";
        kase &= false;
      }

      if (this.staff.Password !== this.staff.Passconf) {
        msg += "Passwords do not match";
        kase &= false;
      }

      this.msg = msg;
      return kase;
    },
  },
};
</script>
