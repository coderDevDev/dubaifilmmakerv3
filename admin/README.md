# Poster.tv CMS - Setup Guide

This is a simple PHP-based Content Management System for the Poster.tv website. It allows you to manage projects through a clean admin interface without modifying your existing HTML.

## 📋 Requirements

- XAMPP (or any PHP + MySQL environment)
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Modern web browser

## 🚀 Installation Steps

### Step 1: Database Setup

1. Open **phpMyAdmin** in your browser:
   ```
   http://localhost/phpmyadmin
   ```

2. Click **Import** or **SQL** tab

3. Open the file `database/setup.sql` and copy all contents

4. Paste into phpMyAdmin and click **Go**

This will create:
- Database: `posterco_cms`
- Tables: `projects`, `categories`, `admin_users`
- Default admin user (username: `admin`, password: `admin123`)
- Your 7 existing projects

### Step 2: Verify API Configuration

1. Open `api/config.php`

2. Check database credentials (default XAMPP settings):
   ```php
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'posterco_cms');
   define('DB_USER', 'root');
   define('DB_PASS', ''); // Empty for XAMPP
   ```

3. If your MySQL has a different password, update `DB_PASS`

### Step 3: Test API Endpoints

Open in browser to test:

```
http://localhost/posterco/posterco.tv/api/projects.php
```

You should see JSON data with your projects. If you get an error:
- Check XAMPP MySQL is running
- Verify database was created in phpMyAdmin
- Check file paths in config.php

### Step 4: Add Integration Script to HTML

Open your `index.html` and add this script **before** the closing `</body>` tag:

```html
<!-- CMS Integration -->
<script src="assets/js/cms-integration.js"></script>
</body>
```

This script will automatically fetch content from the CMS and update your page.

### Step 5: Access Admin Panel

1. Open in browser:
   ```
   http://localhost/posterco/posterco.tv/admin/login.html
   ```

2. Login with default credentials:
   - **Username**: `admin`
   - **Password**: `admin123`

3. **IMPORTANT**: Change the default password after first login!

## 📁 File Structure

```
posterco.tv/
├── admin/                    # Admin panel files
│   ├── index.html           # Projects management dashboard
│   ├── login.html           # Login page
│   ├── css/
│   │   └── admin.css        # Admin styles
│   └── js/
│       └── admin.js         # Admin functionality
│
├── api/                      # Backend API
│   ├── config.php           # Database connection
│   ├── projects.php         # Projects CRUD operations
│   ├── categories.php       # Categories listing
│   └── auth.php            # Authentication
│
├── assets/
│   └── js/
│       └── cms-integration.js  # Frontend integration
│
└── database/
    └── setup.sql            # Database setup script
```

## 🎯 Using the Admin Panel

### Adding a New Project

1. Click **"Add New Project"** button
2. Fill in the form:
   - **Title**: Project name (e.g., "Dior Sauvage")
   - **Slug**: Auto-generated URL (e.g., "dior-sauvage")
   - **Director**: Director name
   - **Category**: Choose from dropdown
   - **Vimeo IDs**: Just the number part from Vimeo URLs
   - **Order Index**: Lower numbers appear first
   - **Featured**: Check to show on homepage carousel
3. Click **"Save Project"**

### Editing a Project

1. Click **"Edit"** button on any project
2. Modify fields as needed
3. Click **"Save Project"**

### Deleting a Project

1. Click **"Delete"** button
2. Confirm deletion
3. Project is permanently removed

### Filtering Projects

Use the **"Filter by"** dropdown to view projects by category.

## 🔌 API Endpoints

### Get All Projects
```
GET /api/projects.php
```

### Get Featured Projects
```
GET /api/projects.php?featured=1
```

### Get Projects by Category
```
GET /api/projects.php?category=commercials
```

### Get Single Project
```
GET /api/projects.php?id=1
GET /api/projects.php?slug=dior-sauvage
```

### Create Project
```
POST /api/projects.php
Content-Type: application/json

{
  "title": "New Project",
  "slug": "new-project",
  "director": "Director Name",
  "category": "commercials",
  "vimeo_id_720p": "1234567890",
  "vimeo_id_1080p": "1234567890",
  "is_featured": 1,
  "order_index": 1
}
```

### Update Project
```
PUT /api/projects.php
Content-Type: application/json

{
  "id": 1,
  "title": "Updated Title",
  ...
}
```

### Delete Project
```
DELETE /api/projects.php?id=1
```

## 🔒 Security Notes

1. **Change Default Password**
   - Login to phpMyAdmin
   - Navigate to `posterco_cms` → `admin_users` table
   - Update password (use bcrypt hash)
   - Or add password change feature in admin panel

2. **Protect Admin Directory**
   - Add `.htaccess` file to `/admin/` folder:
   ```apache
   # Require authentication for admin
   AuthType Basic
   AuthName "Admin Area"
   AuthUserFile /path/to/.htpasswd
   Require valid-user
   ```

3. **Enable HTTPS**
   - Use SSL certificate in production
   - Update API URLs to use HTTPS

4. **Restrict API Access**
   - Add IP whitelist in `api/config.php`
   - Implement API key authentication

## 🐛 Troubleshooting

### API Returns 404 Error
- Check Apache mod_rewrite is enabled
- Verify file paths are correct
- Check XAMPP htdocs location

### Database Connection Failed
- Ensure MySQL is running in XAMPP
- Verify database credentials in `config.php`
- Check if database exists in phpMyAdmin

### Projects Not Loading on Frontend
- Open browser console (F12) and check for errors
- Verify `cms-integration.js` is loaded
- Test API endpoint directly in browser

### Can't Login to Admin
- Check session support in PHP
- Clear browser cookies
- Verify `admin_users` table has data

### Videos Not Playing
- Check Vimeo video IDs are correct
- Verify video URLs in browser
- Check Vimeo API token if needed

## 📝 Customization

### Adding New Fields

1. Update database schema:
```sql
ALTER TABLE projects ADD COLUMN new_field VARCHAR(255);
```

2. Update API in `api/projects.php`:
```php
':new_field' => $input['new_field']
```

3. Update admin form in `admin/index.html`

4. Update integration script to use new field

### Changing Styles

Edit `admin/css/admin.css` to customize admin panel appearance.

### Adding More Categories

Insert into database:
```sql
INSERT INTO categories (name, slug, order_index) 
VALUES ('New Category', 'new-category', 4);
```

## 🆘 Support

If you encounter issues:

1. Check browser console for JavaScript errors
2. Check PHP error logs in XAMPP
3. Verify all files are in correct locations
4. Test API endpoints individually

## 📄 License

This CMS is built specifically for Poster.tv website.

---

**Built with**: PHP, MySQL, Vanilla JavaScript
**No frameworks required**
