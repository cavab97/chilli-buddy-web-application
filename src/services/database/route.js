import { database } from "../../marslab-library-react/utils/helper";

const objectGroupName = "routeGroup"
const objectName = "route";

export const GeoPoint = database.GeoPoint;

export function readObjects({groupId}) {
  return new Promise((resolve, reject) => {
    database
      .readTable({ ref: `${objectName}Private0` })
      .where("routeGroupId", "array-contains", groupId)
      .where("deleted.by", "==", null)
      .get()
      .then(QuerySnapshot => {
        const result = [];
        QuerySnapshot.forEach(snapshot => {
          const data = {
            ...snapshot.data(),
            ...snapshot.data().d,
            id: snapshot.id
          };
          delete data["d"];

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

export function readObject({ id }) {
  return new Promise((resolve, reject) => {
    database
      .readData({ ref: `${objectName}Private0/${id}` })
      .then(snapshot => {

        const data = {
          ...snapshot,
          ...snapshot.d,
          id: snapshot.id
        };

        delete data["d"];

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

let objectListener = () => {};

export function listenObject({ objectId = null, updateListener = () => {} }) {
  objectListener = database
    .readRecord({ ref: `${objectName}Public0/${objectId}` })
    .onSnapshot((snapshot) => {
      const data = {
        ...snapshot.data(),
        id: snapshot.id,
      };

      const parent = database.processData({ data });
      const created = database.processData({ data: data.created });
      const deleted = database.processData({ data: data.deleted });
      const updated = database.processData({ data: data.updated });

      const processedData = {
        ...parent,
        created,
        deleted,
        updated
      };

      updateListener(processedData);
    });
}

export function unlistenObject() {
  objectListener();
}