import { backend } from "../../marslab-library-react/utils/helper";

export function create({
  data: {
    id,
    title,
    displayTitle,
    subtitle,
    description,
    logo,
    images,
    facebookUrl,
    instagramUrl,
    websiteUrl,
    whatsapp,
    phoneNumber,
    email,
    address,
    operatingHour,
    merchants,
    manager,
    supervisor,
    worker,
    tags,
    categories,
    dateJoined,
    totalMissions,
    l,
    g,
  },
}) {
  return new Promise((resolve, reject) => {
    const apiName = "httpShopCreate";

    l = backend.processData({
      data: l,
    });

    const data = backend.processData({
      data: {
        id,
        title,
        displayTitle,
        subtitle,
        description,
        logo,
        images,
        facebookUrl,
        instagramUrl,
        websiteUrl,
        whatsapp,
        phoneNumber,
        email,
        address,
        operatingHour,
        merchants,
        manager,
        supervisor,
        worker,
        tags,
        categories,
        dateJoined,
        totalMissions,
        l,
        g,
      },
      exceptionField: ["phoneNumber", "categories", "tags", "whatsapp"],
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

export function update({
  data: {
    id,
    title,
    displayTitle,
    subtitle,
    description,
    logo,
    images,
    facebookUrl,
    instagramUrl,
    websiteUrl,
    whatsapp,
    phoneNumber,
    email,
    address,
    operatingHour,
    merchants,
    manager,
    supervisor,
    worker,
    tags,
    categories,
    dateJoined,
    l,
    g,
  },
}) {
  return new Promise((resolve, reject) => {
    const apiName = "httpShopUpdate";

    l = backend.processData({
      data: l,
    });

    const data = backend.processData({
      data: {
        id,
        title,
        displayTitle,
        subtitle,
        description,
        logo,
        images,
        facebookUrl,
        instagramUrl,
        websiteUrl,
        whatsapp,
        phoneNumber,
        email,
        address,
        operatingHour,
        merchants,
        manager,
        supervisor,
        worker,
        tags,
        categories,
        dateJoined,
        l,
        g,
      },
      exceptionField: ["phoneNumber", "categories", "tags", "whatsapp"],
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

export function remove({ data: { id } }) {
  return new Promise((resolve, reject) => {
    const apiName = "httpShopDelete";

    const data = backend.processData({
      data: {
        id,
      }
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

export function restore({ data: { id } }) {
  return new Promise((resolve, reject) => {
    const apiName = "httpShopRestore";

    const data = backend.processData({
      data: {
        id,
      }
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
