#!/bin/bash

sudo pacman -Syu && \
sudo pacman -S git gcc make cmake && \
sudo pacman -S jsoncpp && \
sudo pacman -S uuid && \
sudo pacman -S zlib && \
sudo pacman -S openssl libssl && \
sudo pacman -S spdlog



sudo pacman -S postgresql && \
sudo -u postgres initdb -D /var/lib/postgres/data --locale=en_US.UTF-8 --encoding=UTF8 && \
sudo systemctl enable --now postgresql

./db_entry
sudo pacman -S nginx &&\
sudo systemctl enable --now nginx &&\
sudo cp nginx.conf /etc/nginx/nginx.conf

cd ~
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
\. "$HOME/.nvm/nvm.sh"
nvm install 24


cd ~
mkdir src && cd src
git clone https://github.com/drogonframework/drogon
cd drogon
git submodule update --init
mkdir build
cd build
cmake ..
make && sudo make install



