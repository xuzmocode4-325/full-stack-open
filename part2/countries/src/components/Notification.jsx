const Notification = ({ message }) => {
    const {content, type} = message
    if (content === null & type === null) {
        return null
    } else if (content !== null){
        if(type === 0) {
            return (
                <div className='notification error'>
                  {content}
                </div>
            )
        } else if (type === 1) {
            return (
                <div className='notification update'>
                    {content}
                </div>
            )
        }
    } 
  }

  export default Notification;