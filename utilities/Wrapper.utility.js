class WrapperUtility {
    static handle(action) {
        return (req, res, next) => {
            action(req, res)
                .then(() => {})
                .catch(error => {
                    console.error(error);
                    next(error);
                });
        }
    }
}

module.exports = WrapperUtility;