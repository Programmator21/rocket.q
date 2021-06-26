const Database = require("../db/config")
module.exports = {
    async create(req, res){
        const db = await Database()
        const pass = req.body.password
        let roomId
        let isRoom = true
        while(isRoom){
            for(var i = 0; i<6; i++){
                i == 0 ? roomId = Math.floor(Math.random() * 10).toString() :
                roomId += Math.floor(Math.random() * 10).toString()
            }
            // let roomId = ""
            // for(var i = 0; i<6; i++){
            //     roomId += Math.floor(Math.random() * 10).toString()
            // }
            const roomsExistIds = await db.all(`SELECT id FROM rooms`)
            isRoom = roomsExistIds.some(roomExistId => roomExistId === roomId)
            //^^^^^ o "some" verifica se existe a condição e traz se existe na primeira informação igual
            if(!isRoom) {
                await db.run(`INSERT INTO rooms (
                    id,
                    pass
                ) VALUES(
                    ${parseInt(roomId)},
                    "${pass}"
                )`)
            }
        }
        // console.log(parseInt(roomId))
        // console.log(pass)
        res.redirect(`/room/${roomId}`)
        await db.close()
    },
    async open(req, res){
        const db = await Database()
        const roomId = req.params.room
        const questions = await db.all(
            `SELECT * FROM questions WHERE room = ${roomId} AND read = 0`
        )
        const questionsRead = await db.all(
            `SELECT * FROM questions WHERE room = ${roomId} AND read = 1`
        )
        let isNoQuestions
        if(questions.length == 0){
            if(questionsRead.length == 0){
                isNoQuestions = true
            }
        }
        res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions})
        await db.close()
    },
    async enter(req, res){
        const roomId = req.body.roomId
        res.redirect(`/room/${roomId}`)
    }
}