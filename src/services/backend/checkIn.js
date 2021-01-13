import { backend } from "../../marslab-library-react/utils/helper";

const objectName = "CheckInTicket";

export function create({ data }, shopID) {
    return new Promise((resolve, reject) => {
      const apiName = `http${objectName}Create`;
  
      const {
        id,
        title,
        coverPhotos,
        images,
        startTime,
        endTime,
        shopIds,
      } = data;
  
      shopIds.push(shopID);
  
      data = {
        id,
        title,
        coverPhotos,
        images,
        startTime,
        endTime,
        shopIds,
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

export function update({
    data: { id, businessName, ssmNumber, referral, address },
  }) {
    return new Promise((resolve, reject) => {
      const apiName = `http${objectName}Update`;
  
      const data = backend.processData({
        data: { id, businessName, ssmNumber, referral, address },
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