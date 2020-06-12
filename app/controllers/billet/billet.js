const Billet = require('../../models/billet');

module.exports = {
    create : async (req, res) =>{
        const { code, dueDate, url } = req.body;
        
        const billet = await Billet.create({
            code, 
            dueDate, 
            url
        })

        return res.send(billet)
    },

    find : async (req, res) => {
        const billets = await Billet.find()
        return res.send(billets)
    },

    findById : async (req, res) => {
        const { id } = req.params;
        
        const billet = await Billet.findById(id);
 
         res.send(billet);
    }   
}