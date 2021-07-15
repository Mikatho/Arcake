export interface dronqStatementJSON{
    //TODO ADD ID AND RATING TO CSV
    id: number,
    statement: string,
    type: string,
    solution: string,
    cat_drink: number,
    cat_activity: number,
    cat_game: number,
    cat_sex: number,
    rating: number
    metric: string,
    answers: Array<string>
}