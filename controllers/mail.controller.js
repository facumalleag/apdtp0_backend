let nodemailer = require('nodemailer');
var UserService = require('../services/user.service');

exports.sendEmail = async function (req, res, next){// (Done)
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
        //host: 'svp-02715.fibercorp.local',
        //secure: false,
        port:25,
        service: 'Gmail',
        auth: {
            user: 'tp.api.js@gmail.com',//poner cuenta gmail
            pass: 'TPad12345'  //contraseña cuenta IMPORTANTE HABILITAR acceso apps poco seguras google
        }
     });
    // Definimos el email
    let random = (Math.floor(Math.random() * (10000 - 1000)) + 1000)
    var mailOptions = {
        from: 'pruebalabs@gmail.com',
        to: req.params.email,
        subject: "Cambio de contraseña - Recetas de Comida",
        html: '<h1> Codigo de verificacion  </h1><h3>' +random+'</h3>',
        
    };
    console.log("mail",mailOptions)
    // Enviamos el email
    try
    {
        let info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        return res.status(201).json({status: 201, data: random, message: "Email sent succesfully "});
    }
    catch(error)
    {
        console.log("Error envio mail: ",error);
        return res.status(400).json({status: 400,  message: "Error en sistema, refresque la pagina"});            
    }
};

exports.checkUserByEmail = async function (req, res, next){// (Done)
    let filtro= {email: req.params.email}
    console.log("email", filtro)
    var stt =""
    let msg = ""
    try {
        if(filtro.email ===null){
            throw new Exception("Invalid input - Incomplete Data", 405);
        }
        var UserExist = await UserService.findByEmail(filtro)
        if(UserExist===null){
            throw new Exception("User Not found", 400);
        }
        if(UserExist.password === null || UserExist.password ===""){
            throw new Exception("User Found but password empty", 433);
        }
        console.log(UserExist)
        return res.status(201).json({status: 201, data: !!UserExist, message: "successful operation - User fetched"});
    } catch (e) {
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg : e.message
        return res.status(stt).json({status: stt, message: msg})
    }
};


function Exception(msg,stt) {
    this.msg = msg;
    this.stt = stt;
 }
