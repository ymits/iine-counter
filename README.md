## インフラ環境構築

### インスタンスの生成

Amazon Linux 2

    $ cat /etc/system-release

    Amazon Linux release 2.0 (2017.12) LTS Release Candidate

### gitのインストール

    $ sudo yum install git -y

### nginxのインストール

    $ sudo amazon-linux-extras install nginx1.12

設定ファイルの変更

    $ sudo vi /etc/nginx/nginx.conf

server.locationの欄を以下のように変更

    location / {
        proxy_set_header Host $http_host;
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

### nvm及びnode及びpm2のインストール

nvmのインストール

    $ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
    $ source .bashrc

nodeのインストール

    $ nvm install v8.9.4

pm2のインストール

    $ npm install pm2 -g

### アプリのインストール

    $ git clone https://github.com/ymits/iine-counter.git
    
### 時刻を日本時間に設定

clockファイル修正

    $ vim /etc/sysconfig/clock

    # ZONE="UTC"
    ZONE="Japan"
    UTC=true

時間帯ファイルにシンボリックリンク

    $ sudo ln -sf /usr/share/zoneinfo/Japan /etc/localtime

## インフラ環境の起動

### nginxの起動

    $ sudo nginx

### 参照アプリの起動

    $ cd iine-counter/client
    $ npm install
    $ npm run build

    $ cd ../
    $ pm2 start index.js
    
## 再起動時にプロセスを起動させる

### pm2

systemdに登録（以下のコマンドはpm2 startupと打つと表示される）

    $ sudo env PATH=$PATH:/home/ec2-user/.nvm/versions/node/v8.9.4/bin /home/ec2-user/.nvm/versions/node/v8.9.4/lib/node_modules/pm2/bin/pm2 startup systemd -u ec2-user --hp /home/ec2-user

pm2で管理している今のプロセスリストを保存

    $ pm2 save

### nginx

systemdに登録

    $ sudo systemctl enable nginx
