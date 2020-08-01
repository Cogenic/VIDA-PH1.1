#!/bin/bash

#sudo mkdir /cloudsql; sudo chmod 777 /cloudsql
#./cloud_sql_proxy -dir=/cloudsql -instances=cogenicintel:us-west4-a:reason \ -credential_file=cogenic-sql-1.json
 #mysql -u Kirubel -p login_info -S /cloudsql/cogenic:us-west2:cogenic-sql-1
#./cloud_sql_proxy_x64.exe -dir=/cloudsql -instances=cogenicintel:us-west4-a:reason -credential_file="cogenic-sql-1.json"
$env:GOOGLE_APPLICATION_CREDENTIALS="cogenic-sql.json"
cloud_sql_proxy_x64.exe -instances=cogenicintel:us-west4-a:reason=tcp:3306 -credential_file="cogenic-sql.json"

#sudo mkdir /cloudsql; sudo chmod 777 /cloudsql
#./cloud_sql_proxy -dir=/cloudsql -instances=cogenicintel:us-west4-a:reason \ -credential_file=cogenic-sql-1.json

 #mysql -u Kirubel -p login_info -S /cloudsql/cogenic:us-west2:cogenic-sql-1

#./cloud_sql_proxy -instances=cogenicintel:us-west4-a:reason=tcp:3306

