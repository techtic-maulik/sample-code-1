const CustomIcon = (props) => {
  let style = `rounded-full flex justify-center items-center hover:cursor-pointer ${props.style} mobile-view`;
  if (props.class) {
    style = `${style} ${props.class}`;
  } else {
    style = `${style}  w-9 h-9`;
  }
  return (
    <div onClick={props.onClick} className={style}>
      {props.children}
    </div>
  );
};

export default CustomIcon;
