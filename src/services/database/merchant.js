import { database } from "../../marslab-library-react/utils/helper";

const objectName = "user";

export function readObjects({ groupId }) {
  return new Promise((resolve, reject) => {
    database
      .readTable({ ref: `${objectName}Private0` })
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
