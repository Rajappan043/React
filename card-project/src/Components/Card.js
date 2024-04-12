import "./Card.css";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { useRef, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
export const UserData = [
  {
    id: 1,
    name: "Jeni",
    city: "China",
    Network: false,
    skills: ["Rust", "Python", "React", "Java", "HTML", "NodeJs"],
    Role: "Frond End Developer",
    img: "assets/img1.jpeg",
  },
  {
    id: 2,
    name: "Marry ",
    city: "New york",
    Network: true,
    skills: ["HTML", "React", "Python", "Java", "NodeJs", "Rust"],
    Role: "Back End Developer",
    img: "../assets/img2.jpeg",
  },
  {
    id: 3,
    name: "Sam",
    city: "UK",
    skills: ["React", "Python", "HTML", "NodeJs", "Rust"],
    Network: true,
    Role: "Full Stack Developer",
    img: "../assets/img3.jpeg",
  },
  {
    id: 4,
    name: "John",
    city: "India",
    skills: ["Java", "HTML", "NodeJs", "React", "Data Scientist"],
    Network: false,
    Role: "Frond End Developer",
    img: "../assets/img4.jpeg",
  },
  {
    id: 5,
    name: "Leena",
    city: "India",
    skills: ["Data Analyst", "React", "Java", "HTML", "NodeJs", "Rust"],
    Network: false,
    Role: "Frond End Developer",
    img: "../assets/img5.jpeg",
  },
  {
    id: 6,
    name: "Pooja",
    city: "US",
    skills: ["Java", "Python", "NodeJs", "Rust", "React", "ML developer"],
    Network: true,
    Role: "Content Creator",
    img: "../assets/img6.jpeg",
  },
  {
    id: 7,
    name: "Somas",
    city: "UAE",
    skills: ["Python", "Java", "HTML", "NodeJs", "AI Gen", "React"],
    Network: false,
    Role: "Designer",
    img: "../assets/img7.jpeg",
  },
  {
    id: 8,
    name: "Alex",
    city: "Canada",
    skills: ["Web developer", "Python", "Java", "HTML", "NodeJs", "Rust"],
    Network: true,
    Role: "Frond End Developer",
    img: "../assets/img8.webp",
  },
];

const Card = (props) => {
  const [follow, setFollow] = useState(true);
  const ref = useRef();
  const closeTooltip = () => ref.current.close();
  const handleFollow = () => {
    if (follow) {
      setFollow(false);
    } else {
      setFollow(true);
    }
  };
  return (
    <>
      <div className="Container">
        <div className="card">
          <img
            src={props.img}
            alt=""
            className={props.Network ? "img-online" : "img-offline"}
          ></img>
          <h2>{props.name}</h2>
          <h3>
            <AddLocationIcon />
            {props.city}
          </h3>
          <p>{props.Role}</p>
          <div className="button">
            <Popup
              ref={ref}
              trigger={<button className="message">Message</button>}
              position="bottom center"
            >
              <div className="text">
                <input placeholder="Text"></input>
                <button className="send" onClick={closeTooltip}>
                  Send
                </button>
              </div>
            </Popup>
            <button
              className={follow ? "follow" : "following"}
              onClick={handleFollow}
            >
              {follow ? "Follow" : "Following"}
            </button>
          </div>
          <h4 className="skill">Skills</h4>
          <ul>
            {props.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
export default Card;
