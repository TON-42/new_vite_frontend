# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# new_vite_frontend

# Backend Data Structure

The data received from the backend has the following structure:

```json
{
  "chats": [
    {
      "agreed_users": [843373640],
      "id": 122493869,
      "lead_id": 843373640,
      "name": "stefano",
      "status": "pending",
      "users": [843373640, 122493869],
      "words": 791
    },
    {
      "agreed_users": [1942086946],
      "id": 1942086946,
      "lead_id": 843373640,
      "name": "Michael R",
      "status": "pending"
    },
    {
      "agreed_users": [5358771958],
      "id": 5358771958,
      "lead_id": 843373640,
      "name": "Léonard M",
      "status": "pending"
    }
  ]
}
```
