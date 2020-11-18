import { backend } from "../../marslab-library-react/utils/helper";

const objectName = "RouteTicket";

// export function create({ data }, routeGroupID) {
//   return new Promise((resolve, reject) => {
//     const apiName = `http${objectName}Create`;

//     const {
//       id,
//       title,
//       type,
//       subtitle,
//       description,
//       images,
//       rules,
//       terms,
//       startTime,
//       endTime,
//       minimumUser,
//       station,
//       routeGroupId
//     } = data;

//     routeGroupId.push(routeGroupID)

//     data = {
//       id,
//       title,
//       type,
//       subtitle,
//       description,
//       images,
//       rules,
//       terms,
//       startTime,
//       endTime,
//       minimumUser,
//       station,
//       routeGroupId
//     };

//     data = backend.processData({ data });
//     console.log(data);
    
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

export function verify({ data }) {
  return new Promise((resolve, reject) => {
    const apiName = `http${objectName}Verify`;

    const {
      id,
      verify
    } = data;

    data = {
      id,
      verify
    };

    data = backend.processData({ data });

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