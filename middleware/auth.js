/** Locale modules **/
import {CookieConst, RouteConst} from 'assets/const';

export default async ({app, route, redirect}) => {
	try {
		const arrCheckRoute = [RouteConst.AUTHORIZATION];
		const cookie = app.$cookies.get(CookieConst.A_COOKIE);
		const currentRoute = route.path.split('/');
		for (const val of currentRoute) {
			if (cookie && arrCheckRoute.includes(val)) {
				return redirect(`/`);
			}
		}
	} catch (e) {
	}
}
