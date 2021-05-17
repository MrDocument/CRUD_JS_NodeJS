function danh_sach_dien_thoai(){
    let api = "http://localhost:1000/dsDienthoai";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",api,false);
    xmlhttp.send();
    var chuoiJson = xmlhttp.responseText;
    return JSON.parse(chuoiJson);
}

function Them_Dien_Thoai(dienthoai){
    let api ="http://localhost:1000/ThemDienThoai";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST",api,false);
    xmlhttp.send(JSON.stringify(dienthoai));
    var Chuoi = xmlhttp.responseText;
    return Chuoi;
}

function Sua_Dien_Thoai(dienthoai){
    let api ="http://localhost:1000/ThemDienThoai";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST",api,false);
    xmlhttp.send(JSON.stringify(dienthoai));
    var Chuoi = xmlhttp.responseText;
    return Chuoi;
}

function Xoa_Dien_Thoai(dienthoai){
    let api = "http://localhost:1000/XoaDienThoai";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST",api,false);
    xmlhttp.send(JSON.stringify(dienthoai));
    var Chuoi = xmlhttp.responseText;
    return Chuoi;
}

function Tao_Chuoi_The_hien_So_nguyen_duong(So_nguyen) {
    var Chuoi_The_hien = ""
    var Chuoi_So_nguyen = So_nguyen.toString()
    var So_Ky_so = Chuoi_So_nguyen.length
    if (So_Ky_so % 3 == 0) {
        for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
            Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
            if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
                Chuoi_The_hien += "."
        }
    } else if (So_Ky_so % 3 == 1) {
        Chuoi_The_hien = Chuoi_So_nguyen[0]
        if (So_Ky_so > 1)
            Chuoi_The_hien += "."
        Chuoi_So_nguyen = Chuoi_So_nguyen.slice(1)
        for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
            Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
            if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
                Chuoi_The_hien += "."

        }
    } else if (So_Ky_so % 3 == 2) {
        Chuoi_The_hien = Chuoi_So_nguyen[0] + Chuoi_So_nguyen[1]
        if (So_Ky_so > 2)
            Chuoi_The_hien += "."
        Chuoi_So_nguyen = Chuoi_So_nguyen.slice(2)
        for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
            Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
            if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
                Chuoi_The_hien += "."
        }
    }
    return Chuoi_The_hien;
}