# file-var-synchronize
Sync a file with a variable, continually.

## Installation
Using npm:
```shell
npm i file-var-synchronize
```

In node:
```js
const FVSync = require("file-var-synchronize");
// OR (using typescript)
import FVSync from "file-var-synchronize";
```

## Usage
(note that this package has typescript typings, so all of this can be used with typescript as well.)


example.txt (before):
```
hi there
```

index.js:
```js
const path = require("path");
const FVSync = require("file-var-synchronize");

// create FVSync instance. First parameter is the path to the file, the second is the file encoding (which is optional, as it defaults to utf-8)
const file = FVSync(path.join(__dirname, "example.txt"), "utf-8");

file.connect(err => { // connect to the file. You can change the contents of the variable without connecting, but the file is not affected.
    if(err) throw err;

    file.content += "\ngoodbye"; // changes the variable, but also changes example.txt.

    file.disconnect(() => { // waits for all file IO operations to finish. Use this to safely prepare the file for the program to end.
        console.log("disconnected!");
        // the program can now be ended safely.
    });
});
```

example.txt (now)
```
hi there
goodbye
```

## Notes
You can edit `.content` after the file has been disconnected, or even before it has been connected in the first place, but it will not affect the file, and your changes will be overwritten by the contents of the file when `.connect()` is used again.

The program assumes that the variable is master, and the file is slave, except when `.connect()` is used. This means that when you connect to the file, the file contents are written to the variable, but from that point onwards any change in the variable will change the file, **NOT** vice-versa (meaning that changing the file during runtime will not change the variable.)

## Contact, Issues, and Support
If you have any issues or need support using the package, open an issue in the repository. I should respond at some point.