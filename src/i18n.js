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
            session: 'Session'
        },
    },
    en: {
        translation: {
            welcome: 'Welcome to our Pomodoro Timer',
            numberCycle: 'Number of cycles:',
            workSince: 'Working since:',
            start: 'Start',
            stop: 'Stop',
            reset: 'Reset',
            youdo: 'You have completed',
            ofyourtask: 'of your tasks',
            addtask: 'Add a task...',
            add: 'Add',
            delete: 'Delete',
            session: 'Session'
        },
    },
    es: {
        translation: {
            welcome: 'Bienvenido a nuestro temporizador Pomodoro',
            numberCycle: 'Número de ciclos:',
            workSince: 'Trabajando desde:',
            start: 'Iniciar',
            stop: 'Detener',
            reset: 'Reiniciar',
            youdo: 'Has completado',
            ofyourtask: 'de tus tareas',
            addtask: 'Agregar una tarea...',
            add: 'Agregar',
            delete: 'Eliminar',
            session: 'Sesión'
        },
    },
    de: {
        translation: {
            welcome: 'Willkommen bei unserem Pomodoro-Timer',
            numberCycle: 'Anzahl der Zyklen:',
            workSince: 'Arbeiten seit:',
            start: 'Start',
            stop: 'Stopp',
            reset: 'Zurücksetzen',
            youdo: 'Du hast erledigt',
            ofyourtask: 'von deinen Aufgaben',
            addtask: 'Aufgabe hinzufügen...',
            add: 'Hinzufügen',
            delete: 'Löschen',
            session: 'Sitzung'
        },
    },
    ja: {
        translation: {
            welcome: '私たちのポモドーロタイマーへようこそ',
            numberCycle: 'サイクル数：',
            workSince: '作業開始：',
            start: 'スタート',
            stop: 'ストップ',
            reset: 'リセット',
            youdo: 'タスクの',
            ofyourtask: 'が完了しました',
            addtask: 'タスクを追加...',
            add: '追加',
            delete: '削除',
            session: 'セッション'
        },
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
