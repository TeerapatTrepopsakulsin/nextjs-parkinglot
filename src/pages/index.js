import { useState, useEffect } from 'react';


export default function Home() {
    const [parkingLots, setParkingLot] = useState([]);
    const [form, setForm] = useState({ vehicleType: '', license: '' });

    useEffect(() => {
        fetchParkingLot();
    }, []);

    const fetchParkingLot = async () => {
        const res = await fetch('/api/parking-lot');
        const data = await res.json();
        setParkingLot(data.data);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch('/api/parking-lot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            fetchParkingLot();
            setForm({ vehicleType: '', license: '' });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Parking Lots of Software Design</h1>
            <div className="row">Park your vehicle!</div>
            <form onSubmit={handleSubmit}>
                <select name="vehicleType" id="vehicle type" value={form.vehicleType} onChange={handleChange}>
                    <option value="Car">Car</option>
                    <option value="Motorcycle">Motorcycle</option>
                    <option value="Bus">Bus</option>
                </select>
                <input
                    name="license"
                    placeholder="Vehicle license"
                    value={form.license}
                    onChange={handleChange}
                />
                <button type="submit">Park Vehicle</button>
            </form>

            <ul>
                {Array.isArray(parkingLots) && parkingLots.length > 0 ? (
                    parkingLots.map((parkingLot) => (
                        <li key={parkingLot._id}>
                            {Array.isArray(parkingLot.levels) && parkingLot.levels.length > 0 ? (
                                parkingLot.levels.map((level) => (
                                    <li key={level._id}>
                                        <h3>Level {level.floor}</h3>
                                        <ul>
                                            {Array.isArray(level.spots) && level.spots.length > 0 ? (
                                                level.spots.map((spot) => (
                                                    <li key={spot._id}>
                                                        <>{spot.spotNum}: </>
                                                        {spot.vehicle ? (
                                                            <>{spot.vehicle.symbol} - {spot.vehicle.license}</>
                                                        ) : (
                                                            <>{spot.symbol} - EMPTY</>
                                                        )}
                                                    </li>
                                                ))
                                            ) : (
                                                <li>No Vehicles in this level</li>
                                            )}
                                        </ul>
                                    </li>
                                ))
                            ) : (
                                <div>Parking lot has no floors</div>
                            )}
                        </li>
                    ))
                ) : (
                    <li>EMPTY</li>
                )}
            </ul>

        </div>
    );
}