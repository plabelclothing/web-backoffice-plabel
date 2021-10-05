<template>
  <aside v-show="isAsideVisible" class="aside is-placed-left is-expanded">
    <aside-tools :is-main-menu="true">
      <span slot="label"><img src="~static/logo.svg" style="width: 90px;height: 50px;" alt="logo"></span>
    </aside-tools>
    <div class="menu is-menu-main">
      <template v-for="(menuGroup, index) in menu">
        <p v-if="typeof menuGroup === 'string'" :key="index" class="menu-label">
          {{ menuGroup }}
        </p>
        <aside-menu-list
            v-else
            :key="index"
            :menu="menuGroup"
        />
      </template>
    </div>
  </aside>
</template>

<script>
import {mapState} from 'vuex'
import AsideTools from '/components/Layout/AsideTools'
import AsideMenuList from '/components/Layout/AsideMenuList'

export default {
  name:       'AsideMenu',
  components: {AsideTools, AsideMenuList},
  data() {
    return {}
  },
  props:    {
    menu: {
      type:    Array,
      default: () => []
    }
  },
  computed: {
    ...mapState(['isAsideVisible'])
  },
}
</script>

