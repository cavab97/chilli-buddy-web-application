import { storage } from "../../marslab-library-react/utils/helper";

const objectName = "transaction";

export function uploadFile({ id, file = null, progressListener = null }) {
  return new Promise((resolve, reject) => {
    const ref = `${objectName}/${id}`;

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
