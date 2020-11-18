import { storage } from "../../marslab-library-react/utils/helper";

const objectName = "posts";

export function uploadFile({ advertisementId, file = null, progressListener = null }) {
  return new Promise((resolve, reject) => {
    const ref = `${objectName}/${advertisementId}`;

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