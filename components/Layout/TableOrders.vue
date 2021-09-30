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
      <b-table-column label="Order ID" field="user_order__external_id" sortable v-slot="props">
        {{ props.row.user_order__external_id }}
      </b-table-column>
      <b-table-column label="Price" field="transaction__amount" sortable v-slot="props">
        {{ props.row.transaction__amount }} {{ props.row.dict_currency__iso4217 }}
      </b-table-column>
      <b-table-column label="Order Status" field="user_order__order_status" sortable v-slot="props">
        {{ props.row.user_order__order_status }}
      </b-table-column>
      <b-table-column label="Payment order status" field="user_order__status" sortable v-slot="props">
        {{ props.row.user_order__status }}
      </b-table-column>
      <b-table-column label="Order created" field="user_order__created" sortable v-slot="props">
        {{ props.row.user_order__created }}
      </b-table-column>
      <b-table-column label="Order modified" field="user_order__modified" sortable v-slot="props">
        {{ props.row.user_order__modified }}
      </b-table-column>
      <b-table-column custom-key="actions" cell-class="is-actions-cell" v-slot="props">
        <div class="buttons is-right">
          <router-link :to="{name:'order.edit', params: {id: props.row.user_order__uuid}}"
                       class="button is-small is-primary">
            <b-icon icon="information-outline" size="is-small"/>
          </router-link>
        </div>
      </b-table-column>
    </b-table>
  </div>
</template>

<script>

export default {
  name:  'TableOrders',
  props: {
    orders:    Array,
    isLoading: Boolean,
    paginated: Boolean,
    perPage:   Number,
  },
}
</script>
