import Games from "../enums/Games";

interface IOptionsSidebar {
    game:string;
    changeGame: (entry: Games) => void;
    isOnline: boolean;
    toggleIsOnline: () => void;
    isPlayer: boolean;
    toggleIsPlayer: () => void;
    isStandardView: boolean;
    toggleStandardView: () => void;
    isGameMaster: boolean;
    leaveGame: () => void;
}

export default IOptionsSidebar;