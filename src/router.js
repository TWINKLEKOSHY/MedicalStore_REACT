import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AboutUs from "./components/Aboutus";
import CreatePost from "./components/blog/CreatePost";
import ViewPost from "./components/blog/view";
import EditPost from "./components/blog/edit";
import ListPost from "./components/blog/ListPosts";
import SignUp from "./components/auth/Signup";
import Login from "./components/auth/login";


const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: 'aboutus', element: <AboutUs/> },
    { path: "blog/posts", element: <ListPost /> },
    { path : 'blog/posts/create' , element : <CreatePost/> },   
    { path: 'blog/posts/:postId', element: <ViewPost/>},
    { path : '/blog/posts/:postId/edit', element: <EditPost/>},
    { path : 'signup', element: <SignUp/>},
    { path : 'login', element: <Login/>}
  
]);

export default router;