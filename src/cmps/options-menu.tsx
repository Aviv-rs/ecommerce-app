interface Option {
  name: string
  action: React.MouseEventHandler<HTMLLIElement>
}

export const OptionsMenu = ({
  options,
  isOpen = false,
  className = 'options-menu',
}: {
  options: Option[]
  isOpen: boolean
  className: string
}) => {
  if (!isOpen) return <></>
  return (
    <div className={className}>
      <ul className="option-list clean-list">
        {options.map((option, idx) => {
          return (
            <li key={idx} onMouseDown={option.action} className="option">
              {option.name}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

// An external state hook to control the open state of the cmp is required
// const [isMenuOpen, setIsMenuOpen] = useState(false)
// const toggleMenuOpen = () => {
//     setIsMenuOpen((prevIsMenuOpen => !prevIsMenuOpen))
// }
