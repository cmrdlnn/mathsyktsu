# frozen_string_literal: true

# -*- mode: ruby -*-
# vi: set ft=ruby :

$ENVIRONMENT = <<SCRIPT
  echo 'StrictHostKeyChecking no' > ~/.ssh/config
  echo 'UserKnownHostsFile=/dev/null no' >> ~/.ssh/config
  sudo apt-get install git -y
  sudo apt-add-repository ppa:brightbox/ruby-ng -y
  sudo apt-get update -y
  sudo apt-get install ruby2.3 ruby2.3-dev -y
  sudo apt-get install libxml2-dev git curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxslt1-dev libcurl4-openssl-dev python-software-properties libffi-dev -y
  echo "cd /vagrant" >> /home/vagrant/.bashrc
  gem install bundler
  curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ln -s /home/vagrant/node_modules/ node_modules
  mkdir ~/.npm-global
  npm config set prefix '~/.npm-global'
  export PATH=~/.npm-global/bin:$PATH
SCRIPT

# source ~/.profile
# sudo apt-get install mysql-server mysql-client libmysqlclient-dev -y

Vagrant.configure(2) do |config|
  # Development VM

  config.vm.define 'dev', primary: true do |dev|
    dev_ip = '192.168.33.21'
    host_port = 3000
    guest_port = 3000
    dev.vm.provider 'virtualbox' do |v|
      v.memory = 2048
      v.cpus = 2
    end
    dev.vm.network 'forwarded_port', guest: guest_port, host: host_port
    dev.vm.box = 'ubuntu/trusty64'
    dev.vm.hostname = 'MathSyktsu'
    dev.vm.network 'private_network', ip: dev_ip
    dev.ssh.forward_agent = true
    dev.vm.post_up_message = "Ready to development. Use \'vagrant ssh\' and \'bundle install\' after. \
     \nSite will be aviable on http://#{dev_ip}:#{host_port}"

    dev.vm.provision :shell, keep_color: true, inline: $ENVIRONMENT
  end

  # Use vagrant-cachier to cache apt-get, gems and other stuff across machines
  config.cache.scope = :box if Vagrant.has_plugin?('vagrant-cachier')
end
