exports.catchErrors = (fn) => {
    return function (req, res, next) {
        fn(req, res, next).catch((err) => {
            if (typeof err === "string") {
                console.log("Error populated: " + err);
                res.status(400).json({
                    message: err,
                });
            } else {
                next(err);
            }
        });
    };
};

exports.developmentErrors = (err, req, res, next) => {
    err.stack = err.stack || "";
    const errorDetails = {
        message: err.message,
        status: err.status,
        stack: err.stack,
    };
    res.status(err.status || 500).json(errorDetails);
};

exports.productionErrors = (err, req, res, next) => {
    res.status(err.status || 500).json({
        error: "Internal Server Errsor",
    });
};