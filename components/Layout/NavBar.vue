<template>
  <nav v-show="isNavBarVisible" id="navbar-main" class="navbar is-fixed-top">
    <div class="navbar-brand">
      <a
          class="navbar-item is-hidden-desktop"
          @click.prevent="menuToggleMobile"
      >
        <b-icon :icon="menuToggleMobileIcon"/>
      </a>
    </div>
    <div class="navbar-brand is-right">
      <a
          class="navbar-item navbar-item-menu-toggle is-hidden-desktop"
          @click.prevent="menuNavBarToggle"
      >
        <b-icon :icon="menuNavBarToggleIcon" custom-size="default"/>
      </a>
    </div>
    <div
        class="navbar-menu fadeIn animated faster"
        :class="{ 'is-active': isMenuNavBarActive }"
    >
      <div class="navbar-end">
        <nav-bar-menu class="has-divider has-user-avatar">
          <div class="is-user-name">
            <span>{{ userEmail }}</span>
          </div>
          <div slot="dropdown" class="navbar-dropdown">
            <!--            <hr class="navbar-divider"/>-->
            <a class="navbar-item">
              <b-icon icon="logout" custom-size="default"></b-icon>
              <span @click="logout">Log Out</span>
            </a>
          </div>
        </nav-bar-menu>
      </div>
    </div>
  </nav>
</template>

<script>
import NavBarMenu from '/components/Layout/NavBarMenu'
import {CookieConst, RouteConst} from '../../assets/const';
import {mapState} from 'vuex'

export default {
  name:       'NavBar',
  components: {
    NavBarMenu
  },
  data() {
    return {
      isMenuNavBarActive: false,
    }
  },
  computed: {
    menuNavBarToggleIcon() {
      return this.isMenuNavBarActive
          ? 'close'
          : 'dots-vertical'
    },
    menuToggleMobileIcon() {
      return this.isAsideMobileExpanded
          ? 'backburger'
          : 'forwardburger'
    },
    ...mapState(['isNavBarVisible', 'isAsideMobileExpanded', 'userEmail'])
  },
  mounted() {
    this.$router.afterEach(() => {
      this.isMenuNavBarActive = false
    })
  },
  methods: {
    menuToggleMobile() {
      this.$store.commit('asideMobileStateToggle')
    },
    menuNavBarToggle() {
      this.isMenuNavBarActive = !this.isMenuNavBarActive
    },
    logout() {
      const now = new Date();
      this.$cookies.remove(CookieConst.A_COOKIE, {
        expires: now.toUTCString(),
        path:    '/'
      });
      return this.$router.push({
        name: RouteConst.AUTHORIZATION,
      });
    }
  }
}
</script>
