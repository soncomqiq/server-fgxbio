const mysql = require('mysql')

const Autosom_Kit_List = [
  'Minimal_A',
  'InvestigatorIDplex',
  'Powerplex16',
  'Powerplex18D',
  'AmpFLSTR_Identifiler_Plus',
  'Verifiler_Express',
  'Globalfiler',
  'Forenseq_A'
]

const Minimal_A = [
  'CSF1PO',
  'D13S317',
  'D16S539',
  'D18S51',
  'D5S818',
  'D7S820',
  'D8S1179',
  'FGA',
  'TH01',
  'TPOX',
  'vWA'
]
const InvestigatorIDplex = [
  'CSF1PO',
  'D13S317',
  'D16S539',
  'D18S51',
  'D21S11',
  'D3S1358',
  'D5S818',
  'D7S820',
  'D8S1179',
  'FGA',
  'TH01',
  'TPOX',
  'vWA',
  'D2S1338',
  'D19S433'
]
const Powerplex16 = [
  'CSF1PO',
  'D13S317',
  'D16S539',
  'D18S51',
  'D21S11',
  'D3S1358',
  'D5S818',
  'D7S820',
  'D8S1179',
  'FGA',
  'TH01',
  'TPOX',
  'vWA',
  'Penta D',
  'Penta E'
]
const Powerplex18D = [
  'CSF1PO',
  'D13S317',
  'D16S539',
  'D18S51',
  'D21S11',
  'D3S1358',
  'D5S818',
  'D7S820',
  'D8S1179',
  'FGA',
  'TH01',
  'TPOX',
  'vWA',
  'D2S1388',
  'D19S433',
  'Penta D',
  'Penta E'
]
const AmpFLSTR_Identifiler_Plus = [
  'CSF1PO',
  'D13S317',
  'D16S539',
  'D18S51',
  'D21S11',
  'D3S1358',
  'D5S818',
  'D7S820',
  'D8S1179',
  'FGA',
  'TH01',
  'TPOX',
  'vWA',
  'D2S1338',
  'D19S433'
]
const Verifiler_Express = [
  'CSF1PO',
  'D13S317',
  'D16S539',
  'D18S51',
  'D21S11',
  'D3S1358',
  'D5S818',
  'D7S820',
  'D8S1179',
  'FGA',
  'TH01',
  'TPOX',
  'vWA',
  'D2S1338',
  'D19S433',
  'Penta D',
  'Penta E',
  'D10S1248',
  'D1S1656',
  'D12S391',
  'D2S441',
  'D22S1045',
  'D6S1043'
]
const Globalfiler = [
  'CSF1PO',
  'D13S317',
  'D16S539',
  'D18S51',
  'D21S11',
  'D3S1358',
  'D5S818',
  'D7S820',
  'D8S1179',
  'FGA',
  'TH01',
  'TPOX',
  'vWA',
  'D2S1338',
  'D19S433',
  'D10S1248',
  'D1S1656',
  'D12S391',
  'D2S441',
  'D22S1045',
  'SE33'
]
const Forenseq_A = [
  'CSF1PO',
  'D13S317',
  'D16S539',
  'D18S51',
  'D21S11',
  'D3S1358',
  'D5S818',
  'D7S820',
  'D8S1179',
  'FGA',
  'TH01',
  'TPOX',
  'vWA',
  'D2S1338',
  'D19S433',
  'Penta D',
  'Penta E',
  'D10S1248',
  'D1S1656',
  'D12S391',
  'D2S441',
  'D22S1045',
  'D6S1043',
  'D17S1301',
  'D20S482',
  'D4S2408',
  'D9S1122'
]

//  - - - - - - - - - - - Y kit list and Kit's Locus  - - - - - - - - - - - - -
const Y_Kit_List = [
  'Minimal_Y',
  'PowerplexY23',
  'Yfiler',
  'Yfiler_Plus',
  'Forenseq_Y'
]

const Minimal_Y = [
  'DYS19',
  'DYS385a-b',
  'DYS389I',
  'DYS389II',
  'DYS390',
  'DYS391',
  'DYS392',
  'DYS393'
]

const PowerplexY23 = [
  'DYS19',
  'DYS385a-b',
  'DYS389I',
  'DYS389II',
  'DYS390',
  'DYS391',
  'DYS392',
  'DYS393',
  'DYS437',
  'DYS438',
  'DYS439',
  'DYS448',
  'DYS456',
  'DYS458',
  'DYS481',
  'DYS533',
  'DYS549',
  'DYS570',
  'DYS576',
  'DYS635',
  'DYS643',
  'Y-GATA-H4'
]

const Yfiler = [
  'DYS19',
  'DYS385a-b',
  'DYS389I',
  'DYS389II',
  'DYS390',
  'DYS391',
  'DYS392',
  'DYS393',
  'DYS437',
  'DYS438',
  'DYS439',
  'DYS448',
  'DYS456',
  'DYS458',
  'DYS635',
  'Y-GATA-H4'
]

const Yfiler_Plus = [
  'DYS19',
  'DYS385a-b',
  'DYS389I',
  'DYS389II',
  'DYF387S1',
  'DYS390',
  'DYS391',
  'DYS392',
  'DYS393',
  'DYS437',
  'DYS438',
  'DYS439',
  'DYS448',
  'DYS449',
  'DYS456',
  'DYS458',
  'DYS460',
  'DYS481',
  'DYS533',
  'DYS570',
  'DYS576',
  'DYS627',
  'DYS635',
  'Y-GATA-H4'
]

const Forenseq_Y = [
  'DYS19',
  'DYS385a-b',
  'DYS389I',
  'DYS389II',
  'DYF387S1',
  'DYS390',
  'DYS391',
  'DYS392',
  'DYS437',
  'DYS438',
  'DYS439',
  'DYS448',
  'DYS460',
  'DYS481',
  'DYS505',
  'DYS522',
  'DYS533',
  'DYS549',
  'DYS570',
  'DYS576',
  'DYS612',
  'DYS635',
  'DYS643',
  'Y-GATA-H4'
]

//  - - - - - - - - - - - X kit list and Kit's Locus  - - - - - - - - - - - - -

const X_Kit_List = ['Argus_X_12', 'Forenseq_X']

const Argus_X_12 = [
  'DXS7132',
  'DXS7423',
  'DXS8378',
  'DXS10074',
  'DXS10079',
  'DXS10101',
  'DXS10103',
  'DXS10134',
  'DXS10135',
  'DXS10146',
  'DXS10148',
  'HPRTB',
  'Amelogenin'
]

const Forenseq_X = [
  'DXS7132',
  'DXS7423',
  'DXS8378',
  'DXS10103',
  'DXS10135',
  'HPRTB'
]

const con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'user001',
  password: '100resu',
  database: 'fxbio',
  multipleStatements: true
})

const SECRET_KEY = 'FGxBIO_ADMIN'

module.exports = {
  //Web Constant
  SECRET_KEY,
  con,
  //Autosomal
  Autosom_Kit_List,
  Minimal_A,
  InvestigatorIDplex,
  Powerplex16,
  Powerplex18D,
  AmpFLSTR_Identifiler_Plus,
  Verifiler_Express,
  Globalfiler,
  Forenseq_A,
  //Y PART
  Y_Kit_List,
  Minimal_Y,
  PowerplexY23,
  Yfiler,
  Yfiler_Plus,
  Forenseq_Y,
  //X PART
  X_Kit_List,
  Argus_X_12,
  Forenseq_X
}
