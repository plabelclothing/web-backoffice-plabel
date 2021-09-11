/** Locale modules **/
import {CookieConst, RouteConst} from 'assets/const';

export default async ({app, route, redirect}) => {
	try {
		const cookie = app.$cookies.get(CookieConst.A_COOKIE);
		const checkRoute = RouteConst.AUTHORIZATION;
		const currentRoute = route.path.split('/');
		const isInclude = currentRoute.includes(checkRoute);
		if (cookie && isInclude) {
			return redirect(`/`);
		}
		if (!cookie && !isInclude) {
			return redirect(`/${RouteConst.AUTHORIZATION}`);
		}
	} catch (e) {
	}
}
