import { database } from "../../marslab-library-react/utils/helper";

const objectName = "shop";

export const GeoPoint = database.GeoPoint;

export function readObjects() {
  return new Promise((resolve, reject) => {
    database
      .readTable({ ref: `${objectName}Private0` })
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

          const l = {
            _lat: data.l.latitude, 
            _long: data.l.longitude
          }

          const parent = database.processData({data});
          const created = database.processData({data: data.created});
          const deleted = database.processData({data: data.deleted});
          const updated = database.processData({data: data.updated});

          const processedData = { ...parent, created, deleted, updated, l }

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

        const l = {
          _lat: data.l.latitude, 
          _long: data.l.longitude
        }

        const parent = database.processData({ data });
        const created = database.processData({ data: data.created });
        const deleted = database.processData({ data: data.deleted });
        const updated = database.processData({ data: data.updated });

        const processedData = { ...parent, created, deleted, updated, l };

        resolve(processedData);
      })
      .catch(error => {
        reject(error);
      });
  });
}
