import useTheme from '../hooks/useTheme'
import { Link } from '@tanstack/react-router'

const Navbar = () => {
  const {dark, toggle} = useTheme()

  return (
    <nav className="bg-background-surface border-b border-border px-6 py-2 flex justify-between items-center h-10">
      <Link to='/' className="text-foreground font-semibold flex align-bottom gap-1">
        <img alt="logo" src="images/favicon-32x32.png" className="h-7.5 w-7.5" />
        <div className='text-2xl'>Tools</div>
      </Link>
      <div className='flex justify-center gap-10'>
        <Link to='/markdown-editor'>Markdown Editor</Link>
        <Link to='/about'>About</Link>
      </div>
      <button
        onClick={toggle}
        className="bg-primary text-primary-foreground px-2 py-1 rounded-sm flex justify-center align-middle"
      >
        {
          dark ?
            <i className='hn hn-brightness-high-solid'></i> :
            <i className='hn hn-moon-solid'></i>
        }
      </button>
    </nav>
  )
}

export default Navbar