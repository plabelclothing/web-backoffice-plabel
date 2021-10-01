<template>
  <div>
    <b-table
        :loading="isLoading"
        :paginated="paginated"
        :per-page="perPage"
        :striped="true"
        :hoverable="true"
        :data="orders"
    >
      <b-table-column label="Product UUID" field="products__uuid" v-slot="props">
        {{ props.row.products__uuid }}
      </b-table-column>
      <b-table-column label="Product name" field="list_product__name" v-slot="props">
        {{ props.row.list_product__name }}
      </b-table-column>
      <b-table-column label="Product color" field="dict_color__name" v-slot="props">
        {{ props.row.dict_color__name }}
      </b-table-column>
      <b-table-column label="Product size" field="dict_size__name" v-slot="props">
        {{ props.row.dict_size__name }}
      </b-table-column>
      <b-table-column label="Quantity" field="products__count" v-slot="props">
        {{ props.row.products__count }}
      </b-table-column>
      <b-table-column label="Price" field="user_cart_items__amount" v-slot="props">
        {{ props.row.user_cart_items__amount }} {{ props.row.dict_currency_user_cart__iso4217 }}
      </b-table-column>
    </b-table>
  </div>
</template>

<script>

export default {
  name:  'TableOrdersByUuid',
  props: {
    orders:    Array,
    isLoading: Boolean,
    paginated: Boolean,
    perPage:   Number,
  },
}
</script>
