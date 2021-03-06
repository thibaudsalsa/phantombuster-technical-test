import {Browser, Page} from "puppeteer-core";

///////////////// TYPES ////////////////////////////////////////

// it will be more explicit when you read the code
// more than that create a type for error will allow to create much more sophisticated errors
export type PhantomError = unknown;

export type PhantomQuery = string | string[];

// object with all puppeteers inside
export interface PhantomBrowser {
    browser: Browser;
    page: Page;
}

// argmuent you can send to the phantom
// url will be the url of the website and query will be your search
// in the end the phantom try to concat those two
export interface PhantomArgument {
    url: string;
    query: PhantomQuery;
    pageToProcess: number;
}

// data that should be returned by the scrapper
export interface Recipe {
    name: string;
    url: string;
    score: string;
    reviewsNumber: string;
}