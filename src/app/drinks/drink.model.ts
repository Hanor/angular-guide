export class DrinkModel {
    constructor(
        public type: string,
        public id: string,
        public name: string,
        public manufacturer: string,
        public country: string,
        public price: string,
        public quantity: number
    ) {}
}