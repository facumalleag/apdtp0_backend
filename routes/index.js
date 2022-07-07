var express = require('express')
var router = express.Router()
const userController = require('../controllers/user.controller');
const recipeController = require('../controllers/recipe.controller');
const mailController = require('../controllers/mail.controller');
const categoryController = require('../controllers/category.controller');
const difficultyController = require('../controllers/difficulty.controller');
const ingredientController = require('../controllers/ingredients.controller');
const measurementController = require('../controllers/measurements.controller');
const statusController = require('../controllers/status.controller');
const conversionsController = require('../controllers/conversions.controller');
const stepsController = require('../controllers/steps.controller');
const initializeController = require('../controllers/initialize')
const ingredientsInRecipeController = require('../controllers/ingredientsInRecipe.controller')
const ratingsController = require('../controllers/ratings.controller')
const favoriteController = require('../controllers/favorites.controller')
const photoController = require('../controllers/photo.controller')
const multimediaController = require('../controllers/multimedia.controller')
const uploadController = require('../controllers/upload.controller');

router.get('/test', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/user.routes');
  });
router.post('/initialize',initializeController.initialize);

router.post('/login', userController.login)
router.post('/register', userController.createUser)
// cambiar el register a:
router.post('/fullRegister', userController.fullRegister)
router.post('/halfRegister', userController.halfRegister)
router.get('/verify/Email/:email/Alias/:alias/', userController.verifyEmailAndAlias)
router.get('/checkUserBy/email/:email/', mailController.checkUserByEmail)
router.get('/sendEmail/:email/ForPasswordReset', mailController.sendEmail)
router.put('/updatePassword', userController.updatePassword)

router.post('/category/create/:category', categoryController.createCategory)
router.get('/category/list', categoryController.listCategories)
router.put('/category/update/:id/:category', categoryController.updateCategory)

router.post('/difficulty/create/:difficulty', difficultyController.createDifficulty)
router.get('/difficulty/list', difficultyController.listDifficulty)
router.put('/difficulty/update/:id/:difficulty', difficultyController.updateDifficulty)

router.post('/ingredient/create/:ingredient', ingredientController.createIngredient)
router.get('/ingredient/list', ingredientController.listIngredients)
router.put('/ingredient/update/:id/:ingredient', ingredientController.updateIngredient)

router.post('/measurement/create/:measurement', measurementController.createMeasurement)
router.get('/measurement/list', measurementController.listMeasurements)
router.put('/measurement/update/:id/:measurement', measurementController.updateMeasurement)

router.post('/status/create/:status', statusController.createStatus)
router.get('/status/list', statusController.listStatus)
router.put('/status/update/:id/:status', statusController.updateStatus)

router.post('/conversions/create/idMeasurementFrom/:idMeasurementFrom/idMeasurementTo/:idMeasurementTo/conversionFactor/:conversionFactor', conversionsController.createConversions)
router.get('/conversions/list', conversionsController.listConversions)
router.put('/conversions/update/id/:id/idMeasurementFrom/:idMeasurementFrom/idMeasurementTo/:idMeasurementTo/conversionFactor/:conversionFactor', conversionsController.updateConversions)

router.post('/steps/create', stepsController.createSteps)
router.get('/steps/listStepsBy/recipe/:idRecipe', stepsController.listStepsByRecipeId)
router.put('/steps/update', stepsController.updateSteps)
router.post('/steps/bulkCreate', stepsController.bulkCreateSteps)
router.put('/steps/bulkUpdate', stepsController.bulkUpdateSteps)

router.post('/ingredientsInRecipe/create/', ingredientsInRecipeController.createIngredientsInRecipe)
router.get('/ingredientsInRecipeBy/recipe/:idRecipe', ingredientsInRecipeController.listIngredientsInRecipe)
router.put('/ingredientsInRecipe/update/', ingredientsInRecipeController.updateIngredientsInRecipe)
router.post('/ingredientsInRecipe/bulkCreate', ingredientsInRecipeController.bulkCreateIngredientsInRecipe)
router.post('/ingredientsInRecipe/bulkUpdate', ingredientsInRecipeController.bulkUpdateIngredientsInRecipe)

router.post('/recipe/create', recipeController.createRecipe)
router.get('/recipe/check/name/:name', recipeController.checkRecipeByName)
router.get('/recipe/getBy/:id', recipeController.getRecipeById)
router.get('/recipe/listRecipeForPresentacion', recipeController.listRecipesForPresentation)
router.get('/recipe/listRecipeBy/userId/:id/order/:order', recipeController.listRecipeByUserId)
router.delete('/recipe/deleteRecipeBy/recipeId/:id', recipeController.deleteRecipeById)
router.post('/recipe/search', recipeController.searchRecipes)

router.post('/ratings/create', ratingsController.createRating)
router.get('/ratings/listBy/recipeId/:id', ratingsController.listRatingsByRecipeId)
router.get('/ratings/listBy/userId/:id', ratingsController.listRatingsByUserId)
router.put('/ratings/update', ratingsController.updateRating)

router.post('/favorites/create', favoriteController.createFavorite)
router.get('/favorites/listBy/userId/:id', favoriteController.listFavoritesByUserId)
router.put('/favorites/update', favoriteController.updateFavorite)
router.delete('/favorites/delete/:id', favoriteController.deleteFavorite)

router.post('/uploadImg',uploadController.uploadFilesImgUser);

router.post('/photo/create', photoController.guardarImagenRecipe)
router.get('/photo/getImagenesBy/RecipeId/:id', photoController.getImagenByRecipeId)
router.delete('/photo/deletePhotoaBy/photoId/:id', photoController.destroyPhotoById)


router.post('/multimedia/create', multimediaController.guardarMultimediaStep)
router.get('/multimedia/getMultimediaBy/StepId/:id', multimediaController.getMultimediaByStepId)
router.delete('/multimedia/deleteMultimediaBy/stepId/:id', multimediaController.destroyMultimediaByStepId)


module.exports = router;


