//package.jsonより定期的に起動される
// Glitchが起動したときにコンソールに "ready!!" と出力

const http = require("http");
const { exec } = require("child_process");

// HTTPサーバを作成し、リクエストを処理する
http.createServer(function (req, res) {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Hello, Glitch is ready!</h1>");

    // Javaの.jarファイルをバックグラウンドで実行する
    exec("java -jar /path/to/your/server.jar", (error, stdout, stderr) => {
      if (error) {
        console.error(`Java process error: ${error}`);
        return;
      }
      console.log(`Java process stdout: ${stdout}`);
      console.error(`Java process stderr: ${stderr}`);
    });
  }
}).listen(process.env.PORT || 3000, function () {
  console.log("Server is ready and listening on port " + (process.env.PORT || 3000));
});
