import {
  LinkedinOutlined,
  InstagramOutlined,
  FacebookOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

export default function SubHeader() {
  return (
    <>
      <a className="sub_header_logo">LOGO</a>
      <div className="sub_header_container">
        <a className="main_header_item" href="www.facebook.com">
          <FacebookOutlined />
        </a>
        <a className="main_header_item" href="www.instagram.com">
          <InstagramOutlined />
        </a>
        <a className="main_header_item">
          <LinkedinOutlined />
        </a>
        <a className="main_header_item">
          <YoutubeOutlined />
        </a>
      </div>
    </>
  );
}
