export default onLogin = () => {
    return new Promise(async (resolve, reject) => {

        await Promise.all([])
            .then(() => {
                resolve({ status: "success" });
            })
            .catch(error => {
                reject(error);
            });
    });
};
