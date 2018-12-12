{
  "apps": [
    {
      "name": "jnode",
      "script": "./server/server.js",
      "env_production": {
        "NODE_ENV": "production",
        "HOST": "localhost"
      }
    }
  ],
  "deploy": {
    "production": {
      "user": "root",
      "host": "jokcy.me",
      "repo": "git@gitee.com:jokcylou/react-cnode-tech.git",
      "ref": "origin/master",
      "path": "/root/deploy/jnode-master",
      "post-deploy": "npm install && npm run deploy && pm2 startOrRestart ecosystem.json --env production"
    }
  }
}
