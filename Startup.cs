var connectionString = new MySqlConnectionStringBuilder(
    Configuration["CloudSql:ConnectionString"])
{
    // Connecting to a local proxy that does not support ssl.
    SslMode = MySqlSslMode.None,
};
DbConnection connection =
    new MySqlConnection(connectionString.ConnectionString);
