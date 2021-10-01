export default function ({$axios, app}, inject) {
	const api = {};

	api.signin = async (login, password) => {
		return await $axios.post(`/v1/user/signin`, {
			email:    login,
			password: password
		});
	};

	api.userData = async (token) => {
		return await $axios({
			method:  'get',
			url:     '/v1/user/data',
			headers: {
				Token: token,
			}
		});
	};

	api.getOrder = async (token, data) => {
		return await $axios({
			method:  'post',
			url:     '/v1/order/',
			data,
			headers: {
				Token: token,
			}
		});
	};

	api.getOrderByUuid = async (token, data, uuid) => {
		return await $axios({
			method:  'post',
			url:     `/v1/order/${uuid}`,
			data,
			headers: {
				Token: token,
			}
		});
	};

	// Inject to context as $api
	inject('api', api)
}
