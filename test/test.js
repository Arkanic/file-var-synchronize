const path = require("path");
const FileVarSync = require("../dist/index");

let fi = FileVarSync(path.join(__dirname, "test.txt"), "utf-8");

fi.connect().then(err => {
    if(err) throw err;

    fi.content = "\nhi";
    fi.content += "\ntesting 123"; // append to end
    fi.content = "1234567890" + fi.content; // append to start

    fi.disconnect().then(() => {
        console.log("disconnected");
    });
});