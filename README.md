# Real Smart Test

## 1. Setup Database

1. **Create Database and Table**
   - Create a database in MySQL (e.g. `real_smart`)
   - Create the `messages` table with the following structure:

     ```sql
     CREATE TABLE messages (
       id INT AUTO_INCREMENT PRIMARY KEY,
       publisheddate DATETIME,
       keyword VARCHAR(1000),
       engagement_view INT,
       engagement_comment INT,
       engagement_share INT,
       engagement_like INT,
       engagement_love INT,
       engagement_sad INT,
       engagement_wow INT,
       engagement_angry INT
     );
     ```

2. **Prepare Data with Python**
   - Run the Python script to generate the data file:
     ```bash
     python insert_data.py
     ```
   - The generated file will be a `.csv` file.

3. **Configure Database Connection**
   - Edit `db.cjs` to match your host, user, password, and database

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Start Backend API Server

```bash
node server.cjs
```
- The API will run at `http://localhost:8000`

---

## 4. Start Nuxt Frontend

```bash
npm run dev
```
- Open your browser and go to [http://localhost:3000](http://localhost:3000)

---

## 5. Test the Project

- Check that the dashboard and all charts display data from the database.
- If data does not appear, check your database connection and restart the backend server.

---

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
