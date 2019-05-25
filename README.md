# vue-ebook

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 本地静态资源服务器
1. 安装nginx
2. 修改配置文件`nginx-1.17.0\conf\nginx.conf`
```$xslt
 server {
		listen       8021;
		server_name  mooc_epubBook;
		#z指向本地静态资源文件夹
		root D:\WorkPlace\Nginx\Resource; 
		autoindex on;
		
		location / {
		    #跨域
			add_header Access-Control-Allow-Origin *;#
			#禁止缓存
			add_header Cache-Control "no-cache, must-revalidate";
		}
		
    }
```
3. 运行 .exe
