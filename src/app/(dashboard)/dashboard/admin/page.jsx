'use client';

import React, { useState, useEffect } from 'react';
import { Settings2, Power, Plus, Edit, Server, DollarSign, BarChart } from 'lucide-react';
import { fetchGateways, createGateway, updateGateway } from '@/lib/action/gateway';

export default function AdminGatewaysPage() {
    const [gateways, setGateways] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingGateway, setEditingGateway] = useState(null);
    const [formData, setFormData] = useState({ name: '', priority: 1, limit: 5000 });

    const loadGateways = async () => {
        setLoading(true);
        const res = await fetchGateways();
        // Assuming your apiHandler returns { data: { data: [...] } } based on typical standard
        if (res?.data?.data) {
            setGateways(res.data.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadGateways();
    }, []);

    const handleToggleActive = async (id, currentStatus) => {
        try {
            await updateGateway(id, { isActive: !currentStatus });
            loadGateways();
        } catch (error) {
            alert("Failed to update status");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingGateway) {
                await updateGateway(editingGateway._id, {
                    priority: Number(formData.priority),
                    limit: Number(formData.limit)
                });
            } else {
                await createGateway({
                    name: formData.name.toUpperCase(),
                    priority: Number(formData.priority),
                    limit: Number(formData.limit)
                });
            }
            setIsModalOpen(false);
            setEditingGateway(null);
            setFormData({ name: '', priority: 1, limit: 5000 });
            loadGateways();
        } catch (error) {
            alert(editingGateway ? "Failed to update" : "Failed to create. Priority might not be unique.");
        }
    };

    const openEditModal = (gateway) => {
        setEditingGateway(gateway);
        setFormData({ name: gateway.name, priority: gateway.priority, limit: gateway.limit });
        setIsModalOpen(true);
    };

    const openCreateModal = () => {
        setEditingGateway(null);
        setFormData({ name: '', priority: gateways.length + 1, limit: 5000 });
        setIsModalOpen(true);
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-[#EDE8F5] dark:bg-[#000000]">Loading Gateways...</div>;
    }

    return (
        <div className="min-h-screen p-6 md:p-10 bg-[#EDE8F5] dark:bg-[#000000] text-gray-900 dark:text-gray-100 transition-colors duration-500">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-3">
                            <Server className="text-[#3D52A0]" />
                            Payment Gateways
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage dynamic gateway rotation and limits.</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="flex items-center gap-2 bg-[#3D52A0] hover:bg-[#2d3d7a] text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-[#3D52A0]/20"
                    >
                        <Plus size={18} /> Add Gateway
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gateways.map((gateway) => (
                        <div key={gateway._id} className="bg-white dark:bg-[#09090b] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm relative overflow-hidden flex flex-col">
                            {/* Priority Badge */}
                            <div className="absolute top-0 right-0 bg-[#3D52A0] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                                Priority: {gateway.priority}
                            </div>

                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold tracking-wider">{gateway.name}</h2>
                                    <div className="flex items-center gap-1 mt-1 text-sm">
                                        <div className={`w-2 h-2 rounded-full ${gateway.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                        <span className={gateway.isActive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                                            {gateway.isActive ? 'Active' : 'On Hold'}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleToggleActive(gateway._id, gateway.isActive)}
                                    className={`p-2 rounded-full transition-colors ${gateway.isActive ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-red-100 dark:bg-red-900/30 text-red-600'}`}
                                    title={gateway.isActive ? "Put on hold" : "Activate"}
                                >
                                    <Power size={20} />
                                </button>
                            </div>

                            <div className="space-y-4 mb-6 flex-1">
                                <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-[#1a1a1f] border border-gray-100 dark:border-gray-800">
                                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                                        <DollarSign size={16} /> Daily Limit
                                    </div>
                                    <span className="font-bold">${gateway.limit}</span>
                                </div>

                                <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-[#1a1a1f] border border-gray-100 dark:border-gray-800">
                                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                                        <BarChart size={16} /> Today's Volume
                                    </div>
                                    <span className="font-bold text-[#3D52A0] dark:text-[#5c73c4]">${gateway.currentVolume}</span>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 mt-2">
                                    <div
                                        className="bg-[#3D52A0] h-2 rounded-full transition-all"
                                        style={{ width: `${Math.min((gateway.currentVolume / gateway.limit) * 100, 100)}%` }}
                                    ></div>
                                </div>
                            </div>

                            <button
                                onClick={() => openEditModal(gateway)}
                                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#1a1a1f] transition-colors font-semibold"
                            >
                                <Edit size={16} /> Edit Limits
                            </button>
                        </div>
                    ))}
                </div>

                {/* Modal (Add / Edit) */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
                        <div className="bg-white dark:bg-[#09090b] w-full max-w-md rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <Settings2 className="text-[#3D52A0]" />
                                    {editingGateway ? 'Edit Gateway' : 'Add Gateway'}
                                </h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 dark:hover:text-white">&times;</button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Gateway Name</label>
                                    <input
                                        type="text"
                                        required
                                        disabled={!!editingGateway}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g., STRIPE, PAYPAL, ATOM"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1a1a1f] focus:outline-none focus:ring-2 focus:ring-[#3D52A0] uppercase disabled:opacity-50"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Priority (1=First)</label>
                                        <input
                                            type="number"
                                            required
                                            min="1"
                                            value={formData.priority}
                                            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1a1a1f] focus:outline-none focus:ring-2 focus:ring-[#3D52A0]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Daily Limit ($)</label>
                                        <input
                                            type="number"
                                            required
                                            min="1"
                                            value={formData.limit}
                                            onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1a1a1f] focus:outline-none focus:ring-2 focus:ring-[#3D52A0]"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-4 rounded-xl font-bold text-lg bg-[#3D52A0] hover:bg-[#2d3d7a] text-white transition-all mt-4"
                                >
                                    Save Configuration
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}