import { database } from "../../marslab-library-react/utils/helper";

const objectName = "merchant"
const subjectName = "user";

export function readSubjects({ groupId }) {
  return new Promise((resolve, reject) => {
    database
      .readTable({ ref: `${subjectName}Private0` })
      .where("deleted.by", "==", null)
      .where("userIds", "array-contains", groupId)
      .where("user.role.merchant", "==", true)
      .orderBy("date", "desc")
      .get()
      .then((QuerySnapshot) => {
        const result = [];
        QuerySnapshot.forEach((snapshot) => {
          const data = {
            ...snapshot.data(),
            id: snapshot.id,
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
      .catch((error) => {
        reject(error);
      });
  });
}


export function readObjects() {
  return new Promise((resolve, reject) => {
    database
      .readTable({ ref: `${objectName}Private0` })
      .where("deleted.by", "==", null)
      .orderBy("created.at","desc")
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

export function readSubjectObject({ uid }) {
  return new Promise((resolve, reject) => {
    database
      .readTable({ ref: `${objectName}Private0` })
      .where("deleted.by", "==", null)
      .where("superadmin", "==", [uid])
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