import LinksModel from "../Models/LinksModel.js"

const LinksController = {
  getList: async (req, res) => {
    try {
      const links = await LinksModel.find();//ללא סינון
      res.json({ links});
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  add: async (req, res) => {
    const { originalUrl,targetParamName,targetValues,userId} = req.body;
    try {
      const user = await UsersModel.findById(req.params.user);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      let newLink = {originalUrl,userId};
      const linkExists = user.links.some(link => link.id === newLink.id);
      if (linkExists) {
        return res.status(409).json( {message: 'Link already exists' });
      }

      if (targetParamName) newLink.targetParamName = targetParamName;
      if(targetValues)newLink.targetParamName = targetValues;
      newLink = await LinksModel.create(newLink);
      user.links.push(newLink._id);
      await user.save();
      res.json(newLink);
    } catch (e) {
      console.error('Error adding link:', e);
      return res.status(500).json({ message: 'Error adding link' });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedLink = await LinksModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });//עדכון לפי מזהה
      res.json(updatedLink);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  delete: async (req, res) => {
    const { id ,user} = req.params;
    try {
      const deleted = await LinksModel.findByIdAndDelete(id);//מחיקה לפי מזהה
      const userForDelete = await UsersModel.findById(user);
      if(userForDelete){
         const deletedId= userForDelete.links.findByIdAndDelete(id);
         console.log("deletesID",deletedId);
      }
      res.json(deleted);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
  getClickInfoById: async (req, res) => {
    try {
    const link = await LinksModel.findById(req.params.id);//שליפה לפי מזהה
    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }
    const clickInfo = link.clicks.reduce((acc, click) => {
      const source = click.targetParamValue || 'unknown';
      if (!acc[source]) {
        acc[source] = 0;
      }
      acc[source]++;
      return acc;
    }, {});

    res.json(clickInfo);
  }catch(e){
    res.status(400).json({massage:e.massage})
  }
},


};




export default LinksController;
