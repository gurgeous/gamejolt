import { State } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import * as View from '!view!./account.html';

import { makeObservableService } from '../../../../lib/gj-lib-client/utils/vue';
import { Screen } from '../../../../lib/gj-lib-client/components/screen/screen-service';
import { AppJolticon } from '../../../../lib/gj-lib-client/vue/components/jolticon/jolticon';
import { AppPageHeader } from '../../../components/page-header/page-header';
import { AppUserAvatar } from '../../../../lib/gj-lib-client/components/user/user-avatar/user-avatar';
import { Store } from '../../../store/index';
import { User } from '../../../../lib/gj-lib-client/components/user/user.model';
import { RouteStateName, RouteState, RouteStore } from './account.state';
import {
	BaseRouteComponent,
	RouteResolve,
} from '../../../../lib/gj-lib-client/components/route/route-component';

@View
@Component({
	components: {
		AppJolticon,
		AppPageHeader,
		AppUserAvatar,
	},
})
export default class RouteDashAccount extends BaseRouteComponent {
	@State app: Store['app'];
	@RouteState heading: RouteStore['heading'];

	Screen = makeObservableService(Screen);

	storeName = RouteStateName;
	storeModule = RouteStore;

	@RouteResolve({})
	routeResolve() {
		User.touch();
	}
}
