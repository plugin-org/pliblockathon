requirements:-

    => python >3.5
    => django 4.0
    => sol = 0.8.17
    => web3

commands:

    for Windows :-
        => Right click on start.bat
        => open http://127.0.0.1:8000/
    for linux and mac:
        python3 manage.py makemigrations
        python3 manage.py migrate

        python3 manage.py runserver

    User Admin:
        =>Admin Url http://127.0.0.1:8000/admin
        python3 manage.py createsuperuser
    
    Open Remix:
        => soiurce ./src/iotdata.sol

        open in remix and deploy in XDC server

        => open https://remix.xinfin.network/#optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.17+commit.8df45f5f.js