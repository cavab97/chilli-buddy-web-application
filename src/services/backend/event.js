import { backend } from "../../marslab-library-react/utils/helper";

const objectName = "Event";

export function create({
  data: {
    id,
    title,
    type,
    subtitle,
    description,
    images,
    rules,
    terms,
    startTime,
    endTime,
  },
}) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Create`;

    const data = backend.processData({
      data: {
        id,
        title,
        type,
        subtitle,
        description,
        images,
        rules,
        terms,
        startTime,
        endTime,
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

export function update({
  data: {
    id,
    title,
    type,
    subtitle,
    description,
    images,
    rules,
    terms,
    startTime,
    endTime,
  },
}) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Update`;

    const data = backend.processData({
      data: {
        id,
        title,
        type,
        subtitle,
        description,
        images,
        rules,
        terms,
        startTime,
        endTime,
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

export function remove({ data: { id } }) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Delete`;

    const data = backend.processData({
      data: {
        id,
      }
    });

    backend
      .callApi({ apiName,  data })
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

export function publish({ data: { id } }) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Publish`;

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

export function terminate({ data: { id } }) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Terminate`;
    
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
