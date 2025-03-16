# Make My Study Plan Frontend

A modern, responsive web application for creating personalized study plans. Built with React, Vite, and HeroUI components.

# Watch Video Below
[![Watch the video](https://lh3.googleusercontent.com/fife/ALs6j_GqU0kN5AZwBA9lVMkSulfxx_1G9wXlNsLw77zx5sjYTJINx0wStqpWnG_peyigQnoZsW9yk8pM5lhUCM0uZi9aiSdbB7RXuGvV1GFjPqgA81-e4MK_FgvGPZrqWERNu22KHnL0uyDH-PuCfOpqEQlJz2Z1ekNSlrlQdBwhlHv8AqYZgGouzBsLHYGBJfmH5DcQnfXZ6F8sfT3fr-5IHNuZWQTy4ywYl6RkFcKSxtmWQSMRPeHUf8Oneb4w1OgaBbB4J9Bmg583nT2fbhdpz4a3nkINtMs9ph7Sh5NDZakPpJwHKbR3-gvctsxe2APVOmrl2Os-EvhT6pZtu9WP3GnTCNeed0SDH93y7go2PvQHyvRckMUo6AbTDM2nHNE4S9LiQQU-SV2fDEUYIZfMAAW-MAKH7b21-lkbUpoZnvvQOlAux8khPCnmT-KvlvyET70r2NHi3W5jms8nDcTcZhYAHi4Iwdp4VFyjKxFUlS_Z9pS8tqqZK6Sf1eiDxDPdJ-6F_lrp4H-1PKax3QLHF-qCNjoV3zO3Ms58RNUfobre91_fuMdJi37GSWxhv4enU4UloeuR_Z7VvAtuX23-o9OZlsIrlmYwMMTxGBDZqtHc-I2_dw8XToiOUimHZZzJknfq37tNPHGIHRaV4mP0VDD_vSqdFJxs4YaxSXphKrC1k4qZjxM4kmgKnmktY_FlBtkCoYEegbXkhQAWmZvSf0FghhTvuUPfR6YAkWYOA9Mkz-_oiHMP9oV74t6NSA5gr5DRpVvJXQKa7BpYQ07WGV4KbdJ71Cz-TtrdimykJiOc15jqURv3AfK0VxH-8PVSmd0qxH-wEumSVTnNSV9Sg8Qtx-6NU0JcGIw8cS4seBnpTBoBNZ5KBshyNHMhogusicV4K5Coc5DqDSYSyoKAXzD-_X2PS_84RMxTElsiTgPNmQa8uEAVWErUUdPxtRUjqMJvPj6yhbtqiGILefB6uQc9K8C2ldF_qRpl65f0MSvNe7getL7cjLEm_JXzex1xitT84-kPeizN12hRvo_yJrke8JXRgqQHVsjkDBZ0OOYLCclFwFAsdItd13-P7gfIiusJasCjzURDiAokceRFQTICyQW99c2sfwYOH2xJRzD0zRkJX_83lMftByhiNJ3CKqcWD3kXXKysHdC2_7CLcEWT3jeG2FzUdPFpaMdc-Gh5qUo9d3ynfoKZJV6DC3xIlyTRu114BPkjgBQyPzv_NAqxuntiu9JCz_RV_oPxYAxXiG2QWbbCE0dmBYx-qQ12UV_sIedcD4JR4DGazQcX-8fC5iTDs7fMApu6uU8tQQwXJSLUDPc0s6UZbkDHtPKaBGo1ZoUF2VeSHaYkHjg4fazXTHtgBIuR8ubqE3fkjgymlU5FA5yd9Ob-Amk74GiMT45IS5FY98TS4Mcfy8wh6kokmFrN0nelLsTWWUyd4_HHJRTNfmt4r-zoBdCeXwR0vtRJTbyxKsuVIq3NPdEixWbhvaI5L5OcRgpVIRsxuuFl0-unNrxzBpZzZoeVUEtKfeZpEI3CyOWiYeDZ74GWDAp3pcNvLsvgQqJB9D_-zMg0tId_c6pO34oFKsX4zHeZjg8vxpdxOXtClJ2g=w1920-h840)](https://youtu.be/XilwOyj5dns?si=7HFcQamWPqh4QVru)

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
