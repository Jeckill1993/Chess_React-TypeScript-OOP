import {Colors} from "./Colors";

export class Player {
    color: Colors;
    name: string | null

    constructor(color: Colors) {
        this.color = color;
        this.name = color;
    }
}

