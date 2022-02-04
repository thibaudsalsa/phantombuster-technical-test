import {Browser, Page, LaunchOptions} from "puppeteer";

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
    url ?: string;
    query ?: PhantomQuery;
}

// data that should be returned by the scrapper
export interface Recipe {
    name: string;
    url: string;
    score: number;
    reviewsNumber: number;
}





///////////////// CONST ////////////////////////////////////////

// default config if you don't give (or don't gice enougth) argument
// all argument you are going to gave will override this config
export const DEFAULT_PHANTOM_ARGUMENT: PhantomArgument = {
    url: "https://www.marmiton.org/recettes/recherche.aspx?aqt=",
    query: ""
}

// Config of the puppeteers browser
export const PUPPETEERS_CONFIG: LaunchOptions = {
    // This is needed to run Puppeteer in a Phantombuster container
    args: ["--no-sandbox"]
};