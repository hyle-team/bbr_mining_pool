# Boolberry Mining Pool
Mining pool for Boolberry cryptocurrency.

## Installation
This is a complete installation guide for Ubuntu 18.04 LTS. It includes Boolberry daemon installation and basic setup. Before you start, log in with a user account for managing the pool. Open a terminal window and run following commands.

### Installing Boolberry
Update currently installed packages:
```sudo apt update```
Install Boolberry required packages:
```sudo apt install -y build-essential g++ python-dev autotools-dev libicu-dev build-essential libbz2-dev cmake git libboost-all-dev screen```
Navigate to user home directory:
```cd ~/```
Download latest Boolbery source files:
```git clone https://github.com/cryptozoidberg/boolberry.git```
Navigate to boolberry folder:
```cd boolberry```
Create build folder:
```mkdir build```
Navigate to build folder:
```cd ./build```
Build Boolberry daemon:
```cmake ..```
Build Boolberry wallet:
```make daemon simplewallet```
### Running Boolberry node
This guide uses [Screen](https://help.ubuntu.com/community/Screen) to run and manage pool required processes. Each process runs in a dedicated Screen session and thus doesn't depend on current terminal session. 
Run a new screen session:
```screen -S daemon```
Navigate to boolberry build folder:
```cd ./src```
Run Boolberry daemon:
```./boolbd```

Wait until Boolberry blockchain is synchronized and close current Screen session by pressing `Ctrl+A`, and then `d` button.
Run a new screen session:
```screen -S wallet```
Generate new Boolberry wallet with custom file name, e.g. "pool_wallet":
```./simplewallet --generate-new-wallet pool_wallet```
Enter new password and save given wallet address seed phrase in a secured place.
Run Boolberry wallet:
```./simplewallet --wallet-file pool_wallet --password <WALLET PASSWORD> --rpc-bind-port 10103```
Close current Screen session by pressing `Ctrl+A`, and then `d` button.
For more information please refer to the [Boolberry user guide](https://docs.boolberry.com/)
### Installing Redis DB
Navigate to user home directory:
```cd ~/```
Download latest stable Redis version 5:
```wget http://download.redis.io/releases/redis-5.0.4.tar.gz```
Extract downloaded files:
```tar xvzf redis-5.0.4.tar.gz```
Navigate to Redis folder:
```cd redis-5.0.4```
Build Redis:
```make```
Complete Redis installation:
```sudo make install```
Opent Redis configuration file in the editor:
```nano redis.conf```
Find entry `stop-writes-on-bgsave-error yes` and change it to `stop-writes-on-bgsave-error no`. Then exit the editor by pressing `Ctrl+X`, then `Shift+Y`, then `Enter`
Run Redis process:
```./src/redis-server ./redis.conf --daemonize yes```
For more information refer to [installation guide](https://linuxhint.com/install_redis_ubuntu/) and Redis [official page](https://redis.io)
### Installing Node.JS
Install Node.JS package:
```sudo apt install nodejs```
Install node package manager and prerequisites:
```sudo apt install -y libssl1.0-dev nodejs-dev node-gyp npm```
### Install mining pool
Navigate to user home directory:
```cd ~/```
Download the latest Boolbery source files:
```git clone https://github.com/hyle-team/bbr_mining_pool.git```
Navigate to pool folder:
```cd ./bbr_mining_pool/```
Download pool required packages:
```npm update```
Opent pool configuration file in the editor:
```nano ./config/pool.js```
Find entry `address` and set generated wallet address it's value. Example:
```“address” : “1EsE4rpuLhYQMKr4dD3t92NkyVZXGhvhL4AcLvLXBNqTRyDgKUmwVPjKUeCq1F3avK2RucftxzhUnFeKFcYXrN1hRU1rmUq”```
Then exit the editor by pressing `Ctrl+X`, then `Shift+Y`, then `Enter`
### Running Boolberry pool
Run a new screen session:
```screen -S pool```
Run Boolberry pool:
```./node app```

