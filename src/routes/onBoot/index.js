import { store } from "marslab-library-react/redux/store";
import shopTagsActions from "redux/settings/shops/tags/actions";
import shopCategoriesActions from "redux/settings/shops/categories/actions";
import userRolesAction from "redux/settings/users/roles/actions";

const onBoot = async () => {
  return new Promise(async (resolve, reject) => {
    const loadShopTag = store.dispatch(shopTagsActions.loadFromFireStore());
    const loadShopCategories = store.dispatch(
      shopCategoriesActions.loadFromFireStore()
    );
    const loadUserRoles = store.dispatch(userRolesAction.loadFromFireStore());

    await Promise.all([loadShopTag, loadShopCategories, loadUserRoles])
      .then(() => {
        resolve({ status: "success" });
      })
      .catch(error => {
        reject(error);
      });
  });
};
 export default onBoot;