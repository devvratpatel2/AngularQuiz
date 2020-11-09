export class Question{
    constructor(public question:string, public options:Array<string>, public answer:number){}
}

export class Quiz{
    constructor(public id:number, public name:string, public questions:Array<Question>){}
}