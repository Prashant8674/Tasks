import UserModal from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserController {
    static UserRegistration = async (req, res) => {
        const { name, email, password, tc } = req.body;
        const user = await UserModal.findOne({ email: email });
        if (user) {
            res.send({ "status": "failed", "message": "Email already existes" });
        } else {
            if (name && email && password && tc) {
                try {
                    const salt = await bcrypt.genSalt(10);
                    const hashPassword = await bcrypt.hash(password, salt);
                    const doc = new UserModal({
                        name: name,
                        email: email,
                        password: hashPassword,
                        tc: tc
                    });
                    await doc.save();
                    const saved_user = await UserModal.findOne({ email: email });
                    const token = jwt.sign({ userID: saved_user._id },
                        process.env.JWT_SECRET_KEY, { expiresIn: '5d' });
                    res.status(201).send({ "status": "Success", "message": "Registration Successfully Done...", "token": token });
                } catch (error) {
                    console.log(error);
                    res.send({ "status": "failed", "message": "Unable to Register" });
                }

            } else {
                res.send({ "status": "failed", "message": "All fields are required!" });
            }
        }
    };

    static userLogin = async (req, res) => {
        try {
            const { email, password } = req.body;
            if (email && password) {
                const user = await UserModal.findOne({ email: email });
                if (user != null) {
                    const isMatch = await bcrypt.compare(password, user.password);
                    if ((user.email === email) && isMatch) {
                        const token = jwt.sign({ userID: user._id },
                            process.env.JWT_SECRET_KEY, { expiresIn: '5d' });
                        res.send({ "status": "Success", "message": "Login Successfully Done...", "token":token });
                    } else {
                        res.send({ "status": "failed", "message": "Email or Password is not valid!" });
                    }
                }
                else {
                    res.send({ "status": "failed", "message": "You are not a registered user!" });
                }
            }
            else {
                res.send({ "status": "failed", "message": "All fields are required!" });
            }
        } catch (error) {
            console.log(error);
            res.send({ "status": "failed", "message": "Unable to Login" });

        }
    }

    static loggedUser = async(req,res) => {
        res.send({"user":req.user});
    }
}
export default UserController;