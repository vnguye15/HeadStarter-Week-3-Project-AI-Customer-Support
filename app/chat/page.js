import ChatInterface from "@/components/chatInterface";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Chat() {
  const user = await currentUser();

  if (!user) {
    redirect("/")
  }

  return (
    <>
      <ChatInterface userImgUrl={user.imageUrl}/>
    </>
  )
}



// THIS WAS COMMENTED OUT BY WHIT
// I wasnt sure if we needed this anymore so its here if we need it vvvv

// This function below serves as our form validation
// function AccountModal({ isOpen, onClose }) {
//   const [isCreatingAccount, setIsCreatingAccount] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState({});

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Validate and handle form submission here
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!email) errors.email = 'Email is required';
//     if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';
//     if (!password) errors.password = 'Password is required';
//     setErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   return isOpen ? (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <button onClick={onClose}>Close</button>
//         <h2>{isCreatingAccount ? 'Create Account' : 'Log In'}</h2>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Insert email"
//             />
//             {errors.email && <span className="error">{errors.email}</span>}
//           </div>
//           <div>
//             <label>Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Insert password"
//             />
//             {errors.password && <span className="error">{errors.password}</span>}
//           </div>
//           <button type="submit">{isCreatingAccount ? 'Sign Up' : 'Log In'}</button>
//         </form>
//         <button onClick={() => setIsCreatingAccount(!isCreatingAccount)}>
//           {isCreatingAccount ? 'Already have an account? Log In' : 'Need an account? Create one'}
//         </button>
//       </div>
//     </div>
//   ) : null;
// }

// export {AccountModal}; 