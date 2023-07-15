"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid"); // this is a library that helps us validate our environment variables and make sure that they are present and of the correct type
const validators_1 = require("envalid/dist/validators");
exports.default = (0, envalid_1.cleanEnv)(process.env, {
    MONGO_URI: (0, validators_1.str)(),
    PORT: (0, validators_1.port)(),
});
