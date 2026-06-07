
Get-NetTcpConnection -LocalPort 5000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess | Select-Object -Unique | ForEach-Object { Stop-Process -Id $_ -Force }
