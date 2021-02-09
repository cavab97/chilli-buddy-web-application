import { backend } from "../../marslab-library-react/utils/helper";

const objectName = "ShopPost";

export function create({ data }, shopID) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Create`;
    
    const {
      id,
      title,
      description,
      startTime,
      endTime,
      coverPhoto,
      images,
      shopIds,
    } = data;

    shopIds.push(shopID)

    data = {
      id,
      title,
      description,
      startTime,
      endTime,
      coverPhoto,
      images,
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

export function update({ data }) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Update`;

    const {
      id,
      title,
      description,
      startTime,
      endTime,
      coverPhoto,
      images,
    } = data;

    data = {
      id,
      title,
      description,
      startTime,
      endTime,
      coverPhoto,
      images,
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

export function remove({ data: { id } }) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Delete`;

    const data = backend.processData({
      data: {
        id,
      }
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

export function restore({ data: { id } }) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Restore`;

    const data = backend.processData({
      data: {
        id,
      }
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
