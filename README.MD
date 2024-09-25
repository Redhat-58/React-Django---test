# Django and React Authentication with JWT and HTTP-Only Cookies

This project implements a user authentication system using Django and React. It includes user registration, login, logout, and fetching user data. Authentication is handled using JWT (JSON Web Tokens) and HTTP-only cookies for improved security. The application's frontend is styled using Bootstrap.

The project consists of two directories: 

- `client`: Contains the React application
- `server`: Contains the Django backend

## Task
1. Add an input field for the user's Ethereum wallet address to the registration page. When a user registers an account, this wallet address must be saved to the database.
2. After login, the homepage must show the balance of the user's Ethereum wallet address.

## Completed the Task
- User registration with email, password, and Ethereum wallet address
- User login and logout
- Fetching and displaying user data
- Displaying Ethereum wallet balance on the homepage after login

## Technical Details
- The backend uses Django REST Framework to handle API requests.
- User authentication is managed using JWT tokens stored in HTTP-only cookies.
- The Ethereum wallet address is stored in the user model in the database.
- The frontend uses React for the user interface and Axios for API calls.
- The Ethereum wallet balance is fetched using a third-party API (implementation details may vary).

![Project Screenshot](/client/public/wallet_1.png)
![Project Screenshot](/client/public/wallet_2.png)


