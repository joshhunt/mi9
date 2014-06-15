module.exports.error = function (res, message, statusCode) {
    statusCode = statusCode || 500;
    message = message || 'Unexplained error';
    res.status(statusCode).json({error: message});
};

module.exports.catchJsonErrors = function (err, req, res, next){
    if (err instanceof SyntaxError) {
        module.exports.error(res, 'Could not decode request: JSON parsing failed', 400);
    } else {
        module.exports.error(res, 'Unexpected server error occured');
    }
};