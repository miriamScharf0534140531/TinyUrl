import UsersModel from "../Models/UsersModel.js";
import LinksModel from "../Models/LinksModel.js";

const UsersController = {
  getList: async (req, res) => {
    try {
      const users = await UsersModel.find();//ללא סינון
      res.json({ users});
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  getById: async (req, res) => {
    try {
      const user = await UsersModel.findById(req.params.id);
      res.json(user);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedUser = await UsersModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });//עדכון לפי מזהה
      res.json(updatedUser);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await UsersModel.findByIdAndDelete(id);//מחיקה לפי מזהה
      res.json(deleted);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
  getByUserId: async (req, res) => {
    try{
      const userId = req.params.userId;
      const links = await LinksModel.find({ userId });
      console.log("gfggggggggggggggg",links);
      res.json(links);
    }catch(e){
      console.error('Error fetching links:', e);
      res.status(500).json({ message: 'Error fetching links' });
    }
  }
};

export default UsersController;
