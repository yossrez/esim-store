import ky from "ky";

const kyClient = ky.create({ prefixUrl: "/api" });

export default kyClient;
