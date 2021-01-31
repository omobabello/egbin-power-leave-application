<template>
  <div class="container">
    <Header />
    <div class="card card-primary">
      <div class="card-header">
        {{ "PENDING REQUESTS" }}
      </div>
      <div class="card-body">
        <table class="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Date Requested</th>
              <th scope="col">Requested By</th>
              <th scope="col">Request Comment</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="leave in leaves" :key="leave.LeaveID">
              <td scope="row">{{ leave.DateRequested | formatDate }}</td>
              <td>{{ leave.Requester }}</td>
              <td>{{ leave.RequestComment }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import Endpoints from "../../static/Endpoints";
import Header from "./AdminHeader";
import axios from "axios";
import moment from "moment";
export default {
  name: "AdminPendingRequests",
  components: {
    Header,
  },
  data() {
    return {
      type: this.$route.query.type,
      leaves: [],
    };
  },
  created() {
      if (
      !!sessionStorage.getItem("usertype") &&
      sessionStorage.getItem("usertype") == "admin"
    ) {
      this.getLeaveRequests(this.$route.query.type);
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
    async getLeaveRequests(type = "pending") {
      let url = "";
      switch (type) {
        case "approved":
          url = `${Endpoints.ApprovedLeave}/admin`;
          break;
        case "rejected":
          url = `${Endpoints.RejectedLeave}/admin`;
          break;
        default:
          url = `${Endpoints.PendingLeave}/admin`;
          break;
      }
      const result = await axios.get(url);
      console.log(result);
      this.leaves = result.data.leaves;
    },
  },
};
</script>