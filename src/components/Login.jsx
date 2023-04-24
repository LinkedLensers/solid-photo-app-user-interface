
const Login = (props) => {

const buttonClick = () => {
  console.log('login')
}

  const loginButton = (
    <button
      onClick={buttonClick}
      name='login'
      className='bg-purple-400 text-white pr-1 pl-1 italic font-sm border-solid border-white '
    >Login</button>
  )

  return (
    <>
      {loginButton}
    </>
  )

}

export default Login;
