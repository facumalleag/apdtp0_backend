var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Users = require('../models').users;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
_this = this

exports.createUser = async function (user) {
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    var newUser = new Users({
        alias:user.alias,
        name: user.name,
        email: user.email,
        password: hashedPassword,
        isActive: user.status,
    })
    try {
        var savedUser = await newUser.save();
        console.log(savedUser.id)
        var token = jwt.sign({
            id: savedUser.id
        }, ""+process.env.SECRET, {
            //aca hay una solucion rara con el ""+process.env.secret. Sin el [""+] no funciona
            expiresIn: 86400 // expires in 24 hours
        });
        console.log("token",token)
        return {token:token, user:savedUser.email};
    } catch (e) {
        console.log(e)    
        throw Error("Error while Creating User")
    }
}

exports.fullRegister = async function (user) {
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    try {
        var filteredUser = await Users.findOne({
            where: {
                email: user.email
            }
        })
        console.log(filteredUser)
		var userActualizado = await filteredUser.update({
            alias:user.alias,
            name: user.name,
            email: user.email,
            password: hashedPassword,
            isActive: 1,
		}, {
			where: {
				id: user.id
				
			},
		})
        console.log(userActualizado.id)
        var token = jwt.sign({
            id: userActualizado.id
        }, ""+process.env.SECRET, {
            //aca hay una solucion rara con el ""+process.env.secret. Sin el [""+] no funciona
            expiresIn: 86400 // expires in 24 hours
        });
        console.log("token",token)
        return {token:token, user:userActualizado.email};
    } catch (e) {
        console.log(e)    
        throw Error("Error while Creating User")
    }
}

exports.halfRegister = async function (user) {
    var newUser = new Users({
        alias:user.alias,
        email: user.email,
    })
    try {
        var savedUser = await newUser.save();
        console.log(savedUser.id)
        var token = jwt.sign({
            id: savedUser.id
        }, ""+process.env.SECRET, {
            //aca hay una solucion rara con el ""+process.env.secret. Sin el [""+] no funciona
            expiresIn: 86400 // expires in 24 hours
        });
        console.log("token",token)
        return {token:token, user:savedUser.id};
    } catch (e) {
        console.log(e)    
        throw Error("Error while Creating User")
    }
}

exports.login = async function (user) {
    try {
      
        var _details = await Users.findOne({
            where: {
                email: user.email
			}
        });
       
        var passwordIsValid = bcrypt.compareSync(user.password, _details.password);
        if (!passwordIsValid) throw Error("Invalid username/password")
        var token = jwt.sign({
            id: _details.id
        }, ""+process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        console.log("llegue")
        console.log(passwordIsValid)
        let userd = {name: _details.name,email: _details.email,alias:_details.alias,id:_details.id}
        return {token:token, user:userd};
    } catch (e) {
        throw Error("Error while Login User")
    }

}
exports.verifyEmailAndAlias = async function (user) {

    // SELECT * FROM users WHERE email = user.email OR alias = user.alias;
    try {

        var userFetched = await Users.findOne({
            where:{
				[Op.or]: [
                    {email: user.email}, 
                    {alias: user.alias}
                ]
			}
        });
        console.log("llegue", userFetched)
        if (!userFetched){return {email: null, alias: null}}
        return {email: userFetched.email, alias: userFetched.alias}
        // return { ASI NO FUNCIONA
        //     email: userFetched.email?userFetched.email:null, 
        //     alias: userFetched.alias? userFetched.alias:null}
    } catch (e) {    
        throw Error("Error while verifying data - verifyEmailAndAlias")
    }

}

exports.updatePassword = async function (user) {  


    //Find the old User Object by the Id
    var oldUser = await Users.findOne({
        where: {
            email: user.email
        }
    });

    // If no old User Object exists return false
    if (oldUser===null) {
        return false;
    }
    //Edit the User Object
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    oldUser.password = hashedPassword
    try {
        var savedUser = await oldUser.save()
      
        return savedUser;
    } catch (e) {
        throw Error("And Error occured while updating the User");
    }
}

exports.findByEmail = async function (user) {
    console.log(user)
	try{
		var filteredUser = await Users.findOne({
			where: {
				email: user.email
			}
		})
		return filteredUser
	}catch(e){
        throw Error("And Error occured while searching the User");
	}
}