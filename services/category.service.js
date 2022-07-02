const Category = require('../models').categories;
_this = this

exports.createCategory = async function (categoryIn) {

    var newCategory = new Category({
        description:categoryIn.description
    })
    try {
        var savedCategory = await newCategory.save();
        return {category:savedCategory.description};
    } catch (e) {
        console.log(e)    
        throw Error("Error while Creating category")
    }
}

exports.listCategories = async function () {
    try {
        var listofCategories = await Category.findAll();
        console.log(listofCategories)
        return listofCategories;
    } catch (e) {
        console.log(e)    
        throw Error("Error while fetching category")
    }
}

exports.updateCategory = async function (categoryIn) {
    try {
        var filteredCategory = await Category.findOne({
            where:{
                id: categoryIn.id
            }
        })
        var savedCategory = await filteredCategory.update({
            description: categoryIn.description
        },{
            where:{
            id: categoryIn.id
                }
            }
        );
        return {category:savedCategory.description};
    } catch (e) {
        console.log(e)    
        throw Error("Error while updating category")
    }
}