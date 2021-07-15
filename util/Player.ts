import * as hashGenerator from './hashGenerator'
import IPlayerProperties from "../_client/src/utility/interface/IPlayerProperties";
import IClient from "../_client/src/utility/interface/IClient";

export class Player implements IClient{
    public readonly id: number;
    public name: string;
    public properties: IPlayerProperties
    public status = {hasVoted: false, isIdle: false, isPlayer: true}
    public answer: any;

    constructor(name: string, playerProperties: IPlayerProperties) {
        this.name = name;
        this.properties = playerProperties;
        this.id = hashGenerator.generateHash(name + Math.random())
        this.status = {hasVoted: false, isIdle: false, isPlayer: true}
        this.answer = ""
    }
}