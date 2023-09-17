

/**
 * Fetching the Link objects (in an array) from data.json file.
 */
async function fetchLinksFromJson(){
    const fileName = "../src/data/data.json";
    const request = await fetch(fileName);
    const jsonLinkData  = await request.json()
    return jsonLinkData
}

/**
 * Processing the Link objects into a form where they're easier to display
 * 
 * @param {array} jsonLinkArray 
 */
function processLinks(jsonLinkArray){
    const categoriesArray = [];     //To help sort the links

    //Gathering all individual categories into an array
    for(const linkObject of jsonLinkArray){
        let isDuplicate = false;
        for(const processedCategory of categoriesArray){
            if(linkObject.category == processedCategory){
                isDuplicate = true;
            }
        }
        if(!isDuplicate){
            categoriesArray.push(linkObject.category);
        }
    }    
    const categoryDivArray = generateCategories(categoriesArray);
    displayContentsHtml(jsonLinkArray, categoriesArray, categoryDivArray);

}

/**
 * A div class will be created for every single defined category
 * 
 * @param {array} categoriesArray
 */
function generateCategories(categoriesArray){
    const categoryDivArray = [];
    for(let i = 0; i < categoriesArray.length; i++){
        let categoryDiv = document.createElement("div");
        categoryDivArray.push(categoryDiv);
    }
    return categoryDivArray
}

/**
 * @param {array} jsonLinkArray 
 * @param {array} categoriesArray 
 * @param {array} categoryDivArray 
 */
function displayContentsHtml(jsonLinkArray, categoriesArray, categoryDivArray){
    const divContainerCategories = document.getElementsByClassName("container-categories")[0];

    for(let i = 0; i < categoriesArray.length; i++){
        const ulContainerLinkObject = document.createElement("ul");
        categoryDivArray[i].textContent = categoriesArray[i];

        divContainerCategories.appendChild(categoryDivArray[i]);
        categoryDivArray[i].appendChild(ulContainerLinkObject);
        categoryDivArray[i].classList.add("link-holder")

        for(const linkObject of jsonLinkArray){
            if(linkObject.category == categoriesArray[i]){
                const liContainerLink = document.createElement("li");
                const aLinkHref = document.createElement("a");
                liContainerLink.appendChild(aLinkHref);
                aLinkHref.href = linkObject.link;
                aLinkHref.textContent = linkObject.anchor;
                ulContainerLinkObject.appendChild(liContainerLink);
            }
        }
    }
}

async function main(){
    const jsonLinkData = await fetchLinksFromJson();
    const jsonLinkArray = jsonLinkData.links
    processLinks(jsonLinkArray);
}

if (document.readyState !== "loading") {
    main();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      main();
    });
}