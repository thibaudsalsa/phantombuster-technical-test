"phantombuster command: nodejs";
"phantombuster package: 6";
"phantombuster flags: save-folder";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import Buster from "phantombuster";
import * as puppeteer from "puppeteer-core";
// default config if you don't give (or don't gice enougth) argument
// all argument you are going to gave will override this config
export var DEFAULT_PHANTOM_ARGUMENT = {
    url: "https://www.marmiton.org/recettes/recherche.aspx?aqt=",
    query: ""
};
// Config of the puppeteers browser
export var PUPPETEERS_CONFIG = {
    // This is needed to run Puppeteer in a Phantombuster container
    args: ["--no-sandbox"]
};
/**
 * create a PhantomBrowser and init it
 * it will create a browser and a dedicated page with puppeteer
 * no need to do the cleaning if it fail
 * RETURN a promise with a PhantomBrowser object in it
 */
function initPhantomBrowser() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, err_1, page, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (puppeteer === null || puppeteer === void 0 ? void 0 : puppeteer.launch(PUPPETEERS_CONFIG))];
                case 1:
                    browser = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error("Cannot create browser page", err_1);
                    throw err_1;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, (browser === null || browser === void 0 ? void 0 : browser.newPage())];
                case 4:
                    page = _a.sent();
                    return [2 /*return*/, { browser: browser, page: page }];
                case 5:
                    err_2 = _a.sent();
                    console.error("Cannot create browser page", err_2);
                    browser === null || browser === void 0 ? void 0 : browser.close();
                    throw err_2;
                case 6: return [2 /*return*/];
            }
        });
    });
}
/**
 * This methode will clean the PhantomeBrowser by closing page and the browser
 * @param phantomBrowser object with a puppeteers browser and his dedicated page
 * RETURN an empty promise
 */
function cleanPhantomBrowser(phantomBrowser) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var err_3, err_4;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, ((_a = phantomBrowser === null || phantomBrowser === void 0 ? void 0 : phantomBrowser.page) === null || _a === void 0 ? void 0 : _a.close())];
                case 1:
                    _c.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _c.sent();
                    console.error("Cannot close browser page.");
                    return [3 /*break*/, 3];
                case 3:
                    _c.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, ((_b = phantomBrowser === null || phantomBrowser === void 0 ? void 0 : phantomBrowser.browser) === null || _b === void 0 ? void 0 : _b.close())];
                case 4:
                    _c.sent();
                    return [3 /*break*/, 6];
                case 5:
                    err_4 = _c.sent();
                    console.error("Cannot close browser");
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
/**
 * scrap a website and get some specific data
 * @param phantomBrowser object with a puppeteers browser and his dedicated page
 * @param phantomArgument object with the url of the page and the recipe you are looking for
 * RETURN a promise with an Array of Recipes
 */
function scrap(phantomBrowser, phantomArgument) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var query, url, data;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    query = (typeof phantomArgument.query === "object"
                        ? (_a = phantomArgument.query) === null || _a === void 0 ? void 0 : _a.join("-")
                        : (_b = phantomArgument.query) === null || _b === void 0 ? void 0 : _b.replace(" ", "-")) || "";
                    url = ((phantomArgument === null || phantomArgument === void 0 ? void 0 : phantomArgument.url) || "") + query;
                    return [4 /*yield*/, ((_c = phantomBrowser === null || phantomBrowser === void 0 ? void 0 : phantomBrowser.page) === null || _c === void 0 ? void 0 : _c.goto(url))];
                case 1:
                    _e.sent();
                    return [4 /*yield*/, ((_d = phantomBrowser === null || phantomBrowser === void 0 ? void 0 : phantomBrowser.page) === null || _d === void 0 ? void 0 : _d.evaluate(function () {
                            var _a, _b, _c;
                            var websiteRecipes = [];
                            var containerDiv = document.getElementsByClassName("MRTN__sc-1gofnyi-0 YLcEb")[0];
                            var listOfRecipes = containerDiv.getElementsByTagName("a");
                            for (var i = 0; i < (listOfRecipes === null || listOfRecipes === void 0 ? void 0 : listOfRecipes.length); i++) {
                                var _d = (_b = (_a = listOfRecipes[i]) === null || _a === void 0 ? void 0 : _a.innerText) === null || _b === void 0 ? void 0 : _b.split("\n"), name_1 = _d[0], score = _d[1], reviewsNumber = _d[2];
                                websiteRecipes.push({
                                    url: (_c = listOfRecipes[i]) === null || _c === void 0 ? void 0 : _c.href,
                                    name: name_1,
                                    score: score,
                                    reviewsNumber: reviewsNumber
                                });
                            }
                            return websiteRecipes;
                        }))];
                case 2:
                    data = _e.sent();
                    return [2 /*return*/, data || []];
            }
        });
    });
}
/**
 * Core function to run the phantom
 * it will init a puppeteer browser and page
 * it will scrap data of a website
 * it will clean the browser and the page when finish / failed
 * RETURN an empty promise
 */
function runPhantom() {
    return __awaiter(this, void 0, void 0, function () {
        var buster, argument, phantomBrowser, recipes, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    buster = new Buster();
                    argument = __assign(__assign({}, DEFAULT_PHANTOM_ARGUMENT), buster.argument);
                    return [4 /*yield*/, initPhantomBrowser()];
                case 1:
                    phantomBrowser = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 6, , 7]);
                    return [4 /*yield*/, scrap(phantomBrowser, argument)];
                case 3:
                    recipes = _a.sent();
                    if (!recipes) return [3 /*break*/, 5];
                    return [4 /*yield*/, buster.setResultObject(recipes)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_5 = _a.sent();
                    console.error("Error while scrapping", err_5);
                    // if there is an error we have to clean the browser
                    return [2 /*return*/, cleanPhantomBrowser(phantomBrowser)
                            .then(function () { return console.error("Cleaning after error is done"); })
                            .catch(function (err) {
                            console.error("Error while cleaning ?");
                            throw err;
                        })];
                case 7: return [2 /*return*/, cleanPhantomBrowser(phantomBrowser)];
            }
        });
    });
}
// this is where we are running the code !
runPhantom()
    .then(function () {
    console.log("I'm done, time to go to sleep ...");
    process.exit();
})
    .catch(function (err) {
    console.error("The phantom finished with some error ...", err);
    process.exit();
});
