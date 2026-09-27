export const Foot = ({ children }) => <div className="foot">{children}</div>
export const Cta = ({ children, ghost, ...rest }) => (
  <button className={`cta ${ghost ? 'ghost' : ''}`} {...rest}>{children}</button>
)
