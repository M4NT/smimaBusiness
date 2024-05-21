// controllers/userController.js
import { hash, compare } from 'bcrypt';
import { create, findOne } from '../models/user';

export async function signup(req, res) {
    const { username, email, password, cpf, telefone, endereco, profile_type } = req.body;

    try {
        const hashedPassword = await hash(password, 10);
        const newUser = await create({
            username,
            email,
            password: hashedPassword,
            cpf,
            telefone,
            endereco,
            profile_type
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function login(req, res) {
    const { email, password } = req.body;

    try {
        const user = await findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
