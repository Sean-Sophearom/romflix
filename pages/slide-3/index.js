import Button from "../../components/Button";
import MyImage from "../../components/MyImage";

const index = () => {
  return (
    <>
      <div className="p-1 flex gap-2">
        <Button label="like" />
        <Button label="comment" />
      </div>
      <div className="p-1 flex gap-2">
        <MyImage src="/workplace_img_1.jpg" />
        <MyImage src="/workplace_img_2.jpg" />
        <MyImage src="/workplace_img_3.jpg" />
        <MyImage src="/workplace_img_4.jpg" />
      </div>
    </>
  );
};

export default index;
