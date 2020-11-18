import { backend } from "../../marslab-library-react/utils/helper";

const objectName = "Covid19Shop";

export function create(
    {
        data: { businessName, ssmNumber, referral, address, userIds },
    },
    userID
) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Create`;

    if(userID){
        userIds.push(userID);
    }

    const data = backend.processData({
        data: { businessName, ssmNumber, referral, address, userIds },
    });
    console.log(data);
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

export function update({
  data: { id, businessName, ssmNumber, referral, address },
}) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Update`;

    const data = backend.processData({
      data: { id, businessName, ssmNumber, referral, address },
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
