import FVSync from "./fvsync";

function fvsync(file:string, encoding?:string):FVSync {
    return new FVSync(file, encoding);
}

export default fvsync;
module.exports = fvsync;