import asyncComponent from "marslab-library-react/utils/common/AsyncFunc";

const restrictedPublicRoutes = [
    {
        exact: true,
        path: '/:userID/covid-19_Form',
        component: asyncComponent(() => import('screens/covid19/covid19Form'))
      },
];

export default restrictedPublicRoutes;
