import Card from "./Components/Card";
import { UserData } from "./Components/Card";
import "./App.css";
function App() {
  return (
    <>
      <h1>Card Component</h1>
      <div className="Card-data">
        {UserData.map((user) => (
          <Card
            key={user.id}
            name={user.name}
            city={user.city}
            skills={user.skills}
            Network={user.Network}
            Role={user.Role}
            img={user.img}
          />
        ))}
      </div>
    </>
  );
}

export default App;
