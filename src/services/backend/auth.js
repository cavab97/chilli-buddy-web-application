import { backend } from "../../marslab-library-react/utils/helper";

const objectName = "Auth";

export function signup({ data }) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Create`;

    const {
      email,
      password
    } = data;

    data = {
      email,
      password
    };

    data = backend.processData({ data });

    backend
      .callApi({ apiName, data })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
