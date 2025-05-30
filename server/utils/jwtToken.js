// Create Token and saving in cookie
const sendToken = (user, statusCode, res, result ) => {
    const token = user.getJWTToken();

    // Options for cookie 
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: true, 
        sameSite: 'none',
    };
    
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
        result
    });  

};

export default sendToken