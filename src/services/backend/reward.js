import { backend } from "../../marslab-library-react/utils/helper";

const objectName = "Reward";

export function create(
  {
    data: {
      id,
      rank,
      title,
      subtitle,
      description,
      images,
      routeIds,
      eventIds,
      quantity
    },
  },
  { routeID, eventID }
) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Create`;

    if (routeID) {
      routeIds.push(routeID);
    }

    if (eventID) {
      eventIds.push(eventID);
    }

    const data = backend.processData({
      data: {
        id,
        rank,
        title,
        subtitle,
        description,
        images,
        routeIds,
        eventIds,
        quantity
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

export function update({ data }) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Update`;

    const { id, rank, title, subtitle, description, images } = data;

    data = {
      id,
      rank,
      title,
      subtitle,
      description,
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

export function remove({ data: { id, routeIds, eventIds } }) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Delete`;

    const data = backend.processData({
      data: {
        id,
        routeIds,
        eventIds,
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

export function assign({ data:{
  id,
  userIds,
  eventIds = [],
  routeIds = [],
  routeTicketIds = [],
} }) {

  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Assign`;

    const data = backend.processData({ data: { id, userIds, eventIds, routeIds, routeTicketIds } });

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

export function claim({ data:{
  id,
} }) {

  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Claim`;

    const data = backend.processData({ data:{ id } });

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
