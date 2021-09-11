export const state = () => ({
	/* User */
	userName:   null,
	userEmail:  null,
	userAvatar: null,

	/* NavBar */
	isNavBarVisible: true,

	/* FooterBar */
	isFooterBarVisible: true,

	/* Aside */
	isAsideVisible:        true,
	isAsideMobileExpanded: false
});

export const mutations = {
	SET_USER_EMAIL(state, userEmail) {
		state.userEmail = userEmail;
	},
	/* User */
	user(state, payload) {
		if (payload.email) {
			state.userEmail = payload.email
		}
	},

	/* Aside Mobile */
	asideMobileStateToggle(state, payload = null) {
		const htmlClassName = 'has-aside-mobile-expanded'

		let isShow

		if (payload !== null) {
			isShow = payload
		} else {
			isShow = !state.isAsideMobileExpanded
		}

		if (isShow) {
			document.documentElement.classList.add(htmlClassName)
		} else {
			document.documentElement.classList.remove(htmlClassName)
		}

		state.isAsideMobileExpanded = isShow
	}
};
