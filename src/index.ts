"phantombuster command: nodejs"
"phantombuster package: 6"
"phantombuster flags: save-folder"

import Buster from "phantombuster";

import puppeteer, {
    Page,
    Browser,
    LaunchOptions
} from "puppeteer-core";

import {
    PhantomBrowser,
    PhantomError,
    PhantomArgument,
    Recipe
} from "./model";

// default config if you don't give (or don't gice enougth) argument
// all argument you are going to gave will override this config
const DEFAULT_PHANTOM_ARGUMENT: PhantomArgument = {
    url: "https://www.marmiton.org/recettes/recherche.aspx?aqt=",
    query: ""
}

// Config of the puppeteers browser
const PUPPETEERS_CONFIG: LaunchOptions = {
    executablePath: '/usr/bin/google-chrome',
    // This is needed to run Puppeteer in a Phantombuster container
    args: ["--no-sandbox"]
};

/**
 * create a PhantomBrowser and init it
 * it will create a browser and a dedicated page with puppeteer
 * no need to do the cleaning if it fail
 * RETURN a promise with a PhantomBrowser object in it
 */
async function initPhantomBrowser(): Promise<PhantomBrowser> {
    let browser: Browser;

    // create the browser
    try {
        browser = await puppeteer?.launch(PUPPETEERS_CONFIG);
    } catch (err: PhantomError) {
        console.error("Cannot create browser page", err);
        throw err;
    }

    // create the main page for the browser
    try {
        const page: Page = await browser?.newPage();
        return {browser, page};
    } catch (err: PhantomError) {
        console.error("Cannot create browser page", err);
        browser?.close();
        throw err;
    }
}

/**
 * This methode will clean the PhantomeBrowser by closing page and the browser
 * @param phantomBrowser object with a puppeteers browser and his dedicated page
 * RETURN an empty promise
 */
async function cleanPhantomBrowser(phantomBrowser: PhantomBrowser): Promise<void> {

    // clean the page but do not throw if you can't
    // we still need to clean the browser
    try {
        await phantomBrowser?.page?.close();
    } catch(err: PhantomError) {
        console.error("Cannot close browser page.");
    }

    try {
        await phantomBrowser?.browser?.close();   
    } catch (err: PhantomError) {
        console.error("Cannot close browser");
    }
}

/**
 * scrap a website and get some specific data
 * @param phantomBrowser object with a puppeteers browser and his dedicated page
 * @param phantomArgument object with the url of the page and the recipe you are looking for
 * RETURN a promise with an Array of Recipes
 */
async function scrap(
    phantomBrowser: PhantomBrowser,
    phantomArgument: PhantomArgument
): Promise<Recipe[]> {
    // handle the different format you can have (array of string or string)
    const query: string = (
        typeof phantomArgument.query === "object"
        ? phantomArgument.query?.join("-")
        : phantomArgument.query?.replace(" ", "-")
    ) || "";
    const url: string = (phantomArgument?.url || "") + query;

    await phantomBrowser?.page?.goto(url);

    await phantomBrowser?.page?.waitForSelector(".MRTN__sc-1gofnyi-0, .YLcEb", {timeout: 3 * 1000});
    const data: Recipe[] = await phantomBrowser?.page?.evaluate((): Recipe[] => {
        const websiteRecipes: Recipe[] = [];

        const containerDiv: HTMLElement = document.getElementsByClassName("MRTN__sc-1gofnyi-0 YLcEb")[0] as HTMLElement;
        const listOfRecipes: HTMLCollectionOf<HTMLAnchorElement> = containerDiv.getElementsByTagName("a");

        for (let i: number = 0; i < listOfRecipes?.length; i++) {
            const [name, score, reviewsNumber]: string[] = listOfRecipes[i]?.innerText?.split("\n");
            websiteRecipes.push({
                url: listOfRecipes[i]?.href,
                name,
                score,
                reviewsNumber
            });
        }
        
        return websiteRecipes;
    });

    return data || [];
}

/**
 * Core function to run the phantom
 * it will init a puppeteer browser and page
 * it will scrap data of a website
 * it will clean the browser and the page when finish / failed
 * RETURN an empty promise
 */
async function runPhantom(): Promise<void> {
    const buster: Buster = new Buster();
    // override default config when you gice argument
    const argument: PhantomArgument = {
        ...DEFAULT_PHANTOM_ARGUMENT,
        ...buster.argument
    };
    const phantomBrowser: PhantomBrowser = await initPhantomBrowser();

    try {
        const recipes: Recipe[] = await scrap(phantomBrowser, argument);
        if (recipes) {
            await buster.setResultObject(recipes);
        }
    } catch(err: PhantomError) {
        console.error("Error while scrapping", err);

        // if there is an error we have to clean the browser
        return cleanPhantomBrowser(phantomBrowser)
        .then(() => console.error("Cleaning after error is done"))
        .catch((err: PhantomError) => {
            console.error("Error while cleaning ?");
            throw err;
        });
    }

    return cleanPhantomBrowser(phantomBrowser);
}


// this is where we are running the code !
runPhantom()
.then(() => {
    console.log("I'm done, time to go to sleep ...");
    process.exit();
})
.catch((err: PhantomError) => {
    console.error("The phantom finished with some error ...", err);
    process.exit();
});
