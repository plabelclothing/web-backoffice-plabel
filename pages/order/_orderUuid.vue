<template>
  <div>
    <title-bar :titleStack="titleStack"/>
    <section class="section is-main-section">
      <order-info
          :isLoading="isLoadingTable"
          :paginated="paginatedTable"
          :perPage="perPage"
          :orders="orders"
      />
    </section>
  </div>
</template>

<script>
import {CookieConst, RouteConst} from '../../assets/const';
import TitleBar from '../../components/Layout/TitleBar';
import OrderInfo from '../../components/Layout/OrderInfo';

export default {
  layout: 'dashboard',
  data() {
    return {
      isActive:       true,
      cookie:         null,
      orders:         [],
      isLoadingTable: false,
      paginatedTable: false,
      perPage:        10,
      titleStack:     [
        'Dashboard',
        'Order'
      ]
    }
  },
  components: {
    TitleBar,
    OrderInfo,
  },
  head() {
    return {
      title: 'Order | BACKOFFICE | PLABEL CORP.',
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
    const cookie = this.$cookies.get(CookieConst.A_COOKIE);
    const orderUuid = this.$route.params.orderUuid;

    if (!cookie) {
      return this.$router.push({
        name: RouteConst.AUTHORIZATION,
      });
    }
    this.cookie = cookie;

    /** get orders **/
    try {
      const data = {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
      this.isLoadingTable = true;
      const resultOfGetData = await this.$api.getOrderByUuid(cookie, data, orderUuid);
      this.orders = resultOfGetData.data.data;
      this.titleStack.push(this.orders[0].user_order__external_id);
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
</script>
