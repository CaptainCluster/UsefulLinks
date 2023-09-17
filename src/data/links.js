/**
 * This .js file is an optional tool for creating link objects. It utilizes NodeJs. 
 * All link objects created will be stored in data.json file. Then these links
 * will be displayed in the index.html.
 * 
 * @author CaptainCluster | 
 * https://github.com/CaptainCluster
*/


class Link{
  /**  
   * @param {string} link 
   * @param {string} anchor
   * @param {string} category - To sort the links
   */
    constructor(link, anchor, category){
        this.link = link;
        this.anchor = anchor;
        this.category = category;
    }
}

/**
 * The function responsible for creating Link objects
 */
async function createLink(){
  let userWantsToContinue = true

  while(userWantsToContinue){
    //User needs to provide the url, the link and the category
    const url = await askUserInput("Give the link: ");
    const anchor = await askUserInput("Give the anchor: ");
    const category = await askUserInput("Give the category: ");

    //Creating the object and storing it into a JSON file
    const linkObject = new Link(url, anchor, category);
    storeLinkToJson(linkObject);

    //Iterating until the user gives a valid output for the request
    while(true){
      let userEndsProgram = await askUserInput("Do you want to continue using the program? Y = Yes, N = No: ");
      if(userEndsProgram.toLowerCase() == "n"){
        userWantsToContinue = false;
        break
      } else if(userEndsProgram.toLowerCase() == "y"){
        console.log("Continuing...\n");
        break
      } else{
        console.log("Give a proper input!");
      }
    }
  }
}

/**
 * @param {string} inputInstruction 
 */
async function askUserInput(inputInstruction){
    const readline = require("readline");

    return new Promise((resolve) => {
      //Using readline to create an interface that can read the user input
      const readlineInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      //Next up, the program that asks for the input
      readlineInterface.question(inputInstruction, (userInput) => {
        readlineInterface.close();
        resolve(userInput); 
      });
    });
}

/**
 * @param {Link} linkObject 
 */
function storeLinkToJson(linkObject){
  const fs = require("fs"); //Using File System to write the data to JSON 
  const jsonFile = "./src/data/data.json";

  //Fetching the array (consists of Link objects) from the JSON file
  //and pushing the new object.
  const jsonData = fs.readFileSync(jsonFile);
  const jsonDataParsed = JSON.parse(jsonData)
  jsonDataParsed.links.push(linkObject)

  //Overwriting the old array in the JSON file with the updated one
  fs.writeFileSync(jsonFile, JSON.stringify(jsonDataParsed, null, 2));
}

createLink()