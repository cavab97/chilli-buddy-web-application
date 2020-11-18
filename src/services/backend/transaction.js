import {backend} from "../../marslab-library-react/utils/helper";

const objectName = "Transaction"

export function create({
  data
}) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Create`;

    data = backend.processData({data})

    backend
      .callApi({ apiName, data })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function update({
  data
}) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Update`;

    data = backend.processData({data})

    backend
      .callApi({ apiName, data })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function remove({
  data
}) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Delete`;
    backend
      .callApi({ apiName, data })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function restore({
  data
}) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Restore`;
    backend
      .callApi({ apiName, data })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function approve({
  data: { id = null}
}) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Approve`;
    backend
      .callApi({ apiName, data:{id} })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function reject({
  data: { id = null}
}) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Reject`;
    backend
      .callApi({ apiName, data:{id} })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}