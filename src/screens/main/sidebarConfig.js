const sidebarOptions = [
  // {
  //     key: 'userManagement',
  //     label: 'sidebar.userManagement',
  //     leftIcon: 'ion-person',
  //     role: 'admin',
  //     children: [
  //       {
  //         key: 'userList',
  //         label: 'sidebar.userList',
  //       },
  //       {
  //         key: 'deletedUserList',
  //         label: 'sidebar.deletedUserList'
  //       },
  //     ],
  //   },
  // {
  //   key: 'merchantManagement',
  //   label: 'sidebar.merchantManagement',
  //   leftIcon: 'ion-calculator',

  //   children: [
  //     {
  //       key: 'merchantList',
  //       label: 'sidebar.merchantList',
  //     },
  //     {
  //       key: 'deletedMerchantList',
  //       label: 'sidebar.deletedMerchantList',
  //     },

  //   ],
  // },

  {
    key: "shopList",
    label: "sidebar.shopManagement",
    leftIcon: "ion-home",
    role: "admin",
    //hideChildren: true,

    children: [
      {
        key: "shopList", //shopList
        label: "sidebar.shopList",
      },
      // {
      //   key: 'deletedShopList',
      //   label: 'sidebar.deletedShopList',
      // },
      {
        key: "shopTags",
        label: "sidebar.shopTags",
      },
      {
        key: "shopCategories",
        label: "sidebar.shopCategories",
      },
    ],
  },
  {
    key: "shop",
    label: "sidebar.shopManagement",
    role: "admin",
    hide: true,

    children: [
      {
        key: "",
        label: "sidebar.dashboard",
      },
      {
        key: "promotions",
        label: "sidebar.promotion",
      },
      {
        key: "posts",
        label: "sidebar.posts",
      },
      {
        key: "setting",
        label: "sidebar.settings",
      },
    ],
  },
  {
    key: "promotion",
    label: "sidebar.promotionManagement",
    role: "admin",
    hide: true,

    children: [
      {
        key: "",
        label: "sidebar.dashboard",
      },
      {
        key: "setting",
        label: "sidebar.settings",
      },
    ],
  },
  {
    key: "shopPost",
    label: "sidebar.shopPostManagement",
    role: "admin",
    hide: true,

    children: [
      {
        key: "",
        label: "sidebar.dashboard",
      },
      {
        key: "setting",
        label: "sidebar.settings",
      },
    ],
  },
  {
    key: "news",
    label: "sidebar.advertisementManagement",
    leftIcon: "ion-android-document",
    role: "admin",

    children: [
      {
        key: "news",
        label: "sidebar.news",
      },
      {
        key: "headerPoster",
        label: "sidebar.HeaderPoster",
      },
    ],
  },
  {
    key: "transaction",
    label: "sidebar.transaction",
    leftIcon: "ion-social-usd",
    role: "admin",
  },
  {
    key: "users",
    label: "sidebar.userList",
    leftIcon: "ion-ios-people",
    role: "admin",
  },
  {
    key: "routegroup",
    label: "sidebar.routeGroupManagement",
    leftIcon: "ion-map",
    role: "admin",
    //hideChildren: true,

    children: [
      {
        key: "",
        label: "sidebar.dashboard",
      },
      // {
      //   key: 'deletedShopList',
      //   label: 'sidebar.deletedShopList',
      // },
      {
        key: "route",
        label: "sidebar.routeManagement",
      },
      {
        key: "setting",
        label: "sidebar.settings",
      },
    ],
  },
  {
    key: "route",
    label: "sidebar.routeManagement",
    leftIcon: "ion-map",
    role: "admin",
    hide: true,

    children: [
      {
        key: "",
        label: "sidebar.dashboard",
      },
      {
        key: "mission",
        label: "sidebar.mission",
      },
      {
        key: "reward",
        label: "sidebar.reward",
      },
      {
        key: "assign",
        label: "sidebar.assign",
      },
      {
        key: "setting",
        label: "sidebar.settings",
      },
    ],
  },
  {
    key: "reward",
    label: "sidebar.reward",
    leftIcon: "ion-map",
    role: "admin",
    hide: true,

    children: [
      {
        key: "",
        label: "sidebar.dashboard",
      },
      /* {
            key: 'transaction',
            label: 'sidebar.transaction',
          }, */
      {
        key: "setting",
        label: "sidebar.settings",
      },
    ],
  },
  {
    key: "mission",
    label: "sidebar.mission",
    leftIcon: "ion-map",
    role: "admin",
    hide: true,

    children: [
      {
        key: "",
        label: "sidebar.dashboard",
      },
      {
        key: "setting",
        label: "sidebar.settings",
      },
    ],
  },
  {
    key: "event",
    label: "sidebar.eventManagement",
    leftIcon: "ion-fireball",
    role: "admin",
    //hideChildren: true,

    children: [
      {
        key: "",
        label: "sidebar.eventList",
      },
      {
        key: "assign",
        label: "sidebar.assign",
      },
      {
        key: "reward",
        label: "sidebar.reward",
      },
      {
        key: "setting",
        label: "sidebar.settings",
      },
    ],
  },
  {
    key: "eventReward",
    label: "sidebar.reward",
    leftIcon: "ion-map",
    role: "admin",
    hide: true,

    children: [
      {
        key: "",
        label: "sidebar.dashboard",
      },
      {
        key: "setting",
        label: "sidebar.settings",
      },
    ],
  },
  {
    key: "visitorMerchantList",
    label: "sidebar.visitorMerchantList",
    leftIcon: "ion-ios-list",
    role: "admin",
  },
  {
    key: "visitorRecord",
    label: "sidebar.visitorList",
    leftIcon: "ion-earth",
    role: "user",
  },
  {
    key: "merchant",
    label: "sidebar.merchant",
    leftIcon: "ion-person-stalker",
    role: "admin",
  },
];

const accountDropdownOptions = [];

export { sidebarOptions, accountDropdownOptions };
