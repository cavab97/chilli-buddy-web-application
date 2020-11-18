import { database } from "../../marslab-library-react/utils/helper";

const objectName = "covid19NameList";

export function readObjects({groupId}) {
  return new Promise((resolve, reject) => {
    database
      .readTable({ ref: `${objectName}Private0` })
      .where("deleted.by", "==", null)
      .where("userIds", "array-contains", groupId)
      .orderBy("date","desc")
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

export function readByDates({groupId, startDate, endDate}) {
  return new Promise((resolve, reject) => {
    startDate = startDate.toDate();
    endDate = endDate.toDate();

    database
      .readTable({ ref: `${objectName}Private0` })
      .where("deleted.by", "==", null)
      .where("userIds", "array-contains", groupId)
      .where("date", ">=", startDate)
      .where("date", "<=", endDate)
      .orderBy("date","desc")
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
