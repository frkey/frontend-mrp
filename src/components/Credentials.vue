<template>
  <div>
    <h1 class="text-center">User Data</h1>
    <section class="container" >
      <div class="row">
        <div class="col-sm-12">
          <div class="panel panel-info">
            <div class="panel-body">
              <form class="form-horizontal">
                <div class="row">
                  <div class="panel-info-header">
                    <div class="col-sm-12">
                      <div class="description-blockblock">
                        <h5 class="description-header">Old password</h5>
                        <input name="OldPassword" v-validate="{ rules: { required: true } }" class="form-control" type="password" v-model="response.oldPassword">
                        <span v-show="errors.has('OldPassword')">{{errors.first('OldPassword')}}</span>
                     </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="panel-info-header">
                    <div class="col-sm-12">
                      <div class="description-blockblock">
                        <h5 class="description-header">New password</h5>
                        <input name="NewPassword" v-validate="{ rules: { required: true } }" class="form-control" type="password" v-model="response.newPassword">
                        <span v-show="errors.has('NewPassword')">{{errors.first('NewPassword')}}</span>
                     </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="panel-info-header">
                    <div class="col-sm-12">
                      <div class="description-blockblock">
                        <h5 class="description-header">Confirm new password</h5>
                        <input name="ConfirmPassword" v-validate="{ rules: { required: true } }" class="form-control" type="password" v-model="response.confNewPassword">
                        <span v-show="errors.has('ConfirmPassword')">{{errors.first('ConfirmPassword')}}</span>
                     </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <br/>
                  <div class="col-sm-12">
                    <button type="button" v-on:click="savePassword(response)" class=" col-sm-2 btn btn-primary btn-md pull-right">Save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <br/>
    </section>
  </div>
</template>
<script>
import authService from '../services/authService'
import messageService from '../services/messageService'
import securityBackend from '../apis/securityBackend'

export default {
  name: 'Repository',
  data () {
    return {
      response: {}
    }
  },
  methods: {
    savePassword (user) {
      var _self = this
      user.username = authService.getUser().username
      securityBackend.changePassword(user, (response) => {
        messageService.successMessage(_self, 'Password has updated')
      }, (error) => {
        if (error.response.data) {
          messageService.errorMessage(_self, error.response.data.message)
        } else {
          messageService.errorMessage(_self, error.message)
        }
      })
    }
  }
}
</script>

<style>
.glyphicon { margin-right:5px; }
.thumbnail
{
    margin-bottom: 20px;
    padding: 0px;
    -webkit-border-radius: 0px;
    -moz-border-radius: 0px;
    border-radius: 0px;
}

.item.list-group-item
{
    float: none;
    width: 100%;
    background-color: #fff;
    margin-bottom: 10px;
}
.item.list-group-item:nth-of-type(odd):hover,.item.list-group-item:hover
{
    background: #428bca;
}

.item.list-group-item .list-group-image
{
    margin-right: 10px;
}
.item.list-group-item .thumbnail
{
    margin-bottom: 0px;
}
.item.list-group-item .caption
{
    padding: 9px 9px 0px 9px;
}
.item.list-group-item:nth-of-type(odd)
{
    background: #eeeeee;
}

.item.list-group-item:before, .item.list-group-item:after
{
    display: table;
    content: " ";
}

.item.list-group-item img
{
    float: left;
}
.item.list-group-item:after
{
    clear: both;
}
.list-group-item-text
{
    margin: 0 0 11px;
}

.user-details{
  background: blue;
}
.box-content {
  min-height: 45px;
}
.box-description{
  padding-top: 10%;
  text-align: center;
}
.pagination {
    margin-left: 40%;
}
.list-group-item{
    margin-top: 1%;
}
</style>
