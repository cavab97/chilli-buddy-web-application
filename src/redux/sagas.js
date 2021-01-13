import merchants from "./merchants/sagas";
import shops from "./shops/sagas";
import shopPost from "./shopPost/sagas";
import shopTags from "./settings/shops/tags/sagas";
import shopCategories from "./settings/shops/categories/sagas";
import users from "./users/sagas";
import userRoles from "./settings/users/roles/sagas";
import advertisements from "./advertisements/sagas";
import event from "./event/sagas";

import routeGroup from "./routeGroup/sagas";
import route from "./route/sagas";
import routeTicket from "./routeTicket/sagas";
import mission from "./mission/sagas";
import reward from "./reward/sagas";
import transaction from "./transaction/sagas";
import info from "./settings/Info/sagas";
import covid19NameList from "./covid19NameList/sagas";
import covid19Shop from "./covid19Shop/sagas";
import promotion from "./promotion/sagas";
import merchantAuth from "./merchantAuth/sagas";
import vouchers from "./vouchers/sagas";

export default [
  merchants(),
  shops(),
  shopPost(),
  shopTags(),
  shopCategories(),
  users(),
  userRoles(),
  advertisements(),
  event(),
  routeGroup(),
  route(),
  mission(),
  reward(),
  transaction(),
  info(),
  routeTicket(),
  covid19NameList(),
  covid19Shop(),
  promotion(),
  merchantAuth(),
  vouchers()
];
