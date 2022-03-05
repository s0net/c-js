# compile-js
A new NodeJs `preprocess` to make it more easy 

What you need to know:  
- All C-JS file end in .jsc
- Run `npx compile-js` _filename_ to complie the file to .js

## Notes:
- If you don't have `npx` installed please install it to use this tool
- This will also watch for editings in that file in the background
- After you run the command please edit the file so that it will start the compiler

## Guide:
- To get started make a file called `index.jsc`
- Add the following code to the file:
<pre>
import readline;
var { stdin: input, stdout: output } = mod('process');
var line = readline.createInterface({ input, output });

func ask(qustion, callback){
    line.question(qustion, callback);
}

ask('What is your name? ', (answer) => {
    console.log(`Hello ${answer}`);
    var name = answer;

    ask("What is your age? ", (answer2) => {
        console.log(`${name} is ${answer2} years old`);
        line.close()
    });
});</pre>
- Then run `npx compile-js index`  
 _or the filename without the extension_
- A new file called `index.js` will be created
- You can now run `node index.js` or `node .`  
**Note:** the file given to the compiler must be in the same directory as where you run the command and if the jsc file is edited it will re-compile the file in the backgroud

## functions:
- `log` to console.log
- `log.trace` to console.trace
- `log.error` to console.error  
**Note: writing `console.log` is not recommended but allowed**
- `uuid` to generate a uuid example: `uuid(5)`(the agrument is the lenght of the uuid)
- `mod` to import a module using require
- `func` to define a function
- `int` to do math opration example ini.random()
    - `min` to get the min value
    - `max` to get the max value
    - `random` to get a random number
    - `clamp` to clamp the value
    - `floor` to round the value down
    - `ceil` to round the value up
    - `round` to round the value
    - `abs` to get the absolute value
    - `sign` to get the sign of the value
    - `srt` to get the square root of the value
    - `pow` to get the power of the value
- `do.after` to run a function after a certain amount of time in milliseconds
- `do.every` to run a function every certain amount of time in milliseconds
- `do.cancel` to cancel a function
- import
    - readline
    - crypto
    - fs
    - path
    - os
    - process
    - http
    - https
    - net
    - tls
    - dns
    - url
    - stream
    - buffer
    - v8
    - util
    - dgram
    - assert
    - events
    - child_process
    - domain
    - module  
to import them from node with the same name

**This program also minifies the file to space space on a large file**