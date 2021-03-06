const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

function firstQuestion() {
    // Prompt the user to create their team
    inquirer.prompt([
        {
            type: "list",
            name: "team",
            message: "Which type of team member would you like to add?",
            choices: ["Manager", "Engineer", "Intern", "Finished adding team members."]
        }
    ]).then(answers => {
        // Create new team members based on which option the user selects
        if(answers.team === "Manager") {
            createManager();
        } else if(answers.team === "Intern") {
            createIntern();
        } else if(answers.team === "Engineer") {
            createEngineer();
        } 
        // If they are done adding team members, pass the employee array to the render function to create the html
        else {
            fs.writeFile("./output/team.html", `${render(employees)}`, (err) => err ? console.error(err) : console.log("Success!"))
            
        }

    }).catch(error => {
        error ? console.error(error) : console.log("Success!");
    });

};

function createManager() {
    // Prompt the user for input to create a new manager
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is your manager's name?"

        },
        {
            type: "input",
            name: "managerId",
            message: "What is your manager's id?"
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is your manager's email?"
        },
        {
            type: "input",
            name: "managerOffice",
            message: "What is your manager's office number?"
        }
    ]).then(answers => {
        // Create a new manager object using the Manager class and push it into the employees array
        const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOffice);
        employees.push(manager);
        // Call the firstQuestion function to add additional team members
        firstQuestion();
    }).catch(error => {
        error ? console.error(error) : console.log("Success!");
    });

};

function createEngineer() {
    // Prompt the user for input to create a new engineer
    inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "What is your engineer's name?"

        },
        {
            type: "input",
            name: "engineerId",
            message: "What is your engineer's id?"
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is your engineer's email?"
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "What is your engineer's Github username?"
        }


        // Create a new engineer object using the Engineer class and push it into the employees array
        // TODO: Need to get the manager questions out of the recursive loop so they don't get asked for the manager every time
    ]).then(answers => {
        const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
        employees.push(engineer);
        // Call the firstQuestion function to add additional team members.
        firstQuestion();
    }).catch(error => {
        error ? console.error(error) : console.log("Success!");
    });
};

function createIntern() {
    // Prompt the user for input to create a new intern
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "What is your intern's name?"

        },
        {
            type: "input",
            name: "internId",
            message: "What is your intern's id?"
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is your intern's email?"
        },
        {
            type: "input",
            name: "internSchool",
            message: "What is your intern's school?"
        }

        // Create a new intern object using the Intern class and push it into the employees array
    ]).then(answers => {
        const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
        employees.push(intern);
        // Call the firstQuestion function to add additional team members
        firstQuestion();
    }).catch(error => {
        error ? console.error(error) : console.log("Success!");
    });
};

firstQuestion();

