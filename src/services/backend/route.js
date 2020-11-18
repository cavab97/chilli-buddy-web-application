import { backend } from "../../marslab-library-react/utils/helper";

const objectName = "Route";

export function create({ data }, routeGroupID) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Create`;

    const {
      id,
      title,
      type,
      category,
      subtitle,
      description,
      images,
      rules,
      terms,
      startTime,
      endTime,
      minimumUser,
      station,
      routeGroupId
    } = data;

    routeGroupId.push(routeGroupID)

    data = {
      id,
      title,
      type,
      category,
      subtitle,
      description,
      images,
      rules,
      terms,
      startTime,
      endTime,
      minimumUser,
      station,
      routeGroupId
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
      type,
      subtitle,
      description,
      images,
      rules,
      terms,
      startTime,
      endTime,
      minimumUser,
      station
    } = data;

    data = {
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
      minimumUser,
      station
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

export function assignComplete({ data }) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}AssignCompleted`;
    
    const {
      id,
    } = data;

    data = {
      id,
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