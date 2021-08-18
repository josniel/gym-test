'use strict'
const ExcelJS = require('exceljs');
const Question = use("App/Models/Question")
const MoveFileService = use("App/Services/MoveFileService")
// const Asignatura = use("App/Models/Asignatura")
// const Niveles = use("App/Models/Nivele")
const Helpers = use('Helpers')
const mkdirp = use('mkdirp')
var ObjectId = require('mongodb').ObjectId;

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with questions
 */
class QuestionController {
  /**
   * Show a list of all questions.
   * GET questions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let data = await Question.all()
    response.send(data)
  }

  async getQuestionsbyTest ({ response, params }) {
    const id = parseInt(params.id)
    try {
      const data = (await Question.query().where({ test_id: id }).fetch()).toJSON()
      response.send(data)
    } catch (e) {
      console.error(e.name + ': ' + e.message)
    }
  }


  async getQuestionsbyExam ({ request, response, view, params }) {
    let data = (await Question.query().where({ examen_id: params.id }).fetch()).toJSON()
    response.send(data)
  }

  async getFullQuestions ({ response }) {
    /*try {
      let data = (await Asignatura.query().where({}).with('tests.questions').fetch()).toJSON()
      response.send(data)
    } catch (error) {
      console.error(error.name + 'fullQuestions: ' + error.message);
    }*/
  }

  /**
   * Render a form to be used for creating a new question.
   * GET questions/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new question.
   * POST questions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      var quest = request.only(['datQ'])
      quest = JSON.parse(quest.datQ)
      var answers = request.only(['datA'])
      answers = JSON.parse(answers.datA)
      answers = Object.values(answers)
      let arr = []
      for (let i in answers) {
        let ans = { titleAnswer: answers[i], isActive: false }
        arr.push(ans)
      }
      for (let i = 0; i < arr.length; i++) {
        arr[i].value = i === 0 ? 'A' : i === 1 ? 'B' : i === 2 ? 'C' : 'D'
      }
      quest.answers = arr
      quest.isActive = false
      let save = await Question.create(quest)
      const profilePic = request.file('files', {
        types: ['image']
      })
      if (Helpers.appRoot('storage/uploads/preguntas')) {
        await profilePic.move(Helpers.appRoot('storage/uploads/preguntas'), {
          name: save._id.toString(),
          overwrite: true
        })
      } else {
        mkdirp.sync(`${__dirname}/storage/Excel`)
      }
      response.send(save)
    } catch (error) {
      console.error(error.name + 'store: ' + error.message);
    }
  }

  async excelQuestion ({request, response}) {
    let files = request.file('fileExcel')
    var filePath = await MoveFileService.moveFile(files)
    var workbook = new ExcelJS.Workbook()
    workbook = await workbook.xlsx.readFile(filePath)
    let explanation = workbook.getWorksheet('Hoja1')
    let colComment = explanation.getColumn('B')
    colComment.eachCell(async (cell, rowNumber) => {
      if (rowNumber >= 2) {
        let question = {}
        let id = explanation.getCell('A' + rowNumber).value
        let title = explanation.getCell('B' + rowNumber).value
        let topic = explanation.getCell('C' + rowNumber).value
        let exam = explanation.getCell('D' + rowNumber).value
        let order = explanation.getCell('E' + rowNumber).value
        let ley_id = explanation.getCell('F' + rowNumber).value
        let article = explanation.getCell('G' + rowNumber).value
        let article_id = explanation.getCell('H' + rowNumber).value
        let paragraph_id = explanation.getCell('I' + rowNumber).value
        let mal = explanation.getCell('J' + rowNumber).value
        let type = explanation.getCell('K' + rowNumber).value
        let brand = explanation.getCell('L' + rowNumber).value
        let process = explanation.getCell('M' + rowNumber).value
        let only = explanation.getCell('N' + rowNumber).value
        question.id = parseInt(id)
        question.title = title
        question.topic = topic
        question.exam = exam
        question.order = order
        question.ley_id = ley_id
        question.article = article
        question.article_id = article_id
        question.paragraph_id = paragraph_id
        question.mal = mal
        question.type = type
        if (brand !== null) {  question.brand = true } else { question.brand = false }
        question.process = process
        if (only !== null) {  question.only = true } else { question.only = false }
        let save = await Question.create(question)
      }
    })
    response.send(true)
  }

  async multiplesQuestions ({ request, response }) {
    /*try {
      let { multiple, id, _id } = request.all()
      let test = await Niveles.find(_id)
      test.hasExamId = true
      test.merge()
      await test.save()
      for (let i in multiple) {
        multiple[i].exam_id = id
        const update = await Question.where('_id', multiple[i]._id).update(multiple[i])
      }
      response.send(true)
    } catch (error) {
      console.error(error.name + ' multiplesQuestions: ' + error.message);
    }*/
  }

  /**
   * Display a single question.
   * GET questions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    let quest = (await Question.find(params.id)).toJSON()
    response.send(quest)
  }

  /**
   * Render a form to update an existing question.
   * GET questions/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update question details.
   * PUT or PATCH questions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      var quest = request.only(['datQ'])
      quest = JSON.parse(quest.datQ)
      var answers = request.only(['datA'])
      answers = JSON.parse(answers.datA)
      answers = Object.values(answers)
      for (let i in answers) {
        quest.answers[i].titleAnswer = answers[i]
        quest.answers[i].isActive = false
      }
      if (quest.file) {
        const profilePic = request.file('files', {
          types: ['image']
        })
        if (Helpers.appRoot('storage/uploads/preguntas')) {
          await profilePic.move(Helpers.appRoot('storage/uploads/preguntas'), {
            name: quest._id.toString(),
            overwrite: true
          })
        } else {
          mkdirp.sync(`${__dirname}/storage/Excel`)
        }
      }
      delete quest.file
      const update = await Question.where('_id', params.id).update(quest)
      response.send(update)
    } catch (error) {
      console.error(error.name + '1:' + error.message);
    }
  }

  /**
   * Delete a question with id.
   * DELETE questions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const questToDestroy = await Question.where('_id', params.id).delete()
    response.send(questToDestroy)
  }
}

module.exports = QuestionController
