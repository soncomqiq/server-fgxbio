'''this file is use for generating the insert query
for the second set of excel data because the filename format
is differ from the first set

1st          2nd
032F         58D008-F
'''

from openpyxl import load_workbook
import sys

if __name__ == "__main__":
    file = open("SQLcommand.sql", "w")
    wb = load_workbook(filename = sys.argv[1])
    xl = sys.argv[1][10:]
    # Autosomal STRs Part
    sheet_ranges = wb['Autosomal STRs']
    current_row = 47

    while(sheet_ranges['A' + str(current_row)].value != None):
        xs = str(current_row)
        A = 'A' + xs
        B = 'B' + xs
        D = 'D' + xs
        E = 'E' + xs
        current_row += 1
        if(sheet_ranges['C' + xs].value == 'Yes'):
            file.write("INSERT INTO `try`.`ngs_data` (`Sample_ID`, `Sample_Year`, `DataType`, `Locus`, `Allele`, `Read_Count`, `Sequence`) VALUES ('" + xl[2:8] + "', '" + xl[0:2] + "', 'A', ")
            file.write("'" + sheet_ranges[A].value + "', '" + str(sheet_ranges[B].value) + "', '" + str(sheet_ranges[D].value) + "', '" + str(sheet_ranges[E].value + "');" +'\n'))
            print("INSERT INTO `try`.`ngs_data` (`Sample_ID`, `Sample_Year`, `DataType`, `Locus`, `Allele`, `Read_Count`, `Sequence`) VALUES ('" + xl[2:8] + "', '" + xl[0:2] + "', 'A', " + "'" + sheet_ranges[A].value + "', '" + str(sheet_ranges[B].value) + "', '" + str(sheet_ranges[D].value) + "', '" + str(sheet_ranges[E].value + "');"))

    # Y STRs Part
    sheet_ranges = wb['Y STRs']
    current_row = 43

    while(sheet_ranges['A' + str(current_row)].value != None):
        xs = str(current_row)
        A = 'A' + xs
        B = 'B' + xs
        D = 'D' + xs
        E = 'E' + xs
        current_row += 1
        if(sheet_ranges['C' + xs].value == 'Yes'):
            file.write("INSERT INTO `try`.`ngs_data` (`Sample_ID`, `Sample_Year`, `DataType`, `Locus`, `Allele`, `Read_Count`, `Sequence`) VALUES ('" + xl[2:8] + "', '" + xl[0:2] + "', 'Y', ")
            file.write("'" + sheet_ranges[A].value + "', '" + str(sheet_ranges[B].value) + "', '" + str(sheet_ranges[D].value) + "', '" + str(sheet_ranges[E].value + "');" + '\n'))
            print("INSERT INTO `try`.`ngs_data` (`Sample_ID`, `Sample_Year`, `DataType`, `Locus`, `Allele`, `Read_Count`, `Sequence`) VALUES ('" + xl[2:8] + "', '" + xl[0:2] + "', 'Y', " + "'" + sheet_ranges[A].value + "', '" + str(sheet_ranges[B].value) + "', '" + str(sheet_ranges[D].value) + "', '" + str(sheet_ranges[E].value + "');"))
    
    # X STRs Part
    sheet_ranges = wb['X STRs']
    current_row = 26

    while(sheet_ranges['A' + str(current_row)].value != None):
        xs = str(current_row)
        A = 'A' + xs
        B = 'B' + xs
        D = 'D' + xs
        E = 'E' + xs
        current_row += 1
        if(sheet_ranges['C' + xs].value == 'Yes'):
            file.write("INSERT INTO `try`.`ngs_data` (`Sample_ID`, `Sample_Year`, `DataType`, `Locus`, `Allele`, `Read_Count`, `Sequence`) VALUES ('" + xl[2:8] + "', '" + xl[0:2] + "', 'X', ")
            file.write("'" + sheet_ranges[A].value + "', '" + str(sheet_ranges[B].value) + "', '" + str(sheet_ranges[D].value) + "', '" + str(sheet_ranges[E].value + "');" + '\n'))
            print("INSERT INTO `try`.`ngs_data` (`Sample_ID`, `Sample_Year`, `DataType`, `Locus`, `Allele`, `Read_Count`, `Sequence`) VALUES ('" + xl[2:8] + "', '" + xl[0:2] + "', 'X', " + "'" + sheet_ranges[A].value + "', '" + str(sheet_ranges[B].value) + "', '" + str(sheet_ranges[D].value) + "', '" + str(sheet_ranges[E].value + "');"))

    # iSNP Part
    sheet_ranges = wb['iSNPs']
    current_row = 15

    while(sheet_ranges['A' + str(current_row)].value != None):
        xs = str(current_row)
        A = 'A' + xs
        B = 'B' + xs
        current_row += 1
        file.write("INSERT INTO `try`.`isnp_data` (`Sample_ID`, `Sample_Year`, `Locus`, `Genotype`) VALUES ('" + xl[2:8] + "', '" + xl[0:2] + "', ")
        file.write("'" + str(sheet_ranges[A].value) + "', '" + str(sheet_ranges[B].value)[0] + "');" + '\n')
        print("INSERT INTO `try`.`isnp_data` (`Sample_ID`, `Sample_Year`, `Locus`, `Genotype`) VALUES ('" + xl[2:8] + "', '" + xl[0:2] + "', " + "'" + str(sheet_ranges[A].value) + "', '" + str(sheet_ranges[B].value)[0] + "');")       
        file.write("INSERT INTO `try`.`isnp_data` (`Sample_ID`, `Sample_Year`, `Locus`, `Genotype`) VALUES ('" + xl[2:8] + "', '" + xl[0:2] + "', ")
        file.write("'" + str(sheet_ranges[A].value) + "', '" + str(sheet_ranges[B].value)[2] + "');" + '\n')
        print("INSERT INTO `try`.`isnp_data` (`Sample_ID`, `Sample_Year`, `Locus`, `Genotype`) VALUES ('" + xl[2:8] + "', '" + xl[0:2] + "', " + "'" + str(sheet_ranges[A].value) + "', '" + str(sheet_ranges[B].value)[2] + "');")

    file.close()