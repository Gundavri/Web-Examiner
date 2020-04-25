const WrittenExam = require('../models/WrittenExam.model');
const User = require('../models/User.model');

module.exports.getAllWrittenExams = async (req, res, next) => {
    // await WrittenExam.deleteMany();
    try {
        let writtenExamsToSend = [];
        let writtenExams = await WrittenExam.find();
        for(let i=0; i<writtenExams.length; i++) {
            const user = await User.findById(writtenExams[i].userId);
            let tempWrittenExam = {
                _id: writtenExams[i]._id,
                score: writtenExams[i].score,
                exam_num: writtenExams[i].exam_num,
                userId: writtenExams[i].userId,
                questions: writtenExams[i].questions,
                answers: writtenExams[i].answers,
                user: user,
                createDate: writtenExams[i].createDate
            }
            writtenExamsToSend.push(tempWrittenExam);
        }
        res.status(200).json(writtenExamsToSend);
    } catch(err) {
        res.status(500).json({ message: 'Database error' });
    }
};

module.exports.deleteWrittenExam = async (req, res, next) => {
    try {
        const writtenExam = await WrittenExam.findById(req.params.id);
        const user = await User.findById(writtenExam.userId);
        user.exams_written = user.exams_written.filter(wx => wx !== writtenExam._id);
        await User.updateOne({ _id: user._id }, { $set: { exams_written: user.exams_written } });
        await WrittenExam.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Successfully deleted' });
    } catch(err) {
        res.status(500).json({ message: 'Database error' });
    }
}