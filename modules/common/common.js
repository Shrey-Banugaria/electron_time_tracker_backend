const commonErrorHandler = (err, res) => {
    console.error(err);
    res.status(err.status || 500).json({
        error: {
          message: err.message || 'Internal Server Error',
        },
      });
    }
    
const formatMilliseconds = (milliseconds)=> {
    let seconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;
    
    return {
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
    };
}

module.exports = { commonErrorHandler, formatMilliseconds}



