<template>
  <q-expansion-item header-class="text-dark bg-blue-2 shadow-3"
                    bordered>
    <template v-slot:header>
      <q-item-section avatar>
        <q-avatar icon="label_important" color="blue-2" text-color="dark" />
      </q-item-section>

      <q-item-section style="font-size: 18px; flex-wrap: unset;">
        <div class="row q-pa-none">
          <div class="col-md-4">
            <strong>Presentor Information</strong>
          </div>
          <div class="col-md-4 text-grey-14">
            Personal Details
          </div>
        </div>
      </q-item-section>
      <q-item-section side>
        <div class="row items-center">
          <q-icon name="person" color="dark" size="24px" />
        </div>
      </q-item-section>
    </template>


    <q-card class="text-dark border-dark q-mb-md" bordered>
      <q-card-section>
        <q-form>
          <div class="row">
            <div class="col-sm-12 q-pa-sm">
              <q-select outlined label="Name of Applicant" v-model="company_name"></q-select>
            </div>
            <div class="col-sm-12 q-pa-sm">
              <q-select outlined label="Company Name" v-model="affiliate"></q-select>
            </div>
            <div class="col-sm-12 q-pa-sm">
              <q-select outlined label="Address" v-model="company_name"></q-select>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 col-lg-6 col-sm-12 q-pa-sm">
              <q-select outlined label="Mobile Number" v-model="company_name"></q-select>
            </div>
            <div class="col-md-6 col-lg-6 col-sm-12 q-pa-sm">
              <q-select outlined label="Email Address" v-model="company_name"></q-select>
            </div>
            <div class="col-md-6 col-lg-6 col-sm-12 q-pa-sm">
              <q-select outlined label="Telephone Number" v-model="company_name"></q-select>
            </div>
            <div class="col-md-6 col-lg-6 col-sm-12 q-pa-sm">
              <q-select outlined label="Alternate Telephone Number" v-model="company_name"></q-select>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>


<script>
  export default {
    data: () => ({
      company_name: ""
    }),
    computed:{
      parentData(){
        return this.$parent.$parent.$parent.$parent;
      },
    },
    mounted() {
    }
  }
</script>
