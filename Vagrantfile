# frozen_string_literal: true

# -*- mode: ruby -*-
# vi: set ft=ruby :

$PROVISION_SCRIPT = <<SCRIPT
  echo 'StrictHostKeyChecking no' > ~/.ssh/config
  echo 'UserKnownHostsFile=/dev/null no' >> ~/.ssh/config
  apt-add-repository -y ppa:ansible/ansible-2.4
  apt-get update -qq && apt-get install -y software-properties-common git ansible

  cd /vagrant/cm/
  echo 'Install roles:'
  ansible-galaxy install -r requirements.yml --force

  echo 'Run asnible playbook locally:'
  PYTHONUNBUFFERED=1 ANSIBLE_FORCE_COLOR=true ansible-playbook \
    provisioning/dev.yml \
    -i inventory \
    -u vagrant \
    -c local
SCRIPT

Vagrant.configure(2) do |config|
  ram = 1024
  cpu = 2
  dev_ip = '192.168.33.21'
  host_port = 3000
  guest_port = 3000

  # Development VM
  config.vm.define 'dev', primary: true do |dev|
    dev.vm.network :forwarded_port, guest: guest_port, host: host_port\

    dev.vm.box = 'ubuntu/trusty64'
    dev.vm.hostname = 'MathSyktsu'
    dev.vm.provider 'virtualbox' do |v|
      v.memory = ram
      v.cpus = cpu
    end
    dev.vm.network 'private_network', ip: dev_ip
    dev.ssh.forward_agent = true
    dev.vm.post_up_message = "Ready to development. Use \'vagrant ssh\' and \'bundle install\' after. \
     \nSite will be aviable on http://#{dev_ip}:#{host_port}"

    dev.vm.provision :shell, keep_color: true, inline: $PROVISION_SCRIPT
  end

  # Use vagrant-cachier to cache apt-get, gems and other stuff across machines
  config.cache.scope = :box if Vagrant.has_plugin?('vagrant-cachier')
end
