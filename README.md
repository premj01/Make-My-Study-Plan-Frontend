# Make My Study Plan Frontend

A modern, responsive web application for creating personalized study plans. Built with React, Vite, and HeroUI components.

## 🌟 Features 🐳

- **Personalized Study Plans**: Create customized learning paths based on your preferences
- **Smart Difficulty Selection**: Choose from Basic, Intermediate, and Advanced levels
- **Flexible Scheduling**: Set your study duration and daily hours
- **Interactive Calendar**: Select your preferred start date
- **Real-time Validation**: Form validation with clear error messages
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Theme**: Support for both dark and light modes
- **Beautiful UI**: Modern glassmorphism design with smooth animations
- **Secure Authentication**: JWT-based authentication system
- **Progress Tracking**: Monitor your learning journey

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **UI Components**: HeroUI
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Date Handling**: @internationalized/date
- **Routing**: React Router

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/premj01/make-my-study-plan-frontend.git
cd make-my-study-plan-frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your environment variables:

```env
VITE_API_URL=your_api_url
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
├── contextProvider/    # React context providers
├── QuestionManagement/ # Study plan related components
├── Styles/            # Global styles and CSS modules
├── utils/             # Utility functions and constants
└── App.jsx            # Main application component
```

## 🔑 Key Components

### AddCategory

- Form for creating new study plans
- Difficulty level selection with visual indicators
- Duration and daily hours configuration
- Interactive calendar for start date selection
- Real-time form validation
- Loading states and error handling

### NavigationBar

- Responsive navigation with mobile support
- Theme toggle functionality
- User profile management
- Secure logout handling

## 🔒 Security Features

- JWT token-based authentication
- Secure storage of user credentials
- Protected routes
- API request validation

## 🎨 UI/UX Features

- Glassmorphism design elements
- Smooth page transitions
- Responsive layouts
- Interactive form elements
- Loading states and animations
- Error handling with visual feedback
- Accessibility support

## 🌐 API Integration

The application communicates with a backend API for:

- User authentication
- Study plan generation
- Progress tracking
- Data persistence

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Prem Jadhav 

## 🐳 Acknowledgments

- HeroUI for the beautiful component library
- React community for the amazing ecosystem
- All contributors who have helped shape this project
