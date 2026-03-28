import useTheme from '../hooks/useTheme'

const Navbar = () => {
  const {dark, toggle} = useTheme()

  return (
    <nav className="bg-background-surface border-b border-border px-6 py-2 flex justify-between items-center">
      <div className="text-foreground font-semibold flex align-bottom">
        <img alt="logo" src="images/favicon-32x32.png" className="h-5.5 w-5.5" />
        <div>tools</div>
      </div>
      <button
        onClick={toggle}
        className="bg-primary text-primary-foreground px-4 py-2 rounded-sm flex justify-center align-middle"
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