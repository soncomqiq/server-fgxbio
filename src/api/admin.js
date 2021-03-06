const { Router } = require('express')
const child_proc = require('child_process')
const constant = require('../config/constant')
const authServ = require('../services/auth')
const con = constant.con
const multer = require('multer')

let router = Router()

var execsql = require('execsql')
var dbConfig = {
  host: 'localhost',
  user: 'user001',
  password: '100resu'
}
var sql = 'use db_cam;'
var sqlFile = './SQLcommand.sql'

const storage = multer.diskStorage({
  destination: './uploads',
  filename: function(req, file, cb) {
    console.log(file.mimetype)
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

router.post(
  '/exceladd',
  upload.single('file'),
//  authServ.isAuthenticatedAdmin,
  async (req, res, next) => {
    if (req.file) {
      console.log(`Received file ${req.file.originalname}`)
      console.log("sssss")
	child_proc.exec(
        `python3 ./python/GenAddQueryFx.py ./uploads/${req.file.originalname}`,
        function(err, output) {
          if (err) {
            console.log('child process failed with error : ' + err)
            res.status(400).send('error')
          } else {
            console.log('SQL SCRIPT GENERATE\n')
            console.log("This is output"+output+"\n")
            con.query(output, function(err, results) {
              if (err) throw err
              else res.send('success')
            })
            /*execsql
              .config(dbConfig)
              .exec(sql)
              .execFile(sqlFile, function(err, results) {
                if (err) throw err
                console.log(results)
                res.send('success')
              }).end()*/
          }
        } /*run generate script from excel */
      )
    }
  }
)

router.post(
  '/seqalign',
//  authServ.isAuthenticatedAdmin,
  async (req, res, next) => {
    console.log("HELLO");
    con.query(
      `SELECT * FROM ngs_data WHERE Locus = '${req.body.locus}' && Allele = '${
        req.body.allele
      }' ORDER BY Sequence;`,
      function(err, rows) {
        if (err) throw err
        child_proc.exec(
          `python3 ./python/Sequence_Alignment_Improve.py ${req.body.locus} ${
            req.body.allele
          }`,
          function(err, output) {
            if (err) {
              console.log('child process failed with error : ' + err)
              res.status(400).send('error')
            }

            console.log(output)
            //console.log("PROCESS DONE");
            res.send({ info: rows, pattern: output.split('|') })
          }
        )
      }
    )
  }
)

router.get(
  '/adminsample/:sampleYear/:sampleID',
//  authServ.isAuthenticatedAdmin,
  async (req, res, next) => {
    console.log(req.params.sampleYear, ' ', req.params.sampleID)
    con.query(
      `SELECT * FROM ngs_data WHERE Sample_Year = '${
        req.params.sampleYear
      }' && Sample_ID = '${req.params.sampleID}';`,
      function(err, result) {
        if (err) throw err
        console.log(result)
        res.send(result)
      }
    )
  }
)

router.get('/adminsnp', async (req, res, next) => {
  con.query(
    `SELECT Locus, Genotype, COUNT(*) AS Amount FROM isnp_data GROUP BY Locus, Genotype ORDER BY Locus;`,
    function(err, result) {
      if (err) throw err
      console.log(result)
      res.send(result)
    }
  )
})

module.exports = router
