import _mysql
import sys

## Constant Repeat Motif
Motif = {
    ##Autosomal
    'CSF1PO':   ['AGAT'],
    'D13S317':  ['TATC'],
    'D16S539':  ['GATA'],
    'D18S51':   ['AGAA'],
    'D21S11':   ['TCTA','TCTG','TCTA','TA','TCTA','TCA','TCTA','TCCATA','TCTA'],
    'D3S1358':  ['TCTA','TCTG','TCTA'],
    'D5S818':   ['AGAT'],
    'D7S820':   ['GATA'],
    'D8S1179':  ['TCTA','TCTG','TCTA'],
    'FGA':      ['TTTC','TTTT','TTCT','CTTT','CTCC','TTCC'],
    'TH01':     ['AATG'],
    'TPOX':     ['AATG'],
    'vWA':      ['TCTA','TCTG','TCTA','TCCA','TCTA'],
    'D2S1338':  ['TGCC','TTCC'],
    'D19S433':  ['AAGG','AAAG','AAGG','TAGG','AAGG'],
    'Penta D':  ['AAAGA'],
    'Penta E':  ['AAAGA'],
    'D10S1248': ['GGAA'],
    'D1S1656':  ['TAGA','TAGG','TG'],
    'D12S391':  ['AGAT','AGAC','AGAT'],
    'D2S441':   ['TCTA'],
    'D22S1045': ['ATT','ACT','ATT'],
    'SE33':     ['AAAG','AG','AAAG','AG','AAAG','G','AAAG','AG'],
    'D6S1043':  ['AGAT'],
    'D17S1301': ['None'],
    'D20S482':  ['None'],
    'D4S2408':  ['None'],
    'D9S1122':  ['None'],
    ##Y_somal
    'DYS19':    ['TAGA'],
    'DYS385a-b':['GAAA'],
    'DYS389I':  ['TCTG','TCTA'],
    'DYF387S1': ['None'],
    'DYS390':   ['TCTA','TCTG'],
    'DYS391':   ['TCTA'],
    'DYS392':   ['TAT'],
    'DYS393':   ['AGAT'],
    'DYS437':   ['TCTA'],
    'DYS438':   ['TTTTC'],
    'DYS439':   ['AGAT'],
    'DYS448':   ['AGAGAT'],
    'DYS449':   ['None'],
    'DYS456':   ['AGAT'],
    'DYS458':   ['GAAA'],
    'DYS460':   ['ATAG'],
    'DYS481':   ['CTT'],
    'DYS505':   ['TCCT'],
    'DYS518':   ['None'],
    'DYS522':   ['GATA'],
    'DYS533':   ['ATCT'],
    'DYS549':   ['GATA'],
    'DYS570':   ['TTTC'],
    'DYS576':   ['AAAG'],
    'DYS612':   ['CCT','CTT','TCT','CCT','TCT'],
    'DYS627':   ['None'],
    'DYS635':   ['TSTA'],
    'DYS643':   ['CTTTT'],
    'Y-GATA-H4':['TAGA'],
    ##X_Somal
    'DXS7132':  ['TCTA'],
    'DXS7423':  ['TCCA','TCTGTCCT','TCCA'],
    'DXS8378':  ['CTAT'],
    'DXS10074': ['AAGA'],
    'DXS10079': ['AGAG','TGAAAGAG','AGAA','AGAG','AGAA'],
    'DXS10101': ['AAAG','GAAAGAAG','GAAA','A','GAAA','AAGA','AAAG','AAAAAGAA','AAAG','AA'],
    'DXS10103': ['TAGA','CTGA','CAGA','TAGA','CAGA','TAGA'],
    'DXS10134': ['GAAA','GAGA','GAAA','AA','GAAA','GAGA','GAAA','GAGA','GACAGA','GAAA','GTAA','GAAA','AAA','GAAA','AAA','GAAA'],
    'DXS10135': ['AAGA','GAAAG','GAAA'],
    'DXS10146': ['TTCC','T','TTCC','TTTC','CTCCCTTCC','TTCC','TCCC','TTCTTCTTTC','TTCC','TTTCTT','CTTT','CTTC','CTTT','T','CTTT'],
    'DXS10148': ['GGAA','AAGA','AAAG','AAGG'],
    'HPRTB':    ['AGAT']
}

Locus = sys.argv[1]
Allele = sys.argv[2]

#db connection
db = _mysql.connect(host ="localhost", user="root", passwd="Uq42=Tc8", db="fxbio")

if __name__ == "__main__":
    db.query("SELECT * FROM ngs_data WHERE Locus = '" + Locus + "' && Allele = '" + Allele + "' ORDER BY Sequence;")
    query_LocusResult = db.store_result()
    row = query_LocusResult.fetch_row(1,2)
    while row is not None:
        if(str(row) =='()'):
            break
        sequence = str(row[0]['ngs_data.Sequence'])[2:-1]
        #print('\n' + str(row[0]['ngs_data.Sample_Year']) + "  " + str(row[0]['ngs_data.Sample_ID'])[2:-1] + "  " + sequence)
        array_iterate = 0
        sequence_iterate = 0
        count = 0
        while array_iterate < len(Motif[Locus]):
            if(sequence[sequence_iterate:sequence_iterate + len(Motif[Locus][array_iterate])]) == Motif[Locus][array_iterate]:
                count += 1
                sequence_iterate += len(Motif[Locus][array_iterate])
            else:
                print("(" + Motif[Locus][array_iterate] + ")" + str(count), end = ' ')
                array_iterate += 1
                count = 0
        print('|', end='')
        row = query_LocusResult.fetch_row(1, 2)
