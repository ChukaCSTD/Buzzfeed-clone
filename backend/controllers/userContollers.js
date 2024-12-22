const userModel = require("../models/userModels");
const bcryptjs = require("bcryptjs");

const registerUser = async (req, res) => {
    try {
        const encrypt_password = await bcryptjs.hash(req.body.password, 10);
        const new_user = {...req.body, password: encrypt_password};
        const create_user = new userModel(new_user);
        const resp = await create_user.save();
        const user_data = {
            id: resp._id, 

            username: resp.username, 
            gender: resp.gender, 
            email: resp.email, 
            password: resp.password,
            is_author: resp.is_author
        };
        res.status(200).send({ success: true, msg: "User Created", data: user_data });
    } catch (error) {
        res.status(500).send({
            success: false, 
            msg: 'There was an error creating a user',
            error: error.message,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const find_user = await userModel.findOne({username: username});
        if (!find_user) return res.status(401).send({success: false, msg: "User Not Found"});
        const check_password = await bcryptjs.compare(password, find_user.password);
        if (!check_password) return res.status(401).send({success: false, msg: "Invalid Credentials"});
        const user_data = {
            id: find_user._id, 
            username: find_user.username, 
            first_name: find_user.first_name, 
            last_name: find_user.last_name, 
            email: find_user.email, 
            gender: find_user.gender, 
        };
        res.status(200).send({success: true, msg: "Login Successful", data: user_data});
    } catch (error) {
        res.status(500).send({
            success: false, 
            msg: 'Login Unsuccessful',
            error: error.message,
        });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.status(200).send({ success: true, data: users });
    } catch (error) {
        res.status(500).send({
            success: false, 
            msg: 'Error retrieving users',
            error: error.message,
        });
    }
};

const registerAdmin = async (req, res) => {
    try {
        const { username, email, gender, password } = req.body;

        // Check if the admin already exists
        const existingAdmin = await userModel.findOne({ username });
        if (existingAdmin) {
            return res.status(400).send({ success: false, msg: "Admin already exists" });
        }

        // Encrypt the password
        const encrypt_password = await bcryptjs.hash(password, 10);
        const new_admin = new userModel({ username, email, gender, password: encrypt_password, role: 'admin' });
        const resp = await new_admin.save();

        const admin_data = {
            id: resp._id,
            username: resp.username,
            email: resp.email,
            gender: resp.gender,
            role: resp.role,
        };

        res.status(200).send({ success: true, msg: "Admin Created", data: admin_data });
    } catch (error) {
        res.status(500).send({
            success: false,
            msg: 'There was an error creating an admin',
            error: error.message,
        });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const find_admin = await userModel.findOne({ username, role: 'admin' });
        if (!find_admin) return res.status(401).send({ success: false, msg: "Admin Not Found" });

        const check_password = await bcryptjs.compare(password, find_admin.password);
        if (!check_password) return res.status(401).send({ success: false, msg: "Invalid Credentials" });

        const admin_data = {
            id: find_admin._id,
            username: find_admin.username,
            email: find_admin.email,
            gender: find_admin.gender,
            role: find_admin.role,
        };

        res.status(200).send({ success: true, msg: "Login Successful", data: admin_data });
    } catch (error) {
        res.status(500).send({
            success: false,
            msg: 'Login Unsuccessful',
            error: error.message,
        });
    }
};

module.exports = { registerUser, loginUser, getAllUsers, registerAdmin, loginAdmin };