export const state = () => ({
	userEmail: '',
});

export const mutations = {
	SET_USER_EMAIL(state, userEmail) {
		state.userEmail = userEmail;
	},

};
