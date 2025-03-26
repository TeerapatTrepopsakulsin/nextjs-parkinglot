export default class ParkingSpot {
    public size: number;
    public symbol: string;

    public constructor(size: number) {
        this.size = size;

        if (size === 1) {
            this.symbol = "m";
        }
        else if (size === 2) {
            this.symbol = "c";
        }
        else if (size === 3) {
            this.symbol = "b";
        }
    }
}