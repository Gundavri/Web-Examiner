const Exam = require('../models/Exam.model');

var timerObj = {};

module.exports.startTimer = async (req, res, next) => {
    try {
        const exam = await Exam.findOne({ exam_num: req.params.id });
        console.log('exam', exam);
        if(!timerObj.hasOwnProperty(req.userData.userId)) {
            timerObj[req.userData.userId] = {};
        }
        if(!timerObj[req.userData.userId].hasOwnProperty(exam.exam_num)) {
            console.log('aaaaaaaaaaaaaaaaa');
            timerObj[req.userData.userId][exam.exam_num] = {
                interval: null,
                timeLeft: exam.exam_time * 60,
                canWrite: true
            };
            
            timerObj[req.userData.userId][exam.exam_num].interval = setInterval(() => {
                if(timerObj[req.userData.userId][exam.exam_num].timeLeft < -1) {
                    timerObj[req.userData.userId][exam.exam_num].canWrite = false;
                    clearInterval(timerObj[req.userData.userId][exam.exam_num].interval);
                } else {
                    timerObj[req.userData.userId][exam.exam_num].timeLeft--;
                }
            }, 1000);

            setTimeout(() => {
                delete timerObj[req.userData.userId][exam.exam_num];
            }, exam.exam_time * 60 * 1000 * 2);
        }
        // Timer
        // if(!allowedUsersToFetch.hasOwnProperty(req.userData.userId)) {
        //     allowedUsersToFetch[req.userData.userId] = {
        //         interval: null,
        //         timeLeft: exam.exam_time * 60,
        //         canWrite: true
        //     };
        //     allowedUsersToFetch[req.userData.userId].interval = setInterval(() => {
        //         if(allowedUsersToFetch[req.userData.userId].timeLeft < 0) {
        //             allowedUsersToFetch[req.userData.userId].canWrite = false;
        //             clearInterval(allowedUsersToFetch[req.userData.userId].interval);
        //         } else {
        //             allowedUsersToFetch[req.userData.userId].timeLeft -= 1;
        //         }
        //     }, 1000);
    
        //     setTimeout(() => {
        //         delete allowedUsersToFetch[req.userData.userId];
        //     }, exam.exam_time * 60 * 1000 * 1.2);
        // }
        next();
    } catch(err) {
        res.status(500).json({message: 'Database Error'});
    }
}

module.exports.deleteUser = (userId, exam_num) => {
    try {
        if(timerObj[userId][exam_num]) {
            clearInterval(timerObj[userId][exam_num].interval);
            delete timerObj[userId][exam_num];
        }
    } catch(err) {
        console.log('Error ', err);
    }
    // clearInterval(allowedUsersToFetch[userId].interval)
    // delete allowedUsersToFetch[userId];
}

module.exports.checkTimer = (req, res, next) => {
    if(!timerObj[req.userData.userId][req.body.writtenExam.exam_num].canWrite) {
        return res.status(401).json({ message: 'Not Allowed' });
    }
    // if(!allowedUsersToFetch[req.userData.userId].canWrite) {
    //     return res.status(401).json({ message: 'Not Allowed' });
    // }
    next();
}

module.exports.getTimer = async (req, res, next) => {
    res.status(200).json({ timeLeft: timerObj[req.userData.userId][req.params.id].timeLeft });
}