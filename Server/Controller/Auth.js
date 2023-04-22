import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../DataBase/Models/User.js'

export const register = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation } = req.body

        const salt = await bcrypt.getSal(); //hashear
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 40000),
            impression: Math.floor(Math.random() * 10000)
        })
        const savedUser = await newUser.save()
        res.status(201).json({
            message: "user successful registered",
            data: savedUser
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })

        if (!user) return res.status.json({
            message: 'User does not exist'
        })
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ msg: "invalid credential" })
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        delete user.password;
        res.status(200).json({ token, user })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}
