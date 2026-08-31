# 🐾 Bulldogs Exchange | Premium University E-Commerce Store

![PHP](https://img.shields.io/badge/PHP-7.4+-777BB4?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-CSS3-E34F26?style=for-the-badge&logo=html5&logoColor=white)

**Bulldogs Exchange** is a modern, full-stack e-commerce platform designed for university students and alumni to purchase official merchandise, including uniforms, bags, and accessories. The project focuses on providing a seamless, high-end user experience through a "Glassmorphic" design language and an optimized shopping flow.

---

## 🚀 Key Features

### 🛒 Advanced Shopping Experience
- **Dynamic Product Catalog**: Categorized browsing for Uniforms, Bags, and Accessories.
- **Intelligent Shopping Cart**: Real-time cart updates using `localStorage` for persistence across sessions, ensuring users don't lose their items.
- **Smart State Management**: Implemented custom event listeners (`cart-updated`) to synchronize the cart count across multiple pages instantly.

### 💳 Professional Checkout Flow
- **Multi-Step Checkout**: A streamlined process including a detailed Delivery Details form and a secure payment selection.
- **Integrated Payment Options**: Support for popular local digital wallets (GCash, Maya) and traditional Bank Transfers.
- **Dynamic Order Summary**: Live calculation of subtotals and totals based on cart contents.

### 👤 User Management
- **Modern User Profile**: A clean, card-based profile interface allowing users to view and edit their information.
- **Profile Customization**: Full image upload functionality for user avatars with secure backend handling via PHP.
- **Session-Based Auth**: Secure login/logout system utilizing PHP sessions to protect user data.

---

## 🛠️ Technical Stack

### Frontend
- **UI/UX**: HTML5, CSS3 (Custom Properties, Flexbox, Grid).
- **Framework**: Bootstrap 5 for responsive structural components.
- **Design Philosophy**: **Glassmorphism** (utilizing `backdrop-filter` and semi-transparent layers) to create a futuristic, depth-oriented interface.
- **Interactivity**: Vanilla JavaScript for DOM manipulation and state persistence.

### Backend
- **Server-Side**: PHP for request handling and session management.
- **Database**: MySQL for persistent storage of user data and product information.
- **API/Connectivity**: MySQLi for secure database communication.

---

## 🏗️ Architecture & Logic

### The "Double-Add" Fix
One of the key technical hurdles solved during development was the "double-adding" bug. By implementing **Event Delegation** in a centralized `cart.js` and removing redundant listeners from individual product pages, I optimized the event loop and ensured that items are added to the cart exactly once, regardless of where the button is located.

### Data Flow
`User Interaction` $\rightarrow$ `JavaScript (localStorage)` $\rightarrow$ `PHP (Session Validation)` $\rightarrow$ `MySQL (Data Persistence)`

---

## 📦 Installation & Setup

To run this project locally, you will need a local server environment (like **XAMPP** or **WAMP**).

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/bulldogs-exchange.git
   ```

2. **Database Setup**
   - Open **phpMyAdmin**.
   - Create a new database named `bulldogs_exchange`.
   - Import the provided `.sql` file (if applicable) or create the `user_table` with the following columns: `id_number`, `name`, `email`, `profile_pic`.

3. **Configure Connection**
   - Navigate to `backend/config/connection.php`.
   - Update the database credentials (username, password, database name) to match your local setup.

4. **Run the Project**
   - Move the project folder to your `htdocs` directory.
   - Open your browser and navigate to `http://localhost/NU-E-Commerce-Projects/`.

---

## 🌟 Future Enhancements
- [ ] **Admin Dashboard**: A dedicated panel for managing inventory and tracking orders.
- [ ] **Real Payment Integration**: Integrating actual APIs for GCash/Maya.
- [ ] **Order History**: Allowing users to view their previous purchases.
- [ ] **Email Notifications**: Automated order confirmation emails via PHPMailer.

---

## 👨‍💻 Author
**Dane Rohan L Dalisay**
*Portfolio Project - Software Engineering*

---

### 📝 License
This project is developed for educational and portfolio purposes.
