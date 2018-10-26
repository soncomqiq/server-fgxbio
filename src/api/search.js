const { Router } = require('express')
const _ = require('lodash')
const fs = require('fs')
const multer = require('multer')

const authServ = require('../services/auth')
const constant = require('../config/constant')
var path = require('path')

const con = constant.con

const storage = multer.diskStorage({
  destination: './uploads',
  filename: function(req, file, cb) {
    console.log(file.mimetype)
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

let router = Router()

router.get('/', async (req, res, next) => {
  await con.query(
    'SELECT * FROM ngs_data WHERE Sample_ID = "032F" && DataType ="A"',
    function(err, rows) {
      if (err) throw err
      res.json(rows)
    }
  )
})

router.post('/manual', async (req, res, next) => {
  //req with a lot of param of [ {'locus': "locus", 'allele': "15" }, {} , {} ]
  var data = req.body
  var minimal = []
  data.map(entry => {
    for (i = 0; i < constant.Minimal_A.length; i++)
      if (entry.locus == constant.Minimal_A[i]) minimal.push(entry)
    for (i = 0; i < constant.Minimal_Y.length; i++)
      if (entry.locus == constant.Minimal_Y[i]) minimal.push(entry)
  })
  //console.log("data", data);
  //console.log("minimal", minimal);
  var command =
    'SELECT b.Sample_Year, b.Sample_ID FROM (SELECT a.Sample_Year, a.Sample_ID, COUNT(*) AS amount FROM (SELECT * FROM ngs_data WHERE '

  var command_Total =
    'SELECT COUNT(*) AS Total FROM (SELECT a.Sample_ID, a.Sample_Year, COUNT(*) AS Amount FROM (SELECT DISTINCT Sample_Year, Sample_ID, Locus FROM ngs_data WHERE '
  //console.log(data.length);
  var Locus = []

  data.forEach(function(item) {
    console.log(item.locus, ' ', item.allele)
    command += `( Locus = '${item.locus}' && Allele = '${item.allele}') ||`
    Locus.push(item.locus)
  })

  var uniq_Locus = Array.from(new Set(Locus))
  uniq_Locus.map(sample => {
    command_Total += ` Locus = '${sample}' ||`
  })
  command = command.substring(0, command.length - 3)
  command_Total = command_Total.substring(0, command_Total.length - 3)

  command += `) a GROUP BY a.Sample_Year, a.Sample_ID) b WHERE b.amount = ${
    data.length
  };`
  command_Total += `) a GROUP BY a.Sample_ID, a.Sample_Year) b WHERE b.Amount = ${
    uniq_Locus.length
  };`
  //console.log(command)
  //console.log(command_Total)
  con.query(command + command_Total, function(err, resultSearch) {
    if (err) throw err
    var minimal_Locus = []
    var command_expect =
      'SELECT b.Sample_Year, b.Sample_ID FROM (SELECT a.Sample_Year, a.Sample_ID, COUNT(*) AS amount FROM (SELECT * FROM ngs_data WHERE '
    minimal.forEach(function(item) {
      //console.log(item.locus, ' ', item.allele)
      minimal_Locus.push(item.locus)
      command_expect += `( Locus = '${item.locus}' && Allele = '${
        item.allele
      }') ||`
    })
    command_expect = command_expect.substring(0, command_expect.length - 3)
    command_expect += `) a GROUP BY a.Sample_Year, a.Sample_ID) b WHERE b.amount = ${
      minimal.length
    };`
    var minimal_uniqLocus = Array.from(new Set(minimal_Locus))
    command_TotalMinimal =
      'SELECT COUNT(*) AS Total FROM (SELECT a.Sample_ID, a.Sample_Year, COUNT(*) AS Amount FROM (SELECT DISTINCT Sample_Year, Sample_ID, Locus FROM ngs_data WHERE '
    minimal_uniqLocus.map(sample => {
      command_TotalMinimal += ` Locus = '${sample}' ||`
    })
    command_TotalMinimal = command_TotalMinimal.substring(
      0,
      command_TotalMinimal.length - 3
    )
    command_TotalMinimal += `) a GROUP BY a.Sample_ID, a.Sample_Year) b WHERE b.Amount = ${
      minimal_uniqLocus.length
    };`
    //console.log(minimal)
    console.log(command_expect)
    console.log(command_TotalMinimal)
    con.query(command_expect + command_TotalMinimal, function(
      err,
      resultExpect
    ) {
      if (err) throw err
      //console.log(resultSearch[0])
      //console.log(resultSearch[1])
      res.json({
        result: resultSearch[0],
        result_total: resultSearch[1],
        expect: resultExpect[0],
        expect_total: resultExpect[1]
      })
    })
  })
})

router.post('/excelsearch', upload.single('file'), async (req, res, next) => {
  //req with excel file
  //console.log(req);
  console.log(req.file)

  if (req.file) {
    console.log(`Received file ${req.file.originalname}`)
    res.send('upload success')
  }
})

router.get('/sampleexcel', (req, res, next) => {
  res.download('./src/public/SampleExcel.xlsx', function(err) {
    if (err) {
      res.send(err)
    }
  })
})

router.get('/done', async (req, res, next) => {
  try {
    console.log(req.params.id)
    const admin = await authServ.authenticateAdmin(req.params.id)
  } catch (error) {
    next(error)
  }
})

module.exports = router
