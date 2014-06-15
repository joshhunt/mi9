module.exports.catchJsonErrors = function (err, req, res, next){
    if (err instanceof SyntaxError) {
        errorResponse(res, 'Could not decode request: JSON parsing failed', 400);
    } else {
        errorResponse(res, 'Unexpected server error occured');
    }
};

module.exports.error = function (res, message, statusCode) {
    statusCode = statusCode || 500;
    message = message || 'Unexplained error';
    res.status(statusCode).json({error: message});
};