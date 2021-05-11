const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: "Name is required.",
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: "Email is required.",
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: "Password is required.",
        trim: true
    },

},
    {
        timestamps: true
    },
)

userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(
            user.password,
            parseInt(process.env.SALT_ROUNDS)
        );
    }
    next();
});

userSchema.method({});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await mongoose.model("User", userSchema).findOne({ email: email });
    if (!user) throw "No user found with given email";

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw "Invalid password";
    return user;
};

const User = mongoose.model('User', userSchema)

module.exports = User