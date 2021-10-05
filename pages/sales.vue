<template>
  <div>
    <title-bar :title-stack="titleStack"/>
    <section class="section is-main-section">
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
import {CookieConst, RouteConst, UserOrderStatus} from '../assets/const';
import TitleBar from '../components/Layout/TitleBar';
import CardComponent from '../components/Layout/CardComponent';
import TableOrders from '../components/Layout/TableOrders';

export default {
  layout: 'dashboard',
  name:   'Sales',
  head() {
    return {
      title: 'Sales | BACKOFFICE | PLABEL CORP.',
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
      titleStack:     [
        'Dashboard',
        'Sales'
      ],
      isLoading:      false,
      orders:         [],
      isLoadingTable: false,
      paginatedTable: false,
      perPage:        20,
    }
  },
  async mounted() {
    /** get orders **/
    await this.fetchData();
  },
  methods: {
    cancelAutoUpdate() {
      clearInterval(this.timer);
    },
    async fetchData() {
      const cookie = this.$cookies.get(CookieConst.A_COOKIE);
      if (!cookie) {
        return this.$router.push({
          name: RouteConst.AUTHORIZATION,
        });
      }
      try {
        const data = {
          timezone:   Intl.DateTimeFormat().resolvedOptions().timeZone,
          conditions: {
            user_order__status: [UserOrderStatus.APPROVED],
          }
        };
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
  },
  created() {
    this.timer = setInterval(this.fetchData, 30000);
  },
  beforeDestroy() {
    this.cancelAutoUpdate();
  },
}
</script>