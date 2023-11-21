const StudentModel = require('../models/Student');
var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'depjzfj9a', 
    api_key: '489915939841262', 
    api_secret: '5tBdTUHJ33XMIN3iP-49Rfeps9I',
    // secure: true
});

class StudentController {

    static index = async(req,res) => {
        try {
            res.render('index')
        } catch (err) {
            console.log(err);
        }
    }

    static fetchAllStudent = async(req,res) => {
        try {
            const data = await StudentModel.find()
            // console.log(data);
            res.status(201).json({
                success: true,
                data
            })
        } catch (error) {
            res.status(401).json({ 'status': 'failed', 'message': `Error: ${err}` })
        }
    }

    static add = async(req,res) => {
        try {
            res.render('add')
        } catch (err) {
            console.log(err);
        }
    }

    static store = async(req,res) => {
        try {
            const { name, age, studentClass, email, phone } = req.body
            const file = req.files.studentImage

            const myCloud = await cloudinary.uploader.upload(file.tempFilePath,{
                folder : 'oriolLearningJQueryImages'
            })

            const data = new StudentModel({
                name : name,
                age : age, 
                studentClass : studentClass, 
                email : email, 
                phone : phone,
                studentImage: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                },
            })

            const isDataSaved = await data.save()

            if (isDataSaved) {
                res.status(201).json({ 'status': 'success', 'message': 'Student Data Saved Successfully' })
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'Internal Server Error' })
            }
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': `Error: ${err}` })
        }
    }

    static edit = async(req,res) => {
        try {
            res.render('edit')
        } catch (err) {
            console.log(err);
        }
    }

    static fetchById = async(req,res) => {
        try {
            const data = await StudentModel.findById(req.params.id)
            // console.log(data);
            res.status(201).json({
                success: true,
                data
            })
        } catch (error) {
            res.status(401).json({ 'status': 'failed', 'message': `Error: ${err}` })
        }
    }

    static update = async(req,res) => {
        try {
            const { name, age, studentClass, email, phone } = req.body

            if (req.files != null || req.studentImage == '') {
                const file = req.files.studentImage

                const myCloud = await cloudinary.uploader.upload(file.tempFilePath,{
                    folder : 'oriolLearningJQueryImages'
                })

                var data = new StudentModel({
                    name : name,
                    age : age, 
                    studentClass : studentClass, 
                    email : email, 
                    phone : phone,
                    studentImage: {
                        public_id: myCloud.public_id,
                        url: myCloud.secure_url,
                    },
                })
            } else {
                var data = new StudentModel({
                    name : name,
                    age : age, 
                    studentClass : studentClass, 
                    email : email, 
                    phone : phone,
                })
            }
            
            const isDataSaved = await data.save()

            if (isDataSaved) {
                res.status(201).json({ 'status': 'success', 'message': 'Student Data Updated Successfully' })
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'Internal Server Error' })
            }
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': `Error: ${err}` })
        }
    }

    static delete = async(req,res) => {
        try {
            const data = await StudentModel.findByIdAndDelete(req.params.id)

            if (data) {
                res.status(201).json({ 'status': 'success', 'message': 'Student Deleted Successfully' })
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'Internal Server Error' })
            }
        } catch (error) {
            res.status(401).json({ 'status': 'failed', 'message': `Error: ${err}` })
        }
    }

}
module.exports = StudentController