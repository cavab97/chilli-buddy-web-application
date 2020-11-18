//import { database } from "../../marslab-library-react/utils/helper";
import FirebaseHelper from 'marslab-library-react/utils/helper/firebase';

const {
    database,
  } = FirebaseHelper;

const objectGroupName = "settings";
const documentName = 'shops';
const objectName = "categories";

export function readSpecifyObjects({ id }) {
  return new Promise((resolve, reject) => {
    database
        .collection(objectGroupName)
        .doc(documentName)
        .collection(objectName)
        .where('tags', 'array-contains', id)
        .where('deleted_at', '==', null)
        .orderBy('no', 'asc')
        .get()
        .then(QuerySnapshot => {
            const result = [];
            QuerySnapshot.forEach(snapshot => {
              const data = {
                ...snapshot.data(),
                id: snapshot.id
              };

                // const parent = database.processData({ data });

                // const processedData = { ...parent };

                result.push(data);
            });
            resolve(result);
        })
        .catch(error => {
            reject(error);
        });
    });
}