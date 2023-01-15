"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_query_1 = require("react-query");
function isError(error) {
    return error instanceof Error;
}
const App = () => {
    var _a;
    const getItems = () => __awaiter(void 0, void 0, void 0, function* () { return yield (yield fetch("/api/items")).json(); });
    const query = (0, react_query_1.useQuery)("items", getItems);
    if (query.isLoading) {
        return react_1.default.createElement("span", null, "Loading...");
    }
    if (query.isError && isError(query.error)) {
        return react_1.default.createElement("span", null,
            "Error: ",
            query.error.message);
    }
    return (react_1.default.createElement("div", null,
        "My todos:",
        react_1.default.createElement("ol", null, (_a = query.data) === null || _a === void 0 ? void 0 : _a.map((item) => (react_1.default.createElement("li", null, item.text))))));
};
exports.default = App;
