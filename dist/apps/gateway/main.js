/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const app_controller_1 = __webpack_require__(5);
const app_service_1 = __webpack_require__(6);
const app_config_1 = __webpack_require__(7);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [app_config_1.AppConfigModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const app_service_1 = __webpack_require__(6);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
};
exports.AppController = AppController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getData", null);
exports.AppController = AppController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
let AppService = class AppService {
    getData() {
        return { message: 'Hello API' };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(8), exports);
tslib_1.__exportStar(__webpack_require__(13), exports);
tslib_1.__exportStar(__webpack_require__(24), exports);
tslib_1.__exportStar(__webpack_require__(14), exports);


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppConfigModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const config_1 = __webpack_require__(9);
const app_1 = __webpack_require__(10);
const app_config_service_1 = __webpack_require__(13);
const app_env_schema_1 = __webpack_require__(24);
const shared_1 = __webpack_require__(15);
const path_1 = tslib_1.__importDefault(__webpack_require__(12));
let AppConfigModule = class AppConfigModule {
};
exports.AppConfigModule = AppConfigModule;
exports.AppConfigModule = AppConfigModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                cache: process.env.NODE_ENV === shared_1.Environment.Production,
                envFilePath: [
                    path_1.default.resolve(app_1.PROJECT_ROOT, `.env.local`),
                    path_1.default.resolve(app_1.PROJECT_ROOT, `.env`),
                ],
                ignoreEnvVars: process.env['NODE_ENV'] === shared_1.Environment.Development,
                validate: (config) => (0, shared_1.validateObject)(app_env_schema_1.AppEnvSchema, config),
            }),
        ],
        providers: [app_config_service_1.AppConfigService],
        exports: [app_config_service_1.AppConfigService],
    })
], AppConfigModule);


/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(11), exports);


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PROJECT_ROOT = void 0;
const tslib_1 = __webpack_require__(4);
const path_1 = tslib_1.__importDefault(__webpack_require__(12));
exports.PROJECT_ROOT = path_1.default.resolve('apps', 'gateway');


/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppConfigService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const config_1 = __webpack_require__(9);
const env_constant_1 = __webpack_require__(14);
const shared_1 = __webpack_require__(15);
let AppConfigService = class AppConfigService {
    constructor(configService) {
        this.configService = configService;
    }
    get env() {
        return {
            nodeEnv: this.configService.getOrThrow(env_constant_1.EnvField.NODE_ENV),
            isProduction: this.configService.getOrThrow(env_constant_1.EnvField.NODE_ENV) ===
                shared_1.Environment.Production,
        };
    }
    get server() {
        return {
            port: this.configService.getOrThrow(env_constant_1.EnvField.SERVER_PORT),
        };
    }
};
exports.AppConfigService = AppConfigService;
exports.AppConfigService = AppConfigService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], AppConfigService);


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EnvField = void 0;
var EnvField;
(function (EnvField) {
    EnvField["NODE_ENV"] = "NODE_ENV";
    EnvField["SERVER_PORT"] = "SERVER_PORT";
})(EnvField || (exports.EnvField = EnvField = {}));


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(16), exports);
tslib_1.__exportStar(__webpack_require__(22), exports);


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(17), exports);
tslib_1.__exportStar(__webpack_require__(20), exports);


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MatchesWithProperty = void 0;
const class_validator_1 = __webpack_require__(18);
const validatos_constraint_1 = __webpack_require__(19);
const MatchesWithProperty = (type, property, validationOptions) => {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: validatos_constraint_1.MatchConstraint,
        });
    };
};
exports.MatchesWithProperty = MatchesWithProperty;


/***/ }),
/* 18 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MatchConstraint = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(18);
let MatchConstraint = class MatchConstraint {
    validate(value, args) {
        const [fn] = args.constraints;
        return fn(args.object) === value;
    }
    defaultMessage(args) {
        const [constraintProperty] = args.constraints;
        return `${(constraintProperty + '').split('.')[1]} and ${args.property} does not match`;
    }
};
exports.MatchConstraint = MatchConstraint;
exports.MatchConstraint = MatchConstraint = tslib_1.__decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'Match' })
], MatchConstraint);


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateObject = validateObject;
const class_transformer_1 = __webpack_require__(21);
const class_validator_1 = __webpack_require__(18);
function validateObject(objClass, object) {
    const validatedObject = (0, class_transformer_1.plainToInstance)(objClass, object, {
        enableImplicitConversion: true,
    });
    const errors = (0, class_validator_1.validateSync)(validatedObject, {
        skipMissingProperties: false,
    });
    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedObject;
}


/***/ }),
/* 21 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(23), exports);


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Environment = void 0;
var Environment;
(function (Environment) {
    Environment["Development"] = "development";
    Environment["Production"] = "production";
})(Environment || (exports.Environment = Environment = {}));


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppEnvSchema = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(18);
const env_constant_1 = __webpack_require__(14);
const shared_1 = __webpack_require__(15);
class AppEnvSchema {
}
exports.AppEnvSchema = AppEnvSchema;
_b = env_constant_1.EnvField.NODE_ENV, _c = env_constant_1.EnvField.SERVER_PORT;
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(shared_1.Environment),
    tslib_1.__metadata("design:type", typeof (_a = typeof shared_1.Environment !== "undefined" && shared_1.Environment) === "function" ? _a : Object)
], AppEnvSchema.prototype, _b, void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Max)(65535),
    (0, class_validator_1.Min)(1001),
    tslib_1.__metadata("design:type", Number)
], AppEnvSchema.prototype, _c, void 0);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
const app_config_1 = __webpack_require__(7);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const appConfigService = app.get(app_config_1.AppConfigService);
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const { server: { port }, } = appConfigService;
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
void bootstrap();

})();

/******/ })()
;