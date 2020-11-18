import { backend } from "../../marslab-library-react/utils/helper";

const objectName = "Mission";

export function create({ data }, routeID) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Create`;

    const {
      id,
      title,
      subtitle,
      description,
      images,
      shopIds,
      routeIds,
      minSpend,
    } = data;

    routeIds.push(routeID);

    data = {
      id,
      title,
      subtitle,
      description,
      images,
      shopIds,
      routeIds,
      minSpend,
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

    const { id, title, subtitle, description, images, minSpend } = data;

    data = {
      id,
      title,
      subtitle,
      description,
      images,
      minSpend,
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

export function remove({ data: { id, routeIds } }) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Delete`;
    backend
      .callApi({ apiName, data: { id, routeIds } })
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
