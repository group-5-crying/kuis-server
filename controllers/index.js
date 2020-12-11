const { Question, Answer } = require('../models/index')

class Controller {
    static findQuizById (req, res) {
        let question
        Question.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                question = data.question
                return Answer.findAll({
                    where: {
                        QuestionId: data.id
                    }
                })
            })
            .then(data => {
                res.status(200).json({
                    question,
                    answer: data
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: 'Internal server error'
                })
            })
    }
}

module.exports = Controller