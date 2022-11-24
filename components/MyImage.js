import Image from "next/image";

const MyImage = (props) => {
  const { src } = props;
  return <img width="100" height="100" alt="workplace image" src={src} />;
};

export default MyImage;
