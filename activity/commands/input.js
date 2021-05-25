//let input=process.argv.slice(2);
//console.log("Input is:",input); // for taking input

let input=process.argv.slice(2);
let cmd=input[0];
switch(cmd){
    case "view":
        console.log("view command executed");
        break;
    case "organize":
        console.log("organize command executed");
        break;
    case "help":
        console.log(`List of all the commands
                        1. view <dir-name> --tree
                        2. view <dir-name> --flat
                        3. organize <dir-name>/_ 
                        4. help
                        `);
        break;
    default:
        console.log("Wrong command. Enter help to see list of all commands.");
}