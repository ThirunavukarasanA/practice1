import React, { useState } from 'react'
import { adm } from '../Asset/json/13042024'

export default function AdmissionDataFilter() {
    const [search, setSearch] = useState({
        name: '',
        state: '',
        district: ''
    });

    const handleChange = (e) => {
        setSearch({ ...search, [e.target.name]: e.target.value });
    };

    const filteredData = adm.filter(item => {
        return (
            item.name?.toLowerCase().includes(search.name.toLowerCase()) &&
            item.state?.toLowerCase().includes(search.state.toLowerCase()) &&
            item.district?.toLowerCase().includes(search.district.toLowerCase())
        );
    });

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Admission Data Filter</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Search by Name"
                    value={search.name}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    name="state"
                    placeholder="Search by State"
                    value={search.state}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    name="district"
                    placeholder="Search by District"
                    value={search.district}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
            </div>

            <div className="space-y-2">
                {filteredData.length === 0 ? (
                    <p className="text-gray-500">No results found.</p>
                ) : (
                    filteredData.map((item, idx) => (
                        <div key={idx} className="border p-3 rounded shadow-sm bg-white">
                            <p><strong>Name:</strong> {item.name}</p>
                            <p><strong>District:</strong> {item.district}</p>
                            <p><strong>State:</strong> {item.state}</p>
                            <p><strong>Email:</strong> {item.emailid}</p>
                            <p><strong>Phone:</strong> {item.mobileno}</p>
                            <p><strong>Create Date:</strong> {item.createdat}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
