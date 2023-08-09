export default function HelpPage() {
    return (
    <div>
      <nav className="flex justify-end bg-blue-500 py-4 px-8">
      <ul className="flex space-x-4 items-center">
        <li className="text-white hover:shadow-md">
          <a href="#" className="hover:text-blue-300">Home</a>
        </li>
        <li className="text-white hover:shadow-md">
          <a href="#" className="hover:text-blue-300">About</a>
        </li>
        <li className="text-white hover:shadow-md">
          <a href="#" className="hover:text-blue-300">Profile</a>
        </li>
        <li className="text-white hover:shadow-md">
          <a href="#" className="hover:text-blue-300">Login</a>
        </li>
        <li className="text-white hover:shadow-md">
          <a href="#" className="hover:text-blue-300">Logout</a>
        </li>
        <li className="text-white hover:shadow-md">
          <a href="#" className="hover:text-blue-300">Register</a>
        </li>
      </ul>
    </nav>
    </div>
  )

}