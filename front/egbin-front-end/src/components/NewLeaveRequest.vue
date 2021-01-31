<template>
  <div class="container">
    <Header />
    <div class="card">
      <div class="card-header">New Request</div>
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
                v-model="leave.StartDate"
                :min="today"
                type="date"
                class="form-control"
                placeholder="Start Date"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <input
                v-model="leave.EndDate"
                :min="today"
                type="date"
                class="form-control"
                placeholder="End Date"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            Select Leave Type
            <div class="form-group">
              <select class="form-control" v-model="leave.LeaveType">
                <option value="annualleave">Annual Leave</option>
                <option value="compassionateleave">Commpansionate Leave</option>
                <option value="examleave">Exam Leave</option>
                <option value="sickleave">Sick Leave</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <textarea
                style="resize: none"
                v-model="leave.RequestComment"
                rows="5"
                class="form-control"
                placeholder="Why do you need this leave"
              ></textarea>
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
          @click="requestLeave()"
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
import Header from "./StaffHeader";
import axios from "axios";
import swal from "sweetalert";
import moment from "moment";
export default {
  name: "NewLeaveRequest",
  components: {
    Header,
  },
  data() {
    return {
      user: JSON.parse(sessionStorage.getItem("staffInfo")),
      leave: {},
      linemanagers: [],
      disableButton: false,
      today: moment().format("YYYY-MM-DD"),
      msg: "",
    };
  },
  methods: {
    async requestLeave() {
      if (this.validate()) {
        this.disableButton = true;
        try {
          this.leave.RequestedBy = this.user.ID;
          console.log(this.leave);
          const result = await axios.post(Endpoints.Leave, { ...this.leave });
          console.log(result);
          if (result.data.success) {
            this.$router.push("/home");
            swal("New Request Sent");
          } else {
            this.msg = result.data.message;
          }
        } catch (error) {
          swal("Error Saving Data");
          console.log(error);
        }
        this.disableButton = false;
      }
    },
    validate() {
      let kase = true;
      let msg = "";

      if (!this.leave.StartDate) {
        msg += "Select Start Date <br/>";
        kase &= false;
      }

      if (!this.leave.EndDate) {
        msg += "Select End Date <br/>";
        kase &= false;
      }

      if (!this.leave.LeaveType) {
        msg += "Select Leave Type <br/>";
        kase &= false;
      }

      if (!this.leave.RequestComment) {
        msg += "Enter reason for requesting leave <br/>";
        kase &= false;
      }

      this.msg = msg;
      return kase;
    },
  },
};
</script>
