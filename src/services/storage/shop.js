import { storage } from "../../marslab-library-react/utils/helper";

const objectName = "shop";

export function uploadFile({ shopId, file = null, progressListener = null }) {
  return new Promise((resolve, reject) => {
    const ref = `${objectName}/${shopId}`;

    storage
      .uploadFile({ ref, file, progressListener })
      .then(({ url }) => {
        resolve({ url });
      })
      .catch(error => {
        reject(error);
      });
  });
}
