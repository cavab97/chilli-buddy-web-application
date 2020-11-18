import { database } from "../../marslab-library-react/utils/helper";

const objectGroupName = "route";
const objectName = "routeTicket";

export const GeoPoint = database.GeoPoint;

export function readObjects({ startTime, endTime  }) {
  return new Promise((resolve, reject) => {
    startTime = startTime.toDate()
    endTime = endTime.toDate()

    database
      .readTable({ ref: `${objectName}Private0` })
      .where("created.at", ">=", startTime)
      .where("created.at", "<=", endTime)
      .get()
      .then(QuerySnapshot => {
        const result = [];
        QuerySnapshot.forEach(snapshot => {
          const data = {
            ...snapshot.data(),
            id: snapshot.id
          };

          const parent = database.processData({ data });
          const created = database.processData({ data: data.created });
          const deleted = database.processData({ data: data.deleted });
          const updated = database.processData({ data: data.updated });

          const processedData = { ...parent, created, deleted, updated };

          result.push(processedData);
        });
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

let listener = () => {};

export function listenObjectsByObjectGroup({ groupId = null, updateListener = () => {} }) {
    listener = database
      .readTable({ ref: `${objectName}Private0` })
      .where("routeIds", "==", [groupId])
      .onSnapshot(QuerySnapshot => {
        const result = [];
        QuerySnapshot.forEach(snapshot => {
          const data = {
            ...snapshot.data(),
            id: snapshot.id
          };

          const parent = database.processData({ data });
          const created = database.processData({ data: data.created });
          const deleted = database.processData({ data: data.deleted });
          const updated = database.processData({ data: data.updated });

          const processedData = { ...parent, created, deleted, updated };

          result.push(processedData);
        });
        updateListener(result);
      })
      /* .catch(error => {
        reject(error);
      }); */
}

export function unlistenObjectsByObjectGroup() {
  listener();
}

export function readObject({ id }) {
  return new Promise((resolve, reject) => {
    database
      .readData({ ref: `${objectName}Private0/${id}` })
      .then(snapshot => {

        const data = {
          ...snapshot,
          id: snapshot.id
        };


        const parent = database.processData({ data });
        const created = database.processData({ data: data.created });
        const deleted = database.processData({ data: data.deleted });
        const updated = database.processData({ data: data.updated });

        const processedData = { ...parent, created, deleted, updated };

        resolve(processedData);
      })
      .catch(error => {
        reject(error);
      });
  });
}
