const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

exports.register = async (req, res) => {
    const { email, username, password } = req.body;
    if (!email || !username || !password) throw 'All fields not provided.'

    const userExists = await User.findOne({ email });
    if (userExists) throw "This email has already been used.";

    const user = new User({
        username,
        email,
        password,
    });
    await user.save();

    res.json({
        status: 'ok',
        message: "User registered successfully."
    })
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) throw 'All fields not provided.'

    const user = await User.findByCredentials(email, password);
    if (!user) throw "Invalid login credentials.";

    const tokenData = {
        id: user._id,
        name: user.username,
        email: user.email,
    };
    const accessToken = await jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn: 3600000});

    res.cookie('jwt', accessToken , { httpOnly: true, maxAge: 3600000 })
    res.json({
        status: 'ok',
        message: "Logged in successfully",
        auth: true,
        data: tokenData,
        token: accessToken,
    });
}

exports.logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}
