// eslint-disable-next-line react/prop-types
const DetailTab = ({ description }) => {
  return (
    <div>
      <p dangerouslySetInnerHTML={{ __html: description }}></p>
    </div>
  );
};

export default DetailTab;
