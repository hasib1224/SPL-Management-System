import createError from "http-errors";

function notFoundHandler(req, res, next) {
    next(createError(404, "Not Found"));
}

function defaultErrorHandler(err, req, res, next) {
    // err = process.env.NODE_ENV == "development" ? err : {errors: err.message};
    console.log(err.status || 500, err.message);
    res.status(err.status || 500).json({
        errors: {
            message: err.message,
        },
    });
}

export { notFoundHandler, defaultErrorHandler };
