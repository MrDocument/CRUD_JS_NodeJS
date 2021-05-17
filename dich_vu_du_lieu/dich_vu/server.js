const http = require("http");
const fs = require("fs");
const { debug } = require("console");
const port = 1000;

const server = http.createServer(function (req, res) {
    let url = req.url;
    let method = req.method;
    res.setHeader("Access-Control-Allow-Origin",'*');
    res.setHeader("Access-Control-Allow-Methods",'GET,PUT,POST,DELETE');
    res.setHeader('Content-Type',"charset:utf-8")
    if(method == "GET"){
        if(url == "/dsDienthoai"){
            let jsonPath = "./du_lieu/dsDienthoai.json";
            let content = fs.readFileSync(jsonPath);
            res.end(content);
        }else {
            res.end('No OK');
        }
    } else if (method == "POST"){

        let Chuoi_Nhan = '';
        req.on('data',function(chunk){
            Chuoi_Nhan += chunk;
        });

        if(url == "/ThemDienThoai"){
            req.on('end', () => {
                let jsonPath = "./du_lieu/dsDienthoai.json";

                //đọc nội dung chuỗi json
                let content = fs.readFileSync(jsonPath);

                //Chuyển nội dung json thành chuỗi
                let listDienThoai = JSON.parse(content);

                //Thêm nội dung vào file json
                listDienThoai.push(JSON.parse(Chuoi_Nhan));

                //ghi chuỗi
                fs.writeFileSync(jsonPath,JSON.stringify(listDienThoai),"UTF-8");
                res.end('OK');
            });
        } else if(url == "/SuaDienThoai"){
            req.on('end', function(){
                let suaDienThoai = JSON.parse(Chuoi_Nhan);

                let jsonPath = "./du_lieu/dsDienthoai.json";

                //doc noi dung file
                let content = fs.readFileSync(jsonPath);

                //chuyen JSON thành chuỗi
                let listDienThoai = JSON.parse(content);

                let vt = listDienThoai.findIndex(x => x.Ma_so == suaDienThoai.Ma_so);

                if(vt >= 0){
                    listDienThoai[vt].Ten = suaDienThoai.Ten;
                    listDienThoai[vt].Don_gia_Nhap = suaDienThoai.Don_gia_Nhap;
                    listDienThoai[vt].Don_gia_Ban = parseInt(suaDienThoai.Don_gia_Nhap * 1.1);
                    fs.writeFileSync(jsonPath,JSON.stringify(listDienThoai),"UTF-8");
                    res.end('OK');
                } else {
                    res.end('ERR');
                }

            });
        } else if(url == "/XoaDienThoai"){
            req.on('end',() => {
                let xoaDienThoai = JSON.parse(Chuoi_Nhan);
                let jsonPath = "./du_lieu/dsDienthoai.json";
                let content = fs.readFileSync(jsonPath);
                let listDienThoai = JSON.parse(content);
                let vt = listDienThoai.findIndex(x => x.Ma_so == xoaDienThoai.Ma_so);
                
                if(vt >= 0){
                    listDienThoai.splice(vt,1);
                    fs.writeFileSync(jsonPath,JSON.stringify(listDienThoai),"UTF-8");
                    res.end('OK');
                } else {
                    res.end('ERR');
                }
            });
        }
    }
    else{
        res.end("NO OK");
    }
    
});

server.listen(port, console.log("server is running...http://localhost:"+ port));