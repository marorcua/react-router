import { Link } from '../Link'

export default function Page404() {
  return (
    <>
      <div>
        <h1>This page doesnt exist</h1>
        <img
          src='https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnlzN3ZnYzE0dGc5MHU2bmdsYTdqaG5xcXd6ZDAyYndpcTY2OTZpeSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/9nREuIINenE5y/giphy.gif'
          alt='gif from django'
        />
      </div>
      <Link to='/' title='Back to Home' />
    </>
  )
}
