import _mysql
import sys

## Constant Repeat Motif
Motif = {
    ##Autosomal
    'CSF1PO':   ['1AGAT'],
    'D13S317':  ['1TATC'],
    'D16S539':  ['1GATA'],
    'D18S51':   ['1AGAA'],
    'D21S11':   ['1TCTA','1TCTG','1TCTA','2TA','1TCTA','2TCA','1TCTA','2TCCATA','1TCTA'],
    'D3S1358':  ['2TCTA','1TCTG','1TCTA'],
    'D5S818':   ['1AGAT'],
    'D7S820':   ['1GATA'],
    'D8S1179':  ['1TCTA','1TCTG','1TCTA'],
    'FGA':      ['1TTTC','2TTTTTTCT','1CTTT','2CTCC','1TTCC'],
    'TH01':     ['1AATG'],
    'TPOX':     ['1AATG'],
    'vWA':      ['1TCTA','1TCTG','1TCTA','2TCCA','1TCTA'],
    'D2S1338':  ['1TGCC','1TTCC'],
    'D19S433':  ['2AAGG','2AAAG','2AAGG','2TAGG','1AAGG'],
    'Penta D':  ['1AAAGA'],
    'Penta E':  ['1AAAGA'],
    'D10S1248': ['1GGAA'],
    'D1S1656':  ['1TAGA','1TAGG','1TG'],
    'D12S391':  ['1AGAT','1AGAC','2AGAT'],
    'D2S441':   ['1TCTA'],
    'D22S1045': ['1ATT','1ACT','1ATT'],
    'SE33':     ['1AAAG','2AG','1AAAG','2AG','1AAAG','2G','1AAAG','2AG'],
    'D6S1043':  ['1AGAT'],
    'D17S1301': ['3None'],
    'D20S482':  ['3None'],
    'D4S2408':  ['3None'],
    'D9S1122':  ['3None'],
    ##Y_somal
    'DYS19':    ['1TAGA'],
    'DYS385a-b':['1GAAA'],
    'DYS389I':  ['1TCTG','1TCTA'],
    'DYF387S1': ['3None'],
    'DYS390':   ['1TCTA','1TCTG'],
    'DYS391':   ['1TCTA'],
    'DYS392':   ['1TAT'],
    'DYS393':   ['1AGAT'],
    'DYS437':   ['1TCTA'],
    'DYS438':   ['1TTTTC'],
    'DYS439':   ['1AGAT'],
    'DYS448':   ['1AGAGAT'],
    'DYS449':   ['3None'],
    'DYS456':   ['1AGAT'],
    'DYS458':   ['1GAAA'],
    'DYS460':   ['1ATAG'],
    'DYS481':   ['1CTT'],
    'DYS505':   ['1TCCT'],
    'DYS518':   ['3None'],
    'DYS522':   ['1GATA'],
    'DYS533':   ['1ATCT'],
    'DYS549':   ['1GATA'],
    'DYS570':   ['1TTTC'],
    'DYS576':   ['1AAAG'],
    'DYS612':   ['1CCT','1CTT','1TCT','1CCT','1TCT'],
    'DYS627':   ['3None'],
    'DYS635':   ['1TSTA'],
    'DYS643':   ['1CTTTT'],
    'Y-GATA-H4':['1TAGA'],
    ##X_Somal
    'DXS7132':  ['1TCTA'],
    'DXS7423':  ['1TCCA','2TCTGTCCT','1TCCA'],
    'DXS8378':  ['1CTAT'],
    'DXS10074': ['1AAGA'],
    'DXS10079': ['1AGAG','2TGAAAGAG','1AGAA','2AGAG','1AGAA'],
    'DXS10101': ['1AAAG','2GAAAGAAG','1GAAA','2A','1GAAA','2AAGA','1AAAG','2AAAAAGAA','1AAAG','2AA'],
    'DXS10103': ['1TAGA','2CTGA','2CAGA','1TAGA','1CAGA','2TAGA'],
    'DXS10134': ['1GAAA','2GAGA','1GAAA','2AA','2GAAA','2GAGA','1GAAA','2GAGA','1GACAGA','2GAAA','2GTAA','1GAAA','2AAA','1GAAA','2AAA','1GAAA'],
    'DXS10135': ['1AAGA','2GAAAG','1GAAA'],
    'DXS10146': ['1TTCC','2T','1TTCC','2TTTC','2CTCCCTTCC','2TTCC','2TCCC','2TTCTTCTTTC','1TTCC','2TTTCTT','1CTTT','2CTTC','1CTTT','2T','1CTTT'],
    'DXS10148': ['1GGAA','1AAGA','1AAAG','1AAGG'],
    'HPRTB':    ['1AGAT']
}

Locus = sys.argv[1]
Allele = sys.argv[2]

#Locus = 'D22S1045'
#Allele = '15'

#db connection
db = _mysql.connect(host ="127.0.0.1", user="user001", passwd="100resu", db="fxbio")

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
        count_total = 0
        while array_iterate < len(Motif[Locus]):
            if(count_total==int(Allele)):
                print("(" + Motif[Locus][array_iterate][1:] + ")" + str(count), end = ' ')
                array_iterate += 1
                count_total += count
                count = 0
                print(sequence[sequence_iterate:])
            else:
                if(Motif[Locus][array_iterate][0] == '1'):
                    if(sequence[sequence_iterate:sequence_iterate + len(Motif[Locus][array_iterate])-1]) == Motif[Locus][array_iterate][1:]:
                        count += 1
                        count_total += 1
                        sequence_iterate += len(Motif[Locus][array_iterate])-1
                    else:
                        print("(" + Motif[Locus][array_iterate][1:] + ")" + str(count), end = ' ')
                        array_iterate += 1
                        count = 0
                elif(Motif[Locus][array_iterate][0] =='2'):
                    print(sequence[sequence_iterate:sequence_iterate + len(Motif[Locus][array_iterate][1:])], end =' ')
                    array_iterate += 1
                    sequence_iterate += len(Motif[Locus][array_iterate])
                elif(Motif[Locus][array_iterate][0] =='3'):
                    print('No Repeated Data', end ='')
                    break

        print('|', end='')
        row = query_LocusResult.fetch_row(1, 2)
