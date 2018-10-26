const { Router } = require('express')
const _ = require('lodash')

let router = Router()

const constant = require('../config/constant')

const con = constant.con

router.get('/locuslist', async (req, res, next) => {
  // Get Locus and GO
  try {
    con.query('SELECT DISTINCT Locus, DataType FROM ngs_data', function(
      err,
      rows
    ) {
      if (err) throw err
      res.json(rows)
    })
  } catch (error) {
    next(error)
  }
})

router.get('/alleleinfo', async (req, res, next) => {
  var data = []
  try {
    con.query(
      'SELECT DISTINCT Locus , Allele FROM ngs_data ORDER BY Locus;',
      function(err, rows) {
        if (err) throw err
        rows.map(sample =>
          data.push({ locus: sample.Locus, allele: sample.Allele })
        )
        res.json(data)
      }
    )
  } catch (error) {
    next(error)
  }
})

router.get('/locuslist/amount', async (req, res, next) => {
  try {
    con.query(
      'SELECT Locus, COUNT(*) as Amount FROM ngs_data GROUP BY Locus',
      function(err, rows) {
        if (err) throw err
        res.json(rows)
      }
    )
  } catch (error) {
    next(error)
  }
})

router.get('/locusinfo/:locus', async (req, res, next) => {
  try {
    const data = []
    con.query(
      `SELECT Allele, COUNT(*) as amount FROM ngs_data WHERE Locus = '${
        req.params.locus
      }' GROUP BY Allele;`,
      function(err, rows) {
        if (err) throw err
        res.send(rows)
      }
    )
  } catch (error) {
    next(error)
  }
})

router.get('/statistic/:locus', async (req, res, next) => {
  // Get Locus and GO
  try {
    con.query(
      `SELECT Allele, COUNT(*) AS amount FROM ngs_data WHERE Locus = '${
        req.params.locus
      }' GROUP BY Allele`,
      function(err, rows) {
        if (err) throw err
        res.send(rows)
      }
    )
  } catch (error) {
    next(error)
  }
})

router.get('/hetero', async (req, res, next) => {
  try {
    con.query(
      `SELECT b.Locus, b.Total, c.Hetero FROM (SELECT Locus, COUNT(*) as Total from ngs_data GROUP BY Locus) b JOIN (SELECT a.Locus, COUNT(*) AS Hetero FROM (SELECT Sample_Year, Sample_ID,Locus, COUNT(*) AS Amount FROM ngs_data GROUP BY Locus, Sample_Year, Sample_ID) a WHERE a.Amount = 2 GROUP BY a.Locus) c ON b.Locus = c.Locus;`,
      function(err, rows) {
        if (err) throw err
        res.json(rows)
      }
    )
    //it just didn't send
  } catch (error) {
    next(error)
  }
})

//get percentage of that allele on locus
router.get('/marker/:locus/:allele', async (req, res, next) => {
  try {
    var total
    con.query(
      `SELECT COUNT(*) AS total FROM ngs_data WHERE Locus = '${
        req.params.locus
      }'`,
      function(err, rows) {
        if (err) throw err
        total = rows[0].total
        total = parseInt(total)
        console.log(total)
        console.log(req.params.allele)
      }
    )
    con.query(
      `SELECT COUNT(*) AS interest FROM ngs_data WHERE Locus = '${
        req.params.locus
      }' && Allele = '${req.params.allele}'`,
      function(err, rows) {
        if (err) throw err
        var interest = rows[0].interest
        interest = parseInt(interest)
        res.json(parseInt(interest) * 100 / parseInt(total))
      }
    )
  } catch (error) {
    next(error)
  }
})

module.exports = router
