// 載入 express 並建構應用程式伺服器
const express = require('express')
const exphbs = require('express-handlebars');
// 載入 method-override
const methodOverride = require('method-override')
// 載入session
const session = require('express-session')
// 引用路由器
const routes = require('./routes')

require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// set session
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
// 將 request 導入路由器
app.use(routes)


// 設定 port 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})