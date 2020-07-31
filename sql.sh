#!/bin/bash
sudo mkdir /cloudsql; sudo chmod 777 /cloudsql
./cloud_sql_proxy -dir=/cloudsql -instances=cogenicintel:us-west4-a:reason \ -credential_file=cogenic-sql-1.json
 #mysql -u Kirubel -p login_info -S /cloudsql/cogenic:us-west2:cogenic-sql-1

