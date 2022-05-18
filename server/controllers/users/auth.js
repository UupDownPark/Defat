const { isAuthorized } = require('../../middlewares/tokenFunctions');
const { user } = require('../../models');

module.exports = {
  userAuth: async (req, res) => {
    try {    
      // 쿠키에 accessToken이 있는지 판별
      const { accessToken } = req.cookies;
      if(!accessToken) return false;
      
      // accessToken이 유효한 토큰인지 판별
      const accessTokenData = isAuthorized(accessToken);
      if(!accessTokenData) return false;
      
      // accessToken에 담긴 정보가 유효한 정보인지 판별
      const { userId } = accessTokenData;
      const userInfo = await user.findOne({ where: { userId: userId }});
      if(!userInfo) return false;

      // accessToken이 유효하고 사용자 정보가 올바른 경우 사용자 정보 리턴
      return userInfo;
    } catch (err) {
      return res.status(500).json({ message: 'Server Error!' });
    }
  }
};
