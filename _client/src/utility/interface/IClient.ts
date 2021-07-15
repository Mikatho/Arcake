import IPlayerProperties from "./IPlayerProperties";

interface IClient {
    readonly id: number,
    name: string,
    properties: IPlayerProperties,
    status: {
        isIdle: boolean,
        isPlayer: boolean
        hasVoted: boolean
    },
    answer?: string,
}

export default IClient;