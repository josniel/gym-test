'use strict'
const ExcelJS = require('exceljs');
const Question = use("App/Models/Question")
const Article = use("App/Models/Article")
const Law = use("App/Models/Law")
const SubTopic = use("App/Models/SubTopic")
const Type = use("App/Models/Type")
const Answer = use("App/Models/Answer")
const MoveFileService = use("App/Services/MoveFileService")
const Helpers = use('Helpers')
const mkdirp = use('mkdirp')
var ObjectId = require('mongodb').ObjectId;


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with uploads
 */
class UploadController {
  /**
   * Show a list of all uploads.
   * GET uploads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new upload.
   * GET uploads/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new upload.
   * POST uploads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single upload.
   * GET uploads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing upload.
   * GET uploads/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update upload details.
   * PUT or PATCH uploads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a upload with id.
   * DELETE uploads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }

  async excelArticle ({ request, response }) {
    let files = request.file('fileExcel')
    var filePath = await MoveFileService.moveFile(files)
    var workbook = new ExcelJS.Workbook()
    workbook = await workbook.xlsx.readFile(filePath)
    let explanation = workbook.getWorksheet('Hoja1')
    let colComment = explanation.getColumn('B')
    colComment.eachCell(async (cell, rowNumber) => {
      if (rowNumber >= 2) {
        let article = {}
        let paragraph = explanation.getCell('A' + rowNumber).value
        let law = explanation.getCell('B' + rowNumber).value
        let article_name = explanation.getCell('C' + rowNumber).value
        if (explanation.getCell('E' + rowNumber).value !== '') {
          var article_text = explanation.getCell('E' + rowNumber).value
        }
        if (explanation.getCell('F' + rowNumber).value !== '') {
          var paragraph_text = explanation.getCell('F' + rowNumber).value
        }
        article.paragraph = paragraph
        article.law = law
        article.article_name = article_name
        article.article_text = article_text
        article.paragraph_text = paragraph_text
        article.revision = false
        let save = await Article.create(article)
      }
    })
    response.send(true)
  }
  async excelLaw ({ request, response }) {
    let files = request.file('fileExcel')
    var filePath = await MoveFileService.moveFile(files)
    var workbook = new ExcelJS.Workbook()
    workbook = await workbook.xlsx.readFile(filePath)
    let explanation = workbook.getWorksheet('Hoja1')
    let colComment = explanation.getColumn('B')
    colComment.eachCell(async (cell, rowNumber) => {
      if (rowNumber >= 2) {
        let law = {}
        let id = explanation.getCell('A' + rowNumber).value
        let law_name = explanation.getCell('B' + rowNumber).value
        let acronym_law = explanation.getCell('C' + rowNumber).value
        let last_update = explanation.getCell('D' + rowNumber).value
        let revision = explanation.getCell('E' + rowNumber).value
        let mark = explanation.getCell('F' + rowNumber).value
        let note = explanation.getCell('G' + rowNumber).value
        law.id = id
        law.law_name = law_name
        law.acronym_law = acronym_law
        law.last_update = last_update
        law.revision = revision
        law.mark = mark
        law.note = note
        let save = await Law.create(law)
      }
    })
    response.send(true)
  }
  async excelAnswer ({ request, response }) {
    let files = request.file('fileExcel')
    var filePath = await MoveFileService.moveFile(files)
    var workbook = new ExcelJS.Workbook()
    workbook = await workbook.xlsx.readFile(filePath)
    let explanation = workbook.getWorksheet('Hoja1')
    let colComment = explanation.getColumn('B')
    colComment.eachCell(async (cell, rowNumber) => {
      if (rowNumber >= 2) {
        let answer = {}
        let id_question = explanation.getCell('A' + rowNumber).value
        let id = explanation.getCell('B' + rowNumber).value
        let answer_name = explanation.getCell('C' + rowNumber).value
        let isCorrect = explanation.getCell('D' + rowNumber).value
        let order = explanation.getCell('E' + rowNumber).value
        answer.id_question = id_question
        answer.id = id 
        answer.answer_name = answer_name
        answer.isCorrect = isCorrect === 'N' ? false : true 
        answer.order = order
        let save = await Answer.create(answer)
      }
    })
    response.send(true)
  }
  async excelSubTopic ({ request, response }) {
    let files = request.file('fileExcel')
    var filePath = await MoveFileService.moveFile(files)
    var workbook = new ExcelJS.Workbook()
    workbook = await workbook.xlsx.readFile(filePath)
    let explanation = workbook.getWorksheet('Hoja1')
    let colComment = explanation.getColumn('B')
    colComment.eachCell(async (cell, rowNumber) => {
      if (rowNumber >= 2) {
        let subTopic = {}
        let id = explanation.getCell('A' + rowNumber).value
        let topic_id = explanation.getCell('B' + rowNumber).value
        let process = explanation.getCell('C' + rowNumber).value
        subTopic.id = id 
        subTopic.topic_id = topic_id
        subTopic.process = process
        let save = await SubTopic.create(subTopic)
      }
    })
    response.send(true)
  }
  async excelType ({ request, response }) {
    let files = request.file('fileExcel')
    var filePath = await MoveFileService.moveFile(files)
    var workbook = new ExcelJS.Workbook()
    workbook = await workbook.xlsx.readFile(filePath)
    let explanation = workbook.getWorksheet('Hoja1')
    let colComment = explanation.getColumn('B')
    colComment.eachCell(async (cell, rowNumber) => {
      if (rowNumber >= 2) {
        let type = {}
        let id = explanation.getCell('A' + rowNumber).value
        let type_name = explanation.getCell('B' + rowNumber).value
        type.id = id 
        type.type_name = type_name
        let save = await Type.create(type)
      }
    })
    response.send(true)
  }

  async getFileByDirectoryPerfil ({ params, response }) {
    const dir = params.file
    response.download(Helpers.appRoot('storage/uploads/perfil') + `/${dir}`)
  }

  async getFileByDirectoryNiveles ({ params, response }) {
    const dir = params.file
    response.download(Helpers.appRoot('storage/uploads/niveles') + `/${dir}`)
  }

  async getFileByDirectoryPreguntas ({ params, response }) {
    const dir = params.file
    response.download(Helpers.appRoot('storage/uploads/preguntas') + `/${dir}`)
  }
}

module.exports = UploadController
