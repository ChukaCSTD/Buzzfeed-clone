const categoryModel = require("../models/categoryModels");
const userModel = require("../models/userModels");

const createCategory = async (req, res) => {
    try {
        const category_name = req.body.name;
        const user_id = req.body.user_id;
        if(!category_name) return res.status(401).send({message: "Category Name Required"});
        if(!user_id) return res.status(401).send({message: "User ID Required"});
        const user = await userModel.findById(user_id);
        if (!user) return res.status(404).send({ success: false, msg: "User not Found"})
        // if (user.role != "admin") return res.status(401).send({success: false, msg: "User Unauthorized"});
        const create = new categoryModel(req.body);
        const resp = await create.save();
        res.status(200).send({ success: true, msg: "Category Created", data: resp }) 
    } catch (error) {
        res.status(500).send({ success: false, msg: "The following error has occurred:", error: error.message });
    }
};

const getCategory = async (req, res) => {
    try {
        const resp = await categoryModel.find();
        res.status(200).send({ success: true, data: resp });
    } catch (error) {
        res.send({success: false, error: error.message});
    }
}

module.exports = { createCategory, getCategory };