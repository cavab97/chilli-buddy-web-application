import { backend } from "../../marslab-library-react/utils/helper";

const objectName = "Info";

export function update({
  data: { title, subtitle, description, images, headerImages, share },
}) {
  return new Promise((resolve, reject) => {
    const apiName = `httpSettingInfoUpdate`;
    
    const data = backend.processData({
      data: { title, subtitle, description, images, headerImages, share },
    });

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
