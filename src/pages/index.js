import { useState, useEffect } from 'react';

export default function Home() {
    const [parkingLots, setParkingLot] = useState([]);
    const [form, setForm] = useState({ vehicleType: 'Car', license: '' });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchParkingLot();
    }, []);

    const fetchParkingLot = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/parking-lot');
            const data = await res.json();
            setParkingLot(data.data);
        } catch (error) {
            console.error("Failed to fetch parking lot data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.license.trim()) {
            alert("Please enter a license plate number");
            return;
        }

        try {
            setIsLoading(true);
            await fetch('/api/parking-lot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            fetchParkingLot();
            setForm({ vehicleType: 'Car', license: '' });
        } catch (error) {
            console.error("Failed to park vehicle:", error);
        }
    };

    const handleDeleteVehicle = async (spotId) => {
        try {
            setIsLoading(true);
            await fetch('/api/parking-lot', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(spotId)
            });
            fetchParkingLot();
        } catch (error) {
            console.error("Failed to remove vehicle:", error);
        }
    };

    // Helper function to get vehicle icon
    const getVehicleIcon = (type) => {
        switch(type) {
            case 'Car':
                return '🚗';
            case 'Motorcycle':
                return '🏍️';
            case 'Bus':
                return '🚌';
            default:
                return '🅿️';
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">Parking Lots of Software Design</h1>

                {/* Parking Form */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Park your vehicle!</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                        <select
                            name="vehicleType"
                            value={form.vehicleType}
                            onChange={handleChange}
                            className="px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Car">Car</option>
                            <option value="Motorcycle">Motorcycle</option>
                            <option value="Bus">Bus</option>
                        </select>
                        <input
                            name="license"
                            placeholder="Vehicle license"
                            value={form.license}
                            onChange={handleChange}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Processing...' : 'Park Vehicle'}
                        </button>
                    </form>
                </div>

                {/* Parking Lots Display */}
                {isLoading ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">Loading parking lot data...</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {Array.isArray(parkingLots) && parkingLots.length > 0 ? (
                            parkingLots.map((parkingLot) => (
                                <div key={parkingLot._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="bg-blue-800 text-white px-6 py-3">
                                        <h2 className="text-xl font-bold">Parking Lot</h2>
                                    </div>

                                    {Array.isArray(parkingLot.levels) && parkingLot.levels.length > 0 ? (
                                        parkingLot.levels.map((level) => (
                                            <div key={level._id} className="border-t border-gray-200">
                                                <div className="bg-gray-100 px-6 py-3">
                                                    <h3 className="text-lg font-semibold text-gray-700">Level {level.floor}</h3>
                                                </div>

                                                {Array.isArray(level.spots) && level.spots.length > 0 ? (
                                                    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                                        {level.spots.map((spot) => (
                                                            <div
                                                                key={spot._id}
                                                                className={`border rounded-md overflow-hidden ${spot.vehicle ? 'border-red-400 bg-red-50' : 'border-green-400 bg-green-50'}`}
                                                            >
                                                                <div className="px-3 py-2 text-sm font-medium bg-gray-200">
                                                                    Spot #{spot.spotNum}
                                                                </div>
                                                                <div className="p-4 text-center">
                                                                    <div className="text-2xl mb-1">
                                                                        {spot.vehicle ? getVehicleIcon(spot.vehicle.type) : '🅿️'}
                                                                    </div>
                                                                    <div className="text-sm mb-2">
                                                                        {spot.vehicle ? (
                                                                            <span className="font-semibold">{spot.vehicle.license}</span>
                                                                        ) : (
                                                                            <span className="text-green-600">AVAILABLE</span>
                                                                        )}
                                                                    </div>
                                                                    {spot.vehicle && (
                                                                        <button
                                                                            onClick={() => handleDeleteVehicle(spot._id)}
                                                                            className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                                                        >
                                                                            Remove
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="p-6 text-center text-gray-500">
                                                        No spots available on this level
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-6 text-center text-gray-500">
                                            This parking lot has no levels configured
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="bg-white rounded-lg shadow-md p-8 text-center">
                                <p className="text-gray-500">No parking lots available</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
