import { Injectable } from '@angular/core';
 
@Injectable({ providedIn: 'root' })
export class SystemService {
    systemId: string;
    private persistent: boolean;
    private keys: Set<string> = new Set();
    constructor() {}

    getSessionVariable(key: string): string {
        let finalKey = key + this.systemId
        this.keys.add(finalKey);
        return localStorage.getItem(finalKey);
    }
    getSessionVariableAsJson(key: string): any {
        let finalKey = key + this.systemId
        this.keys.add(finalKey);
        return JSON.parse(localStorage.getItem(finalKey));
    }
    removeAllSessionVariables(): void {
        this.keys.forEach((key) => {
            this.removeSessionVariable(key);
        })
    }
    private removeSessionVariable(key: string): void {
        delete localStorage[key];
    }
    setSessionVariable(key: string, value: string): void {
        let finalKey = key + this.systemId
        this.keys.add(finalKey);
        localStorage.setItem(finalKey, value);
    }
    setPersistent(persistent: boolean): void {
        this.persistent = persistent;
    }
}