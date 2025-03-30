import Vehicle from "./Vehicle";


export default class Car extends Vehicle{
    static size = 2;
    static symbol = "C";
    license;

    static schema = {};

    constructor(license) {
        super(license);
    }
}
