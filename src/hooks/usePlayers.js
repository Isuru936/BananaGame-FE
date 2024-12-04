import { useState, useCallback } from 'react';
import { setupAxiosInstance } from '../api/setupAxiosInstance';
import { useLogout } from '../hooks/useLogout';

export const usePlayers = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingPlayer, setLoadingPlayer] = useState(false);
    const [error, setError] = useState(null);
    const [dataFetched, setDataFetched] = useState(false); // Flag for list of players
    const [fetchedPlayer, setFetchedPlayer] = useState(null); // Flag for individual player

    const logout = useLogout();
    const axiosInstance = setupAxiosInstance(logout);

    const fetchPlayers = useCallback(async () => {
        if (dataFetched || loading) return; // Prevent fetching if already fetched or loading
        setLoading(true);
        try {
            const { data } = await axiosInstance.get('/players');
            setPlayers(data);
            setDataFetched(true);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [axiosInstance, dataFetched, loading]);

    // Fetch individual player by ID
    const fetchPlayerById = async (id) => {
        if (fetchedPlayer === id || loadingPlayer) return; // Skip if player data already fetched or loading
        setLoadingPlayer(true);
        try {
            const { data } = await axiosInstance.get(`/player/${id}`);
            if(data.isFailure){
                console.log(data.error.description);
            }
            return data;
        } catch (error) {
            setError(error);
        } finally {
            setLoadingPlayer(false);
            setFetchedPlayer(id); // Mark the player as fetched
        }
    };

    // Update player details
    const updatePlayerDetails = async (id, playerData) => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.put(`/players/${id}`, playerData);
            if(data.isFailure){
                console.log(data.error.description);
            }
            setPlayers((prevPlayers) =>
                prevPlayers.map((player) =>
                    player.id === id ? { ...player, ...data } : player
                )
            );
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    // Update player stats
    const updatePlayerStatsDetails = async (id, statsData) => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.put(`/players/${id}/stats`, statsData);
            if(data.isFailure){
                console.log(data.error.description);
            }
            setPlayers((prevPlayers) =>
                prevPlayers.map((player) =>
                    player.id === id ? { ...player, stats: { ...player.stats, ...data } } : player
                )
            );
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        players,
        loading,
        error,
        fetchPlayers,
        fetchPlayerById,
        updatePlayerDetails,
        updatePlayerStatsDetails,
    };
};
