import avatar from '../../assets/images/avatar.jpg';

const Avatar = ({src = avatar, alt = 'image', className = '', ...props}) => {
  return (
    <img className={className} src={src} alt={alt} {...props} />
  );
};

export default Avatar;