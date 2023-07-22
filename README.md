# ScholarEase
- #### Deployed at https://devhubb.netlify.app/
- Is is a social application for developers to showcase their projects  and to interact with other developers.
- Built with Reactjs, Nodejs, ExpressJs, Redux, JWT, MongoDB, Cloudinary, Github API.

### Key Features
- User Register, Login.
- Profile Update, Change Password and Delete Account.
- Add,Edit and Delete projects.
- Follow, Unfollow developers and view followers and following.
- Search developers with name and username.
- Search projects with title, tags, Owner name and username.
- Like, Unlike projects and view who liked the project.
- View, Add, Edit and Delete Comments.
- Save, Unsave projects and view your saved projects.
- Fetching Readme of the project if github url is provides.

![sample image](https://github.com/optimm/DevHub/blob/master/client/public/images/sample.png)

### To Run Locally
- Clone the repository `git clone https://github.com/optimm/DevHub.git`.
- Contains two folders backend and client.
- Install dependencies in both folders `cd backend && npm i` , similarly for client.

- #### Creating ENV Files
- Create .env file in backend and add values to these variables
```PORT =
MONGO_URL =
JWT_SECRET =
FRONTEND_URL =

# cloudinary

CLOUD_NAME =
CLOUD_API_KEY =
CLOUD_API_SECRET =
```
- Create .env file in client folder and add example (http://localhost:5000/api/v1)
```
REACT_APP_BACKEND_URL =
```
- Start the backend server with `npm run dev`
- Start the client server with `npm start`

### Contribution
- Raise issues if you find some.
- You can also create pull requests for the same

### Do Fork and ⭐ the repository , Thanks 👨‍💻.
