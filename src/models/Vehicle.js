export default class Vehicle {
    size: number;
    symbol: string;
    license;

    constructor(license: string) {
        this.license = license;
    };

    can_park(parking_size: number): boolean {
        return this.size <= parking_size;
    }
}
