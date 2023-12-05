const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        // Recherchez l'utilisateur dans la base de données
        const user = await User.findOne({ email: username }); // Trouvez l'utilisateur par son nom d'utilisateur
        if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
        }

        // Vérifiez le mot de passe
        const isMatch = await bcrypt.compare(password, user.mdp);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

router.post('/register', async (req, res) => {
    try {
        const { nom, prenom, email, mdp } = req.body;

        // Vérifiez si l'utilisateur existe déjà
        const existingUser = await User.findOne({ login: email }); // Trouvez l'utilisateur par son nom d'utilisateur
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        // Hachez le mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(mdp, salt);

        // Créez un nouvel utilisateur
        const newUser = new User({
            nom: nom,
            prenom: prenom,
            email: email,
            mdp: hashedPassword
        });

        // Sauvegardez l'utilisateur dans la base de données
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user.', error: err });
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user,
            });
        }

        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }

            res.status(201).json({
                id: user.id,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                favTheme: user.favTheme,
                favLanguage: user.favLanguage,
                nbCycle: user.nbCycle,
                totalTime: user.totalTime,
                studyStats: user.studyStats
            });
        });
    })(req, res, next);
});

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json({
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        favTheme: user.favTheme,
        favLanguage: user.favLanguage,
        nbCycle: user.nbCycle,
        totalTime: user.totalTime,
        studyStats: user.studyStats
    });
});

router.post('/', async (req, res) => {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
});

router.patch('/:id', async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
});

router.post('/journal/:id', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(1, 0, 0, 0);
        const inc = 60;

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('Utilisateur non trouvé');
        }

        const studyStatIndex = user.studyStats.findIndex(stat => stat.date.getTime() === today.getTime());

        if (studyStatIndex === -1) {
            user.studyStats.push({ date: today, timeStudied: inc });
        } else {
            user.studyStats[studyStatIndex].timeStudied += inc;
        }

        await user.save();
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur serveur');
    }
});

router.delete('/:id', async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json(deletedUser);
});

module.exports = router;
