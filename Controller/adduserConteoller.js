const Adduser = require('../Models/Addmodel');
const multer = require('multer');
const path = require('path');


const filefilter = (req, file, cb) => {
    const allowedFileTypes = ['images/jpg', 'images/jpeg', 'images/png'];

    if(allowedFileTypes.includes(file.mimetype)){
        cb(null, true);
    }else {
        cb(null, false)
    }
};

const storage = multer.diskStorage({
    destination: path.join("Public/images"),
    filename: function(req, file, cb) {
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
}).fields([
    {name: "RegisterPhoto", maxCount: 1}
]);

const adduser = (req, res) => {
    try{
        upload (req, res, async(err) => {
            if(err){
                console.error('Multer error:', err);
                return res.status(400).json({error:'File upload failed'});
            }

            if(!req.files){
                return res.status(400).json({ error: 'No files uploaded'});
            }

            if(!req.files.RegisterPhoto){
                return res.status(400).json({ error: 'registerphoto require'});
            }

            const user = new Adduser({...req.body});

            user.RegisterPhoto = {
                data:req.files.RegisterPhoto[0].buffer,
                contentType:req.files.RegisterPhoto[0].mimetype,
                path: path.join("Public", "images", req.files.RegisterPhoto[0].filename),
            };

            console.log('Files uploades sucessfully');

            if(req.body){
                user.Name= req.body.Name;
                user.Email= req.body.Email;
                user.Gender= req.body.Gender;
                user.Course= req.body.Course;
                user.Starting_date= req.body.Starting_date;
                user.Mobilenumber= req.body.Mobilenumber;
                user.Designation= req.body.Designation;
            }

            if(req.file){
                user.RegisterPhoto.data = req.file.buffer;
                user.RegisterPhoto.contentType = req.file.mimetype;
                const imagepath = path.join("Public/images", req.file.filename);
                user.RegisterPhoto.path = imagepath;
                console.log("File Uploaded sucessfully")
            }

            user
            .save()
            .then((saveUser) => {
                console.log('Request Body:', req.body);
                console.log('User saved:', saveUser);
                res.send(saveUser);
            })
            .catch((err) => {
                console.error('MongoDB save error:', err);
                res.status(500).send('product add failed');
            });
        });
    } catch (err){
        console.error('Create User error:', err);
        res.status(500).json({ error: 'Failed to create user' });    
    }
}

// const adduser = async(req, res, next) =>{
//     try{

//         upload(req, res, async (err) =>{
//             if(err){
//                 console.error('Multer Error:', err)
//                 return res.status(400).json({error:'File Upload failed'})
//             }

//             if(!req.files){
//                 return res.status(400).json({error: "No files Uploaded"})
//             }

//             if(!req.files.RegisterPhoto) {
//                 return res.status(400).json({error:"Registerphoto are requied"})
//             }
//         const{Name, Email,Designation, Mobilenumber, Gender,Course,Starting_date} = req.body;
//         // const Password = generateRandomPassword();
//         if(!Name || !Email || !Designation || !Mobilenumber || !Starting_date || !Gender || !Course){
//             return res.json({message: 'All fields are required'})
//         }

//         const user = new Adduser({
//             Name,
//             Email,
//             // Password,
//             Designation,
//             Mobilenumber,
//             Gender,
//             Course,
//             Starting_date
//         });
//         user.RegisterPhoto = {
//             data: req.files.RegisterPhoto[0].buffer,
//             contentType:req.files.RegisterPhoto[0].mimetype,
//             path: path.join('Public', "images", req.files.RegisterPhoto[0].filename),
//         };

//         console.log('Files Uploaded Sucessfully');

//         if(req.file){
//             user.RegisterPhoto.data = req.file.buffer;
//             user.RegisterPhoto.contentType = req.file.mimetype;
//             const imagePath = path.join("Public/images", req.file.filename);
//             user.RegisterPhoto.path = imagePath;
//             console.log("File uploaaaaad sucess");
//         }

        // function generateRandomPassword() {
        //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        //     const passwordLength = 12;
        //     let Password = '';
        //     for (let i =0; i < passwordLength; i++){
        //         Password += characters.charAt(Math.floor(Math.random() * characters.length))
        //     }
        //     return Password;
        // }

        // add user///////////////////////////////////////////////////
//         await user.save();
//         res.status(201).json({message:'User Added Successfull', success:true, user});
//         next();
//     })
//     } catch (error){
//         console.error(error);
//     }
// };

 const user_details = async(req, res) => {
    try{
        const user = await Adduser.find().exec();
        if(!user){
            res.status(400).json({error:"Sorry invalid id"});
        }else{
            res.json(user)
        }
    }catch{
        res.status(500).json({error:"Server error"})
    }
 };

 const user_display = async(req, res) => {
    try{
        const user = await Adduser.findById(req.params.id);
        if(!user) {
            res.status(400).json({error: "sorry invalid id"});
        }
        else{
            res.json(user)
        }
    }catch
	{
		res.status(500).json({error: "server error"});
	}
 }

 const user_Update = async(req, res)=>{
    try{
        await Adduser.findByIdAndUpdate(req.params.id, req.body,{new:true});
        res.json({message:"user updated"})
    } catch(err){
        res.status(400).json({err:" sorry can't update check controller services"})
    }
 };

 const user_delete = async(req, res) => {
    try{
        const user = await Adduser.findById(req.params.id);
        if(!user){
            res.status(404).json({
                'Error': "sorry 404 not found"
            });
        }else{
            await Adduser.findByIdAndDelete(req.params.id);
            res.status(200).json({
                'message' :" Status is ok"
            })
        }
    }catch(error)
	{
		res.status(500).json({
			'error': "server not found"
		});
	}
 }



module.exports = {
    adduser,
    user_details,
    user_Update,
    user_display,
    user_delete
}
