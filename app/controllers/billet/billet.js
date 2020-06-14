const Billet = require('../../models/billet');

module.exports = {
    create : async (req, res) =>{
        const { code, dueDate, url } = req.body;
        
        const billet = await Billet.create({
            code, 
            dueDate, 
            url
        })

        return res.send(convertToResponse(billet))
    },

    find : async (req, res) => {
        const billets = await Billet.find()
        
        let response = [];

        billets.forEach(billet => {
            response.push(convertToResponse(billet))
        });

        return res.send(response)
    },

    findById : async (req, res) => {
        const { id } = req.params;
        
        const billet = await Billet.findById(id);
 
         res.send(convertToResponse(billet));
    }    
}

let convertToResponse = (billet) => {
    return {
        id: billet._id,
        code: billet.code, 
        dueDate: billet.dueDate, 
        url: billet.url
    };
}