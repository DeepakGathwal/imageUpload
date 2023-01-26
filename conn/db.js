const mongoose = require('mongoose')
 const connection = async() => {
    try{
      await  mongoose.connect(process.env.DB,{useNewUrlParser:true})
        .then((data) => {
            console.log(`Mongoose Connect ${data.connection.host}`);
        }).catch((err) => {
            console.log(err.message);
        })
    }catch(err){
        console.log(err.message);
    }
}
module.exports = connection;