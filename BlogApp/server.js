const app = require("./app");
const config = require("./config");

app.listen(config.PORT, config.IP, ()=>console.log(`Server Start at Port ${config.PORT}`));