import { database } from "../../marslab-library-react/utils/helper";

const objectName = "reward";

export const GeoPoint = database.GeoPoint;

export function readObjects({groupId, objectGroupName}) {
  return new Promise((resolve, reject) => {
    database
      .readTable({ ref: `${objectGroupName}Packaging0/${groupId}/${objectName}Packaging0` })
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

export function readNextRank({groupId, objectGroupName}) {
  return new Promise((resolve, reject) => {
    database
      .readTable({ ref: `${objectGroupName}Packaging0/${groupId}/${objectName}Packaging0` })
      .where("deleted.by", "==", null)
      .orderBy("rank", "desc")
      .limit(1)
      .get()
      .then(QuerySnapshot => {
        let rank = 1;

        QuerySnapshot.forEach(snapshot => {
          const data = {
            ...snapshot.data(),
          };

          const parent = database.processData({ data });

          rank = ++parent.rank;
        });

        resolve(rank);
      })
      .catch(error => {
        reject(error);
      });
  });
}