import asyncComponent from "marslab-library-react/utils/common/AsyncFunc";

const restrictedRoutes = [
  {
    path: "userList",
    role: "admin",
    component: asyncComponent(() => import("screens/users/UserList")),
  },
  // {
  //     path: 'deletedUserList',
  //     role: 'admin',
  //     component: asyncComponent(() => import('screens/users/DelUserList'))
  //   },
  // {
  //   path: "merchantList",
  //   role: "admin",
  //   component: asyncComponent(() => import("screens/merchants/MerchantList")),
  // },
  // {
  //     path: 'deletedMerchantList',
  //     role: 'admin',
  //     component: asyncComponent(() => import('screens/merchants/DelMerchantList'))
  //   },
  // {
  //     path: 'deletedShopList',
  //     role: 'admin',
  //     component: asyncComponent(() => import('screens/shops/DelShopList'))
  //   },
  {
    path: "shopList",
    role: "admin",
    component: asyncComponent(() => import("screens/shops/Shops")),
  },
  {
    path: "shopList/:shopID",
    role: "admin",
    component: asyncComponent(() => import("screens/shops/Shop")),
  },
  {
    path: "shopList/:shopID/promotions",
    role: "admin",
    component: asyncComponent(() => import("screens/promotion/Promotions")),
  },
  {
    path: "shopList/:shopID/promotions/:promotionID",
    role: "admin",
    component: asyncComponent(() => import("screens/promotion/Promotion")),
  },
  {
    path: "shopList/:shopID/promotions/:promotionID/setting",
    role: "admin",
    component: asyncComponent(() => import("screens/promotion/PromotionForm")),
  },
  {
    path: "shopList/:shopID/addpromotion",
    role: "admin",
    component: asyncComponent(() => import("screens/promotion/PromotionForm")),
  },
  {
    path: "shopList/:shopID/posts",
    role: "admin",
    component: asyncComponent(() => import("screens/shopPost/ShopPosts")),
  },
  {
    path: "shopList/:shopID/setting",
    role: "admin",
    component: asyncComponent(() => import("screens/shops/ShopForm")),
  },
  {
    path: "addshop",
    role: "admin",
    component: asyncComponent(() => import("screens/shops/ShopForm")),
  },
  {
    path: "shopList/:shopID/posts/:shopPostID",
    role: "admin",
    component: asyncComponent(() => import("screens/shopPost/ShopPost")),
  },
  {
    path: "shopList/:shopID/posts/:shopPostID/setting",
    role: "admin",
    component: asyncComponent(() => import("screens/shopPost/ShopPostForm")),
  },
  {
    path: "shopList/:shopID/addpost",
    role: "admin",
    component: asyncComponent(() => import("screens/shopPost/ShopPostForm")),
  },
  {
    path: "shopTags",
    role: "admin",
    component: asyncComponent(() => import("screens/shops/Tags")),
  },
  {
    path: "shopCategories",
    role: "admin",
    component: asyncComponent(() => import("screens/shops/Categories")),
  },
  {
    path: "news",
    role: "admin",
    component: asyncComponent(() => import("screens/advertisements/News")),
  },
  {
    path: "headerPoster",
    role: "admin",
    component: asyncComponent(() => import("screens/advertisements/HeaderPoster")),
  },
  {
    path: "transaction",
    role: "admin",
    component: asyncComponent(() => import("screens/transaction/TransactionList")),
  },
  {
    path: "users",
    role: "admin",
    component: asyncComponent(() => import("screens/users/UserList")),
  },
  {
    path: "routegroup",
    role: "admin",
    component: asyncComponent(() => import("screens/routeGroups/RouteGroups")),
  },
  {
    path: "routegroup/:routeGroupID",
    role: "admin",
    component: asyncComponent(() => import("screens/routeGroups/RouteGroup")),
  },
  {
    path: "routegroup/:routeGroupID/route",
    role: "admin",
    component: asyncComponent(() => import("screens/routes/Routes")),
  },
  {
    path: "routegroup/:routeGroupID/setting",
    role: "admin",
    component: asyncComponent(() => import("screens/routeGroups/RouteGroupForm")),
  },
  {
    path: "addroutegroup",
    role: "admin",
    component: asyncComponent(() => import("screens/routeGroups/RouteGroupForm")),
  },
  {
    path: "routegroup/:routeGroupID/route/:routeID",
    role: "admin",
    component: asyncComponent(() => import("screens/routes/Route")),
  },
  {
    path: "routegroup/:routeGroupID/route/:routeID/assign",
    role: "admin",
    component: asyncComponent(() => import("screens/routes/Assign")),
  },
  {
    path: "routegroup/:routeGroupID/route/:routeID/assign/:routeTicketID",
    role: "admin",
    component: asyncComponent(() => import("screens/transaction/TransactionList")),
  },
  {
    path: "routegroup/:routeGroupID/route/:routeID/transaction/:routeTicketID",
    role: "admin",
    component: asyncComponent(() => import("screens/transaction/TransactionList")),
  },
  {
    path: "routegroup/:routeGroupID/route/:routeID/mission",
    role: "admin",
    component: asyncComponent(() => import("screens/mission/Missions")),
  },
  {
    path: "routegroup/:routeGroupID/route/:routeID/reward",
    role: "admin",
    component: asyncComponent(() => import("screens/reward/Rewards")),
  },
  {
    path: "routegroup/:routeGroupID/route/:routeID/setting",
    role: "admin",
    component: asyncComponent(() => import("screens/routes/RouteForm")),
  },
  {
    path: "routegroup/:routeGroupID/addroute",
    role: "admin",
    component: asyncComponent(() => import("screens/routes/RouteForm")),
  },
  {
    path: "routegroup/:routeGroupID/route/:routeID/reward/:rewardID",
    role: "admin",
    component: asyncComponent(() => import("screens/reward/Reward")),
  },
  {
    path: "routegroup/:routeGroupID/route/:routeID/reward/:rewardID/transaction",
    role: "admin",
    component: asyncComponent(() => import("screens/transaction/TransactionList")),
  },
  {
    path: "routegroup/:routeGroupID/route/:routeID/reward/:rewardID/setting",
    role: "admin",
    component: asyncComponent(() => import("screens/reward/RewardForm")),
  },
  {
    path: "routegroup/:routeGroupID/route/:routeID/addreward",
    role: "admin",
    component: asyncComponent(() => import("screens/reward/RewardForm")),
  },
  {
    path: "routegroup/:routeGroupID/route/:routeID/mission/:missionID",
    role: "admin",
    component: asyncComponent(() => import("screens/mission/Mission")),
  },
  {
    path: "routegroup/:routeGroupID/route/:routeID/mission/:missionID/setting",
    role: "admin",
    component: asyncComponent(() => import("screens/mission/MissionForm")),
  },
  {
    path: "routegroup/:routeGroupID/route/:routeID/addmission",
    role: "admin",
    component: asyncComponent(() => import("screens/mission/MissionForm")),
  },
  {
    path: "event",
    role: "admin",
    component: asyncComponent(() => import("screens/events/Events")),
  },
  {
    path: "event/:eventID",
    role: "admin",
    component: asyncComponent(() => import("screens/events/Event")),
  },
  {
    path: "event/:eventID/setting",
    role: "admin",
    component: asyncComponent(() => import("screens/events/EventForm")),
  },
  {
    path: "addevent",
    role: "admin",
    component: asyncComponent(() => import("screens/events/EventForm")),
  },
  {
    path: "event/:eventID/reward",
    role: "admin",
    component: asyncComponent(() => import("screens/reward/Rewards")),
  },
  {
    path: "event/:eventID/reward/:rewardID",
    role: "admin",
    component: asyncComponent(() => import("screens/reward/Reward")),
  },
  {
    path: "event/:eventID/assign",
    role: "admin",
    component: asyncComponent(() => import("screens/events/Assign")),
  },
  {
    path: "event/:eventID/reward/:rewardID/setting",
    role: "admin",
    component: asyncComponent(() => import("screens/reward/RewardForm")),
  },
  {
    path: "event/:eventID/addreward",
    role: "admin",
    component: asyncComponent(() => import("screens/reward/RewardForm")),
  },
  {
    path: "visitorRecord",
    role: "user",
    component: asyncComponent(() => import("screens/covid19/covid19NameList")),
  },
  {
    path: "visitorMerchantList",
    role: "user",
    component: asyncComponent(() => import("screens/covid19/covid19MerchantList")),
  },
  {
    path: "merchant",
    role: "admin",
    component: asyncComponent(() => import("screens/merchant")),
  },
  {
    path: "merchantInfo",
    role: "admin",
    component: asyncComponent(() => import("screens/merchantInfo")),
  },
  {
    path: "voucher",
    role: "admin",
    component: asyncComponent(() => import("screens/voucher")),
  },
];

export default restrictedRoutes;
