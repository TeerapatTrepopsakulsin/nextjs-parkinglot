export default class Vehicle {
    private size: number;
    private symbol: string;

    public constructor();

    public can_park(parking_size: number): boolean {
        return this.size <= parking_size;
    }
}
