# EmpowerNest  

EmpowerNest is a comprehensive platform designed to support both mothers and fathers throughout the parenting journey. From pregnancy tracking and childcare guidance to comprehensive health management, EmpowerNest aims to provide a holistic solution for parental support.  

## Features  
- **Pregnancy Tracking:** Tools and resources to monitor and manage pregnancy stages effectively.  
- **Freelancing for Mothers:** Opportunities for mothers to find freelance work based on their interests, such as painting, and sell their creations.  
- **Paternal Support:** Guidance and resources for fathers to understand and fulfill their roles during and after pregnancy.  
- **Childcare Guidance:** Tips and best practices for taking care of newborns and toddlers.  
- **User-Friendly Dashboard:** An interactive and easy-to-use interface for managing all aspects of parenting.  

## Tech Stack  
- **Frontend:** HTML, CSS, JavaScript, React  
- **Backend:** Node.js, Express  
- **Database:** MongoDB  
- **Tools:** Git, GitHub, Visual Studio Code  

## Project Structure  
```
EmpowerNest/
├── frontend/                # React-based frontend code
├── backend/                 # Node.js and Express backend code
├── database/                # MongoDB schema and configuration
├── assets/                  # Images and other assets
├── README.md                # Project documentation
├── package.json             # Dependencies and scripts
└── .gitignore               # Ignored files and folders
```

## Installation and Setup  

### Prerequisites
- Node.js (v16 or higher)
- Bun package manager
- MongoDB instance (local or Atlas)

### Frontend Setup
1. **Clone the repository:**  
    ```bash
    git clone <your-repo-url>
    cd EmpowerNest
    ```

2. **Install dependencies:**  
    ```bash
    bun install
    ```

3. **Configure environment variables:**  
    Create a `.env.local` file in the root directory (see `.env.example`):
    ```
    VITE_API_URL=http://localhost:5000
    ```

4. **Run the development server:**  
    ```bash
    bun run dev
    ```

### Backend Setup
1. **Navigate to backend directory:**
    ```bash
    cd backend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Configure environment variables:**
    Create a `.env` file in the backend directory:
    ```
    MONGODB_URI=mongodb://localhost:27017/empowerNest
    PORT=5000
    JWT_SECRET=your-secret-key
    NODE_ENV=development
    ```

4. **Run the backend server:**
    ```bash
    npm run dev
    ```

## Roadmap  
- [ ] Implement payment gateway for freelance work.  
- [ ] Enhance the dashboard UI/UX.  
- [ ] Integrate AI-based suggestions for childcare.  

## Contributing  
We welcome contributions! Please follow these steps:  
1. Fork the repository.  
2. Create a new branch (`git checkout -b feature-branch`).  
3. Commit your changes (`git commit -m 'Add new feature'`).  
4. Push to the branch (`git push origin feature-branch`).  
5. Create a Pull Request.  

## License  
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more information.  

## Support  
For queries or feedback, please create an issue in the GitHub repository or contact the development team.  


