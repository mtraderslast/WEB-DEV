'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
    Settings2, Plus, Wallet, KeyRound,
    PlugZap, CheckCircle2, AlertCircle, X
} from 'lucide-react';
import Swal from 'sweetalert2';
import {
    fetchGateways,
    fetchGatewayProviders,
    createGateway,
    updateGateway,
} from '@/lib/action/gateway';

const PROVIDER_META = {
    kunnect: {
        title: 'Kunnect',
        blurb: 'Hosted checkout for cards and alternative payment methods.',
    },
    stripe: {
        title: 'Stripe',
        blurb: 'Card payments. Adapter will be added when access is ready.',
    },
    antom: {
        title: 'Antom',
        blurb: 'Antom checkout. Adapter will be added when access is ready.',
    },
};

const emptyForm = {
    provider: 'kunnect',
    displayName: '',
    currency: 'USD',
};

const extractError = (error, fallback) =>
    error?.response?.data?.message || fallback;

export default function AdminGatewaysPage() {
    const [gateways, setGateways] = useState([]);
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingGateway, setEditingGateway] = useState(null);
    const [formData, setFormData] = useState(emptyForm);

    const integratedMap = useMemo(() => {
        return providers.reduce((acc, item) => {
            acc[item.provider] = item.integrated;
            return acc;
        }, {});
    }, [providers]);

    const alreadyAdded = useMemo(
        () => new Set(gateways.map((item) => item.provider).filter(Boolean)),
        [gateways]
    );

    const catalog = providers.length
        ? providers
        : Object.keys(PROVIDER_META).map((provider) => ({
            provider,
            integrated: provider === 'kunnect',
        }));

    const addableProviders = catalog.filter((item) => !alreadyAdded.has(item.provider));

    const loadData = async () => {
        setLoading(true);
        setError('');
        try {
            const gatewayRes = await fetchGateways();
            setGateways(Array.isArray(gatewayRes?.data) ? gatewayRes.data : []);
        } catch (err) {
            setError(extractError(err, 'Could not load payment gateways. Sign in as admin and try again.'));
            setGateways([]);
            setLoading(false);
            return;
        }

        try {
            const providerRes = await fetchGatewayProviders();
            setProviders(Array.isArray(providerRes?.data) ? providerRes.data : []);
        } catch {
            setProviders([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingGateway(null);
        setFormData(emptyForm);
    };

    const openCreateModal = () => {
        if (!addableProviders.length) {
            Swal.fire({
                icon: 'info',
                title: 'All gateways added',
                text: 'Every available provider is already in the list. Use Configure or Set as active instead.',
                confirmButtonColor: '#3D52A0',
            });
            return;
        }

        const nextProvider = addableProviders[0].provider;
        setEditingGateway(null);
        setFormData({
            provider: nextProvider,
            displayName: PROVIDER_META[nextProvider]?.title || nextProvider,
            currency: 'USD',
        });
        setIsModalOpen(true);
    };

    const openEditModal = (gateway) => {
        setEditingGateway(gateway);
        setFormData({
            provider: gateway.provider,
            displayName: gateway.displayName || PROVIDER_META[gateway.provider]?.title || '',
            currency: gateway.currency || 'USD',
        });
        setIsModalOpen(true);
    };

    const handleActivate = async (gateway) => {
        if (!integratedMap[gateway.provider] && gateway.provider !== 'kunnect') {
            await Swal.fire({
                icon: 'info',
                title: 'Not integrated yet',
                text: `${PROVIDER_META[gateway.provider]?.title || gateway.provider} is saved, but checkout cannot use it until the server adapter is added.`,
                confirmButtonColor: '#3D52A0',
            });
            return;
        }

        const confirm = await Swal.fire({
            icon: 'question',
            title: `Use ${gateway.displayName || gateway.provider}?`,
            text: 'Every new checkout will go through this gateway until you change it again.',
            showCancelButton: true,
            confirmButtonText: 'Set as active',
            confirmButtonColor: '#3D52A0',
            cancelButtonColor: '#6b7280',
        });

        if (!confirm.isConfirmed) return;

        try {
            await updateGateway(gateway._id, { isActive: true });
            await loadData();
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Could not activate',
                text: extractError(err, 'Please try again.'),
                confirmButtonColor: '#3D52A0',
            });
        }
    };

    const handleDeactivate = async (gateway) => {
        const confirm = await Swal.fire({
            icon: 'warning',
            title: 'Turn off this gateway?',
            text: 'Checkout will stop until another gateway is set as active.',
            showCancelButton: true,
            confirmButtonText: 'Deactivate',
            confirmButtonColor: '#b91c1c',
            cancelButtonColor: '#6b7280',
        });

        if (!confirm.isConfirmed) return;

        try {
            await updateGateway(gateway._id, { isActive: false });
            await loadData();
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Could not update',
                text: extractError(err, 'Please try again.'),
                confirmButtonColor: '#3D52A0',
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            if (editingGateway) {
                await updateGateway(editingGateway._id, {
                    displayName: formData.displayName.trim(),
                    currency: formData.currency,
                });
            } else {
                await createGateway({
                    provider: formData.provider,
                    displayName: formData.displayName.trim() || PROVIDER_META[formData.provider]?.title,
                    currency: formData.currency,
                    isActive: formData.provider === 'kunnect',
                });
            }

            closeModal();
            await loadData();
            Swal.fire({
                icon: 'success',
                title: editingGateway ? 'Gateway updated' : 'Gateway added',
                timer: 1400,
                showConfirmButton: false,
            });
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Could not save',
                text: extractError(err, 'Please check the details and try again.'),
                confirmButtonColor: '#3D52A0',
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#3D52A0] border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto text-gray-900 dark:text-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-[#3D52A0] mb-1">Payments</p>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <Wallet className="text-[#3D52A0]" />
                        Payment gateways
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl">
                        Only one gateway can be active. API keys live in the server .env file — this page only turns a gateway on or off.
                    </p>
                </div>
                <button
                    onClick={openCreateModal}
                    disabled={!addableProviders.length}
                    className="flex items-center gap-2 bg-[#3D52A0] hover:bg-[#2d3d7a] disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-[#3D52A0]/20 cursor-pointer"
                >
                    <Plus size={18} /> Add gateway
                </button>
            </div>

            {error && (
                <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20 px-4 py-3 text-sm text-red-700 dark:text-red-300">
                    <AlertCircle size={18} className="mt-0.5 shrink-0" />
                    <p>{error}</p>
                </div>
            )}

            {!error && gateways.length === 0 && (
                <div className="bg-white dark:bg-[#09090b] rounded-3xl border border-dashed border-gray-300 dark:border-gray-800 px-6 py-16 text-center">
                    <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-[#3D52A0]/10 text-[#3D52A0] flex items-center justify-center">
                        <PlugZap size={26} />
                    </div>
                    <h2 className="text-xl font-bold mb-2">No gateway connected</h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
                        Add Kunnect first. Put the API keys in the server .env, then activate the gateway here.
                    </p>
                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center gap-2 bg-[#3D52A0] hover:bg-[#2d3d7a] text-white px-5 py-2.5 rounded-xl font-semibold cursor-pointer"
                    >
                        <Plus size={18} /> Add Kunnect
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {gateways.map((gateway) => {
                    const meta = PROVIDER_META[gateway.provider] || { title: gateway.provider, blurb: '' };
                    const integrated = gateway.provider === 'kunnect' || Boolean(integratedMap[gateway.provider]);

                    return (
                        <div
                            key={gateway._id}
                            className={`bg-white dark:bg-[#09090b] rounded-3xl p-6 border shadow-sm flex flex-col ${gateway.isActive
                                ? 'border-[#3D52A0] shadow-[#3D52A0]/10'
                                : 'border-gray-200 dark:border-gray-800'
                            }`}
                        >
                            <div className="flex items-start justify-between gap-4 mb-5">
                                <div>
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <h2 className="text-2xl font-bold">{gateway.displayName || meta.title}</h2>
                                        {gateway.isActive && (
                                            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2.5 py-1 rounded-full">
                                                <CheckCircle2 size={12} /> Active
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{meta.blurb}</p>
                                </div>
                                <div className="w-11 h-11 rounded-2xl bg-[#3D52A0]/10 text-[#3D52A0] flex items-center justify-center shrink-0">
                                    <Wallet size={20} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-5">
                                <div className="rounded-2xl bg-gray-50 dark:bg-[#1a1a1f] border border-gray-100 dark:border-gray-800 p-3">
                                    <p className="text-xs text-gray-500 mb-1">Provider</p>
                                    <p className="font-semibold uppercase tracking-wide">{gateway.provider || '—'}</p>
                                </div>
                                <div className="rounded-2xl bg-gray-50 dark:bg-[#1a1a1f] border border-gray-100 dark:border-gray-800 p-3">
                                    <p className="text-xs text-gray-500 mb-1">Currency</p>
                                    <p className="font-semibold">{gateway.currency || 'USD'}</p>
                                </div>
                                <div className="rounded-2xl bg-gray-50 dark:bg-[#1a1a1f] border border-gray-100 dark:border-gray-800 p-3">
                                    <p className="text-xs text-gray-500 mb-1">Integration</p>
                                    <p className={`font-semibold ${integrated ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                                        {integrated ? 'Ready' : 'Coming soon'}
                                    </p>
                                </div>
                                <div className="rounded-2xl bg-gray-50 dark:bg-[#1a1a1f] border border-gray-100 dark:border-gray-800 p-3">
                                    <p className="text-xs text-gray-500 mb-1">.env keys</p>
                                    <p className={`font-semibold ${gateway.hasCredentials ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                                        {gateway.hasCredentials ? 'Loaded' : 'Pending'}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-auto flex flex-col sm:flex-row gap-3">
                                {gateway.isActive ? (
                                    <button
                                        type="button"
                                        onClick={() => handleDeactivate(gateway)}
                                        className="flex-1 py-3 rounded-xl border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 font-semibold hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer"
                                    >
                                        Deactivate
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => handleActivate(gateway)}
                                        className="flex-1 py-3 rounded-xl bg-[#3D52A0] hover:bg-[#2d3d7a] text-white font-semibold cursor-pointer"
                                    >
                                        Set as active
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={() => openEditModal(gateway)}
                                    className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#1a1a1f] font-semibold flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <Settings2 size={16} /> Configure
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
                    <div className="bg-white dark:bg-[#09090b] w-full max-w-lg rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-2xl">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <KeyRound className="text-[#3D52A0]" />
                                    {editingGateway ? 'Configure gateway' : 'Add gateway'}
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    API keys stay in the server .env file. You only choose which gateway is active.
                                </p>
                            </div>
                            <button type="button" onClick={closeModal} className="text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium mb-1.5">Provider</label>
                                <select
                                    required
                                    disabled={!!editingGateway}
                                    value={formData.provider}
                                    onChange={(e) => {
                                        const provider = e.target.value;
                                        setFormData({
                                            provider,
                                            displayName: PROVIDER_META[provider]?.title || provider,
                                            currency: 'USD',
                                        });
                                    }}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1a1a1f] focus:outline-none focus:ring-2 focus:ring-[#3D52A0] disabled:opacity-50"
                                >
                                    {(editingGateway ? catalog.filter((item) => item.provider === formData.provider) : addableProviders).map((item) => (
                                        <option key={item.provider} value={item.provider}>
                                            {PROVIDER_META[item.provider]?.title || item.provider}
                                            {item.integrated || item.provider === 'kunnect' ? '' : ' (coming soon)'}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1.5">Display name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.displayName}
                                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1a1a1f] focus:outline-none focus:ring-2 focus:ring-[#3D52A0]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1.5">Currency</label>
                                <input
                                    type="text"
                                    required
                                    maxLength={3}
                                    value={formData.currency}
                                    onChange={(e) => setFormData({ ...formData, currency: e.target.value.toUpperCase() })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1a1a1f] focus:outline-none focus:ring-2 focus:ring-[#3D52A0]"
                                />
                            </div>

                            <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#1a1a1f] p-4 text-sm text-gray-600 dark:text-gray-400">
                                Kunnect API keys are read from the server .env file. You do not need to paste them here.
                            </div>

                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full py-4 rounded-xl font-bold text-lg bg-[#3D52A0] hover:bg-[#2d3d7a] text-white transition-all disabled:opacity-70 cursor-pointer"
                            >
                                {saving ? 'Saving...' : 'Save gateway'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
