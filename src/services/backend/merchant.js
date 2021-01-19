import { backend } from "../../marslab-library-react/utils/helper";

const objectName = "Merchant";

export function create({ data }) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Create`;

    const {
      businessName,
      businessRegistrationNumber,
      superadmin,
    } = data;

    data = {
      businessName,
      businessRegistrationNumber,
      superadmin,
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
      businessName,
      businessRegistrationNumber,
      superadmin,
      logo
    } = data;

    data = {
      id,
      businessName,
      businessRegistrationNumber,
      superadmin,
      logo
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
    backend
      .callApi({ apiName, data: { id } })
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
      },
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
