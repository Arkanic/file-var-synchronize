import * as fs from "fs";
import * as path from "path";

export default class FVSync {
    file:string;
    encoding:string;

    private _content:string;
    private _connected:boolean;
    private _operationsRunning:number;

    private onWorkingChange:Function;

    constructor(file:string, encoding?:string) {
        this.file = path.resolve(file);
        this.encoding = encoding || "utf-8";

        this._content = "";
        this._connected = false;
        this._operationsRunning = 0; // internal, the amount of file i/o operations currently running

        this.onWorkingChange = () => {};
    }

    connect(callback:(err?:NodeJS.ErrnoException) => any):void {
        fs.readFile(this.file, this.encoding, (err, data) => {
            if(err) return callback(err);

            this._content = data; // skip getters/setters to prevent default action
            this._connected = true;

            callback();
        });
    }

    disconnect(callback:() => any):void {
        this._connected = false;

        this.onWorkingChange = ():void => {
            if(this.operationsRunning == 0) {
                this.onWorkingChange = () => {};
                callback();
            }
        }
    }

    private write(callback:(err?:NodeJS.ErrnoException) => any):void {
        this.operationsRunning++;
        fs.writeFile(this.file, this.content, this.encoding, (err) => {
            this.operationsRunning--;
                
            if(err) callback(err);
            else callback();
        });
    }

    get connected():boolean {
        return this._connected;
    }
    set connected(value:boolean) { // use connect/disconnect
        return;
    }

    get content():string {
        return this._content;
    }
    set content(value:string) {
        this._content = value;
        
        if(this.connected) this.write((err) => {
            if(err) throw err;
        });
    }

    private get operationsRunning():number {
        return this._operationsRunning;
    }
    private set operationsRunning(value:number) {
        this._operationsRunning = value;
        this.onWorkingChange();
    }
}