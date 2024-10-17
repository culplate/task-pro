# TaskPro

**TaskPro** is a collaborative MERN stack project designed to help users track their tasks efficiently. It features a full set of task management tools, including boards, columns, and tasks, with additional functionality for personalization and feedback.

## Features

- **User Authentication**: Supports login and registration using JSON Web Tokens (JWT).
- **Task Management**: Complete CRUD operations for boards, columns, and tasks.
- **Theme Customization**: Users can switch between different themes to personalize their experience.
- **Avatar and Profile Management**: Users can upload and edit their avatar and personal data.
- **Feedback Form**: A feedback form allows users to send help requests directly to the internal support mailbox using **Nodemailer**.
- **Responsive Design**: Built with a responsive UI to provide a seamless experience across devices.

## Technologies Used

### Frontend
- **React**: For building user interfaces.
- **Redux Toolkit**: State management solution for handling complex application state.
- **React Router**: For routing and navigation.
- **Axios**: For making HTTP requests to the backend.
- **Formik & Yup**: For form management and validation.
- **Styled Components & Emotion**: For styling the UI components.


## Build and Development

1. Clone the repository:
   ```bash
   git clone https://github.com/culplate/task-pro.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```


## Notes

- This project allows users to manage tasks and collaborate efficiently, providing features like theme switching, avatar upload, and feedback options.
- Built with a modular approach to separate concerns across different components, making the codebase maintainable and scalable.

## License

This project is licensed under the MIT License.

