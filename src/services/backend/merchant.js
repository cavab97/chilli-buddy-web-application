import { backend } from "../../marslab-library-react/utils/helper";

const objectName = "Merchant";

export function signup({ data }) {
  return new Promise((resolve, reject) => {
    const apiName = `httpAuth${objectName}Create`;

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

export function create({ data }, shopID) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Create`;

    const {
      displayName,
      name,
      address,
      dateOfBirth,
      identityNumber,
      gender,
      email,
      phoneNumber,
      notificationToken,
      photoURL,
      role,
      shopIds,
    } = data;

    shopIds.push(shopID);

    data = {
      displayName,
      name,
      address,
      dateOfBirth,
      identityNumber,
      gender,
      email,
      phoneNumber,
      notificationToken,
      photoURL,
      role,
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
      displayName,
      name,
      address,
      dateOfBirth,
      identityNumber,
      gender,
      email,
      photoURL,
      shopIds,
    } = data;

    data = {
      displayName,
      name,
      address,
      dateOfBirth,
      identityNumber,
      gender,
      email,
      photoURL,
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
