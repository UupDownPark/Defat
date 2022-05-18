const { ingredient } = require('../../models')


module.exports = {
  get : async (req,res) => {
    const {ingredient_id} = req.body
    const ingredientInfo = await ingredient.findOne({
        where : {
           id : ingredient_id
        }
    })

    if (!ingredientInfo) {
     res.status(404).send({message : '해당 자료 없음'})
    } else {
     res.status(200).send({data : ingredientInfo, message : '정보 전달 완료'})
    }
  }
}