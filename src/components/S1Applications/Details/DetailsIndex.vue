<template>
  <div class="q-pa-md q-mt-lg q-ml-lg">
    
    <div v-if="is_loading" class="text-center q-pa-lg">
        <div class="loading-page">
          <q-spinner-ios color="white" size="3rem" />
        </div>
    </div>
    
    <q-card bordered class="my-card" elevated>
      <q-card-section class="row">
        <div class="text-h6 page-title text-dark col-md-6"><q-icon name="list" />  S1 APPLICATION -  INDIVIDUAL</div>
        <div class="text-right col-md-6">
          <q-btn label="VIEW APPLICATION" elevated class="q-mr-sm position-right" size="md" icon="list" color="red-14" @click="backToList" />
        </div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <q-section class="row">
          <div class="col-md-6 col-lg-6 col-sm-12">
            <strong class="text-red-14 bold">Submission Date: September 28, 2022</strong>
          </div>
          <div class="col-md-6 col-lg-6 col-sm-12 text-right">
            <q-badge :color="paymentStatusColor(payment_status).bg" :class="`q-pa-sm text-${paymentStatusColor(payment_status).text}`"><strong>{{payment_status}}: {{intFormatter(amount)}}</strong></q-badge>
          </div>
        </q-section>
        <div class="row q-mt-md">
          <div class="col-md-4 col-lg-4 col-sm-12 q-px-sm">
            <q-input v-model="application_type" label="Application Type"  disable outlined />

          </div>
          <div class="col-md-4 col-lg-4 col-sm-12 q-px-sm">
            <q-select v-model="form_group" label="Submission Type" disable outlined>
            </q-select>
          </div>
        </div>
        <hr class="q-my-xl" />
        <q-list class="rounded-borders" v-if="!is_loading">
          <ClientInformation class="q-mb-sm" />
          <q-separator />
          <PresentorInformation class="q-mb-sm" />
          <q-separator />
          <MaterialInformation :appId="$route.params.id" class="q-mb-sm" />
        </q-list>
        <div v-else class="text-center">
            <q-spinner-hourglass
              color="primary"
              size="5rem"
            />
        </div>
      </q-card-section>

      <q-card-section>
        <q-card :square="true">
          <q-card-section>

            <q-tabs v-model="tab"
                    dense
                    indicator-color="blue"
                    class="text-grey-14">
              <q-tab name="internal_comments_tab" label="Internal Comments" />
              <q-tab name="external_comments_tab" label="External Comments" />
            </q-tabs>
            <hr class="q-tabs-gutter" color="lightgray" />
          </q-card-section>

          <q-card-section>
            

              <!-- INTERNAL COMMENTS -->
              <transition appear
                          v-if="tab == 'internal_comments_tab'"
                          enter-active-class="animated fadeInRight"
                          leave-active-class="animated fadeOut">
                <div>
                  <strong class="text-grey-14">INTERNAL</strong>
                  <RichText v-model="internal_comment_input" />
                </div>
              </transition>
              <!-- END INTERNAL COMMENTS -->

              <!-- EXTERNAL COMMENTS -->
              <transition appear
                          v-if="tab == 'external_comments_tab'"
                          enter-active-class="animated fadeInRight"
                          leave-active-class="animated fadeOut">
                <div>
                  <strong class="text-grey-14">EXTERNAL</strong>
                  <RichText v-model="external_comment_input" />
                </div>
              </transition>
              <div class="q-mt-md">
                <q-btn label="Save" size="sm" icon="comment_bank" :color="disable_comment_btn ? 'grey-14': 'red-14'" :disabled="disable_comment_btn" @click="saveComment" class="q-mr-sm" />
                <q-btn label="Cancel" size="sm" icon="cancel" :color="disable_comment_btn ? 'grey-14': 'red-14'" :disabled="disable_comment_btn" />
              </div>
              <!-- END EXTERNAL COMMENTS -->
          </q-card-section>
        </q-card>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="form-group q-mb-md">
              <q-select v-model="decision_status" 
              :options="decision_options" 
              outlined 
              size="sm" 
              label="DECISION" />
            </div>
            <div class="form-group">
              <q-select v-model="revwer_id" 
              :options="reviewer_options" 
              outlined 
              size="sm" 
              label="ASSIGN A REVIEWER"
              option-label="fullname"
              option-value="id" />
              <q-btn color="red-14" label="SCREENED" icon="fact_check" @click="decision(1004)" class="q-mr-sm q-mt-sm" :disable="!revwer_id || !decision_status" />
              
              <q-btn color="red-14" label="RETURN TO AD SPECIALIST" icon="assignment_return" @click="reassign(1006)" class="q-mr-sm q-mt-sm" />
            </div>
          </div>
        </div>
        
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
  import ClientInformation from "./Items/ClientInformation";
  import PresentorInformation from "./Items/PresentorInformation";
  import MaterialInformation from "./Items/MaterialInformation";
  import RichText from "components/AddOns/RichText"
  import { Notify } from "quasar";
  import { stat } from "fs";
  export default {
    components: {
      ClientInformation,
      PresentorInformation,
      MaterialInformation,
      RichText
    },

    computed: {
      disable_comment_btn() {
        if (this.tab === 'internal_comments_tab' && this.internal_comment_input !== '') {
          return false;
        }
        if (this.tab === 'external_comments_tab' && this.external_comment_input !== '') {
          return false;
        }

        return true;
      },
      comment_type(){
        if(this.tab == 'internal_comments_tab'){
          return 'internal_comment';
        } else {
          return 'external_comment';
        }
      },
      selectedId(){
        return this.$route.params.id;
      },
    },
    data: () => ({
      "is_loading": true,
      "internal_comment_input": "",
      "external_comment_input": "",
      "tab": "internal_comments_tab",
      "refresh_sec": 0,
      "id":42,
      "form_type":"s1",
      "form_group":"",
      "referrence_code":null,
      "application_type":"REGULAR",
      "slugified_app_type":"regular",
      "process_type":"ORIGINAL",
      "brand":"BRAND D",
      "product":"SAMPLE PRODUCT IN D",
      "category":"SAVOURY FOODS & SEASONINGS",
      "type_of_media":"MULTIMEDIA",
      "hasBirFormFiled":0,
      "isRejected":null,
      "payment_status":"UNPAID",
      "isPaidByApplicant":0,
      "amount":null,
      "ad_title":"ET EST QUIS MINUS Q",
      "tag_line":"INCIDUNT QUIA CULPA",
      "hasNoSubDocs":1,
      "origMainDocUrl":"https://uat-asc-bucket.s3.amazonaws.com/70d6feda7c00a839d4030e373f1d8bc5.pdf",
      "subDocUrl":"https://uat-asc-bucket.s3.amazonaws.com/70d6feda7c00a839d4030e373f1d8bc5.pdf",
      "complianceMainDocUrl":null,
      "complianceSubDocUrl":null,
      "decisionFormURL":null,
      "stampMaterialUrl":null,
      "hasSubmitted":1,
      "internal_comment":null,
      "external_comment":null,
      "applicant_status":"S1 APPLICATION SUBMITTED",
      "internal_status":"S1 APPLICATION SUBMITTED",
      "decision_status":null,
      "release_status":null,
      "isLocked":1,
      "forCompliance":0,
      "forS2":0,
      "application_date":"2022-11-14T13:22:10.115Z",
      "submission_date":"2022-11-14",
      "submission_time":"20:56:36",
      "decision_status_date":null,
      "release_date":null,
      "issued_date":null,
      "valid_until_date":null,
      "modified_at":"2022-11-16T18:25:13.000Z",
      "archived_at":null,
      "verifiedDateByEvaluator":null,
      "verifiedDateByAdSpe":null,
      "verifiedDateByScreener":null,
      "verifiedDateByReviewer":null,
      "revision_count":0,
      "adSpe": null,
      
      // CUSTOM VARIABLES ONLY
      "type_of_medium_parsed": [],
      "type_of_medium_new": [],
      "affiliate_id": null,

      decision_options: [],
      reviewer_options: [],
      affiliate_name: "",
      revwer_id: null,
    }),
    mounted(){
      this.initApp();
    },
    methods: {
      paymentStatusColor(status){
        switch (status){
          case "FOR PAYMENT": 
            return {
              bg: "yellow-5",
              text: "dark",
            };
            break;
          case "PAID": 
            return {
              bg: "green-5",
              text: "white",
            };
            break;
          case "UNPAID": 
            return {
              bg: "red-14",
              text: "white",
            };
            break;
        }
      },

      intFormatter(amount){
        const currencyFormatter = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "PHP",
        });
        amount = amount / 100;
        return currencyFormatter.format(amount);
      },
      initApp(){
        this.getSpecific();
        this.getAllUsers();
        this.decision_options = [
          {
            label: "APPROVED FOR PRODUCTION",
            value: "APPROVED FOR PRODUCTION",
          },
          {
            label: "APPROVED WITH CAUTION",
            value: "APPROVED WITH CAUTION",
          },
          {
            label: "INCOMPLETE",
            value: "INCOMPLETE",
          },
          {
            label: "DISAPPROVED",
            value: "DISAPPROVED",
          }
        ];
        
      },
      

      async getAllUsers(){
        let vm = this;
        vm.loading_list = true;
        let payload = {
          page: 1,
          size: 1000,
          order: "fname:asc",
          search: "",
          filter: "asc",
        };
        
        let {data, status} = await vm.$store.dispatch('admin_api/getAllUsers', payload);

        vm.reviewer_options = data.rows.filter((item)=> {
          return item.type == "revwer";
        })
      },

      backToList() {
        this.$router.push({ name: "individual-application-list" });
      },

      async getSpecific(){
        let vm = this;
        vm.is_loading = true;
        let payload = {
          id: vm.selectedId
        }

        let {data, status} = await vm.$store.dispatch('asc_user/getSpecific', payload);
        console.log(data);
        for(let column in data){
          vm[column] = data[column];
        }

        vm.applicant_fullname = `${vm.applicant.fname} ${vm.applicant.mname} ${vm.applicant.lname}` || "--";
        vm.company_name = `${vm.company.name}` || "--";
        vm.affiliate_name = data.company?.affiliate?.name || "--";
        vm.address = `${vm.company.address}` || "--";
        vm.phone = `${vm.applicant.phone}` || "--";
        vm.company_phone = `${vm.company.phone}` || "--";
        vm.company_email = `${vm.applicant.email}` || "--";
        vm.internal_comment_input = `${vm.internal_comment != null ? vm.internal_comment : ''}` || "";
        vm.external_comment_input = `${vm.external_comment != null ? vm.external_comment : ''}` || "";
        vm.type_of_medium_parsed = vm.type_of_medium.map((i) => {
          return i.type_of_medium
        })
        vm.type_of_medium_new = data.type_of_medium;
        vm.affiliate_id = data.company.affiliateID;
        vm.$nextTick(() => {
          vm.is_loading = false;
        });
      },
      
      async saveComment(){
        let vm = this;
        let payload = {
            id: vm.selectedId,
            data: {
              "internal_comment": vm.internal_comment_input,
            }
        }
        if(vm.comment_type === 'external_comment'){
          payload = {
            id: vm.selectedId,
            data: {
              "external_comment": vm.external_comment_input,
            }
          }
        }

        let {data, status} = await vm.$store.dispatch("asc_user/comment", payload);

        if([200, 201].includes(status)){
          Notify.create({
            message: data.message,
            position: 'top-right',
            closeBtn: "X",
            timeout: 2000,
            color: 'green',
          });
        } else {
          Notify.create({
            message: data.message,
            position: 'top-right',
            closeBtn: "X",
            timeout: 2000,
            color: 'red',
          });
        }
      },      

      async decision(){
        let vm = this;
        let payload = {
          id: this.$route.params.id,       
          data: {
            decision_status: vm.decision_status.value,
            reviewerId:  vm.revwer_id.id,
          }
        }

        let {data, status} = await vm.$store.dispatch("s1/passToReviewer", payload);

        if([200, 201].includes(status)){
          Notify.create({
            message: data.message,
            position: 'top-right',
            closeBtn: "X",
            timeout: 2000,
            color: 'green',
          });
          this.$router.push({name: 'individual-application-list'});
        } else {
          Notify.create({
            message: data.message,
            position: 'top-right',
            closeBtn: "X",
            timeout: 2000,
            color: 'red',
          });
        }
      },

      async reassign(user_role){
        let vm = this;
        let payload = {
          id: this.$route.params.id,       
          data: {
            assigned_userRole: user_role,
            assigned_user_id: this.adSpe.id,
          }
        }

        if(user_role == 1004){
          payload.data.assigned_user_id = vm.revwer_id.id;
        }

        let {data, status} = await vm.$store.dispatch("asc_user/reassign", payload);

        if([200, 201].includes(status)){
          Notify.create({
            message: data.message,
            position: 'top-right',
            closeBtn: "X",
            timeout: 2000,
            color: 'green',
          });
          this.$router.push({name: 'individual-application-list'});
        } else {
          Notify.create({
            message: data.message,
            position: 'top-right',
            closeBtn: "X",
            timeout: 2000,
            color: 'red',
          });
        }
      }
    }
  }
</script>
