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
              First Name
              <input
                v-model="staff.FirstName"
                type="text"
                class="form-control"
                placeholder="First Name"
              />
            </div>
          </div>
          <div class="col-md-6">
            Last Name
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
          <div class="col-md-4">
            Sick Leave Balance
            <div class="form-group">
              <input
                v-model="staff.SickLeaveBalance"
                type="number"
                class="form-control"
                placeholder="Sick Leave Balance"
              />
            </div>
          </div>
          <div class="col-md-4">
            Exam Leave Balance
            <div class="form-group">
              <input
                v-model="staff.ExamLeaveBalance"
                type="number"
                class="form-control"
                placeholder="Exam Leave Balance"
              />
            </div>
          </div>
          <div class="col-md-4">
            Annual Leave Balance
            <div class="form-group">
              <input
                v-model="staff.AnnualLeaveBalance"
                type="number"
                class="form-control"
                placeholder="Annual Leave Balance"
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
            Line Manager
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
          @click="editStaff()"
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
  name: "EditStaff",
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
      if (!this.$route.query.staff) {
        this.$router.push("/admin/home");
      } else {
        this.getLineManagers();
        this.getStaff(this.$route.query.staff);
      }
    } else {
      this.$router.push("/Login");
    }
  },
  methods: {
    async getLineManagers() {
      const result = await axios.get(Endpoints.LineManagers);
      this.linemanagers = result.data.staffs;
    },
    async getStaff(id) {
      const result = await axios.get(`${Endpoints.Staffs}/${id}`);
      this.staff = result.data.staff;
    },
    async editStaff() {
      if (this.validate()) {
        this.staff.IsLineManager = !!this.staff.IsLineManager ? 1 : 0;
        delete this.staff.Passconf;
        delete this.staff.Manager;
        this.disableButton = true;
        try {
          const result = await axios.put(Endpoints.Staffs, { ...this.staff });
          console.log(result);
          if (result.data.success) {
            this.$router.push("/admin/home");
            swal("Staff Updated");
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

      this.msg = msg;
      return kase;
    },
  },
};
</script>
