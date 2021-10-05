<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <section class="section is-main-section">
      <card-component title="Search Form" icon="ballot">
        <form>
          <b-field label="User email" horizontal>
            <b-input
                v-model="form.userEmail"
                type="email"
                placeholder="User Email"
                name="userEmail"
            />
          </b-field>
          <b-field label="User order external id" horizontal>
            <b-input
                v-model="form.orderExternalId"
                type="text"
                placeholder="Order External Id"
                name="orderExternalId"
            />
          </b-field>
          <b-field label="User order payment status" horizontal>
            <b-select
                v-model="form.userOrderStatus"
                placeholder="Select a status"
            >
              <option
                  v-for="(status, index) in orderStatus"
                  :key="index"
                  :value="status"
              >
                {{ status }}
              </option>
            </b-select>
          </b-field>
          <b-field label="User order status" horizontal>
            <b-select
                v-model="form.userOrderOrderStatus"
                placeholder="Select a status"
            >
              <option
                  v-for="(status, index) in orderStatusOrderStatus"
                  :key="index"
                  :value="status"
              >
                {{ status }}
              </option>
            </b-select>
          </b-field>
          <b-field label="Date from" horizontal>
            <b-datepicker
                v-model="form.dateFrom"
                placeholder="Click to select..."
                icon="calendar-today"
                icon-right-clickable
                trap-focus>
            </b-datepicker>
          </b-field>
          <b-field label="Date to" horizontal>
            <b-datepicker
                v-model="form.dateTo"
                placeholder="Click to select..."
                icon="calendar-today"
                icon-right-clickable
                trap-focus>
            </b-datepicker>
          </b-field>
          <hr/>
          <b-field horizontal>
            <b-field>
              <div class="control">
                <b-button type="is-primary" v-on:click="getSearchData"
                >Search
                </b-button
                >
              </div>
            </b-field>
          </b-field>
        </form>
      </card-component>
      <card-component class="has-table has-mobile-sort-spaced">
        <table-orders
            :orders="orders"
            :isLoading="isLoadingTable"
            :paginated="paginatedTable"
            :perPage="perPage"
        />
      </card-component>
    </section>
  </div>
</template>

<script>
import {UserOrderStatus, UserOrderOrderStatus, CookieConst, RouteConst} from '../assets/const';
import TitleBar from '../components/Layout/TitleBar';
import CardComponent from '../components/Layout/CardComponent';
import TableOrders from '../components/Layout/TableOrders';

export default {
  layout:     'dashboard',
  name:       'Search',
  head() {
    return {
      title: 'Search | BACKOFFICE | PLABEL CORP.',
      meta:  [
        {
          charset: 'utf-8'
        },
        {
          name:    'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          robots: [{
            UserAgent: '*',
            Disallow:  '/'
          }]
        }
      ],
    }
  },
  components: {
    TitleBar,
    CardComponent,
    TableOrders,
  },
  data() {
    return {
      titleStack:             [
        'Dashboard',
        'Search'
      ],
      orderStatus:            [null, ...Object.values(UserOrderStatus)],
      orderStatusOrderStatus: [null, ...Object.values(UserOrderOrderStatus)],
      isLoading:              false,
      orders:                 [],
      isLoadingTable:         false,
      paginatedTable:         false,
      perPage:                20,
      form:                   {
        orderExternalId:      null,
        userEmail:            null,
        userOrderStatus:      null,
        userOrderOrderStatus: null,
        dateFrom:             null,
        dateTo:               null,
      },
    }
  },
  methods: {
    async getSearchData() {
      const cookie = this.$cookies.get(CookieConst.A_COOKIE);
      if (!cookie) {
        return this.$router.push({
          name: RouteConst.AUTHORIZATION,
        });
      }

      try {
        const dateFrom = this.form.dateFrom ? new Date(this.form.dateFrom).getTime() / 1000 : undefined;
        const dateTo = this.form.dateTo ? new Date(this.form.dateTo).getTime() / 1000 : undefined;
        const user_order__external_id = this.form.orderExternalId && !['', ' '].includes(this.form.orderExternalId) ? [this.form.orderExternalId] : undefined;
        const user_order__status = this.form.userOrderStatus && !['', ' '].includes(this.form.userOrderStatus) ? [this.form.userOrderStatus] : undefined;
        const user_order__order_status = this.form.userOrderOrderStatus && !['', ' '].includes(this.form.userOrderOrderStatus) ? [this.form.userOrderOrderStatus] : undefined;
        const user__email = this.form.userEmail && !['', ' '].includes(this.form.userEmail) ? [this.form.userEmail] : undefined;

        let data = {
          dateFrom,
          dateTo,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };

        if (user_order__status || user_order__order_status || user__email || user_order__external_id) {
          data.conditions = {
            user_order__status,
            user_order__order_status,
            user__email,
            user_order__external_id,
          };
        }

        this.isLoadingTable = true;
        const resultOfGetData = await this.$api.getOrder(cookie, data);
        this.orders = resultOfGetData.data.data;
        if (this.orders.length > this.perPage) {
          this.paginatedTable = true;
        }
        this.isLoadingTable = false;
      } catch (e) {
        this.isLoadingTable = false;
        this.$buefy.toast.open({
          message: `Error: ${e.message}`,
          type:    'is-danger'
        })
      }
    }
  }
}
</script>