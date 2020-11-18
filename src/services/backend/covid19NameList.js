import { backend } from "../../marslab-library-react/utils/helper";

const objectName = "Covid19NameList";

export function create(
    {
        data: { name, phoneNumber, identityNumber, temperature, userIds },
    },
    userID
) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Create`;

    if(userID){
        userIds.push(userID);
    }

    const temperatureData = backend.processData({
        data: { temperature },
    });

    const data = {
      name,
      phoneNumber,
      identityNumber,
      ...temperatureData,
      userIds
    }

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

// export function update({
//   data: { id, title, subtitle, description, images, address, l, g },
// }) {
//   return new Promise((resolve, reject) => {
//     const apiName = `http${objectName}Update`;

//     l = backend.processData({
//       data: l,
//     });
//     const data = backend.processData({
//       data: { id, title, subtitle, description, images, address, l, g },
//     });
//     backend
//       .callApi({ apiName, data })
//       .then((result) => {
//         resolve(result);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// }

// export function remove({ data: { id } }) {
//   return new Promise((resolve, reject) => {
//     const apiName = `http${objectName}Delete`;

//     const data = backend.processData({
//       data: {
//         id,
//       }
//     });

//     backend
//       .callApi({ apiName, data })
//       .then((result) => {
//         resolve(result);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// }

// export function restore({ data: { id } }) {
//   return new Promise((resolve, reject) => {
//     const apiName = `http${objectName}Restore`;

//     const data = backend.processData({
//       data: {
//         id,
//       }
//     });

//     backend
//       .callApi({ apiName, data })
//       .then((result) => {
//         resolve(result);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// }
