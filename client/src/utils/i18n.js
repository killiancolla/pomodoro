import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    fr: {
        translation: {
            welcome: 'Bienvenue sur notre Pomodoro Timer',
            numberCycle: 'Nombre de cycles :',
            workSince: 'Je travaille depuis :',
            start: 'Démarrer',
            stop: 'Arrêter',
            reset: 'Réinitialiser',
            youdo: 'Vous avez effectué',
            ofyourtask: 'de vos tâches',
            addtask: 'Ajouter une tâche...',
            add: 'Ajouter',
            delete: 'Supprimer',
            session: 'Session',
            errorLogin: 'Vos identifiants sont incorrects.',
            successLogin: 'Connexion réussie.'
        },
    },
    en: {
        translation: {
        },
    },
    de: {
        translation: {
        },
    },
    ja: {
        translation: {
        },
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'fr',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
