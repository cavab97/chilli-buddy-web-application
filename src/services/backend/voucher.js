import { backend } from "../../marslab-library-react/utils/helper";

const objectName = "Voucher";

export function create({ data }) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Create`;

    const {
      title,
      description,
      amount,
      tnc,
      startDate,
      endDate,
      merchantIds,
      quantity,
      type
    } = data;

    data = {
      title,
      description,
      amount,
      tnc,
      startDate,
      endDate,
      merchantIds,
      quantity,
      type
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
      amount,
      tnc,
      startDate,
      endDate,
      merchantIds,
      type
    } = data;

    data = {
      id,
      title,
      description,
      amount,
      tnc,
      startDate,
      endDate,
      merchantIds,
      type
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
