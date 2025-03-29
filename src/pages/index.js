import { useState, useEffect } from 'react';

export default function Home() {
    const [vehicles, setVehicles] = useState([]);
    const [form, setForm] = useState({ vehicleType: '', license: '' });

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        const res = await fetch('/api/parking-lot');
        const data = await res.json();
        setVehicles(data.data);
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
            fetchVehicles();
            setForm({ vehicleType: '', license: '' });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Vehicles</h1>
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
                {Array.isArray(vehicles) && vehicles.length > 0 ? (
                    vehicles.map((vehicle) => (
                        <li key={vehicle._id}>
                            {vehicle.symbol} - {vehicle.license}
                        </li>
                    ))
                ) : (
                    <li>EMPTY</li>
                )}
            </ul>
        </div>
    );
}