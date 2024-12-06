const {createLogger, transports, format} = require('winston');

const studentLogger = createLogger({
    transports:[
        new transports.File({
            filename:'student.log',
            level:'info',
            format:format.combine(format.timestamp(), format.json())
        })
    ]
})

module.exports = {studentLogger}