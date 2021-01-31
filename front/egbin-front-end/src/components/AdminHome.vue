<template>
  <div class="container">
    <Header />
    <div class="content">
      <div class="card card-primary">
        <div class="card-header">All Staffs</div>
        <div class="card-body">
          <router-link to="/admin/newstaff" class="btn btn-primary"
            >New Staff</router-link
          ><br /><br />
          <table class="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">Staff ID</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="staff in staffs" :key="staff.ID">
                <td scope="row">{{ staff.ID }}</td>
                <td>{{ staff.FirstName }}</td>
                <td>{{ staff.LastName }}</td>
                <td>
                  <button
                    @click="getStaff(staff.ID)"
                    class="btn btn-sm btn-primary"
                  >
                    <i class="fa fa-info"></i>
                  </button>
                  <router-link
                    :to="{
                      name: 'EditStaff',
                      query: { staff: staff.ID },
                    }"
                    class="btn btn-sm btn-info"
                  >
                    <i class="fa fa-edit"></i>
                  </router-link>
                  <button
                    @click="deleteStaff(staff.ID)"
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
  </div>
</template>
<script>
import Endpoints from "../../static/Endpoints";
import axios from "axios";
import swal from "sweetalert";
import Header from "./AdminHeader";
export default {
  name: "AdminHome",
  components: {
    Header,
  },
  data() {
    return {
      staffs: [],
    };
  },
  created() {
    if (
      !!sessionStorage.getItem("usertype") &&
      sessionStorage.getItem("usertype") == "admin"
    ) {
      this.getStaffs();
    } else {
      this.$router.push("/Login");
    }
  },
  methods: {
    async getStaffs() {
      try {
        const result = await axios.get(Endpoints.Staffs);
        if (result.data.success) {
          this.staffs = result.data.staffs;
        } else {
          swal("Could not load data");
        }
        console.log(result);
      } catch (error) {
        swal("Error in Connection");
        console.log(error);
      }
    },
    async getStaff(id) {
      const result = await axios.get(`${Endpoints.Staffs}/${id}`);
      const html = document.createElement("p");
      console.log(result);
      html.innerHTML = `Name: ${result.data.staff.FirstName} ${
        result.data.staff.LastName
      } <hr/>
                  Is Manager: ${
                    result.data.staff.IsLineManager ? "Yes" : "No"
                  } <hr/>
                  Manager: ${result.data.staff.Manager} <hr/>
                  Exam Leave: ${result.data.staff.ExamLeaveBalance} <hr/>
                  Sick Leave: ${result.data.staff.SickLeaveBalance} <hr/>
                  Compassionate Leave: ${
                    result.data.staff.CompassionateLeaveBalance
                  } <hr/>
                  Annual Leave: ${result.data.staff.AnnualLeaveBalance}`;
      swal({
        title: "Staff Info",
        icon: "warning",
        content: html,
      });
    },
    async deleteStaff(id) {
      swal({
        title: "Delete Staff ?",
        closeOnClickOutside: false,
        icon: "warning",
        text: "Delete all data relating to this staff",
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
          await axios.delete(`${Endpoints.Staffs}/${id}`);
          this.getStaffs();
          swal("Staff Deleted");
        }
      });
    },
  },
};
</script>