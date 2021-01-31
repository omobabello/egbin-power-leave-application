<template>
  <div class="container">
    <Header />
    <div class="card card-primary">
      <div class="card-header"></div>
      <div class="card-body">
        <router-link to="/newleaverequest" class="btn btn-primary">New Request</router-link
        ><br /><br />
        <table class="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Date Requested</th>
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
              <td>{{ leave.LeaveType | leaveType }}</td>
              <td>{{ leave.RequestComment }}</td>
              <td>{{ leave.StartDate | formatDate }}</td>
              <td>{{ leave.EndDate | formatDate }}</td>
              <td>
                <router-link
                  :to="{
                    name: 'EditLeaveRequest',
                    query: { leave: leave.LeaveID },
                  }"
                  class="btn btn-sm btn-info"
                >
                  <i class="fa fa-edit"></i>
                </router-link>
                <button
                  @click="deleteLeave(leave.LeaveID)"
                  class="btn btn-sm btn-danger"
                >
                  <i class="fa fa-trash-o"></i>
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
  name: "StaffLeaves",
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
    console.log("user", this.user);
    this.getLeaves();
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
          `${Endpoints.PendingLeave}/staff/${this.user.ID}`
        );
        console.log(result);
        this.leaves = result.data.leaves;
      } catch (error) {
        swal("Error Loading data");
        console.log(error);
      }
    },
    async deleteLeave(leave) {
      swal({
        title: "Delete Request ?",
        closeOnClickOutside: false,
        icon: "warning",
        text: "Delete all data relating to this request",
        buttons: {
          cancel: {
            text: "Cancel",
            value: null,
            visible: true,
            closeModal: true,
            className: "btn btn-default",
          },
          confirm: {
            text: "Delete",
            value: "delete",
            visible: true,
            className: "btn btn-danger",
          },
        },
      }).then(async (btn) => {
        if (btn == "delete") {
          await axios.delete(`${Endpoints.Leave}/${leave}`);
          this.getLeaves();
          swal("Request Deleted");
        }
      });
    },
  },
};
</script>