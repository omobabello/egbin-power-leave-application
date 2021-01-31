<template>
  <div class="container">
    <Header />
    <div class="card card-primary">
      <div class="card-header">APPROVED REQUESTS</div>
      <div class="card-body">
        <table class="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Date Requested</th>
              <th scope="col">Request Comment</th>
              <th scope="col">Approval Comment</th>
              <th scope="col">Date Approved</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="leave in leaves" :key="leave.LeaveID">
              <td scope="row">{{ leave.DateRequested | formatDate }}</td>
              <td>{{ leave.RequestComment }}</td>
              <td>{{ leave.ApprovalComment }}</td>
              <td>{{ leave.DateApproved | formatDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import Endpoints from "../../static/Endpoints";
import Header from "./StaffHeader";
import axios from "axios";
import moment from "moment";
export default {
  name: "ApprovedRequests",
  components: {
    Header,
  },
  data() {
    return {
      user: JSON.parse(sessionStorage.getItem("staffInfo")),
      leaves: [],
    };
  },
  created() {
    if (!!sessionStorage.getItem("staffInfo")) {
      this.getLeaveRequests();
    } else {
      this.$router.push("/Login");
    }
  },
  filters: {
    formatDate(date) {
      return moment(date).format("Do, MMMM YYYY");
    },
  },
  methods: {
    async getLeaveRequests() {
      const result = await axios.get(
        `${Endpoints.ApprovedLeave}/staff/${this.user.ID}`
      );
      console.log(result);
      this.leaves = result.data.leaves;
    },
  },
};
</script>