const { user_meal, kit } = require("../../models");
const { userAuth } = require("../users/auth");

module.exports = {
  get: async (req, res) => {
    const userInfo = await userAuth(req, res);

    const user_id = userInfo.dataValues.id;

    const todaymenu = await user_meal.findOne({
      where: {
        user_id: user_id,
      },
    });
    console.log(todaymenu);
    const todaymenuInfo = [];

    const breakfast = await kit.findOne({
      where: {
        id: todaymenu.dataValues.breakfast,
      },
    });

    const lunch = await kit.findOne({
      where: {
        id: todaymenu.dataValues.lunch,
      },
    });

    const dinner = await kit.findOne({
      where: {
        id: todaymenu.dataValues.dinner,
      },
    });

    todaymenuInfo.push({ breakfast: breakfast.dataValues });
    todaymenuInfo.push({ lunch: lunch.dataValues });
    todaymenuInfo.push({ dinner: dinner.dataValues });

    if (todaymenuInfo.length === 0) {
      res.status(404).send({ message: "해당 자료 없음" });
    } else {
      res.status(200).send({ data: todaymenuInfo, message: "정보 전달 완료" });
    }
  },
  post: async (req, res) => {
    // user_id
    // req.body kit_id
    const userInfo = await userAuth(req, res);

    const user_id = userInfo.dataValues.id;

    const { kit_id, when } = req.body;

    const usermealInfo = await user_meal.findOne({
      where: {
        user_id: user_id,
      },
    });

    if (!usermealInfo) {
      if (when === "breakfast") {
        await user_meal.create({
          user_id: user_id,
          breakfast: kit_id,
        });
      } else if (when === 'lunch') {
        await user_meal.create({
          user_id: user_id,
          lunch: kit_id,
        });
      } else if (when === 'dinner') {
        await user_meal.create({
          user_id: user_id,
          dinner: kit_id,
        });
      }
    } else {
      if (when === "breakfast") {
        await user_meal.update({
          breakfast: kit_id,
        });
      } else if (when === 'lunch') {
        await user_meal.update({
          lunch: kit_id,
        });
      } else if (when === 'dinner') {
        await user_meal.update({
          dinner: kit_id,
        });
      }
    }

    const postUsermealInfo = await user_meal.findOne({
       where : {
         user_id : user_id
       }
    })

    if (!postUsermealInfo) {
      res.status(404).send({message : '자료 없음'})
    } else {
      res.status(200).send({data : postUsermealInfo, message : '식단 정보 입력 완료'})
    }
  },

  delete: async (req, res) => {
    try{
      const userInfo = await userAuth(req, res);
      if(!userInfo) return res.status(200).json({ message: 'Unauthorized userInfo!' })
  
      const usermealInfo = await user_meal.findOne({
        where: {
          user_id: user_id
        }})
      
      if ( !usermealInfo ){
        res.status(200).send({ message : '자료 없음' })
      } else {
        if ( breakfast ) {
          user_meal.destroy({ where : { breakfast : usermealInfo.dataValues.breakfast }})
        }
        if ( lunch ) {
          user_meal.destroy({ where : { lunch : usermealInfo.dataValues.lunch }})
        }
        if ( dinner ) {
          user_meal.destroy({ where : { dinner : usermealInfo.dataValues.dinner }})
        }
        res.status(200).send({ message : '오늘의 식단 삭제 성공' })
      }
    } catch ( err ) {
      res.status(500).send({ message : ' Sever Error '})
    }     
  }
};
