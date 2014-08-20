# Install basic tools
sudo apt-get update
sudo apt-get install apache2
sudo apt-get install curl
sudo apt-get install python-pip
sudo apt-get install wget
# Installs python relateds
sudo pip install tweepy
wget http://peak.telecommunity.com/dist/ez_setup.py
sudo python ez_setup.py
wget http://pypi.python.org/packages/2.6/C/CouchDB/CouchDB-0.8-py2.6.egg
sudo easy_install CouchDB-0.8-py2.6.egg
# Install couchdb
sudo apt-get install -y build-essential
sudo apt-get install -y erlang-base erlang-dev erlang-nox erlang-eunit
sudo apt-get install -y libmozjs185-dev libicu-dev libcurl4-gnutls-dev libtool
cd /usr/local/src
sudo curl -O http://apache.mirror.uber.com.au/couchdb/source/1.5.1/apache-couchdb-1.5.1.tar.gz
sudo tar xvzf apache-couchdb-1.5.1.tar.gz
cd apache-couchdb-1.5.1/
./configure
sudo make && sudo make install
sudo adduser --disabled-login --disabled-password --no-create-home couchdb
sudo chown -R couchdb:couchdb /usr/local/var/log/couchdb /usr/local/var/lib/couchdb /usr/local/var/run/couchdb
sudo ln -s /usr/local/etc/init.d/couchdb  /etc/init.d
# Mount the formatted volume to make it part of the filesystem hierarchy
sudo mkfs.ext4 /dev/vdc
sudo mkdir /mnt/data
sudo mount /dev/vdc /mnt/data
sudo chown -R ubuntu /mnt/data
# Move couchdb data to volume
sudo mkdir /mnt/data/database
sudo mkdir /mnt/data/database/couchdb
sudo mkdir /mnt/data/database/couchview
sudo cp -R -p /usr/local/var/lib/couchdb /mnt/data/database/couchdb
sudo chown -R couchdb:couchdb /mnt/data/database/couchdb
sudo chown -R couchdb:couchdb /mnt/data/database/couchview
sed "9s@.*@database_dir = /mnt/data/database/couchdb@g" /usr/local/etc/couchdb/default.ini
sed "10s@.*@view_index_dir = /mnt/data/database/couchview@g" /usr/local/etc/couchdb/default.ini
sudo bash -c "echo 'alias /usr/local/var/lib/couchdb/ -> /mnt/data/database/couchdb/,' >> /etc/apparmor.d/tunables/alias"
#Change couchdb binded IP in local.ini to 0.0.0.0 to make it accessible by public IPs.
sed "13s/.*/bind_address = 0.0.0.0/g" /usr/local/etc/couchdb/local.ini
sudo /etc/init.d/apparmor restart
sudo update-rc.d couchdb defaults
sudo service couchdb start
sudo iptables -A INPUT -p tcp --dport 5984 -j ACCEPT
sudo cp /usr/local/etc/couchdb/default.ini /usr/local/etc/couchdb/default.ini.bak
sudo nano /usr/local/etc/couchdb/default.ini