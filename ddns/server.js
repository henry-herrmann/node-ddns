const dnsd = require("dnsd");
const fs = require("fs").promises;

const run = () =>{
    dnsd.createServer(async (req, res) =>{
        console.log(req)
        if(req.question[0].name == "home.herrmann.page"){
            const content = await fs.readFile("../ip.txt").catch(err =>{
                return res.end("202.61.201.124");
            });
    
            res.end(content.toString());
        }else{
            return res.end("202.61.201.124");
        }
    }).listen(53, "202.61.201.124");
    console.log("[INFO] Nameserver successfully started.")
}

module.exports.run = run;