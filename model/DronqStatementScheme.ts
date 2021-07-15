import * as mongoose from 'mongoose';

/**
 * Diese Klasse wird erst wieder benötigt wenn die MongoDB Cloud funktioniert
 */

export interface IDronqStatement extends mongoose.Document {
    statement: string,
    type: string,
    solution: string,
    answers: Array<string>,
    cat_drink: number,
    cat_activity: number,
    cat_game: number,
    cat_sex: number,
    rating: number,
    metric: string,
    id: number
}

export const DronqStatementScheme: mongoose.Schema = new mongoose.Schema({
    statement: { type: String, required: true},
    type: { type: String, required: true },
    solution: { type: String, required: false },
    answers: { type: Array(String), required: false },
    cat_drink: { type: Number, required: true },
    cat_activity: { type: Number, required: true },
    cat_game: { type: Number, required: true },
    cat_sex: { type: Number, required: true },
    rating: { type: Number, required: true },
    metric: {type: String, required: false}
});

export const DronqStatement = mongoose.model('DronqStatement', DronqStatementScheme);