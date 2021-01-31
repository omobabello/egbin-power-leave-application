<template>
  <div class="container">
    <Header />
    <div class="card card-primary">
      <div class="card-header">
        {{ "REJECTED REQUESTS" }}
      </div>
      <div class="card-body">
        <table class="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Date Requested</th>
              <th scope="col">Requested By</th>
              <th scope="col">Request Comment</th>
              <th scope="col">Rejection Comment</th>
              <th scope="col">Date Rejected</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="leave in leaves" :key="leave.LeaveID">
              <td scope="row">{{ leave.DateRequested | formatDate }}</td>
              <td>{{ leave.Requester }}</td>
              <td>{{ leave.RequestComment }}</td>
              <td>{{ leave.RejectionComment }}</td>
              <td>{{ leave.DateRejected | formatDate }}</td>
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
  name: "AdminRejectedRequests",
  components: {
    Header,
  },
  data() {
    return {
      leaves: [],
    };
  },
  created() {
    if (
      !!sessionStorage.getItem("usertype") &&
      sessionStorage.getItem("usertype") == "admin"
    ) {
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
      const result = await axios.get(`${Endpoints.RejectedLeave}/admin`);
      console.log(result);
      this.leaves = result.data.leaves;
    },
  },
};
</script>