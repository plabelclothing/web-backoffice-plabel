<template>
  <div>
    <title-bar :titleStack="titleStack"/>
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
import {CookieConst, RouteConst} from '../assets/const';
import TitleBar from '../components/Layout/TitleBar';
import CardComponent from '../components/Layout/CardComponent';
import TableOrders from '../components/Layout/TableOrders';

export default {
  layout: 'dashboard',
  data() {
    return {
      isActive:       true,
      orders:         [],
      isLoadingTable: false,
      paginatedTable: false,
      perPage:        10,
      titleStack:     [
        'Dashboard',
        'General'
      ],
      timer:          "",
    }
  },
  components: {
    TitleBar,
    TableOrders,
    CardComponent,
  },
  head() {
    return {
      title: 'Dashboard | BACKOFFICE | PLABEL CORP.',
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
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
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
