<template>
  <div class="container">
    <Header />
    <div class="card card-primary">
      <div class="card-header"></div>
      <div class="card-body">
        <table class="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Date Requested</th>
              <th scope="col">Request By</th>
              <th scope="col">Request Type</th>
              <th scope="col">Request Comment</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="leave in leaves" :key="leave.LeaveID">
              <td scope="row">{{ leave.DateRequested | formatDate }}</td>
              <td scope="row">{{ leave.Requester }}</td>
              <td>{{ leave.LeaveType | leaveType }}</td>
              <td>{{ leave.RequestComment }}</td>
              <td>{{ leave.StartDate | formatDate }}</td>
              <td>{{ leave.EndDate | formatDate }}</td>
              <td>
                <button
                  @click="approveLeave(leave)"
                  class="btn btn-sm btn-success"
                >
                  Approve
                </button>
                <button
                  @click="rejectLeave(leave.LeaveID)"
                  class="btn btn-sm btn-danger"
                >
                  Reject
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Header from "./StaffHeader";
import swal from "sweetalert";
import Endpoints from "../../static/Endpoints";
import moment from "moment";
export default {
  name: "PendingStaffRequest",
  components: {
    Header,
  },
  data() {
    return {
      leaves: [],
      user: JSON.parse(sessionStorage.getItem("staffInfo")),
    };
  },
  created() {
    if (!!sessionStorage.getItem("staffInfo")) {
      this.getLeaves();
    } else {
      this.$router.push("/Login");
    }
  },
  filters: {
    formatDate(date) {
      return moment(date).format("Do, MMMM YYYY");
    },
    leaveType(type) {
      return type.replace("leave", "").toUpperCase();
    },
  },
  methods: {
    async getLeaves() {
      try {
        const result = await axios.get(
          `${Endpoints.PendingLeave}/linemanager/${this.user.ID}`
        );
        this.leaves = result.data.leaves;
      } catch (error) {
        swal("Error Loading data");
        console.log(error);
      }
    },
    async rejectLeave(leave) {
      const here = this;
      swal({
        title: "Reject Products ?",
        content: {
          element: "textarea",
          attributes: {
            placeholder: "Reason for Rejection",
            class: "form-control",
            id: "txtRejectComment",
          },
        },
      }).then(async () => {
        const object = {
          LeaveID: leave,
          RejectionComment: document.getElementById("txtRejectComment").value,
          RejectedBy: this.user.ID,
        };
        const result = await axios.post(Endpoints.RejectLeave, { ...object });
        here.getLeaves();
        if (result.data.success) swal("Request Rejected");
      });
    },
    async approveLeave(leave) {
      const here = this;
      swal({
        title: "Approve Products ?",
        content: {
          element: "textarea",
          attributes: {
            placeholder: "Comment",
            class: "form-control",
            id: "txtApprovalComment",
          },
        },
      }).then(async () => {
        const object = {
          LeaveID: leave.LeaveID,
          LeaveType: leave.LeaveType,
          RequestedBy: leave.RequestedBy,
          ApprovalComment: document.getElementById("txtApprovalComment").value,
          ApprovedBy: this.user.ID,
        };
        const result = await axios.post(Endpoints.ApproveLeave, { ...object });
        here.getLeaves();
        if (result.data.success) swal("Request Approved");
      });
    },
  },
};
</script>