import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { faPersonWalkingDashedLineArrowRight } from '@fortawesome/free-solid-svg-icons';

// Création du contexte
const UserContext = createContext();

// Fournisseur du contexte
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Initialisation de l'état avec un utilisateur null

    useEffect(() => {
        const userId = localStorage.getItem('user');
        if (userId) {
            axios.get(`http://localhost:5000/api/users/${userId}`)
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    console.error("Erreur lors de la récupération des données utilisateur", error);
                });
        }
    }, []);

    // Fonction pour mettre à jour l'état de l'utilisateur
    const updateUser = async (userData) => {
        setUser(userData);
    };

    // Fonction pour déconnecter l'utilisateur
    const logoutUser = () => {
        setUser(null);
    };

    // Valeurs et fonctions fournies par le contexte
    const value = {
        user,
        updateUser,
        logoutUser
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte de l'utilisateur
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser doit être utilisé à l'intérieur d’un UserProvider");
    }
    return context;
};