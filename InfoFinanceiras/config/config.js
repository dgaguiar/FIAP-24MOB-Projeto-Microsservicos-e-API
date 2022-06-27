const config = () => {
    return {
        jwt_key: "auth_token_key",
        jwr_expires: "5d"
    }
};

module.exports = config();