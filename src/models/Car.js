import Vehicle from "./Vehicle";

// export const CarSchema = {
//     size: { type: 'string', required: true, default: 2 },
//     symbol: { type: 'string', required: true, default: "C" },
//     license: { type: 'number', required: true },
// };

export default class Car extends Vehicle{
    static size = 2;
    static symbol = "C";
    license;

    static schema = {
        size: { type: 'string', required: true, default: 2 },
        symbol: { type: 'string', required: true, default: "C" },
        license: { type: 'number', required: true }
    };

    constructor(license: string) {
        super(license);
    }
}
