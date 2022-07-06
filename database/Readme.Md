# Postgresql 14.x

PostgreSQL is a powerful, open source object-relational database system with over 30 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.[More info about it](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html)

### `Creating a Database with pgAdmin 4`
1. Open the pgAdmin 4 App
2. In the server section, select the server that you will use

![image](https://user-images.githubusercontent.com/77891212/177570103-8690680a-b1e2-4457-92a4-290e68530b57.png)

3. Right Click on PostgreSQL xx Then select Create – Database

![image](https://user-images.githubusercontent.com/77891212/177572433-ec4ea177-176c-43a5-be01-478c47fe440b.png)

4. Next, a __Dialog Box__ will appear to create a new database, enter a name (db_fit_proper) in the database field and then click save

#### :warning: **THE OWNER WILL BE IMPORTANT TO CONFIGURE BACKEND**

![image](https://user-images.githubusercontent.com/77891212/177574531-851006a2-507e-4e26-b50a-eb221bcd8a00.png)

5. After clicking Save, then look at the List section. db_fit_proper database has been successfully added.

![image](https://user-images.githubusercontent.com/77891212/177575276-1790b56b-a497-48c8-8a59-18bf3ac3b9d1.png)

### `Restore Postgresql Database using pgAdmin 4`

1. Right Click Database (db_fit_proper) Then select Restore

![image](https://user-images.githubusercontent.com/77891212/177576242-d064b074-74f3-4ec7-8155-54dd229f681e.png)

2. __Dialog Box__ will appear to restore database, in the filename field click folder image

![image](https://user-images.githubusercontent.com/77891212/177576750-add3e3f5-2b47-4506-83ca-5795d9ba988e.png)

3. Browse your backup file (db_fit_proper), then click select

![image](https://user-images.githubusercontent.com/77891212/177577914-2fe06a27-8bc9-400e-b28e-d50de3034e01.png)

4. Click Data/Objects, make configuration like this, then click restore

![image](https://user-images.githubusercontent.com/77891212/177579720-7778280c-172d-4402-8a9d-1a3b92879bbd.png)

5. After clicking restore, then look at the bottom right. db_fit_proper database has been successfully restored.

![image](https://user-images.githubusercontent.com/77891212/177579995-c3604829-b056-4173-ac21-20f3bc2d3990.png)

