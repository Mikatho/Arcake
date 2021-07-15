import IClient from "./IClient";
import IPlayerProperties from "./IPlayerProperties";

interface IPlayerSidebar {
    inviteLink: string;
    roomName: string;
    userList: Array<IClient>;
    gameMaster: string;
    kickUser: (player: IClient) => void;
    makeGamemaster: (player: IClient) => void;
    makeDisplay: (player: IClient) => void;
    addPlayer: (playerName: string, playerProperties: IPlayerProperties) => void;
    isGameMaster: boolean,
}

export default IPlayerSidebar;