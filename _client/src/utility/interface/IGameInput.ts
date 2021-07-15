import StatementType from "../enums/StatementType";

interface IGameInput {
    answers: string[];
    _id:string;
    id: number;
    statement: string;
    type: StatementType;
    solution: string;
    cat_drink: number;
    cat_activity: number;
    cat_game: number;
    cat_sex: number;
    rating: number;
    __v: number;
    }

export default IGameInput;
