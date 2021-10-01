<template>
  <div>
    <card-component v-if="orders.length" class="tile is-child">
      <b-field label="Order External ID" custom-class="is-small">
        <b-input :value="orders[0].user_order__external_id" custom-class="is-static is-small" readonly/>
      </b-field>
      <hr/>
      <b-field label="Payer account email" custom-class="is-small">
        <b-input :value="orders[0].user__email" custom-class="is-static is-small" readonly/>
      </b-field>
      <hr/>
      <b-field label="Payment status" custom-class="is-small">
        <b-input :value="orders[0].user_order__status" custom-class="is-static is-small" readonly/>
      </b-field>
      <hr/>
      <b-field label="Order status" custom-class="is-small">
        <b-input :value="orders[0].user_order__order_status" custom-class="is-static is-small" readonly/>
      </b-field>
      <hr/>
      <b-field label="Additional Info" custom-class="is-small">
        <b-input :value="orders[0].user_order__additional_information" custom-class="is-static is-small" readonly/>
      </b-field>
      <hr/>
      <b-field label="Address" custom-class="is-small">
        <textarea style="width:250px;height:150px;resize: none;border: none;outline: none;" readonly> {{orders[0].user_order__address}} </textarea>
      </b-field>
      <hr/>
      <b-field label="Transaction amount" custom-class="is-small is-small">
        <b-input :value="orders[0].transaction__amount + ' ' + orders[0].dict_currency__iso4217" custom-class="is-static is-small"
                 readonly/>
      </b-field>
    </card-component>
    <card-component class="tile is-child">
      <table-orders-by-uuid
          :orders="orders"
          :isLoading="isLoading"
          :paginated="paginated"
          :perPage="perPage"/>
    </card-component>
  </div>
</template>

<script>
import CardComponent from './CardComponent';
import TableOrdersByUuid from './TableOrdersByUuid';

export default {
  name:       'OrderInfo',
  components: {
    CardComponent,
    TableOrdersByUuid,
  },
  props:      {
    isLoading: Boolean,
    paginated: Boolean,
    perPage:   Number,
    orders:    Array,
    // orders:    [
    //   {
    //     user_order__external_id:            String,
    //     user_order__uuid:                   String,
    //     user_order__order_status:           String,
    //     user_order__status:                 String,
    //     user_order__additional_information: String,
    //     user_order__address:                String,
    //     transaction__amount:                Number,
    //     dict_currency__iso4217:             String,
    //     user__email:                        String,
    //     products__uuid:                     String,
    //     list_product__name:                 String,
    //     dict_color__name:                   String,
    //     dict_size__name:                    String,
    //     user_cart_items__amount:            Number,
    //     dict_currency_user_cart__iso4217:   String,
    //     products__count:                    Number,
    //   }
    // ]
  }
}
</script>