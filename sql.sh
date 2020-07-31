#!/bin/bash
 ./cloud_sql_proxy -dir=/cloudsql -instances=cogenic:us-west2:cogenic-sql-1
 #mysql -u Kirubel -p login_info -S /cloudsql/cogenic:us-west2:cogenic-sql-1

./cloud_sql_proxy -dir=/cloudsql -instances=cogenicintel:us-west4-a:reason \ -credential_file=cogenic-sql-1.json
