<template>
  <q-card :square="true" elevated :bordered="true" class="q-my-md">
    <q-card-section>
      <div class="text-h6 q-mb-md"><q-icon name="label_important" class="text-red-15" /> Company Information:</div>
      <q-form @submit.prevent="onSubmit"
              ref="personal_info_form"
              :greedy="true">
        <div class="row">
          <div class="col-md-6 col-lg-6 q-pa-sm">

            <q-select v-model="compID"
                      use-input
                      outlined 
                      input-debounce="0"
                      label="Company"
                      :options="options"
                      :options-html="true"
                      :option-value="(option) => option === null ? null : option.value"
                      @filter="filterFn">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

          </div>

          <div class="col-md-6 col-lg-6 q-pa-sm">
            <q-input outlined label="Member Affiliation" v-model="member_affiliation" :disable="true" />
          </div>
        </div>
      </q-form>
    </q-card-section>

    <app-add-company-modal v-if="show_company_modal" :saveCompany="saveCompany" :closeAddCompanyModal="closeAddCompanyModal" />
  </q-card>
</template>

<script>
  import AddCompanyModal from "./Modal/AddCompany.vue";
  export default {
    data: () => ({
      compID: "",
      add_company_btn: "<button style='background-color: seagreen; color: white; border-radius: 3px; border: 1px solid seagreen;'>Add New Company</button>",
      member_affiliation: "",
      options: [],
      stringOptions: [],

      // company modal
      show_company_modal: false,
    }),

    props: ['default_val'],

    components: {
      appAddCompanyModal: AddCompanyModal,
    },

    mounted() {
      this.initApp();
    },

    watch: {
      compID(newVal, oldVal) {

        if (newVal.value == this.add_company_btn) {
          this.addCompany();
          this.compID = "";
        }
        this.member_affiliation = newVal.affiliation;
      },
    },

    methods: {
      initApp() {
        for (let column in this.default_val) {
          this[column] = this.default_val[column];
        }
        let default_companies = [
          {
            value: this.add_company_btn,
            label: this.add_company_btn,
            affiliation: "",
          },
          {
            value: 1001,
            label: "San Miguel",
            affiliation: "PANA",
          },
          {
            value: 1002,
            label: "Tanduay",
            affiliation: "KBP",
          },
          {
            value: 1003,
            label: "Red Horse",
            affiliation: "IMMAP",
          }


        ]

        this.getAllCompanies();

        this.options = default_companies;
        this.stringOptions = this.options;
      },

      async onSubmit(evt) {
        return await this.$refs.personal_info_form.validate();
      },

      addCompany() {
        this.show_company_modal = true;
      },

      onReset() {

      },

      filterFn(val, update) {
        if (val === '') {
          update(() => {
            this.options = this.stringOptions
          })
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          this.options = this.stringOptions.filter(v => v.value.toLowerCase().indexOf(needle) > -1)
        })
      },

      async getAllCompanies() {
        let payload = {
          page: 1,
          size: 100,
          order: "id:desc",
          search: "",
        }

        let { data, status } = await this.$store.dispatch('company/getAllCompanies', payload);

        console.log(data);
      },

      saveCompany(newCompany) {
        this.options.push(newCompany);
        this.compID = newCompany;
        this.member_affiliation = newCompany.affiliation;
      },

      closeAddCompanyModal() {
        this.show_company_modal = false;
      },
    },
  }
</script>
