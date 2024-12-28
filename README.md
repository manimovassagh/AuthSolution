
# **AuthSolution**

**AuthSolution** is a modern authentication and authorization solution built with **Next.js** for the frontend and **Keycloak** for user authentication. This project demonstrates the integration of Keycloak to manage login, logout, and user roles in a secure and scalable way.

## **Features**

- User login and logout using **Keycloak**.
- Role-based access control (e.g., `user` and `admin` roles).
- Self-registration for new users.
- Responsive design with **Tailwind CSS**.
- Persistent authentication with token parsing.
- Secure user authentication with PKCE.

---

## **Tech Stack**

- **Frontend**: [Next.js](https://nextjs.org/), [React]

[React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/)

- **Authentication**: [Keycloak](https://www.keycloak.org/)
- **Styling**: Tailwind CSS
- **Server**: Keycloak instance for managing authentication flows

---

## **Setup and Installation**

### **1. Prerequisites**

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Keycloak](https://www.keycloak.org/downloads) (v21+ recommended)
- [Docker](https://www.docker.com/) (optional for Keycloak)

### **2. Clone the Repository**

```bash
git clone https://github.com/yourusername/AuthSolution.git
cd AuthSolution
```bash

### **3. Install Dependencies**
```bash
npm install
```bash

### **4. Start Keycloak**

Start a Keycloak server locally or using Docker:

#### Using Docker

```bash
docker run -d \
  -p 8080:8080 \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:latest \
  start-dev
```bash

#### Manually

- Download Keycloak and run:

```bash
./bin/kc.sh start-dev
```

### **5. Configure Keycloak**

console:

- URL: `http://localhost:8080/admin`
- Username: `admin`
- Password: `admin`

1. Import the provided realm configuration:

   - Navigate to **Realm Settings** > **Import**.
   - Upload the `realm-config.json` file.

### **6. Configure `.env` for Next.js**

Create a `.env.local` file in the project root and add the following:

```env
NEXT_PUBLIC_KEYCLOAK_URL=http://localhost:8080
NEXT_PUBLIC_KEYCLOAK_REALM=my-realm
NEXT_PUBLIC_KEYCLOAK_CLIENT=my-nextjs-app
```

### **7. Run the Development Server**

Start the frontend development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

---

## **Usage**

### **Login**

- Navigate to the homepage and click the **Login** button to sign in.
- Keycloak will handle the authentication flow.

### **Register**

- On the Keycloak login page, click **Register** to create a new account.

### **Logout**

- Once logged in, click the **Logout** button to end the session.

---

## **Project Structure**

```
AuthSolution/
├── app/                     # Next.js app directory
│   ├── layout.tsx           # Root layout for the app
│   ├── page.tsx             # Main page
│   ├── components/          # Shared UI components
├── public/                  # Public assets
│   ├── silent-check-sso.html # Keycloak SSO helper file
├── services/                # Service files
│   ├── keycloak.ts          # Keycloak configuration
├── styles/                  # Global styles
│   ├── globals.css          # Tailwind CSS imports
├── .env.local               # Environment variables
├── README.md                # Project documentation
```

---

## **Features to Add**

- **Admin Dashboard**: Manage roles and permissions.
- **Protected Routes**: Add authorization checks for role-based routes.
- **Email Verification**: Enable email verification for registration.

---

## **Contributing**

Contributions are welcome! Please fork the repository, make changes, and open a pull request.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## **Contact**

If you have any questions, feel free to reach out:

- **Author**: Your Name

- **Email**: <your.email@example.com>
