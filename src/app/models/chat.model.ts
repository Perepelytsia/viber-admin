import {QuestionModel} from './question.model';
import {AnswerModel} from './answer.model';

export class ChatModel {
    constructor(public questions:QuestionModel[], public answers:AnswerModel[]){}
}