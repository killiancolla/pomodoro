import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    "fr": {
        "translation": {
            "welcome": "Bienvenue sur notre Pomodoro Timer",
            "numberCycle": "Nombre de cycles :",
            "workSince": "Je travaille depuis :",
            "start": "Démarrer",
            "stop": "Arrêter",
            "reset": "Réinitialiser",
            "youdo": "Vous avez effectué",
            "ofyourtask": "de vos tâches",
            "addtask": "Ajouter une tâche...",
            "add": "Ajouter",
            "delete": "Supprimer",
            "session": "Session",
            "errorLogin": "Vos identifiants sont incorrects.",
            "successLogin": "Connexion réussie.",
            "musicplayer": "Musique",
            "todolist": "Liste de tâches",
            "theme": "Thème",
            "timer": "Timer",
            "cafe": "Café",
            "biblio": "Bibliothèque"
        }
    },
    "en": {
        "translation": {
            "welcome": "Welcome to our Pomodoro Timer",
            "numberCycle": "Number of cycles:",
            "workSince": "I have been working for:",
            "start": "Start",
            "stop": "Stop",
            "reset": "Reset",
            "youdo": "You have completed",
            "ofyourtask": "of your tasks",
            "addtask": "Add a task...",
            "add": "Add",
            "delete": "Delete",
            "session": "Session",
            "errorLogin": "Your credentials are incorrect.",
            "successLogin": "Login successful.",
            "musicplayer": "Music",
            "todolist": "To-do list",
            "theme": "Theme",
            "timer": "Timer",
            "cafe": "Café"
        }
    },
    "it": {
        "translation": {
            "welcome": "Benvenuto al nostro Timer Pomodoro",
            "numberCycle": "Numero di cicli:",
            "workSince": "Lavoro da:",
            "start": "Avvia",
            "stop": "Ferma",
            "reset": "Reimposta",
            "youdo": "Hai completato",
            "ofyourtask": "dei tuoi compiti",
            "addtask": "Aggiungi un compito...",
            "add": "Aggiungi",
            "delete": "Elimina",
            "session": "Sessione",
            "errorLogin": "Le tue credenziali sono errate.",
            "successLogin": "Accesso riuscito.",
            "musicplayer": "Musica",
            "todolist": "Lista delle attività",
            "theme": "Tema",
            "timer": "Timer",
            "cafe": "Caffè"
        }
    },
    "ja": {
        "translation": {
            "welcome": "私たちのポモドーロ・タイマーへようこそ",
            "numberCycle": "サイクル数：",
            "workSince": "作業開始から：",
            "start": "開始",
            "stop": "停止",
            "reset": "リセット",
            "youdo": "あなたは完了しました",
            "ofyourtask": "あなたのタスクの",
            "addtask": "タスクを追加...",
            "add": "追加",
            "delete": "削除",
            "session": "セッション",
            "errorLogin": "認証情報が正しくありません。",
            "successLogin": "ログイン成功。",
            "musicplayer": "音楽",
            "todolist": "やることリスト",
            "theme": "テーマ",
            "timer": "タイマー",
            "cafe": "喫茶店"
        }
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
