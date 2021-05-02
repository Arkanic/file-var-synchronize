/// <reference types="node" />
export default class FVSync {
    file: string;
    encoding: string;
    private _content;
    private _connected;
    private _operationsRunning;
    private onWorkingChange;
    constructor(file: string, encoding?: string);
    connect(callback: (err?: NodeJS.ErrnoException) => any): void;
    disconnect(callback: () => any): void;
    private write;
    get connected(): boolean;
    set connected(value: boolean);
    get content(): string;
    set content(value: string);
    private get operationsRunning();
    private set operationsRunning(value);
}
