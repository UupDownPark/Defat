const { user_meal, kit } = require('../../models');
const { userAuth } = require('../users/auth');

module.exports = {
  get: async (req, res) => {
    const userInfo = await userAuth(req, res);
    const user_id = userInfo.dataValues.id;

    const todaymenu = await user_meal.findOne({
      where: {
        user_id: user_id,
      },
    });

    const todaymenuInfo = [];

    if (!todaymenu) {
      await user_meal.create({
        user_id: user_id,
      });
    } else {
      if (todaymenu.dataValues.breakfast) {
        const breakfast = await kit.findOne({
          where: {
            id: todaymenu.dataValues.breakfast,
          },
        });

        todaymenuInfo.push({ breakfast: breakfast.dataValues });
      }

      if (todaymenu.dataValues.lunch) {
        const lunch = await kit.findOne({
          where: {
            id: todaymenu.dataValues.lunch,
          },
        });

        todaymenuInfo.push({ lunch: lunch.dataValues });
      }

      if (todaymenu.dataValues.dinner) {
        const dinner = await kit.findOne({
          where: {
            id: todaymenu.dataValues.dinner,
          },
        });

        todaymenuInfo.push({ dinner: dinner.dataValues });
      }
    }

    console.log(todaymenuInfo);

    res.status(200).send({ data: todaymenuInfo, message: '정보 전달 완료' });
  },
  post: async (req, res) => {
    try {
      const userInfo = await userAuth(req, res);
      if (!userInfo) {
        return res.status(200).json({ message: '유저정보 없음' });
      } else {
        delete userInfo.dataValues.password;

        const userId = userInfo.dataValues.id;

        const { kit_id, when } = req.body;

        if (when === 'breakfast') {
          await user_meal.update(
            { breakfast: kit_id },
            { where: { user_id: userId } }
          );
        }
        if (when === 'lunch') {
          await user_meal.update(
            { lunch: kit_id },
            { where: { user_id: userId } }
          );
        }
        if (when === 'dinner') {
          await user_meal.update(
            { dinner: kit_id },
            { where: { user_id: userId } }
          );
        }
        const postUsermealInfo = await user_meal.findOne({
          where: {
            user_id: userId,
          },
        });

        if (!postUsermealInfo) {
          res.status(404).send({ message: '자료 없음' });
        } else {
          res
            .status(200)
            .send({ data: postUsermealInfo, message: '식단 정보 입력 완료' });
        }
      }
    } catch (err) {
      res.status(500).send({ message: 'Sever Error' });
    }
  },
  patch: async (req, res) => {
    const userInfo = await userAuth(req, res);
    if (!userInfo)
      return res.status(200).json({ message: 'Unauthorized userInfo!' });
    const user_id = userInfo.dataValues.id;
    const usermealInfo = await user_meal.findOne({
      where: {
        user_id: user_id,
      },
    });
    if (!usermealInfo) {
      res.status(200).send({ message: '자료 없음' });
    } else {
      if (req.query.when === 'breakfast') {
        console.log('아침실행');
        await user_meal.update(
          { breakfast: null },
          { where: { user_id: user_id } }
        );
      }
      if (req.query.when === 'lunch') {
        console.log('런치실행');
        await user_meal.update(
          { lunch: null },
          { where: { user_id: user_id } }
        );
      }
      if (req.query.when === 'dinner') {
        console.log('디너실행');
        await user_meal.update(
          { dinner: null },
          { where: { user_id: user_id } }
        );
      }
      res.status(200).send({ message: '오늘의 식단 삭제 성공' });
    }
  },
};