export default function ({$axios, app}, inject) {
	const api = {};

	api.signin = async (login, password) => {
		return await $axios.post(`/v1/user/signin`, {
			email:    login,
			password: password
		});
	};

	// Inject to context as $api
	inject('api', api)
}
